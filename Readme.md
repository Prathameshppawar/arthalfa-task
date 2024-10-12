# Arthalfa Task

Candidate name- Prathamesh Pawar
Github- https://github.com/Prathameshppawar
LinkedIn- https://www.linkedin.com/in/prathameshppawar/

## Description
This is a simple RESTful API for managing a list of products. The API allows users to create, update, delete, and fetch products. Each product has the following attributes:
- **id** (integer, auto-increment)
- **name** (string, required)
- **price** (float, required)
- **description** (string, optional)
- **category** (string, required)

## Features
- Add new products.
- Get a list of all products with optional pagination.
- Get product details by ID.
- Update existing products.
- Delete products by ID.
- Search for products by name.
- Sort products by price.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v12 or later)
- [MySQL](https://www.mysql.com/) (or your preferred database)
- [Sequelize](https://sequelize.org/) ORM

### Installation
1. Clone the repository:
   
   git clone <https://github.com/Prathameshppawar/arthalfa-task>
   

2. Install dependencies:
   
   npm install


3. Set up your database:
   - Create a MySQL database for the project.
   - Configure your database connection in `config/config.json`.

4. (Optional) Run migrations (if you have set up Sequelize migrations):
   
   npx sequelize-cli db:migrate


5. Start the server:

   npm start


### API Endpoints

#### 1. Add a New Product
- **POST** `/api/products`
- **Request Body**:
  Example json
  {
    "name": "Product Name",
    "price": 100.00,
    "description": "Optional product description",
    "category": "Product Category"
  }
  

#### 2. Get All Products (with Pagination)
- **GET** `/api/products?page=1&limit=10`
- **Query Parameters**:
  - `page`: Page number for pagination (default: 1)
  - `limit`: Number of products per page (default: 10)

#### 3. Get Product by ID
- **GET** `/api/products/:id`
- **URL Parameters**:
  - `id`: Product ID

#### 4. Update an Existing Product
- **PUT** `/api/products/:id`
- **Request Body**:
  
  {
    "name": "Updated Product Name",
    "price": 120.00,
    "description": "Updated product description",
    "category": "Updated Category"
  }
  

#### 5. Delete a Product
- **DELETE** `/api/products/:id`
- **URL Parameters**:
  - `id`: Product ID

#### 6. Search Products by Name
- **GET** `/api/products/search?name=productName`
- **Query Parameters**:
  - `name`: Name of the product to search for

#### 7. Sort Products by Price
- **GET** `/api/products/sort?order=asc|desc`
- **Query Parameters**:
  - `order`: Sort order (`asc` for ascending, `desc` for descending)

## Error Handling
The API returns appropriate HTTP status codes:
- **400 Bad Request**: Missing required fields or invalid data types.
- **404 Not Found**: Requested resource not found (e.g., product ID not found).
- **500 Internal Server Error**: Server-side errors.

## Conclusion
This task demonstrates the use of Node.js, Express.js, and Sequelize to build a simple product management API. 
It incorporates basic CRUD operations along with pagination and search features.
