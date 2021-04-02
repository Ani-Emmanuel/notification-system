# Simple Notification system
This is a simple notification system with two applications
  - Api Gateway
  - Client Application

# Tools
- Express framework
- Visual Studio code 
- Mongo Db
- Redis

# How to run
This project was developed with .Net core and can run on any platforms.
But if you want to view the code, you can clone this project and open it with your favourite editor.
> Run with Visual Studio (Api_Gateway)
  - Clone the project
  - run yarn on both projects
  - Make sure mongo db is running and on default port 27017 
  - Add a .env file with values for DB_URI, REDIS_HOST, REDIS_PORT, REDIS_URL
  # Example 
     DB_URI = mongodb://127.0.0.1:27017/notification
     REDIS_HOST = 127.0.0.1
     REDIS_PORT = 6379
     REDIS_URL = redis://127.0.0.1:6379

  - RUN yarn run dev for development

> Run with Visual Studio (Notification_client)
  - Add a .env file with values for DOMAIN, REACT_APP_BASE_URL, REACT_APP_SOCKET_URL   
   # Example 
      DOMAIN=http://localhost:8080
      REACT_APP_BASE_URL=$DOMAIN/api
      REACT_APP_SOCKET_URL=$DOMAIN

  - RUN yarn start

