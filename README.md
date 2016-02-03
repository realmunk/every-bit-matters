# every-bit-matters
Hands-on workshop in web architecture with [node.js](http://www.nodejs.org) and deployment with [Heroku](http://heroku.com).

Goal: Learn to build and deploy a web application for visualizing data from and controlling distributed speed test loggers.

## Get started

### Download and install required software

* [node.js](http://www.nodejs.org)
* [Heroku Toolbelt](https://toolbelt.heroku.com/)


### Clone and install dependencies

```bash
	$ git clone https://github.com/krsjan/every-bit-matters
	$ cd every-bit-matters
	$ npm install
```

### Heroku setup

```bash
	$ wget -O- https://toolbelt.heroku.com/install-ubuntu.sh | sh
	$ heroku login
	$ heroku git:remote -a every-bit-matters
	$ git push heroku master
```