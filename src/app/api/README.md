# API Documentation

## Welcome Endpoint

**Method** : `GET`

**URL** : `/api`

**Response** :

- **_Status_** : `200 OK`
- **_Body_** :
  ```json
  {
    "msg": "Welcome to Zigbee Backend"
  }
  ```

## Check User Registration

**Method** : `POST`

**URL** : `/api/check-user`

**Request Body** :

- **_Content-Type_** : `application/json`

- **_Body_** :

  ```json
  {
    "email": "user@example.com"
  }
  ```

**Response** :

- **_Status_** : `200 OK`

  **_Body_** :

  ```json
  {
    "isRegistered": true
  }
  ```

- **_Status_**: `400 Bad Request` (if email is missing or invalid)
  ```json
  null
  ```
- **_Status_**: `500 Internal Server Error` (if there is a server-side error)
  ```json
  null
  ```

## Send OTP

**Method** : `POST`

**URL** : `/api/sendotp`

**Request Body** :

- **_Content-Type_** : `application/json`

- **_Body_** :

  ```json
  {
    "email": "user@example.com"
  }
  ```

**Response** :

- **_Status_**: `200 OK` (OTP sent successfully)

  ```json
  null
  ```

- **_Status_**: `400 Bad Request`(if email is missing or invalid)

  ```json
  null
  ```

- **_Status_**: `422 Unprocessable Entity` (if OTP could not be sent)

  ```json
  null
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  ```json
  null
  ```

## Verify OTP

**Method**: `POST`

**URL**: `/api/verifyotp`

**Request Body**:

- **_Content-Type_**: `application/json`
- **_Body_**:
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```

**Response**:

- **_Status_**: `200 OK` (OTP verified successfully)

  ```json
  {
    "isProvidedBasicData": true
  }
  ```

- **_Status_**: `400 Bad Request` (if email or otp is missing or invalid, or OTP length is incorrect)
  ```json
  null
  ```
- **_Status_**: `403 Forbidden` (if OTP verification failed)
  ```json
  null
  ```
- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  ```json
  null
  ```

**Cookies**:

A `token` cookie will be set on successful verification with the value of `Bearer <token>`, and it's marked as `httpOnly`.
