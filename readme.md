# cluster-static-server
![Version](https://img.shields.io/github/package-json/v/aalfiann/cluster-static-server)
[![Build Status](https://travis-ci.com/aalfiann/cluster-static-server.svg?branch=master)](https://travis-ci.com/aalfiann/cluster-static-server)
[![Coverage Status](https://coveralls.io/repos/github/aalfiann/cluster-static-server/badge.svg?branch=master)](https://coveralls.io/github/aalfiann/cluster-static-server?branch=master)
[![Known Vulnerabilities](https://snyk.io//test/github/aalfiann/cluster-static-server/badge.svg?targetFile=package.json)](https://snyk.io//test/github/aalfiann/cluster-static-server?targetFile=package.json)
[![dependencies Status](https://david-dm.org/aalfiann/cluster-static-server/status.svg)](https://david-dm.org/aalfiann/cluster-static-server)
![License](https://img.shields.io/github/license/aalfiann/cluster-static-server)  
Cluster Static Server based on Fastify NodeJS.

## Description
`Static Server` is a static web server, or stack, consists of a computer (hardware) with an HTTP server (software). We call it `"static"` because the server sends its hosted files `"as-is"` to your browser.

## Why
The main problem of a static server is when you have limit with your server storage. Because this problem, many people going to buy the expensive cloud storage for his startup business. But I don't want to, so I create this cluster-static-server.

- **I want an Easy Management**  
  This cluster static server is included with a Rest API to manage your static files without having to touch your server. Also with this API, you are able to create your custom application.

- **I want to Scale Out**  
  Add more server machine for your storage. So you have unlimited static server storage.

- **I want to start with small investment**  
  This cluster static server was created with Fastify NodeJS Framework which is the fastest and very low overhead of any NodeJS framework out there. You can start with single or multiple shared hosting to implement this cluster static server.

## Features
- Cluster Storage
- Cluster CPU
- Upload File
- Remote Upload File
- Get File
- Delete File
- Cleanup Temporary File
- Status All Nodes

### Get Started
1. Clone or Download this repo.
2. Extract it.
3. Go to the extracted directory.
4. Run `$ npm install`.
5. Done

### How to run the server
- To start master server `$ npm run master` or `$ node server-master.js`.
- To start node server `$ npm run node` or `$ node server-node.js`.

**Note :**
- You are able to start master and node server in same machine server with different port. But, actualy Master and Node server should be on different machine server so you will get the best performance.

### Example API
We include the `postman.json` file in this source for an example how to use API. Just import it to your postman application and then you can learn from it.

## Documentation
The documentation is on our [Wiki](https://github.com/aalfiann/cluster-static-server/wiki). 