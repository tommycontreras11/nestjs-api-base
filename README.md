# API BASE Documentation

API Base is a NestJS and TypeORM-based application that provides a flexible and scalable user management system. It handles users, roles, permissions, and modules, allowing for a granular and customizable access control mechanism.

## Authors
Miguel Jimenez [@majimenezaquino](https://github.com/majimenezaquino)
Tommy Grullón [@tommycontreras11](https://github.com/tommycontreras11)


## Table of Contents

1. [Introduction](#introduction)
2. [Installation and Setup](#installation-and-setup)
3. [Usage](#usage)
    1. [Users](#users)
    2. [Roles](#roles)
    3. [Permissions](#permissions)
    4. [Modules](#modules)
4. [API Endpoints](#api-endpoints)
5. [Contributing](#contributing)
6. [License](#license)

## Introduction

API Base is designed to handle complex user management scenarios, including:
- Users with multiple roles
- Roles with multiple modules
- Modules with multiple permissions
- Hierarchical module structure
- Users with child users

## Installation and Setup

1. **Prerequisites**: Ensure you have Node.js, npm, and MySQL installed on your system.
2. **Clone the repository**: `git clone https://github.com/user/API_BASE.git`
3. **Install dependencies**: Navigate to the project directory and run `npm install`
4. **Configure the database**: Create a new MySQL database and update the `ormconfig.json` file with the correct database credentials.
5. **Run the application**: Execute `npm run start` to start the application.

## Usage

### Users

Users can have multiple roles and child users. Each user has a unique identifier, username, email, and password. Child users inherit the roles and permissions of their parent users.

### Roles

Roles are a collection of permissions and modules that define the access level for a group of users. Each role can have multiple modules and a unique name.

### Permissions

Permissions represent the resources of the application. They are assigned to modules, allowing users with access to those modules to perform specific actions.

### Modules

Modules are collections of permissions that can be assigned to roles. They can have a hierarchical structure, with child modules inheriting the permissions of their parent modules.

## API Endpoints

The API Base provides the following endpoints for managing users, roles, permissions, and modules:

- **Users**
  - `GET /users`: Retrieve all users
  - `POST /users`: Create a new user
  - `GET /users/:id`: Retrieve a specific user
  - `PUT /users/:id`: Update a specific user
  - `DELETE /users/:id`: Delete a specific user
- **Roles**
  - `GET /roles`: Retrieve all roles
  - `POST /roles`: Create a new role
  - `GET /roles/:id`: Retrieve a specific role
  - `PUT /roles/:id`: Update a specific role
  - `DELETE /roles/:id`: Delete a specific role
- **Permissions**
  - `GET /permissions`: Retrieve all permissions
  - `POST /permissions`: Create a new permission
  - `GET /permissions/:id`: Retrieve a specific permission
  - `PUT /permissions/:id`: Update a specific permission
  - `DELETE /permissions/:id`: Delete a specific permission
- **Modules**
  - `GET /modules`: Retrieve all modules
  - `POST /modules`: Create a new module
  - `GET /modules/:id`: Retrieve a specific module
  - `PUT /modules/:id`: Update a specific module
  - `DELETE /modules/:id`: Delete a specific module

## Contributing


We welcome contributions to improve and expand the functionality of API Base. Please submit your changes via a pull
