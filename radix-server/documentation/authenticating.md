# Authenticating
Before reading this document, be sure to be familiar with a RESTful webservice tool such as Postman.

Once **radix-server** is up and running, you can attempt to hit http://localhost:9001/ and most likely see a result similar to the following:

```json
{"status":"UNAUTHORIZED","message":"Authentication failed","errorCode":10,"timestamp":1499826311606}
```

The response is delivered when a user is not authenticated using authentication details as defined by the code in **radix-server**.

## How to Authenticate
**radix-server** is secured using JWT Authentication standard. You can read more about JWT 
Authentication [here](https://jwt.io/introduction/).  

**1. Obtain a JWT Token**  

Make a ```POST``` request to http://localhost:9001/auth/login with the following JSON data:

```json
{
    "username": "a@a.com",
    "password": "password"
}
```

*NOTE: The credentials provided above must match user credentials as found in the database **radix-server** connects to.*

If done correctly, output similar to the following should be displayed:

```json
{
    "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhQGEuY29tIiwic2NvcGVzIjpbIlJPTEVfQURNSU4iXSwiaXNzIjoibG9jYWxob3N0IiwiaWF0IjoxNDk5ODI3MDY0LCJleHAiOjE0OTk4Mjc5NjR9.e31xQ1jAaso64qhMmdQV-4G_hwecBzU_nnwUy_kbIShN-FM3Jw8dSw13dubpmnVbXZKaMTDYYHgx6AHXAP3FtQ",
    "refreshToken":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhQGEuY29tIiwic2NvcGVzIjpbIlJPTEVfUkVGUkVTSF9UT0tFTiJdLCJpc3MiOiJsb2NhbGhvc3QiLCJqdGkiOiIzN2RmNzFkZS0wZjU5LTRkODktODkyZC0yZGFmMWQzZDcwMDIiLCJpYXQiOjE0OTk4MjcwNjQsImV4cCI6MTQ5OTgzNDI2NH0.EX973MzhdzZ_y_g1SI8Hb0WK9tAOplJCGqND-8g_fo-M_Lk1zkj5fhZ-K1Vjm6FSYZ2n-RmXhqUSE-VMEJd4BA"
}
```

**2. Make Requests using the JWT Token**  

All incoming requests to **radix-server** need to have the header ```X-Authorization``` added with a value of "*Bearer ${JWT_TOKEN}*" in order to successfully authenticate.  

Using the token retrieved from step 1, make a ```GET``` request to http://localhost:9001/ ensuring the ```X-Authorization``` header is set.  
e.g.:

```
X-Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhQGEuY29tIiwic2NvcGVzIjpbIlJPTEVfQURNSU4iXSwiaXNzIjoibG9jYWxob3N0IiwiaWF0IjoxNDk5ODI3MDY0LCJleHAiOjE0OTk4Mjc5NjR9.e31xQ1jAaso64qhMmdQV-4G_hwecBzU_nnwUy_kbIShN-FM3Jw8dSw13dubpmnVbXZKaMTDYYHgx6AHXAP3FtQ
```

You should see a response similar to the following:  

```json
{
  "_links" : {
    "applications" : {
      "href" : "http://localhost:9001/user-applications{?page,size,sort}",
      "templated" : true
    },
    "users" : {
      "href" : "http://localhost:9001/users{?page,size,sort}",
      "templated" : true
    },
    "profile" : {
      "href" : "http://localhost:9001/profile"
    }
  }
}
```  

**3. Obtaining a new JWT Token**  

JWT Tokens expire after a specified time. (see property **app.security.jwt.tokenExpirationTime** in ```src/main/resources/application.yml```)  

To obtain a new JWT Token, send a ```GET``` request to http://localhost:9001/auth/token with the ```X-Authorization``` header set to "*Bearer ${JWT_REFRESH_TOKEN}*".  
e.g.:

```
X-Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhQGEuY29tIiwic2NvcGVzIjpbIlJPTEVfUkVGUkVTSF9UT0tFTiJdLCJpc3MiOiJsb2NhbGhvc3QiLCJqdGkiOiIzN2RmNzFkZS0wZjU5LTRkODktODkyZC0yZGFmMWQzZDcwMDIiLCJpYXQiOjE0OTk4MjcwNjQsImV4cCI6MTQ5OTgzNDI2NH0.EX973MzhdzZ_y_g1SI8Hb0WK9tAOplJCGqND-8g_fo-M_Lk1zkj5fhZ-K1Vjm6FSYZ2n-RmXhqUSE-VMEJd4BA
```

You should see a response similar to the following with a new token:  

```json
{
    "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhQGEuY29tIiwic2NvcGVzIjpbIlJPTEVfQURNSU4iXSwiaXNzIjoibG9jYWxob3N0IiwiaWF0IjoxNDk5ODI4MjcyLCJleHAiOjE0OTk4MjkxNzJ9.IS6bWnwKA1QvRg1bcWlA9nXf9JJnMsmPMUGCqBxGifutUBI-jH93ChSNliZRXpKZYH7jdCbJ7uQ17Df1SCmzmA"
}
```

**4. Obtaining a new JWT Refresh Token**  

JWT Refresh Tokens also expire after a certain time (see property **app.security.jwt.refreshTokenExpTime** in ```src/main/resources/application.yml```)  

Obtain a new JWT Token and Refresh Token by going back to Step 1 and re-authenticating using user credentials.  
