# Student Testing System

## Project Description
This project is a web application designed for testing students' knowledge. It features user roles for students, lecturers, and administrators, and includes various functionalities such as test creation, management, and result analysis.

## Table of Contents
- [Project Description](#project-description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps](#steps)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [Student Endpoints](#student-endpoints)
  - [Lecturer Endpoints](#lecturer-endpoints)
  - [Result Endpoints](#result-endpoints)
- [Deployment](#deployment)
- [License](#license)

## Technologies Used
- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Embedded JavaScript templates)
- **Database:** MongoDB, MySQL, Oracle
- **Other:** Nginx, Glassfish

## Installation

### Prerequisites
- Node.js v20.11.0 or higher
- npm (Node Package Manager)
- MongoDB
- MySQL
- Oracle Database

### Steps
1. Clone the repository:
    ```sh
    git clone https://github.com/niksan2007/Testing-system-2024.v2
    cd ./Testing-system-2024.v2/dbcs
    ```

2. Install dependencies:
    ```sh
    npm i
    ```

3. Configure the databases (MongoDB, MySQL, Oracle) and update the connection strings in the configuration file.

4. Start the application:
    ```sh
    npm run start
    ```

## Usage
Instructions on how to use the application will be added here.

## Endpoints

### Student Endpoints
- `GET /tests` - Get list of tests
- `GET /test/:id` - Get a specific test by ID
- `POST /test` - Submit test results

### Lecturer Endpoints
- `GET /test` - Render test creation page
- `GET /constructor` - Render classic test constructor
- `POST /test` - Create a classic test
- `PUT /test/:id` - Update a test by ID
- `DELETE /test/:id` - Delete a test by ID
- `GET /tests` - Get list of tests

### Result Endpoints
- `GET /result/:testTopic` - Get test results by topic
- `GET /result` - Get all test results