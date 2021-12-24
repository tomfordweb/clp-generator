import os
from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session

from . import crud
from .database import SessionLocal, engine


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
