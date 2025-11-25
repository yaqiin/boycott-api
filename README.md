# Boycott API

Backend API providing data about alternatives to non-ethical products.

## Installation

```bash
npm install
npm start
```

Server runs on `http://localhost:3000` (or `PORT` env variable).

## API Endpoints

### GET /products

Get products with pagination and filters.

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category_id` - Filter by category (e.g., `tech`, `food-drinks`, `clothing`)
- `country` - Filter by country code (e.g., `US`, `IL`)

**Headers:**
- `Accept-Language` - Language code (ar, bn, en, es, fr, id, tr, ur)

### GET /categories

Get all product categories. Uses `Accept-Language` header for translation.

### GET /why-boycott

Get educational content about boycotting. Uses `Accept-Language` header for translation.

### GET /health

Health check endpoint.
