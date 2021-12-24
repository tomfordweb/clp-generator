from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import crud, models, schemas
from ..dependencies import get_db

router = APIRouter()

@router.get("/fragrances")
async def get_fragrance_list(db: Session = Depends(get_db) ):
    fragrance = crud.get_fragrances(db)
    return fragrance

@router.post("/fragrances")
async def create_fragrance(fragrance: schemas.FragranceCreate,  db: Session = Depends(get_db) ):
    fragrance = crud.create_fragrance(db, fragrance)
    return fragrance

@router.get("/fragrances/{fragrance_id}")
async def get_fragrance(fragrance_id,  db: Session = Depends(get_db) ):
    fragrance = crud.get_fragrance(db, fragrance_id=fragrance_id)
    return fragrance

@router.put("/fragrances/{fragrance_id}")
async def update_fragrance(fragrance_id, fragrance: schemas.FragranceCreate,  db: Session = Depends(get_db) ):
    fragrance_database = crud.update_fragrance(db, fragrance_id, fragrance)
    return fragrance_database

@router.delete("/fragrances/{fragrance_id}")
async def delete_fragrance(fragrance_id:int, db: Session = Depends(get_db) ):
    fragrance = crud.get_fragrance(db, fragrance_id)
    db.delete(fragrance);
    db.commit();
    return { "success": True}

@router.post("/fragrances/{fragrance_id}/products")
async def create_product(fragrance_id: str, product: schemas.ProductCreate,  db: Session = Depends(get_db) ):
    fragrance = crud.get_fragrance(db, int(fragrance_id))

    fragranceProduct = crud.create_fragrance_product(db, product, fragrance)

    return fragranceProduct;

@router.get("/fragrances/{fragrance_id}/products/{product_id}")
async def get_product_fragrance(fragrance_id: int, product_id: int, db: Session = Depends(get_db) ):
    product = crud.get_product(db, fragrance_id, product_id)
    return product

@router.get("/fragrances/{fragrance_id}/products")
async def get_fragrance_products_list(fragrance_id: int, db: Session = Depends(get_db) ):
    fragrance = crud.get_fragrance(db, fragrance_id)
    return fragrance.products

@router.delete("/fragrances/{fragrance_id}/products/{product_id}")
async def delete_fragrance_product(fragrance_id: int, product_id: int, db: Session = Depends(get_db) ):
    product = crud.get_product(db, fragrance_id, product_id)
    db.delete(product)
    db.commit();
    return { "success": True}

@router.put("/fragrances/{fragrance_id}/products/{product_id}")
async def update_fragrance_product(fragrance_id: int, product_id:int, product: schemas.ProductCreate,  db: Session = Depends(get_db) ):
    product = crud.update_fragrance_product(db, fragrance_id, product_id, product)
    return product;
