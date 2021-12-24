from typing import List, Optional

from pydantic import BaseModel, validator


class FragranceBase(BaseModel):
    name: str

class FragranceCreate(FragranceBase):
    pass

class Fragrance(FragranceBase):
    id: int
    name: str

    class Config:
        orm_mode = True

class ProductBase(BaseModel):
    name: str

class ProductCreate(FragranceBase):
    pass

class Product(FragranceBase):
    id: int
    name: str

    fragrance_id: int

    class Config:
        orm_mode = True
