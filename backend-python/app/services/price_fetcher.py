import os
import random
from dotenv import load_dotenv  # <-- Import ajouté
from typing import List
from serpapi import GoogleSearch
from app.models.schemas import PriceSource

load_dotenv()  # Charge les variables d'environnement

SERPAPI_KEY = os.getenv("SERPAPI_KEY")

def fetch_from_serpapi(product_name: str) -> List[PriceSource]:
    """Récupère les prix depuis Google Shopping via SerpAPI"""
    if not SERPAPI_KEY:
        print("⚠️  SERPAPI_KEY non définie, retour de données simulées")
        return _simulate_fallback(product_name)

    params = {
        "q": product_name,
        "tbm": "shop",
        "location": "France",
        "hl": "fr",
        "gl": "fr",
        "api_key": SERPAPI_KEY
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    price_sources = []
    for item in results.get("shopping_results", []):
        source = item.get("source", "Inconnu")
        price_str = item.get("price", "0 €")
        price_clean = price_str.replace("€", "").replace(",", ".").strip()
        try:
            price = float(price_clean)
        except ValueError:
            continue
        currency = "EUR" if "€" in price_str else "USD"
        price_sources.append(PriceSource(
            source=source,
            product_name=product_name,
            price=price,
            currency=currency,
            unit="pièce"
        ))
    return price_sources

def _simulate_fallback(product_name: str) -> List[PriceSource]:
    """Génère des données simulées en l'absence de clé API"""
    sources = [
        {"name": "Amazon", "currency": "USD", "min": 20, "max": 100},
        {"name": "eBay", "currency": "GBP", "min": 25, "max": 90},
    ]
    results = []
    for src in sources:
        price = round(random.uniform(src["min"], src["max"]), 2)
        results.append(PriceSource(
            source=src["name"],
            product_name=product_name,
            price=price,
            currency=src["currency"],
            unit="pièce"
        ))
    return results

fetch_all_sources = fetch_from_serpapi