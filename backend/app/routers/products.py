from fastapi import APIRouter, Depends
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
