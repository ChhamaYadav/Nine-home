CREATE TABLE IF NOT EXISTS products(
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2),
    image_url VARCHAR(255),
    color VARCHAR(50),
    quantity INT
);