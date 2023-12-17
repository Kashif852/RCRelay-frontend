# Relay Computer Store Frontend

Relay Computer Store's frontend is a sophisticated and responsive web interface that simplifies the shopping and checkout process for an online computer store. Built using React and Redux Toolkit, it is designed with user experience in mind, ensuring a seamless and intuitive interaction with the store.

## Features

- **Responsive Design**: Ensures a seamless experience across various devices and screen sizes.
- **Product Display**: Showcases products with detail and clarity.
- **Dynamic Discounts**: Applies discount rules during checkout based on predefined criteria.
- **Interactive Shopping Cart**: Allows users to review and manage their selections before purchase.
- **Automated Testing**: Includes unit and integration tests to ensure reliability and performance.

## Prerequisites

- Node.js (v14.x or higher recommended)
- npm (comes bundled with Node.js)

## Local Development Setup

Follow these steps to get a local development environment up and running:

### 1. Clone the Repository

    # Clone via HTTPS
    git clone https://github.com/Kashif852/RCRelay-frontend.git

    # Clone via SSH
    git clone git@github.com:Kashif852/RCRelay-frontend.git

    # Navigate to the cloned directory
    cd RCRelay-frontend

### 2. Install Dependencies
    Install the necessary Node.js packages.
    npm install

### 3. Environment Configuration
    Create a .env file at the root of the project and set the backend API base URL.
    REACT_APP_API_BASE_URL=http://localhost:4000

### 4. Start the Development Server
    Launch the React application on a local development server.
    npm start
    The application will typically open in your default web browser at http://localhost:3000.

### Run Tests
    Execute the test suite to verify that everything is functioning as expected.
    npm test

### Usage
Explore products and offers on the Homepage.
Add desired products to the Cart.
Navigate to the Checkout Page to review the cart and proceed with the purchase.
Finalize the transaction and receive a summary of the order on the Order Confirmation Page.
