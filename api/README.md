# Library Book Management API

This is a simple API system for managing books in a library. The system provides 5 endpoints for creating, updating, deleting and retrieving books.

## Installation

1. Install Java 13 or higher version
2. From the jar directory, run:

   ```bash
   java -jar demo-0.0.1-SNAPSHOT.jar
   ```

3. Wait for the application to start.

Note: The application uses an in-memory database. Data persists only while the application is running. Stopping the application will clear all data, so create your test data before testing.

## Access

The application will be available at: `http://localhost:7081`

## Authentication

Two users are available:

- Username: `admin` (full access to all APIs)
- Username: `user` (access to POST and GET APIs only)
- Password: `password` (same for both users)

## API Endpoints

### Get All Books

```http
GET /api/books
Authorization: Basic <credentials>
```

### Get Book by ID

```http
GET /api/books/{id}
Authorization: Basic <credentials>
```

### Create Book

```http
POST /api/books
Authorization: Basic <credentials>
Content-Type: application/json

{
    "id": integer,      // optional
    "title": "string",  // required
    "author": "string"  // required
}
```

### Update Book

```http
PUT /api/books/{id}
Authorization: Basic <credentials>
Content-Type: application/json

{
    "id": integer,      // required
    "title": "string",  // required
    "author": "string"  // required
}
```

### Delete Book

```http
DELETE /api/books/{id}
Authorization: Basic <credentials>
```

Note: All endpoints require Basic Authentication using the credentials provided in the Authentication section.

## Response Codes

| Status Code | Description                            |
| ----------- | -------------------------------------- |
| 200         | Success - Book updated/deleted         |
| 201         | Success - Book created                 |
| 400         | Bad Request - Invalid/empty parameters |
| 401         | Unauthorized - Authentication required |
| 403         | Forbidden - Insufficient permissions   |
| 404         | Not Found - Book doesn't exist         |

**Note:** All responses will be returned in JSON format with appropriate HTTP status codes.

### Example Error Response

```json
{
  "timestamp": "2024-03-21T10:15:30.123Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Invalid book parameters",
  "path": "/api/books"
}
```
