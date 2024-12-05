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

---

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

---

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

---

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

---

## Fetch Alumni

**Method**: `GET`

**URL**: `/api/alumni`

**Request Headers**:

- **_Authentication_**:
  -A valid `token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.
- Don't worry, while verifying OTP and email, this cookie will be added automatically.

**Response**:

- **_Status_**: `200 OK` (Successfully fetched the list of alumni)

  **_Body_**:

  ```json
  [
    {
      "id": "Es2a5CmUYh3wkxBmpYCP",
      "name": "Demo User 19",
      "position": "PV",
      "domain": "",
      "about": "",
      "batch": 2023,
      "linkedInUrl": "https://www.linkedin.com/in/profile/",
      "profileImg": "https://example.vercel.app/photo.jpg",
      "isContributor": false
    },
    {
      "id": "NYv9A2tGXwPfCmaVs7OE",
      "name": "Demo User",
      "position": "PC",
      "domain": "Web Developer",
      "about": "string",
      "batch": 2023,
      "linkedInUrl": "https://www.linkedin.com/in/profile/",
      "profileImg": "https://example.vercel.app/photo.jpg",
      "isContributor": true
    }
  ]
  ```

- **_Status_**: `401 Unauthorized` (if the token is missing, invalid, or expired)

  **_Body_**:

  ```json
  {
    "error": "Unauthorized: No token provided",
    "success": false
  }
  ```

- **_Status_**: `403 Forbidden` (if the token does not contain a valid user ID)

  **_Body_**:

  ```json
  {
    "error": "Unauthorized: Token does not contain a valid user ID",
    "success": false
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  null
  ```

---

## Fetch Contributors

**Method**: `GET`

**URL**: `/api/team`

**Response**:

- **_Status_**: `200 OK` (Successfully fetched the list of contributors)

  **_Body_**:

  ```json
  [
    {
      "id": "NYv9A2tGXwPfCmaVs7OE",
      "name": "Demo User",
      "position": "PC",
      "domain": "Web Developer",
      "about": "string",
      "batch": 2023,
      "linkedInUrl": "https://www.linkedin.com/in/profile/",
      "profileImg": "https://example.vercel.app/photo.jpg",
      "isContributor": true
    },
    {
      "id": "NYv9A2tGXwPfCmaVs7OE",
      "name": "Demo User 2",
      "position": "CR",
      "domain": "Web Developer",
      "about": "string",
      "batch": 2024,
      "linkedInUrl": "https://www.linkedin.com/in/profile/",
      "profileImg": "https://example.vercel.app/photo.jpg",
      "isContributor": true
    }
  ]
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  null
  ```

---

## Get Users (Admin Only)

**Method**: `GET`

**URL**: `/api/users`

**Request Headers**:

- **_Authentication_**: A valid `token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.

**Request Query Parameters**:

- **_role_** (optional): Filter users by role.
- **_batch_** (optional): Filter users by batch.

**Response**:

- **_Status_**: `200 OK` (Successfully fetched the list of users)

  **_Body_**:

  ```json
  [
    {
      "id": "RmfbrU5gkwt57rQApBfl",
      "about": "",
      "isContributor": true,
      "position": "CR",
      "domain": "Web Developer",
      "role": "admin",
      "email": "demo@gmail.com",
      "linkedInUrl": "https://www.linkedin.com/in/profile/",
      "profileImg": "https://example.vercel.app/photo.jpg",
      "name": "Demo user",
      "phoneNumber": "0123456788",
      "batch": 2025
    },
    {
      "id": "RmfbrUafde57rQApBfl",
      "about": "",
      "isContributor": true,
      "position": "CR",
      "domain": "Web Developer",
      "role": "guest",
      "email": "demo@gmail.com",
      "linkedInUrl": "https://www.linkedin.com/in/profile/",
      "profileImg": "https://example.vercel.app/photo.jpg",
      "name": "Demo user 2",
      "phoneNumber": "0123456788",
      "batch": 2028
    }
  ]
  ```

- **_Status_**: `401 Unauthorized` (if the token is missing, invalid, or expired)

  **_Body_**:

  ```json
  {
    "error": "Unauthorized: No token provided",
    "success": false
  }
  ```

- **_Status_**: `403 Forbidden` (if the token does not contain a valid user ID or the user is not an admin)

  **_Body_**:

  ```json
  {
    "error": "Forbidden: Admins only",
    "success": false
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  null
  ```

---

## Create or Update User Details

**Method**: `POST`

**URL**: `/api/users`

1. **Authenticate users** to update their own profile.
2. **Allow admins** to create a new user.

**Request Headers**:

- **_Authentication_**: A valid `token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.

**Request Body:**

```json
{
  "name": "string", // (Required) Full name of the user.
  "batch": "string", // (Required) User's batch.
  "linkedInUrl": "string", // (Required) LinkedIn profile URL of the user.
  "profileImg": "string", // (Required) URL to the user's profile image.
  "domain": "string", // (Optional) The user's domain/area of expertise.
  "phoneNumber": "string", // (Optional) User's phone number.
  "about": "string", // (Optional) Short description about the user.

  // admin only
  "position": "string", // (Optional) User's position (CR, GR, PC).
  "role": "string", // (Optional) User's role (e.g., 'admin', 'guest', 'alumni).
  "isContributor": "boolean" // (Optional) Indicates whether the user is a contributor.
}
```

**Response**:

- **_Status_**: `200 OK` (User data updated successfully)

  **_Body_**:

  ```json
  null
  ```

- **_Status_**: `400 Bad Request` (if required fields like name, batch, LinkedIn URL, or Profile Image are missing)

  **_Body_**:

  ```json
  {
    "error": "Name, Batch, LinkedIn URL and Profile Image are required."
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  null
  ```

---

## Get User Details by ID

**Method**: `GET`

**URL**: `/api/users/:id`

- **_Authentication_**: A valid `token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.

**Request Parameters**:

- **`id`**: The ID of the user whose details are being fetched.

**Response**:

- **_Status_**: `200 OK` (User details fetched successfully)

  **_Body_**:

  ```json
  {
    "result": {
      "role": "admin",
      "email": "pkmanas22@gmail.com",
      "name": "Manas Kumar Pradhan",
      "position": "",
      "phoneNumber": "0123456788",
      "batch": 2028,
      "linkedInUrl": "https://www.linkedin.com/in/profile/",
      "profileImg": "https://example.vercel.app/photo.jpg",
      "about": "",
      "domain": "Web Developer",
      "isContributor": true
    },
    "error": null
  }
  ```

- **_Status_**: `404 Not Found` (User not found or invalid ID)

  **_Body_**:

  ```json
  null
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  null
  ```

---

## Update User Details by ID

**Method**: `PUT`

**URL**: `/api/users/:id`

- Only admins can update user details.

**Request Headers**:

- **_Authentication_**: A valid `token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.

**Request Parameters**:

- **`id`**: The ID of the user whose details are being updated.

**Request Body:**

```json
{
  "name": "string", // (Required) Full name of the user.
  "batch": "string", // (Required) User's batch.
  "linkedInUrl": "string", // (Required) LinkedIn profile URL of the user.
  "profileImg": "string", // (Required) URL to the user's profile image.
  "domain": "string", // (Optional) The user's domain/area of expertise.
  "phoneNumber": "string", // (Optional) User's phone number.
  "about": "string", // (Optional) Short description about the user.

  // admin only
  "position": "string", // (Optional) User's position (CR, GR, PC).
  "role": "string", // (Optional) User's role (e.g., 'admin', 'guest', 'alumni).
  "isContributor": "boolean" // (Optional) Indicates whether the user is a contributor.
}
```

**Response**:

- **_Status_**: `200 OK` (User data updated successfully)

  **_Body_**:

  ```json
  null
  ```

- **_Status_**: `400 Bad Request` (if required fields like name, batch, LinkedIn URL, or Profile Image are missing)

  **_Body_**:

  ```json
  {
    "error": "Name, Batch, LinkedIn URL and Profile Image are required."
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  null
  ```

---

## Delete User by ID

**Method**: `DELETE`

**URL**: `/api/users/:id`

- Only admins can delete users.

**Request Headers**:

- **_Authentication_**: A valid `token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.

**Request Parameters**:

- **`id`**: The ID of the user to be deleted.

**Response**:

- **_Status_**: `200 OK` (User details deleted successfully)

  **_Body_**:

  ```json
  null
  ```

- **_Status_**: `404 Not Found` (User not found or invalid ID)

  **_Body_**:

  ```json
  null
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  null
  ```

---
