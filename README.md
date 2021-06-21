# Blog API

## Summary

This API lets you CRUD posts which consist of a title and some HTML content. The HTML content gets sanitized before storage with [xss](https://www.npmjs.com/package/xss). Auth in the form of a JWT is required for DELETE, POST and PUT methods (except for comments, which can be posted freely).

Live version:

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

POST /blog/post title=wow&html=...
PUT /blog/post/:postid title=wow&html=...
```

```
GET /blog/post/:postid/comment
POST /blog/post/:postid/comment

GET /blog/post/:postid/comment/:commentid
DELETE /blog/post/:postid/comment/:commentid
PUT /blog/post/:postid/comment/:commentid
```
