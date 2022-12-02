# Project-BE


# Api documentation

### A. Register akun
user

- Method : POST
- Endpoint : /user/register
- Body :

```
{
  "nama": "guntur",
  "email": "guntur@gmail.com",
  "password" : "123123",
  "phone" : "082231420325",
  "role" : "user"
}
```
  
- Response jika berhasil:

```
{
  "status": 201,
  "message": "akun berhasil dibuat"
}
```

- response jika gagal : 

```
{
  "message":"server error"
}
```

register dokter

- Method: POST
- Endpoint: /user/register
- Body:

```
{
  "nama": "rifai",
  "email": "rifai@gmail.com",
  "password" : "123123",
  "phone" : "082231420323",
  "role" : "dokter"
}
```

- Response jika berhasil:

```
{
  "status": 201,
  "message": "akun berhasil dibuat"
}
```


response jika gagal : 

```
{
  "message":"server error"
}
```

### B. Login User & dokter
user

- method : POST
- Endpoint: /user/login
- HTTP Header :
- Body : 
```
{
  "email": "string",
  "password" : "string"
}
```
- Response jika berhasil:
```
{
    "message": "Sukses Login!"
}
```
response jika gagal: 

```
{
   "message":"user tidak di temukan"
}
```

dokter
- method : POST
- Endpoint: /user/login
- HTTP Header :
- Body :
```
{
  "email": "string",
  "password" : "string"
}
```
- Response jika berhasil:
```
{
    "message": "Sukses Login!"
}
```
response jika gagal: 

```
{
  "message":"user tidak di temukan"
}
```

### C. Get user & dokter 
user 
- method : GET
- Endpoint: /user/proile
- HTTP Header:
- Response berhasil:

```
{
  "status": 200,
  "message": "user ditemukan",
  "data": {
    "_id": "6389cd398cd4761d00f527a8",
    "nama": "guntur",
    "email": "guntur@gmail.com",
    "phone": "082231420325",
    "role": "user",
    "__v": 0
  }
}
```

response jika gagal : 

```
{
  "status": 403,
  "message": "user tidak memiliki akses"
}
```
Dokter
- method : GET
- Endpoint: /user/proile
- HTTP Header:
- Response berhasil:

```
{
  "status": 200,
  "message": "user ditemukan",
  "data": {
    "_id": "6389cd5b8cd4761d00f527ab",
    "nama": "rifai",
    "email": "rifai@gmail.com",
    "phone": "082231420335",
    "role": "dokter",
    "__v": 0
  }
}
```

response jika gagal : 

```
{
  "status": 403,
  "message": "user tidak memiliki akses"
}
```

### D. Update User & dokter
User
- Login user
- Method : PUT
- Endpoint: /user/profile
- HTTP Header:
  - user-token: `token`

- Body : 
```
{ 
    "nama" : "guntur update",
    "email": "guntur1@gmail.com"
}

```  
- Response jika berhasil:

```
{
  "status": 201,
  "message": "profil berhasil diperbarui"
}
```

response jika gagal : 

```
{
  "message":"server error"
}
```
Dokter 

 Login dokter
- Method : PUT
- Endpoint: /user/profile
- HTTP Header:
  - user-token: `token`

- Body : 
```
{ 
    "name" : "rifai update"
}

```  
- Response jika berhasil:

```
{
  "status": 201,
  "message": "profil berhasil diperbarui"
}
```

response jika gagal : 

```
{
  "message":"server error"
}
```


### A. Get All Article

Serves to get all article

- method : GET
- Endpoint: /article/
- HTTP Header :
- Response succes :

```
{
  "message": "Get Articles Data",
  "data": [
    {
      "_id": "6378795e50e560be09601f89",
      "title": "Article Pertama",
      "category": "Lifestyle",
      "content": "Self-diagnosis adalah asumsi yang menyatakan bahwa seseorang terkena suatu penyakit berdasarkan pengetahuannya sendiri. Self-diagnosis sangat membahayakan kesehatan seseorang apabila salah dalam mengambil metode pengobatan dan mengonsumsi obat yang salah. Selain membahayakan kesehatan, Self-diagnosis juga dapat mempengaruhi kesehatan mental yang menyebabkan kecemasan berlebihan.",
      "writter": {
        "_id": "6389cd5b8cd4761d00f527ab",
        "name": "rifa"
      }
    }
  ]
}
```

- response failed : 

```
{
  "message":"server error"
}
```

### B. Get Article By ID

Serves to get article by ID

- method : GET
- Endpoint: article/:id
- HTTP Header:
- Response succes :

```
{
  "message": "You Searched for",
  "data": {
    "_id": "637848ffc071a69fa600c91c",
    "title": "first art",
    "category": "Healthy Food",
    "content": "Self-diagnosis adalah asumsi yang menyatakan bahwa seseorang terkena suatu penyakit berdasarkan pengetahuannya sendiri. Self-diagnosis sangat membahayakan kesehatan seseorang apabila salah dalam mengambil metode pengobatan dan mengonsumsi obat yang salah. Selain membahayakan kesehatan, Self-diagnosis juga dapat mempengaruhi kesehatan mental yang menyebabkan kecemasan berlebihan.",
    "writter": {
      "_id": "6389cd5b8cd4761d00f527ab",
      "name": "updated name"
    }
  }
}
```
- response failed : 

```
{
  "message":"server error"
}
```

### C. Update Article By ID

Serves to update article by ID

- Login by doctor first
- Article only can updated by the writter himself
- Method : PATCH
- Endpoint: article/:id
- HTTP Header:
  - doctor-token: `token`
- Body : 
```
{
  "title" : "updated title"
}

```  
- Response succes :

```
 {
  "message": "Article Updated!",
  "data": {
    "_id": "637848ffc071a69fa600c91c",
    "title": "updated title",
    "category": "Healthy Food",
    "content": "Self-diagnosis adalah asumsi yang menyatakan bahwa seseorang terkena suatu penyakit berdasarkan pengetahuannya sendiri. Self-diagnosis sangat membahayakan kesehatan seseorang apabila salah dalam mengambil metode pengobatan dan mengonsumsi obat yang salah. Selain membahayakan kesehatan, Self-diagnosis juga dapat mempengaruhi kesehatan mental yang menyebabkan kecemasan berlebihan.",
    "writter": {
      "_id": "66389cd5b8cd4761d00f527ab",
      "name": "updated name"
    }
  }
}
```
- response failed : 

```
{
  "message":"server error"
}
```

### D. Delete Article By ID

Serves to deleted article by ID

- Login by doctor first
- Article only can deleted by the writter himself
- Method : DELETE
- Endpoint: article/:id
- HTTP Header:
  - doctor-token: `token`
- Response succes :
```
{
  "message": "Article Deleted!"
}
```

- response failed : 

```
{
  "message":"server error"
}


### E. Add Article
```
serves to add article
- Login sebagai dokter terlebih dahulu
- Method : POST
- Endpoint : /article/add
- HTTP Header : 
- Body : 

```
{
  "title":"kesehatan mental remaja",
  "category":"kesehatan mental",
  "content":"kesehatan mental sangat penting ......",
  "writer":"rifai"
}
```
- Writter ID is auto fill from doctor-token 

- Response jika berhasil
```
{
  "message": "Add Article Succes!",
  "data": {
    "title": "kesehatan mental remaja",
    "category": "kesehatan mental",
    "content": "kesehatan mental sangat penting ......",
    "_id": "6389cd5b8cd4761d00f527ab"
  }
}
```