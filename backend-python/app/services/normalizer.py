from app.models.schemas import PriceSource, NormalizedPrice

# Taux de conversion fictifs (en conditions réelles, appel à une API de change)
EXCHANGE_RATES = {
    "USD": 0.85,
    "GBP": 1.17,
    "EUR": 1.0
}

def normalize_price(data: PriceSource) -> NormalizedPrice:
    """Convertit un prix source en prix normalisé (EUR)"""
    rate = EXCHANGE_RATES.get(data.currency, 1.0)
    price_eur = round(data.price * rate, 2)

    # Uniformisation des unités (ex: toutes en "unité")
    unit = data.unit if data.unit else "pièce"
    # Ici on pourrait faire d'autres transformations (kg → g, etc.)

    return NormalizedPrice(
        source=data.source,
        product_name=data.product_name,
        price_eur=price_eur,
        unit=unit,
        original_price=data.price,
        original_currency=data.currency
    )

def normalize_all(prices: list[PriceSource]) -> list[NormalizedPrice]:
    """Normalise une liste de prix"""
    return [normalize_price(p) for p in prices]