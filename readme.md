# cluster-static-server
Cluster Static Server based on Fastify NodeJS.

## Description
`Static Server` is a static web server, or stack, consists of a computer (hardware) with an HTTP server (software). We call it `"static"` because the server sends its hosted files `"as-is"` to your browser.

## Why
The main problem of a static server is when you have limit with your server storage.

- **I want an Easy Management**
  This cluster static server is included with a Rest API to manage your static files. With this API, you are able to create your custom application.

- **I want to Scale Out**
  Add more server machine for your storage. So you have unlimited static server storage.

- **I want to start with small investment**
  This cluster static server was created with Fastify NodeJS Framework which is the fastest and very low overhead of any NodeJS framework out there. You can start with single or multiple shared hosting to implement this cluster static server.

## Features
- Cluster
- Upload File
- Remote Upload File
- Get File
- Delete File
- Cleanup Temporary File

### Get Started
1. Clone or Download this repo.
2. Extract it.
3. Go to the extracted directory.
4. Run `$ npm install`.
5. Done

### How to run the server
- To start master server `$ npm run master`.
- To start node server `$ npm run node`.

**Note :**
- You are able to start master and node server in same machine server with different port. But, actualy Master and Node server should be on different machine server so you will get the best performance.

### Example API
We include the default postman.json in this source for an example how to use API. Just import it to your postman application and then you can learn from it.

## Documentation
The documentation is on our [Wiki](https://github.com/aalfiann/cluster-static-server/wiki). 