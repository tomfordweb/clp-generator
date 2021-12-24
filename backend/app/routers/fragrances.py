from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..dependencies import get_db

router = APIRouter()

@router.post("/fragrances")
async def create_fragrance(fragrance: schemas.FragranceCreate,  db: Session = Depends(get_db) ):
    fragrance = crud.create_fragrance(db, fragrance)
    return fragrance

@router.get("/fragrances")
async def get_fragrance_list(db: Session = Depends(get_db) ):
    fragrance = crud.get_fragrances(db)
    return fragrance


@router.post("/fragrances/{fragrance_id}/products")
async def create_product(fragrance_id: int, product: schemas.ProductCreate,  db: Session = Depends(get_db) ):
    fragrance = crud.get_fragrance(db, fragrance_id)

    fragranceProduct = crud.create_fragrance_product(db, product, fragrance)

    return fragranceProduct;

@router.get("/fragrances/{fragrance_id/products")
async def get_fragrance_products_list(fragrance_id: int, db: Session = Depends(get_db) ):
    fragrance = crud.get_fragrance(db, fragrance_id)

    if not fragrance:
        raise HTTPException(
            status_code=422,
            detail="Fragrance does not exist"
        )

    return fragrance.products
