BL4ZE
=====
Blazing fast speed-tests

###every-bit-matters contest entry 2016
By Nicolas Almagro Tonne - me@nixo.no - BiT - NTNU

![ScreenShot](https://raw.githubusercontent.com/nixolas1/every-bit-matters/main/screen2.png)
A screenshot of the speed test visualization

## New Features
* Current/latest speed displayed separately
* Responsive graph with historical data
 * Updated dynamically
 * Zoomable & pannable
 * Toggle what information to show
* Visualization of network speed and latency
 * Upload & download speed separated and visualized by particle speed
 * Ping visualized by only spawning a new particle every PING milliseconds
* Stats
 * Top dl & ul speed
 * Shortest ping time
* Sortable table with historic data
* ???

## Changes to architecture
* Logger history data structure has been kept as is.
* Logger will only run one speed test at a time
* Logger will only send whole test history on first connect.
* Added partial data sending functionality to server.js 


## Getting started
* Switch to branch 'master'
* Install npm packages (same as forked project): ```npm install .```
* Run ```npm logger/logger.js``` and ```npm start```
* Navigate to ```http://localhost:3000```
* Wait for logger data if you have none

## Testing
* To simulate different network speeds for the visualizer edit the parameters of ```updateVisualizationFromData``` in the ```socket.on('client:update'```... function in ```client.js```
* Select a time period in the graph to zoom in on it
* Display ping data in the graph by clicking the disabled Ping label at the bottom
