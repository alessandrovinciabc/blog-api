# Blog API

## Description

This API lets you CRUD posts which consist of a title and some content in [Editor.js's](https://editorjs.io/) JSON format. Auth in the form of a JWT is required for DELETE, POST and PUT methods (except for comments, which can be posted freely).

I use this API in 2 separate front-ends:

- [Summer Blog](https://github.com/alessandrovinciabc/summer-blog) for end users to view and use;
- [Summer Blog Admin](https://github.com/alessandrovinciabc/summer-blog-admin) for administration purposes.

Live version (which enables CORS only for certain origins):

```
https://summer-blog-api.herokuapp.com/
```

## Endpoints

1. Use the login endpoint to get your JWT.

1. The 'test' endpoint lets you check if your token is valid.

1. Make your request on the 'blog' endpoints. Be sure to add your JWT in the [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) header as a **Bearer** token. (only for DELETE, POST and PUT methods)

```
POST /auth/login username=abc&password=123
POST /auth/test (provide JWT in Authorization header)
```

```
/blog/post
/blog/post/:postid

GET /blog/post
POST /blog/post title=wow&json=...
PUT /blog/post/:postid title=wow&json=...
DELETE /blog/post/:postid
```

```
GET /blog/post/:postid/comment
POST /blog/post/:postid/comment

GET /blog/post/:postid/comment/:commentid
DELETE /blog/post/:postid/comment/:commentid
PUT /blog/post/:postid/comment/:commentid
```
