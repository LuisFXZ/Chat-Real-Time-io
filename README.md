# Chat Real-Time IO

A real-time chat application built with NestJS and Socket.IO, enabling instant messaging capabilities through WebSockets.

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  <img src="https://socket.io/images/logo.svg" width="120" alt="Socket.IO Logo" style="margin-left: 20px;" />
</p>

## Description

This project implements a real-time chat application using:

- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient and scalable server-side applications
- [Socket.IO](https://socket.io/) - A library that enables real-time, bidirectional and event-based communication between the browser and the server
- [TypeScript](https://www.typescriptlang.org/) - A strongly typed programming language that builds on JavaScript

The application demonstrates the implementation of WebSockets in a NestJS application using the `@nestjs/websockets` and `@nestjs/platform-socket.io` packages.

## Features

- Real-time messaging
- WebSocket connection handling
- Event-based communication
- Scalable architecture with NestJS

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The application will be available at `http://localhost:3000` by default, or on the port specified in your environment variables.

## WebSocket Implementation

The chat functionality is implemented using NestJS WebSocket Gateways. The main components are:

- `ChatGateway`: Handles WebSocket connections and message events
- `ChatService`: Manages chat-related business logic
- `ChatModule`: Organizes the chat-related components

## Client Connection

To connect to the WebSocket server from a client application, you can use the Socket.IO client library:

```javascript
// Browser
const socket = io('http://localhost:3000');

// Node.js
const io = require('socket.io-client');
const socket = io('http://localhost:3000');
```

## Technologies

- NestJS
- Socket.IO
- TypeScript
- Node.js

## Stay in touch
- Author - LuisFXZ(Developer)

## License

This project is [MIT licensed](LICENSE).