# OS-Public-Hosting-Protocol

## Overview
This repository contains 2 simulations of data transfers that take place on the internet.
The servers in `conventional` directory demonstrates a simple REST API call that fetches data from a database. The servers `proposed` directory demonstrate a proposed data flow that uses blockchain-based hashes as authentication tokens.

## Preqrequisites
* [Node.js](https://nodejs.dev/)

## How To Run

### Conventional Server Model
* Install packages for all servers:
```
cd /conventional/client
npm i
cd ../database
npm i
cd ../server
npm i
```
* Start database server:
```
cd /conventional/database
node main.js
```
* Start REST server:
```
cd /conventional/server
node main.js
```
* Simulate client behavior using:
```
cd /conventional/client
node main.js
```

### Proposed Server Model
* Install packages for all servers:
```
cd /proposed/client
npm i
cd ../database
npm i
cd ../server1
npm i
cd ../server2
npm i
cd ../server3
npm i
```
* Start database server:
```
cd /proposed/database
node main.js
```
* Start REST server 1:
```
cd /proposed/server1
node main.js
```
* Start REST server 1:
```
cd /proposed/server 2
node main.js
```
* Start REST server 1:
```
cd /proposed/server3
node main.js
```
* Simulate client behavior using:
```
cd /proposed/client
node main.js
```
