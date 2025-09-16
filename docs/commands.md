psql --version
Start PostgreSQL shell: psql -U postgres
Change directory : \c pixieglitz


INSERT INTO users (name, email, password, role)
VALUES ('Admin User', 'admin@pixieglitz.com', 'admin', 'admin');

INSERT INTO products (name, description, price, stock)
VALUES 
('Necklace', 'Gold plated stylish necklace', 1200.50, 10),
('Earrings', 'Silver earrings with stones', 750.00, 20);
Email : admin@pixieglitz.com
Password :admin


{
    "id": 2,
    "name": "Admin User",
    "email": "admin@pixiglitz.com",
    "role": "admin"
}
{
  "name": "Admin User",
  "email": "admin@pixieglitz.com",
  "password": "admin",
  "role": "admin"
}
{
    "id": 4,
    "name": "Admin User",
    "email": "admin@pixie.com",
    "role": "admin"
    toaken ::25311c71-1bcf-4289-93d1-3698bf1ee8b4

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzU4MDU1MjA2LCJleHAiOjE3NTgwNTg4MDZ9.fBCBsAA8kCI9kmpYZnOi16lwTuf1F1ZBICu4c1Soc5Y",
    "user": {
        "id": 4,
        "name": "Admin User",
        "role": "admin"
    }
}

}