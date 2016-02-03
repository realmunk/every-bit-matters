# every-bit-matters
Hands-on workshop in web architecture with node.js[http://www.nodejs.org].

Build a controller and interface for network-speed monitoring with Socket.IO, Express, and online viewer using D3.js


## Dependency

* node.js[http://www.nodejs.org]

## Get started


```bash
	$ git clone https://github.com/krsjan/every-bit-matters
	$ cd every-bit-matters
	$ npm install
```

## Local startup

Server:

    cd /d3-speedtest-tutorial
    npm start

Logger:

    cd /d3-speedtest-tutorial
    npm run-script log

## Heroku setup

	wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh
	heroku login
	heroku git:remote -a every-bit-matters
	git push heroku master