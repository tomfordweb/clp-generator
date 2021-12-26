from sqlalchemy import JSON, Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base


class Fragrance(Base):
    __tablename__ = "fragrances"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    supplier = Column(String, nullable=True)
    supplier_code = Column(String, nullable=True)

    products = relationship("Product", back_populates="fragrance", cascade="all, delete-orphan")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)
    pictograms = Column(JSON)
    mass = Column(String, nullable=True)

    fragrance_id = Column(Integer, ForeignKey("fragrances.id"))
    fragrance = relationship("Fragrance", back_populates="products")
