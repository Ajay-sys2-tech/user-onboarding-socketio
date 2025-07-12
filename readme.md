# Chat Interface using Socket.io

A real-time chat onboarding backend server built with **Node.js**, **Express**, and **Socket.io**, featuring JWT authentication and robust event handling.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running the Server](#running-the-server)  
- [API & Socket Events](#api--socket-events)  
  - [Authentication (JWT)](#authentication-jwt)  
  - [Socket.io Events](#socketio-events)  
- [Error Handling](#error-handling)  
- [Client Integration Notes](#client-integration-notes)  
- [Testing with Postman](#testing-with-postman)  
- [Disconnecting Clients](#disconnecting-clients)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Project Overview

This backend server supports an onboarding chat interface where users answer preference questions in real time. The server authenticates users using JWT tokens and communicates with clients via Socket.io for instant updates.

---

## Features

- User authentication via JWT tokens  
- Real-time onboarding questions through Socket.io events  
- Validation of incoming socket data with error feedback  
- Graceful handling of socket disconnections  
- MongoDB integration for storing answers (replaceable with any DB)  
- Custom error events for better client-side control  

---

## Tech Stack

- Node.js  
- Express.js  
- Socket.io  
- JSON Web Tokens (JWT)  
- MongoDB / Mongoose (for answers storage)  

---

## Getting Started

### Prerequisites

- Node.js v16+  
- npm or yarn  
- MongoDB instance (local or cloud)

---

### Installation

```bash
git clone https://github.com/yourusername/chat-onboarding-socketio.git
cd user-onboarding-socketio
npm install
nom run dev
