<h1>Chat App Using Websockets & Web Notifications</h1>

This project is using angular to develop frontend and node-express to develop backend, front end implements a chat interface and backend implements websockets for broadcasting.

<hr />

A Node.js backend server (server directory) that deploys a WebSocket server, server on connection with client starts to listen for any incomming
messages from clients and broadcast to all connected clients.

An Angular application (client directory) implements chat interface using tailwindcss https://tailwindcss.com

Following are highlights of this project:-

- for rapid development components from https://flowbite.com are used.
- implements webSocket (RxJs) to send and recieve chat messages.
- to mark messages as read a custom directive is used which is utilizing browser's intersection observer API https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API .
- to show web notifications upon the new chat message browser's notifications API https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API is wrapped in angular service.
- in app notification count is managed based on unread messages and cleared out as user reads.

<hr />

To set node version for the server and client, run `nvm use` in both the server and client directories.

Run `npm install` in both the server and client directories.

To initiate the server, execute `npm run start` within the server directory.

To launch the client, execute `ng serve` within the client directory.

<hr />

<h4>Caution!</h4>
This serves as a demonstration utilizing the plain version of WebSocket. In production applications, it is imperative to employ the secure version of the protocol.
