# ParrotPantry Mobile Application

## Description

**ParrotPantry** is a group project developed using a modern technology stack: React Native for the mobile application and Express.js for the backend. The app is tailored for parrot owners to help manage their care and monitor their health.

## Features

- **User Authentication**: Secure login and registration.
- **Parrot Management**: CRUD (create, read, update, delete) operations for parrots.
- **Pet Shops**: View pet shop listings.
- **Reminders**:
    - Medications
    - Weighing
    - Feeding
    - Veterinary visits
- **Growth Monitoring**: Charts comparing a parrot's development to species-specific norms.
- **User Profile**:
    - Edit profile information
    - Change app theme (light/dark)

## Technology Stack

### Frontend
- **React Native**: Build a mobile application with an intuitive user interface.

### Backend
- **Express.js**: Handle API requests and application logic.

## Installation and Setup

### Prerequisites
Ensure the following are installed:
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Cloning the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/yourusername/ParrotPantry.git
cd ParrotPantry
```
### Backend setup

1. Navigate to the backend directory:
```bash
cd backend_express/src

```

2. install dependencies
```bash
npm install
```
3. run the backend server by choosing app.js file and run button

### Frontend (mobile app) setup
1. Navigate into frontend:
```bash
cd ../mobile 
```
2. Install dependencies
```bash
npm install 
```
3. run mobile app - make sure you have installed android emulator (needs android studio IDE) or IOS simulator (needs Xcode on MacOS)
```bash
expo start
```



