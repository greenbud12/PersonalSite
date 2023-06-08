# Calculator Project

A simple calculator implemented in JavaScript.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Running via Python](#running-via-python)
- [Running via Docker](#running-via-docker)
- [See Online Version]()
- [Contributing](#contributing)
- [License](#license)

## Description

This project is a basic calculator web application implemented in JavaScript. It allows users to perform arithmetic calculations, including addition, subtraction, multiplication, division, exponentiation, percentage calculation, and factorial.

## Features

- Addition, subtraction, multiplication, division, exponentiation, percentage calculation, and factorial.
- Keyboard support for convenient input.
- Memory functions to store and recall values.
- Clearing of calculations.
- Parentheses support for complex expressions.

## Requirements

- Web browser with JavaScript support

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/calculator.git

2. Navigate to the project directory:
    
    ```bash
    cd calculator

## Usage

1. Open the index.html file in a web browser.

2. Use the provided buttons or keyboard keys to perform calculations.

3. The result will be displayed in the calculator display area.

## Running via Python

If you prefer to run the calculator using Python's built-in web server, follow these steps:

1. Ensure you have Python 3 installed on your system.

2. Open a terminal and navigate to the project directory.

3. Start the Python web server:

    ```bash
    python -m http.server

Open a web browser and visit http://localhost:8080/calculator or http://127.0.0.1:8080/calculator to access the calculator.

## Running via Docker

If you prefer to run the calculator using Docker, follow these steps:

1. Ensure you have Docker installed on your system.

2. Open a terminal and navigate to the project directory.

3. Build the Docker image:

    ```bash
    docker build -t calculator-app .

4. Run a Docker container:

    ```bash
    docker run -p 8080:80 calculator-app

## Online Version
https://personal-wf2z76uana-uc.a.run.app/calculator

## Contributing 

Contributions to the project are welcome! If you have any ideas, improvements, or bug fixes, please submit a pull request.

## License

This project is licensed under the MIT License.