# Tulip Dating App Back-end 🌷
![Tulip Banner](https://i.ibb.co/wsG3DzQ/Screenshot-2023-11-14-at-6-23-52-pm.png)

The Tulip Dating App's back-end is the powerhouse behind our platform's seamless operation, enabling secure user interactions, real-time communication, and intelligent matchmaking. Here's how our chosen technologies contribute to a top-tier dating experience.

## 🧰 Technologies Used

<div align="center">
  <!-- Node.js -->
  <code><img width="50" src="https://user-images.githubusercontent.com/25181517/183568594-85e280a7-0d7e-4d1a-9028-c8c2209e073c.png" alt="Node.js" title="Node.js"/></code>
  <!-- Express -->
  <code><img width="50" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png" alt="Express" title="Express"/></code>
  <!-- MongoDB -->
  <code><img width="50" src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" alt="mongoDB" title="mongoDB"/></code>
  <!-- AWS -->
  <code><img width="50" src="https://user-images.githubusercontent.com/25181517/183896132-54262f2e-6d98-41e3-8888-e40ab5a17326.png" alt="AWS" title="AWS"/></code>
  <!-- Socket.IO -->
  <code><img width="50" src="https://user-images.githubusercontent.com/25181517/187070862-03888f18-2e63-4332-95fb-3ba4f2708e59.png" alt="Socket.IO" title="Socket.IO"/></code>
  <!-- Postman -->
  <code><img width="50" src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png" alt="Postman" title="Postman"/></code>
  <!-- GitHub -->
  <code><img width="50" src="https://user-images.githubusercontent.com/25181517/192108374-8da61ba1-99ec-41d7-80b8-fb2f7c0a4948.png" alt="GitHub" title="GitHub"/></code>
</div>

### Detailed Technology Breakdown

- **Node.js**: A JavaScript runtime that allows us to build the server-side of the app with JavaScript. It's fast, scalable, and works well with real-time applications.
- **Express**: A lightweight web application framework for Node.js that simplifies the development of web APIs, handles HTTP requests, and integrates middlewares for extended functionality.
- **MongoDB**: A NoSQL database that stores data in flexible, JSON-like documents. In Tulip, it allows for efficient storage and retrieval of user profiles and chat messages.
- **AWS**: Our back-end infrastructure is hosted on Amazon Web Services, which provides robust, scalable, and secure cloud computing resources.
- **Socket.IO**: A JavaScript library for real-time web applications. It enables real-time, bidirectional, and event-based communication between web clients and servers. It's perfect for the chat feature in Tulip.
- **Postman**: Used to design, test, and document APIs. It helps ensure that our endpoints behave as expected and makes it easier to communicate API specifications to the front-end team.
- **GitHub**: Serves as our code repository and version control system, also facilitating collaboration through features like issues and pull requests.

## 🚀 Features

- **Real-Time Chatting**: Built with Socket.IO, our chat system delivers messages instantly between users, enhancing the social experience.
- **Secure Authentication**: We employ JWTs to manage user sessions securely and bcrypt for hashing passwords, providing a reliable security layer.
- **MongoDB Database**: Our choice for data persistence, handling complex queries efficiently, and scaling horizontally as our user base grows.
- **Advanced Matchmaking Algorithm**: Utilizes user profile data to suggest compatible matches, thanks to MongoDB's powerful aggregation framework.
- **Secured API Routes**: We use JWT-based authentication to protect our API endpoints, ensuring that only authorized users can access sensitive data.

## 🛠 Installation

To get the back-end up and running

 locally, clone the repository and follow these steps:

```bash
git clone https://github.com/YuJi-2023/Tulip-back-end
cd tulip-backend
npm install
npm start
```

## 🔐 Secure Login Flow

- **Credential Verification**: We compare hashed passwords using bcrypt to keep login details secure.
- **Token Creation & Management**: JWTs are generated for authenticated users, enabling secure API access.
- **HTTPS/SSL**: Our APIs are served over HTTPS, ensuring all data in transit is encrypted.

## 👨‍💻👩‍💻 Authors

- **Yu Ji** - _Back-end Development_ - [LinkedIn](https://www.linkedin.com/in/yu-ji-785718113/)
- **Angella Lao** - _Back-end Development_ - [LinkedIn](https://www.linkedin.com/in/angella-lao/)

## 📝 License

Distributed under the MIT License. See `LICENSE.md` for more information.

## 🌟 Star Us!

Like our work? Give us a star on GitHub!