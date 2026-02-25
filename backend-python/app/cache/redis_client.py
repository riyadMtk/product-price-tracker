import redis.asyncio as redis
from app.config import settings
import json
from datetime import datetime
from typing import List
from app.models.schemas import PriceHistoryEntry

class RedisClient:
    def __init__(self):
        self.client = None

    async def connect(self):
        self.client = await redis.from_url(
            f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}/{settings.REDIS_DB}",
            decode_responses=True
        )

    async def store_price_history(self, entry: PriceHistoryEntry):
        """Stocke un historique de prix dans une liste Redis"""
        key = f"price_history:{entry.product_name}:{entry.source}"
        data = entry.model_dump_json()  # pydantic v2
        await self.client.lpush(key, data)
        await self.client.ltrim(key, 0, 99)  # garde les 100 derniers

    async def get_price_history(self, product_name: str, source: str) -> List[PriceHistoryEntry]:
        key = f"price_history:{product_name}:{source}"
        data_list = await self.client.lrange(key, 0, -1)
        entries = []
        for item in data_list:
            entry_dict = json.loads(item)
            entry_dict["timestamp"] = datetime.fromisoformat(entry_dict["timestamp"])
            entries.append(PriceHistoryEntry(**entry_dict))
        return entries

redis_client = RedisClient()