# every-bit-matters
Hands-on workshop in web architecture with [node.js](http://www.nodejs.org).

Build a controller and interface for network-speed monitoring with Socket.IO, Express, and online viewer using D3.js

## Required software

* [node.js](http://www.nodejs.org)
* [Heroku Toolbelt](https://toolbelt.heroku.com/)


## Get started


```bash
	$ git clone https://github.com/krsjan/every-bit-matters
	$ cd every-bit-matters
	$ npm install
```

## Components

Server:

```bash
    $ npm start
```

Logger:

```bash
   $ npm run-script log
```

## Heroku setup

```bash
	$ wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh
	$ heroku login
	$ heroku git:remote -a every-bit-matters
	$ git push heroku master
```