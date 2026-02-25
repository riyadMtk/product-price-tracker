from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class PriceSource(BaseModel):
    source: str
    product_name: str
    price: float
    currency: str
    unit: Optional[str] = None   # ex: "kg", "L", "pièce"

class NormalizedPrice(BaseModel):
    source: str
    product_name: str
    price_eur: float   # prix converti en EUR
    unit: str
    original_price: float
    original_currency: str

class PriceHistoryEntry(BaseModel):
    product_name: str
    source: str
    price_eur: float
    timestamp: datetime