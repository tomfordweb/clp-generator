import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from .. import models
from ..database import Base
from ..dependencies import get_db
from ..main import app

SQLALCHEMY_DATABASE_URL = "sqlite:///testing_db.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


models.Base.metadata.create_all(bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture
def truncate_database():
    session = TestingSessionLocal()
    session.execute('''DELETE FROM fragrances''')
    session.execute('''DELETE FROM products''')
    session.commit()
    session.close()


def test_create_fragrance(truncate_database):
    response = client.post(
        "/fragrances",
        json={"name":"New car scent"},
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert "id" in data
    assert "New car scent" in response.text


def test_create_fragrance_product_and_get_list(truncate_database):
    response = client.post(
        "/fragrances",
        json={"name":"New car scent"},
    )
    assert response.status_code == 200, response.text
    data = response.json()
    fragrance_id = data.get('id')
    assert "id" in data
    assert "New car scent" in response.text

    response = client.post(
        f"/fragrances/{fragrance_id}/products",
        json={"name":"My Product", "description": "foobar"},
    )

    assert response.status_code == 200, response.text
    data = response.json()
    assert "id" in data
    assert "My Product" in response.text

    print(fragrance_id)

    response = client.get(
        f"/fragrances/{fragrance_id}/products"
    )
    print(response.text)
    assert response.status_code == 200, response.text

    assert "My Product" in response.text

def test_you_can_update_a_fragrance(truncate_database):
    response = client.post(
        "/fragrances",
        json={"name":"New car scent"},
    )
    assert response.status_code == 200, response.text
    data = response.json()
    fragrance_id = data.get('id')
    assert "id" in data
    assert "New car scent" in response.text
    response = client.put(
        f"/fragrances/1",
        json={"name":"Newer car scent", "supplier": "craig", "supplier_code": "tom123"},
    )
    assert response.status_code == 200, response.text
    assert "Newer car scent" in response.text
    assert "craig" in response.text
    assert "tom123" in response.text



def test_you_can_update_a_product(truncate_database):
    response = client.post(
        "/fragrances",
        json={"name":"New car scent"},
    )
    assert response.status_code == 200, response.text
    data = response.json()
    fragrance_id = data.get('id')
    assert "id" in data
    assert "New car scent" in response.text
    response = client.post(
        f"/fragrances/{fragrance_id}/products",
        json={"name":"Cooking Spray", "description": "foobar"},
    )
    assert response.status_code == 200
    assert "Cooking Spray" in response.text
    assert "foobar" in response.text
    data = response.json()
    product_id = data.get('id')
    response = client.put(
        f"/fragrances/{fragrance_id}/products/{product_id}",
        json={"name":"Diffuser", "description": "barbaz", "pictograms": [1,2], "mass": "ive"},
    )
    assert response.status_code == 200
    assert "Diffuser" in response.text
    assert "barbaz" in response.text

def test_you_can_delete_a_fragrance(truncate_database):
    response = client.post(
        "/fragrances",
        json={"name":"New car scent"},
    )
    assert response.status_code == 200
    data = response.json()
    fragrance_id = data.get('id')
    assert "id" in data
    assert "New car scent" in response.text


    response = client.get(
        f"/fragrances/{fragrance_id}",
    )
    assert response.status_code == 200

    response = client.delete(
        f"/fragrances/{fragrance_id}"
    )
    assert response.status_code == 200

    response = client.get(
        f"/fragrances/{fragrance_id}",
    )
    assert response.status_code == 404
    pass

def test_you_can_delete_a_product(truncate_database):
    response = client.post(
        "/fragrances",
        json={"name":"New car scent"},
    )
    assert response.status_code == 200
    data = response.json()
    fragrance_id = data.get('id')
    assert "id" in data
    assert "New car scent" in response.text
    response = client.post(
        f"/fragrances/{fragrance_id}/products",
        json={"name":"Cooking Spray", "description": "foobar"},
    )
    data = response.json()
    product_id = data.get('id')
    assert response.status_code == 200
    assert "Cooking Spray" in response.text

    response = client.get(
        f"/fragrances/{fragrance_id}/products/{product_id}",
    )
    assert response.status_code == 200
    response = client.delete(
        f"/fragrances/{fragrance_id}/products/{product_id}",
    )
    assert response.status_code == 200

    response = client.get(
        f"/fragrances/{fragrance_id}/products/{product_id}",
    )
    assert response.status_code == 404
