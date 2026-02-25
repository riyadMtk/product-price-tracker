from fastapi import FastAPI, HTTPException, Query
from contextlib import asynccontextmanager
from datetime import datetime
from typing import List

from app.services.price_fetcher import fetch_all_sources
from app.services.normalizer import normalize_all
from app.cache.redis_client import redis_client
from app.models.schemas import NormalizedPrice, PriceHistoryEntry

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await redis_client.connect()
    yield
    # Shutdown
    await redis_client.client.close()

app = FastAPI(title="Price Service (Python)", lifespan=lifespan)

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/prices", response_model=List[NormalizedPrice])
async def get_prices(product: str = Query(..., description="Nom du produit")):
    """
    Récupère les prix normalisés pour un produit depuis toutes les sources.
    """
    # 1. Récupérer les données brutes des sources simulées
    raw_prices = fetch_all_sources(product)

    # 2. Normaliser
    normalized = normalize_all(raw_prices)

    # 3. Stocker l'historique (asynchrone, sans bloquer la réponse)
    for price in normalized:
        entry = PriceHistoryEntry(
            product_name=price.product_name,
            source=price.source,
            price_eur=price.price_eur,
            timestamp=datetime.utcnow()
        )
        await redis_client.store_price_history(entry)

    return normalized

@app.get("/history", response_model=List[PriceHistoryEntry])
async def get_history(product: str = Query(...), source: str = Query(...)):
    """
    Récupère l'historique des prix pour un produit et une source donnés.
    """
    history = await redis_client.get_price_history(product, source)
    if not history:
        raise HTTPException(status_code=404, detail="Aucun historique trouvé")
    return history