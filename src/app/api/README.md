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
    "isRegistered": true,
    "message": "User checked successfully"
  }
  ```

- **_Status_**: `400 Bad Request` (if email is missing or invalid)
  ```json
  {
    "error": "Email is required"
  }
  ```
- **_Status_**: `500 Internal Server Error` (if there is a server-side error)
  ```json
  {
    "error": "An unexpected error occurred. Please try again later."
  }
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
  {
    "message": "OTP sent successfully"
  }
  ```

- **_Status_**: `400 Bad Request`(if email is missing or invalid)

  ```json
  {
    "error": "Email is required"
  }
  ```

- **_Status_**: `422 Unprocessable Entity` (if OTP could not be sent)

  ```json
  {
    "error": "Failed to send OTP"
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  ```json
  {
    "error": "An unexpected error occurred. Please try again later."
  }
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
    "isProvidedBasicData": true,
    "message": "Login successful"
  }
  ```

- **_Status_**: `400 Bad Request` (if email or otp is missing or invalid)

  ```json
  {
    "error": "Email and OTP are required."
  }
  ```

- **_Status_**: `400 Bad Request` (if OTP length is incorrect)
  ```json
  {
    "error": "OTP must be 6 digits."
  }
  ```
- **_Status_**: `400 Bad Request` (invalid email & OTP)
  ```json
  {
    "error": "Invalid email or OTP."
  }
  ```
- **_Status_**: `500 Internal Server Error` (failed to generate token)
  ```json
  {
    "error": "Failed to generate token."
  }
  ```
- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  ```json
  {
    "error": "An unexpected error occurred. Please try again later."
  }
  ```

**Cookies**:

A `x-auth-token` cookie will be set on successful verification with the value of `Bearer <token>`, and it's marked as `httpOnly`.

---

## Fetch Alumni

**Method**: `GET`

**URL**: `/api/alumni?batch=2023`

**Request Headers**:

- **_Authentication_**:
  -A valid `x-auth-token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.
- Don't worry, while verifying OTP and email, this cookie will be added automatically.

**Request Query Parameters**:

- **_batch_** (optional): Filter users by batch.

**Response**:

- **_Status_**: `200 OK` (Successfully fetched the list of alumni)

  **_Body_**:

  ```json
  {
    "alumnus": [
      {
        "id": "0IFs6hkI83SV80PEDQHb",
        "linkedInUrl": "https://www.linkedin.com/in/my-profile/",
        "profileImg": "https://example.com/image.png",
        "position": "PV",
        "isContributor": false,
        "batch": 2023,
        "role": "alumni",
        "name": "Demo User 13",
        "domain": "Web Developer",
        "about": "string"
      },
      ...
    ],
    "message": "Alumnus fetched successfully"
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  {
    "error": "An unexpected error occurred. Please try again later."
  }
  ```

---

## Fetch Contributors

**Method**: `GET`

**URL**: `/api/team`

**Response**:

- **_Status_**: `200 OK` (Successfully fetched the list of contributors)

  **_Body_**:

  ```json
  {
    "contributors": [
      {
        "id": "NYv9A2tGXwPfCmaVs7OE",
        "about": "string",
        "batch": 2023,
        "profileImg": "https://example.com/image.png",
        "isContributor": true,
        "linkedInUrl": "https://www.linkedin.com/in/my-profile/",
        "position": "PC",
        "domain": "Web Developer",
        "name": "Demo User"
      },
      ...
    ],
    "message": "Contributors fetched successfully"
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  {
    "error": "Unexpected Error while fetching contributors."
  }
  ```

---

## Get Users (Admin Only)

**Method**: `GET`

**URL**: `/api/users?role=admin&batch=2028&page=1`

**Request Headers**:

- **_Authentication_**: A valid `x-auth-token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.

**Request Query Parameters**:

- **_role_** (optional): Filter users by role.
- **_batch_** (optional): Filter users by batch.
- **_page_** (optional): Page number for pagination.

**Response**:

- **_Status_**: `200 OK` (Successfully fetched the list of users)

  **_Body_**:

  ```json
  {
    "users": {
      "total_page": 2,
      "current_page": 1,
      "previous": null,
      "next": "http://localhost:3000/api/users?page=2",
      "results": [
        {
          "id": "NYv9A2tGXwPfCmaVs7OE",
          "isContributor": true,
          "linkedInUrl": "https://www.linkedin.com/in/my-profile/",
          "profileImg": "https://example.com/image.png",
          "role": "alumni",
          "name": "Demo User",
          "position": "PC",
          "batch": 2023,
          "phoneNumber": "0123456788",
          "about": "string",
          "domain": "Web Developer"
        },
        ...
      ]
    },
    "message": "Users fetched successfully."
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  {
    "error": "An unexpected error occurred. Please try again later."
  }
  ```

---

## Create or Update User Details

**Method**: `POST`

**URL**: `/api/users`

1. **Authenticate users** to update their own profile.
2. **Allow admins** to create a new user.

**Request Headers**:

- **_Authentication_**: A valid `x-auth-token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.

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
  {
    "message": "User data updated successfully"
  }
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
  {
    "error": "An unexpected error occurred. Please try again later."
  }
  ```

---

## Get User Details by ID

**Method**: `GET`

**URL**: `/api/users/:id`

- **_Authentication_**: A valid `x-auth-token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.

**Request Parameters**:

- **`id`**: The ID of the user whose details are being fetched.

**Response**:

- **_Status_**: `200 OK` (User details fetched successfully)

  **_Body_**:

  ```json
  {
    "user": {
      "profileImg": "https://example.com/image.png",
      "email": "admin@gmail.com",
      "name": "CR Admin",
      "batch": 2028,
      "about": "",
      "domain": "Web Developer",
      "isContributor": true,
      "linkedInUrl": "https://www.linkedin.com/in/my-profile/",
      "role": "admin",
      "phoneNumber": "0123456788",
      "position": "CR"
    },
    "message": "User details fetched successfully."
  }
  ```

- **_Status_**: `404 Not Found` (User not found or invalid ID or entering another id)

  **_Body_**:

  ```json
  {
    "error": "You are not authorized to view this user's details."
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  {
    "error": "An error occurred while fetching user details."
  }
  ```

---

## Update User Details by ID

**Method**: `PUT`

**URL**: `/api/users/:id`

- Only admins can update user details.

**Request Headers**:

- **_Authentication_**: A valid `x-auth-token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.

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
  {
    "message": "User details updated successfully."
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  {
    "error": "Unexpected error in updating user details."
  }
  ```

---

## Delete User by ID

**Method**: `DELETE`

**URL**: `/api/users/:id`

- Only admins can delete users.

**Request Headers**:

- **_Authentication_**: A valid `x-auth-token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.

**Request Parameters**:

- **`id`**: The ID of the user to be deleted.

**Response**:

- **_Status_**: `200 OK` (User details deleted successfully)

  **_Body_**:

  ```json
  {
    "message": "User deleted successfully."
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  {
    "error": "Unexpected error in deleting user."
  }
  ```
