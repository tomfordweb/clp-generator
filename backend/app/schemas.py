from typing import List, Optional

from pydantic import BaseModel, validator


class FragranceBase(BaseModel):
    name: str
    supplier: Optional[str] = None
    supplier_code: Optional[str] = None

class FragranceCreate(FragranceBase):
    pass

class Fragrance(FragranceBase):
    id: int

    class Config:
        orm_mode = True

class ProductBase(BaseModel):
    name: str
    description: str
    custom_name: Optional[str] = None
    pictograms: Optional[List[str]] = []
    mass: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    name: str
    custom_name: str
    description: str
    fragrance_id: int

    class Config:
        orm_mode = True
