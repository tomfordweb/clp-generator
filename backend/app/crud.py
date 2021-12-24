from fastapi import HTTPException
from sqlalchemy.orm import Session

from . import dependencies, models, schemas


def get_fragrance(db: Session, fragrance_id: int):
    fragrance = db.query(models.Fragrance).filter(models.Fragrance.id == fragrance_id).first()
    if not fragrance:
        raise HTTPException(
            status_code=404,
            detail="Fragrance does not exist"
        )
    return fragrance;

def get_fragrances(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Fragrance).offset(skip).limit(limit).all()


def update_fragrance(db: Session, fragrance_id: int, fragrance: schemas.FragranceCreate):
    frag = get_fragrance(db, fragrance_id)
    frag.name = fragrance.name
    frag.supplier = fragrance.supplier
    frag.supplier_code = fragrance.supplier_code
    db.commit()
    db.refresh(frag)
    return frag


def create_fragrance(db: Session, fragrance: schemas.FragranceCreate):
    db_item = models.Fragrance(**fragrance.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def create_fragrance_product(db: Session, product: schemas.ProductCreate, fragrance: schemas.Fragrance):
    db_item = models.Product(**product.dict(), fragrance_id=fragrance.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_product(db: Session, fragrance_id:int, product_id: int):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product or product.fragrance_id is not fragrance_id:
        raise HTTPException(
            status_code=404,
            detail="Product does not exist, or does not belong to fragrance"
        )
    return product


def update_fragrance_product(db:Session, fragrance_id:int, product_id:int, product_data:schemas.ProductCreate):
    product = get_product(db, fragrance_id, product_id)
    product.name = product_data.name
    product.description = product_data.description
    product.pictograms = product_data.pictograms
    product.mass = product_data.mass
    db.commit()
    db.refresh(product)

    return product
