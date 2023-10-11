-- Create the Employee Table
CREATE TABLE Employee (
    employeeID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    gender ENUM('Male', 'Female', 'Other'),
    hobbies VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create the Department Table
CREATE TABLE Department (
    departmentID INT AUTO_INCREMENT PRIMARY KEY,
    departmentName VARCHAR(255),
    categoryName VARCHAR(255),
    location VARCHAR(255),
    salary DECIMAL(10, 2) -- You can adjust the precision and scale as needed
);

-- Create the EmployeeDepartment Table
CREATE TABLE EmployeeDepartment (
    employeeID INT,
    departmentID INT,
    PRIMARY KEY (employeeID, departmentID),
    FOREIGN KEY (employeeID) REFERENCES Employee(employeeID),
    FOREIGN KEY (departmentID) REFERENCES Department(departmentID)
);
