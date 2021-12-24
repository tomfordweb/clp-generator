from fastapi import FastAPI

from . import models
from .database import engine
from .routers import fragrances

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(fragrances.router)
