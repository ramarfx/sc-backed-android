# API BELGRAM (BELA NEGARA SOCIAL MEDIA)
aplikasi sosial media sederhana sebagai tugas akhir kelas backend basic di ksm Android

## Cara Menjalankan Server

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## API Reference

### Register
Untuk melakukan registrasi pada user

```http
  POST /register
```
#### body
```json
{
  "username": "rama",
  "email": "contoh@gmail.com",
  "password": "myPassword" 
}
```

### Login
untuk melakukan login menggunakan username dan password yang telah di buat tadi. Hasil dari login akan menghasilkan **token** yang akan digunakan sebagai authorization melalui header Bearer token

```http
  POST /login
```

#### body
```json
{
  "email": "contoh@gmail.com",
  "password": "myPassword" 
}
```

#### Output
```json
{
    "message": "User logged in successfully",
    "data": {
        "username": "rama",
        "email": "rama@gmail.com",
        "token": "c096ea3a-ebf2-4919-a6ee-a6eead88eedf"
    }
}
```

### Logout
untuk user ketika ingin logout dengan menghapus token yang telah ter-generate tadi sehingga token akan menjadi invalid dan tidak bisa digunakan lagi 

```http
  POST /logout
```

### Authorization
Untuk mengakses endpoint yang memerlukan akses login, sertakan token pada header

```http
  Authorization: Bearer {token}
```
contoh:
```http
  Authorization: Bearer c096ea3a-ebf2-4919-a6ee-a6eead88eedf
```

### USER ENDPOINT

#### Get Current User
melihat data user yang sedang login saat ini
```http
  GET /me
```

#### Get All User
melihat seluruh data user
```http
  GET /users
```

#### Get User By Username
Mencari data user berdasarkan username
```http
  GET /users/{username}
```

#### Follow
merupakan endpoint untuk men-follow user melalui parameter username tujuan
```http
  GET /users/{username}/follow
```

#### Unfollow
merupakan endpoint untuk men-unfollow user melalui parameter username tujuan
```http
  GET /users/{username}/unfollow
```


### POST ENDPOINT

#### Get All Posts
melihat semua postingan
```http
  GET /posts
```
#### Get Post by id
melihat postingan berdasarkan id
```http
  GET /posts/{id}
```

#### Create Post
Menambahkan postingan baru
```http
  POST /posts
```
body: 
```json
{
    "title": "judul",
    "content": "lorem ipsum dolor sit amet"
}
```

#### Update Post
Mengubah postingan
```http
  PUT /posts/{id}
```
body: 
```json
{
    "title": "judul edit",
    "content": "lorem ipsum dolor sit amet amit"
}
```

#### Delete Post
Menghapus postingan
```http
  DELETE /posts/{id}
```
