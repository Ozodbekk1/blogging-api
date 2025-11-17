<!-- @format -->

# Blogging API

A RESTful API for a blogging platform built with Node.js, Express.js, and MongoDB. This API allows users to create accounts, post content, and interact with posts through comments.

## Postman collection

https://web.postman.co/workspace/backend-courses~96521b08-be54-4009-81e1-9c86aa937e18/collection/40851069-ce382e55-0d02-4d96-bbc9-454e6dee6451?action=share&source=copy-link&creator=40851069

## Features

- User management (create, read, update, delete users)
- Post management (create, read, update, delete posts)
- Comment system for posts
- MongoDB integration with Mongoose ODM
- CORS enabled for cross-origin requests
- Environment-based configuration

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd blogging-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   MONGO_DB_URL=mongodb://localhost:27017/blogging-api
   PORT=5000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. For production:
   ```bash
   npm start
   ```

The API will be running on `http://localhost:5000` (or the port specified in your `.env` file).

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Users

#### Create User

- **Method:** POST
- **Endpoint:** `/api/v1/create/user`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "userName": "johndoe",
    "email": "john@example.com"
  }
  ```
- **Response (201):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "...",
      "name": "John Doe",
      "userName": "johndoe",
      "email": "john@example.com",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```
- **Error (409):** User name or email already taken
- **Error (500):** Server error

#### Get All Users

- **Method:** GET
- **Endpoint:** `/api/v1/get/user`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "...",
        "name": "John Doe",
        "userName": "johndoe",
        "email": "john@example.com",
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
  }
  ```

#### Get User by ID

- **Method:** GET
- **Endpoint:** `/api/v1/get/user/:userId`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "...",
      "name": "John Doe",
      "userName": "johndoe",
      "email": "john@example.com",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```
- **Error (404):** User not found

#### Update User

- **Method:** PUT
- **Endpoint:** `/api/v1/update/user/:userId`
- **Body:**
  ```json
  {
    "name": "Jane Doe",
    "userName": "janedoe"
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "...",
      "name": "Jane Doe",
      "userName": "janedoe",
      "email": "john@example.com",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```

#### Delete User

- **Method:** DELETE
- **Endpoint:** `/api/v1/delete/user/:userId`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "...",
      "name": "John Doe",
      "userName": "johndoe",
      "email": "john@example.com",
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```
- **Error (404):** User not found

### Posts

#### Create Post

- **Method:** POST
- **Endpoint:** `/api/v1/create/post`
- **Body:**
  ```json
  {
    "user_id": "user_object_id",
    "content": "This is my first post!"
  }
  ```
- **Response (201):**
  ```json
  {
    "message": "Post created",
    "post": {
      "_id": "...",
      "user_id": "...",
      "content": "This is my first post!",
      "likes_count": 0,
      "comments": [],
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```
- **Error (400):** user_id and content are required
- **Error (404):** User not found

#### Get All Posts

- **Method:** GET
- **Endpoint:** `/api/v1/get/posts`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "...",
        "user_id": {
          "_id": "...",
          "name": "John Doe",
          "userName": "johndoe",
          "email": "john@example.com"
        },
        "content": "This is my first post!",
        "likes_count": 0,
        "comments": [],
        "createdAt": "...",
        "updatedAt": "..."
      }
    ]
  }
  ```

#### Get Post by ID

- **Method:** GET
- **Endpoint:** `/api/v1/get/post/:postId`
- **Response (200):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "...",
      "user_id": {
        "_id": "...",
        "name": "John Doe",
        "userName": "johndoe",
        "email": "john@example.com"
      },
      "content": "This is my first post!",
      "likes_count": 0,
      "comments": [
        {
          "_id": "...",
          "user_id": "...",
          "username": "johndoe",
          "text": "Great post!",
          "created_at": "..."
        }
      ],
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```
- **Error (404):** Post not found

#### Update Post

- **Method:** PUT
- **Endpoint:** `/api/v1/update/post/:postId`
- **Body:**
  ```json
  {
    "content": "Updated post content"
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "data": {
      "_id": "...",
      "user_id": "...",
      "content": "Updated post content",
      "likes_count": 0,
      "comments": [],
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```
- **Error (400):** Content must contain or post ID incorrect

#### Delete Post

- **Method:** DELETE
- **Endpoint:** `/api/v1/delete/post/:postId`
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Post deleted successfully"
  }
  ```
- **Error (404):** Post not found

### Comments

#### Add Comment to Post

- **Method:** POST
- **Endpoint:** `/api/v1/addComment/postId/:postId`
- **Body:**
  ```json
  {
    "user_id": "user_object_id",
    "username": "johndoe",
    "text": "This is a comment"
  }
  ```
- **Response (201):**
  ```json
  {
    "message": "comment added",
    "post": {
      "_id": "...",
      "user_id": "...",
      "content": "This is my first post!",
      "likes_count": 0,
      "comments": [
        {
          "_id": "...",
          "user_id": "...",
          "username": "johndoe",
          "text": "This is a comment",
          "created_at": "..."
        }
      ],
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```
- **Error (404):** Post not found

#### Delete Comment from Post

- **Method:** DELETE
- **Endpoint:** `/api/v1/deleteComment/postId/:postId/commentId/:commentId`
- **Response (200):**
  ```json
  {
    "success": true,
    "message": "Comment deleted permanently"
  }
  ```
- **Error (404):** Post not found or Comment not found

## Data Models

### User Model

```javascript
{
  name: String (required),
  userName: String (required, unique),
  email: String (required, unique),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model

```javascript
{
  user_id: ObjectId (ref: 'User', required),
  content: String (required),
  likes_count: Number (default: 0),
  comments: [
    {
      user_id: ObjectId (ref: 'User', required),
      username: String (required),
      text: String (required),
      created_at: Date (default: Date.now)
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Examples

### Using cURL

Create a user:

```bash
curl -X POST http://localhost:5000/api/v1/create/user \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","userName":"johndoe","email":"john@example.com"}'
```

Get all posts:

```bash
curl http://localhost:5000/api/v1/get/posts
```

Create a post:

```bash
curl -X POST http://localhost:5000/api/v1/create/post \
  -H "Content-Type: application/json" \
  -d '{"user_id":"user_object_id","content":"Hello World!"}'
```

Add a comment:

```bash
curl -X POST http://localhost:5000/api/v1/addComment/postId/post_object_id \
  -H "Content-Type: application/json" \
  -d '{"user_id":"user_object_id","username":"johndoe","text":"Nice post!"}'
```

## Dependencies

- **express:** Web framework for Node.js
- **mongoose:** MongoDB object modeling
- **cors:** Cross-origin resource sharing
- **dotenv:** Environment variable management
- **mongodb:** MongoDB driver

## Development Dependencies

- **nodemon:** Automatic server restart during development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
