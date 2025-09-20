# Restaurant Order Management System

A **full-stack Restaurant Order Management System** built with **React** on the frontend and **.NET WebAPI** on the backend. This project handles restaurant operations including menu management, order processing, user authentication, and payment integration.  

This was my first time using **.NET WebAPI**, and I leveraged AI assistance to speed up learning and development.

---

## Features

### Frontend (React)
- Responsive user interface for desktop and mobile
- Dynamic forms for menu and options management
- Modal handling for create/edit operations
- Display of orders and statuses
- Product and category management

### Backend (.NET WebAPI)
- JWT-based authentication
- CRUD operations for **Users**, **Categories**, **Menu Items**, and **Orders**
- Stripe payment integration
- Swagger API documentation (OAS 3.0)

---

## API Endpoints

### Auth
- `POST /api/Auth/login`
- `GET /api/Auth/check`
- `POST /api/Auth/logout`

### Category
- `GET /api/Category`
- `POST /api/Category`
- `PUT /api/Category/{id}`
- `DELETE /api/Category/{id}`

### Menu
- `GET /api/Menu`
- `POST /api/Menu`
- `GET /api/Menu/category/{categoryId}`
- `PUT /api/Menu/{id}`
- `DELETE /api/Menu/{id}`

### Order
- `POST /api/Order`
- `GET /api/Order`
- `GET /api/Order/{id}`
- `PUT /api/Order/{id}/status`

### Payment
- `POST /api/Payment/create`
- `POST /api/Payment/confirm`

### User
- `POST /api/User/register`
- `GET /api/User`
- `DELETE /api/User/{id}`

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios
- **Backend:** .NET 8 WebAPI, C#, MySQL
- **Authentication:** JWT
- **Payments:** Stripe
- **Documentation:** Swagger / OpenAPI

---

## Installation

### Backend
1. Clone the repository
```bash
git clone https://github.com/yourusername/amar-dukan-dontnet-project.git
cd amar-dukan-dontnet-project

```
Update your appsettings.json with your MySQL connection string and JWT settings

Run the application:

dotnet run

Frontend

Navigate to frontend folder

cd frontend


Install dependencies:

npm install


Start development server:

npm run dev


Open in your browser: http://localhost:5173


Future Improvements

Role-based authentication (Admin, Staff)

Push notifications for new orders

Reports and analytics dashboard

Advanced filtering and search

License

MIT License © Md. Rashedul Islam

Author: Md. Rashedul Islam
LinkedIn: https://www.linkedin.com/in/rifatxtra/
GitHub: https://github.com/rifatxtra