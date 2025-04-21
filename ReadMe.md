# Project Title

Full Stack Coding Challenge – Developer Team Lead

## Installation

```bash
git clone https://github.com/ariellegriffin94/simple-employee-app.git

cd simple-employee-app
```

### Prerequisites

Navigate to the api folder
```bash
cd api
```
add .env file with the following contents
```bash
PORT=9000
ENV=development
```
Install dependencies and start server
```
npm install
npm run dev
```

Open a new terminal tab and navigate to the client folder and start client
```
cd ../client
npm install
npm run dev
```

## Usage

API can be found at http://localhost:9000

Client can be found at http://localhost:5173

## About the application

Upon navigating to the client, you will see the table displayed listing all employees.

You have the ability to sort all columns ascending and descending, search and filter results by title and department

To review the results from the employees api endpoint, you can navigate to http://localhost:9000/api/employees

For optional querying you can add as many of the following paramaters as you like:

first_name

last_name

email

title

department

ex) http://localhost:9000/api/employees?department=engineering&first_name=alice



