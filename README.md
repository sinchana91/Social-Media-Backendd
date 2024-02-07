# Social Media Platform

## Description
A social media platform where users can connect, share posts, send messages, and more.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication:**
  - Register a new user.
  - Log in a user and receive a JWT token.

- **Posts:**
  - Get all posts.
  - Create, update, and delete posts.
  - Like and comment on posts.

- **Messages:**
  - Get all messages between users.
  - Send messages to other users.

- **Relationships:**
  - Follow and unfollow other users.

- ...

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/social-media-platform.git
Install dependencies:

bash
Copy code
cd social-media-platform
npm install
Set up environment variables:
Create a .env file in the project root and add the following variables:

env
Copy code
PORT=3000
SECRET_KEY=your-secret-key
DATABASE_URI=mongodb://localhost:27017/social-media-db
Usage
Start the server:

bash
Copy code
npm start
Access the application:
Visit http://localhost:3000 (or the specified port) in your web browser.

Endpoints
User Authentication:

POST /api/user/register: Register a new user.
POST /api/user/login: Log in a user and receive a JWT token.
Posts:

GET /api/posts: Get all posts.
POST /api/posts: Create a new post.
GET /api/posts/:postId: Get a specific post.
PUT /api/posts/:postId: Update a post.
DELETE /api/posts/:postId: Delete a post.
POST /api/posts/:postId/like: Like a post.
POST /api/posts/:postId/comment: Add a comment to a post.
Messages:

GET /api/messages/:userId: Get all messages between the authenticated user and the specified user.
POST /api/messages/:userId: Send a message to the specified user.
Relationships:

POST /api/relationships/:userId/follow: Follow a user.
POST /api/relationships/:userId/unfollow: Unfollow a user.
...

Environment Variables
PORT: Port number for the server.
SECRET_KEY: Secret key for JWT token generation.
DATABASE_URI: URI for connecting to the MongoDB database.
