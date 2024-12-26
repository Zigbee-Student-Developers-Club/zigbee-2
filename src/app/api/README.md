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

## Fetch resources

**Method**: `GET`

**URL**: `/api/resource?domain=Backend`

**Request Query Parameters**:

- **_domain_** (optional): Filter users by domain.

**Response**:

- **_Status_**: `200 OK` (Successfully fetched the resources)

  **_Body_**:

  ```json
  {
    "resources": [
      {
        "id": "M0pimmImHdJQGAG2kncj",
        "url": "https://www.netacad.com/courses/networking",
        "author": "Hitesh Choudhury",
        "name": "Chai aur Backend",
        "uploadedOn": "2024-12-13T11:48:25.649Z",
        "domain": "Backend"
      }
    ],
    "message": "Resources fetched successfully"
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  {
    "error": "Unexpected error while fetching resources."
  }
  ```

---

## Fetch Magazines

**Method**: `GET`

**URL**: `/api/magazine`

**Response**:

- **_Status_**: `200 OK` (Successfully fetched the magazines)

  **_Body_**:

  ```json
  {
    "magazines": [
        {
            "id": "7pYvnLAshHq2OfpVeF2W",
            "image": "https://zigbeeoutr.in/_next/static/media/reflection2.acf699ff.png",
            "title": "Reflections 2026",
            "uploadedOn": "2024-12-13T11:44:29.923Z",
            "url": "https://drive.google.com/file/d/1ZJvMnvlvtFDsmyxR_AEfeuUYDL13vW_0/view?usp=sharing"
        },
        ...
    ],
    "message": "Magazines fetched successfully"
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  {
    "error": "Unexpected error while fetching magazines"
  }
  ```

---

## Fetch Events

**Method**: `GET`

**URL**: `/api/event`

**Response**:

- **_Status_**: `200 OK` (Successfully fetched the events)

  **_Body_**:

  ```json
  {
    "events": [
      {
        "id": "kga6OVX5hGUpMYkpdvRg",
        "speakers": [
          {
            "company": "Tech Innovators Inc.",
            "name": "Dr. Alice Johnson",
            "batch": 2010,
            "role": "AI Research Scientist"
          },
          {
            "name": "Mr. John Smith",
            "role": "CTO",
            "batch": 2012,
            "company": "NextGen Solutions"
          },
          {
            "name": "Ms. Priya Sharma",
            "role": "Data Scientist",
            "company": "Quantum Analytics",
            "batch": 2015
          }
        ],
        "thumbnail": "https://example.com/event-thumbnail.jpg",
        "location": "OUTR Auditorium, Bhubaneswar",
        "topic": "Future of Artificial Intelligence",
        "eventDate": "2024-12-25T00:00:00.000Z"
      }
    ],
    "message": "Events fetched successfully"
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  {
    "error": "Unexpected error while fetching events"
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

- **_Status_**: `204 No Content` (User details deleted successfully)

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

---

## Add Resources

**Method**: `POST`

**URL**: `/api/resource`

- Only admins can add resource.

**Request Headers**:

- **_Authentication_**: A valid `x-auth-token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.

**Request Body:**

```json
{
  "name": "Chai aur React",
  "url": "https://www.netacad.com/courses/networking",
  "domain": "frontend",
  "author": "Hitesh Choudhury"
}
```

**Response**:

- **_Status_**: `201 Created` (Resource added successfully)

  **_Body_**:

  ```json
  {
    "message": "Resource added successfully."
  }
  ```

- **_Status_**: `400 Bad Request` (if required fields like name, url, domain, author is missing )

  **_Body_**:

  ```json
  {
    "error": "All fields are required."
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  {
    "error": "Unexpected error while adding resource."
  }
  ```

---

## Add Magazines

**Method**: `POST`

**URL**: `/api/magazine`

- Only admins can add magazine.

**Request Headers**:

- **_Authentication_**: A valid `x-auth-token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.

**Request Body:**

```json
{
  "title": "Reflections 2025",
  "url": "https://drive.google.com/file/d/1ZJvMnvlvtFDsmyxR_AEfeuUYDL13vW_0/view?usp=sharing",
  "image": "https://zigbeeoutr.in/_next/static/media/reflection2.acf699ff.png"
}
```

**Response**:

- **_Status_**: `201 Created` (Magazine added successfully)

  **_Body_**:

  ```json
  {
    "message": "Magazine added successfully."
  }
  ```

- **_Status_**: `400 Bad Request` (if required fields like title, url, image is missing )

  **_Body_**:

  ```json
  {
    "error": "All fields are required."
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  {
    "error": "Unexpected error while adding magazine."
  }
  ```

---

## Add Events

**Method**: `POST`

**URL**: `/api/event`

- Only admins can add event.

**Request Headers**:

- **_Authentication_**: A valid `x-auth-token` cookie must be present for authenticated access. The cookie should follow the format `Bearer <token>` and be marked as `httpOnly`.

**Request Body:**

```json
{
  "topic": "Future of Artificial Intelligence",
  "eventDate": "2024-12-25",
  "location": "OUTR Auditorium, Bhubaneswar",
  "thumbnail": "https://example.com/event-thumbnail.jpg",
  "speakers": [
    {
      "name": "Dr. Alice Johnson",
      "role": "AI Research Scientist",
      "company": "Tech Innovators Inc.",
      "batch": 2010
    },
    {
      "name": "Mr. John Smith",
      "role": "CTO",
      "company": "NextGen Solutions",
      "batch": 2012
    },
    {
      "name": "Ms. Priya Sharma",
      "role": "Data Scientist",
      "company": "Quantum Analytics",
      "batch": 2015
    }
  ]
}
```

**Response**:

- **_Status_**: `201 Created` (Event added successfully)

  **_Body_**:

  ```json
  {
    "message": "Event added successfully."
  }
  ```

- **_Status_**: `400 Bad Request` (if required fields like topic, eventDate, location, thumbnail, speakers is missing and if speakers is not an array )

  **_Body_**:

  ```json
  {
    "error": "All fields are required and speakers must be an array."
  }
  ```

- **_Status_**: `400 Bad Request` (if event date does not follow format (YYYY-MM-DD) )

  **_Body_**:

  ```json
  {
    "error": "eventDate must be in the format YYYY-MM-DD."
  }
  ```

- **_Status_**: `400 Bad Request` (if speakers array does not contain speaker with name, role, company and batch (number) )

  **_Body_**:

  ```json
  {
    "error": "Each speaker must have a name, role, company, and a valid batch."
  }
  ```

- **_Status_**: `500 Internal Server Error` (if there is a server-side error)

  **_Body_**:

  ```json
  {
    "error": "Unexpected error while adding events."
  }
  ```

---
