from sqlalchemy.orm import Session

from . import dependencies, models, schemas


def get_fragrance(db: Session, fragrance_id: int):
    return db.query(models.Fragrance).filter(models.Fragrance.id == fragrance_id).first()

def get_fragrances(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Fragrance).offset(skip).limit(limit).all()


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
