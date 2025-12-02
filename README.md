# Medical Center Information System (MediCare)

A comprehensive full-stack web application for managing medical center operations, including appointment scheduling, doctor management, and patient services. The system supports multiple user roles with role-based access control and provides a seamless experience for patients, doctors, and administrators.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication & Authorization](#authentication--authorization)
- [Role Permissions](#role-permissions)

## Features

- **User Authentication & Registration**
  - User registration with email verification
  - Secure login with JWT token-based authentication
  - Password hashing with bcrypt
  - Email verification tokens with expiration

- **Role-Based Access Control**
  - Four user roles: Admin, User (Patient), Doctor, Nurse
  - Protected routes based on user roles
  - Role-specific dashboards and functionalities

- **Doctor Management**
  - Doctor registration and profile management
  - Doctor profiles with specialties and departments
  - License number validation
  - Profile picture uploads
  - NHOK (National Health Insurance Fund) support
  - Doctor approval workflow by administrators

- **Appointment System**
  - Book appointments with available doctors
  - View upcoming appointments
  - Appointment status tracking (pending, confirmed, completed, canceled, no-show)
  - Appointment cancellation with reason tracking
  - Support for initial and follow-up appointments
  - Appointment duration and pricing management

- **Doctor Schedule Management**
  - Weekly schedule configuration
  - Time slot availability management
  - Appointment duration settings
  - Free and paid appointment options
  - Schedule availability toggling

- **Admin Dashboard**
  - Staff management (doctors and nurses)
  - Doctor approval system
  - User management capabilities

- **Patient Dashboard**
  - View personal appointments
  - Access to doctor information
  - Appointment history

- **Doctor Dashboard**
  - Manage personal schedule
  - View and manage appointments
  - Profile management

- **Email Notifications**
  - Email verification on registration
  - Appointment confirmation emails
  - Doctor approval notifications

## Technology Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and development server
- **React Router 7** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express 5** - Web application framework
- **Sequelize 6** - SQL ORM for database management
- **MySQL2** - MySQL database driver

### Authentication & Security
- **JSON Web Tokens (JWT)** - Token-based authentication
- **bcrypt** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Additional Services
- **Nodemailer** - Email service for notifications
- **Multer** - File upload handling
- **express-validator** - Request validation

## Project Structure

```
MedicalCenterInformationSystem/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   │   └── images/        # Image files
│   ├── src/
│   │   ├── Components/    # React components
│   │   │   ├── NavBar/    # Navigation bar
│   │   │   ├── Footer/    # Footer component
│   │   │   └── SiteMain/  # Main application routes
│   │   │       ├── HomePage/
│   │   │       ├── AboutPage/
│   │   │       ├── ContactPage/
│   │   │       ├── LoginPage/
│   │   │       ├── RegisterPage/
│   │   │       ├── Dashboard/        # Role-specific dashboards
│   │   │       ├── DoctorsList/
│   │   │       ├── DoctorDetails/
│   │   │       ├── DoctorSchedule/
│   │   │       ├── DoctorRegister/
│   │   │       ├── Upcomming/        # Upcoming appointments
│   │   │       ├── AdminManagement/
│   │   │       ├── ProtectedRoutes/  # Route guards
│   │   │       └── VerifyEmail/
│   │   ├── Contexts/      # React context providers
│   │   ├── Hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   ├── Constants/     # Application constants
│   │   └── styles/        # CSS stylesheets
│   ├── package.json
│   └── vite.config.js
│
└── server/                # Node.js backend application
    ├── src/
    │   ├── config/        # Configuration files
    │   │   ├── db.js      # Database configuration
    │   │   ├── expressInit.js  # Express setup
    │   │   ├── routes.js  # API routes
    │   │   ├── mail.js    # Email configuration
    │   │   └── fileStorage.js  # File upload config
    │   ├── controllers/   # Request handlers
    │   │   ├── authController.js
    │   │   ├── doctorController.js
    │   │   ├── appointmentsController.js
    │   │   ├── adminController.js
    │   │   └── userController.js
    │   ├── services/      # Business logic
    │   │   ├── authService.js
    │   │   ├── doctorService.js
    │   │   ├── appointmentsService.js
    │   │   ├── adminService.js
    │   │   ├── userServices.js
    │   │   ├── doctorSchedule.js
    │   │   └── tokenService.js
    │   ├── models/        # Sequelize models
    │   │   ├── User.js
    │   │   ├── Doctor.js
    │   │   ├── Appointment.js
    │   │   ├── DoctorSchedule.js
    │   │   ├── Departments.js
    │   │   ├── Specialties.js
    │   │   ├── Nurse.js
    │   │   └── EmailToken.js
    │   ├── middlewares/   # Express middlewares
    │   │   ├── guard.js    # Authentication guards
    │   │   └── session.js  # Session management
    │   ├── utils/         # Utility functions
    │   │   ├── jwt.js     # JWT token handling
    │   │   ├── dbSync.js  # Database synchronization
    │   │   ├── seedDatabase.js  # Database seeding
    │   │   ├── errorParser.js
    │   │   └── blacklist.js
    │   └── constants/     # Server-side constants
    ├── uploads/           # Uploaded files directory
    ├── package.json
    └── index.js           # Application entry point
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **MySQL** (v8.0 or higher)
- **Git** (for cloning the repository)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MedicalCenterInformationSystem
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

## Configuration

### Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

#### Database Configuration
```env
DB_NAME=your_database_name
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
DB_SSL=false
```

#### Server Configuration
```env
PORT=3033
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

#### JWT Configuration
```env
JWT_SECRET=your_secret_jwt_key_here
```

#### Email Configuration (SMTP)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_SENDER=your_email@gmail.com
```

> **Note**: For Gmail, you'll need to generate an App Password. For other email providers, adjust the SMTP settings accordingly.

## Database Setup

1. **Create MySQL Database**
   ```sql
   CREATE DATABASE your_database_name;
   ```

2. **Synchronize Database Schema**
   Navigate to the `server/` directory and run:
   ```bash
   npm run sync:db
   ```
   This command will create all necessary tables based on the Sequelize models.

3. **Seed Database (Optional)**
   To populate the database with sample data:
   ```bash
   npm run seed:db
   ```
   This will create sample departments, specialties, doctors, and other test data.

## Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:3033` (or the port specified in your `.env` file).

2. **Start the Frontend Development Server**
   Open a new terminal and run:
   ```bash
   cd client
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173` (default Vite port).

### Production Build

1. **Build the Frontend**
   ```bash
   cd client
   npm run build
   ```
   This creates an optimized production build in the `client/dist/` directory.

2. **Preview Production Build**
   ```bash
   npm run preview
   ```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify-email` - Verify email address

### Doctor Endpoints (`/api/doctor`)
- `GET /api/doctor` - Get all doctors
- `GET /api/doctor/:id` - Get doctor by ID
- `POST /api/doctor/register` - Register as a doctor
- `PUT /api/doctor/:id` - Update doctor information
- `GET /api/doctor/schedule/:doctorId` - Get doctor schedule
- `POST /api/doctor/schedule` - Create/update doctor schedule

### Appointments (`/api/appointments`)
- `GET /api/appointments` - Get appointments (filtered by user role)
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment
- `GET /api/appointments/available-slots` - Get available time slots

### Admin Endpoints (`/api/admin`)
- `GET /api/admin/staff` - Get all staff members
- `PUT /api/admin/approve-doctor/:id` - Approve doctor registration
- `PUT /api/admin/staff/:id` - Update staff member
- `DELETE /api/admin/staff/:id` - Remove staff member

> **Note**: Admin endpoints require admin role authentication.

## Database Models

### User Model
- `id` (UUID) - Primary key
- `username` - User's display name
- `email` - Unique email address
- `password` - Hashed password
- `role` - Enum: 'admin', 'user', 'doctor', 'nurse'
- `phoneNumber` - Unique phone number
- `isVerified` - Email verification status
- `provider` - Enum: 'local', 'google'
- `googleId` - For OAuth integration (optional)

### Doctor Model
- `id` (Integer) - Primary key
- `userId` (UUID) - Foreign key to User
- `specialtyId` - Foreign key to Specialties
- `departmentId` - Foreign key to Departments
- `licenseNumber` - Medical license number
- `education` - Educational background
- `description` - Doctor bio
- `experience` - Years of experience
- `isActive` - Approval status
- `isNzok` - NHOK support flag
- `profilePicture` - Profile image path

### Appointment Model
- `id` (Integer) - Primary key
- `doctorId` - Foreign key to Doctor
- `patientId` (UUID) - Foreign key to User
- `appointmentDate` - Date of appointment
- `appointmentTime` - Time of appointment
- `status` - Enum: 'pending', 'confirmed', 'completed', 'canceled', 'no-show'
- `isInitial` - Initial consultation flag
- `isNzok` - NHOK coverage flag
- `duration` - Appointment duration in minutes
- `price` - Appointment price
- `cancelledAt` - Cancellation timestamp
- `cancelledBy` - User who cancelled
- `cancellationReason` - Reason for cancellation

### DoctorSchedule Model
- `id` (Integer) - Primary key
- `doctorId` - Foreign key to Doctor
- `dayOfWeek` - Enum: 'Monday' through 'Sunday'
- `isAvailable` - Availability flag
- `startTime` - Work start time
- `endTime` - Work end time
- `duration` - Appointment slot duration
- `isFree` - Free appointment flag
- `price` - Appointment price

## Authentication & Authorization

### Authentication Flow

1. **Registration**
   - User provides username, email, phone number, and password
   - Password is hashed using bcrypt
   - Verification token is generated and sent via email
   - User must verify email before accessing protected routes

2. **Login**
   - User provides email and password
   - Credentials are validated
   - JWT token is generated with user information (id, email, role, username)
   - Token expires after 4 hours
   - Token is stored in client (localStorage/sessionStorage)

3. **Token Validation**
   - Protected routes require valid JWT token in Authorization header
   - Token is verified and decoded on each request
   - Blacklisted tokens (from logout) are rejected

### Token Format
```javascript
{
  id: "user-uuid",
  email: "user@example.com",
  role: "user",
  userName: "username"
}
```

## Role Permissions

### Admin
- Full system access
- Manage all staff (doctors, nurses)
- Approve/reject doctor registrations
- View all appointments
- Manage departments and specialties

### Doctor
- Manage personal profile and schedule
- View own appointments
- Update appointment status
- Set availability and pricing
- Register as doctor (requires admin approval)

### User (Patient)
- Register and manage account
- View available doctors
- Book appointments
- View own appointments
- Cancel own appointments
- Register to become a doctor

### Nurse
- Basic user permissions
- Additional permissions can be configured

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

---

**Note**: Make sure to keep your `.env` file secure and never commit it to version control. The `.gitignore` file is already configured to exclude environment files.

