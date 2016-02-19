/*  Forked from http://codepen.io/davidhartley/pen/jbOOed by David Hartleu
    Modified by nixolas1 - 2016
    Converted to dynamic particle emitter based on network data.
*/

var sizeMult = 1;
var speedDL = 1;
var speedUL = 1.3;
var randomSpreadDivider = 1.7;


var dlConfig = {
  maxParticles: 500,
  spawnDelay: 30,
  lifeSpan: 2000,
  alpha: {
    min: 1.0,
    max: 1.0
  },
  alphaDecay: {
    min: 0.8,
    max: 1.0
  },
  colour: ["#F81810", "#6D0703"],
  radius: {
    min: 20*sizeMult,
    max: 40*sizeMult
  },
  radiusDecay: {
    min: 10,
    max: 20
  },
  direction: {
    min: -Math.PI,
    max: Math.PI
  },
  speed: 100
};

var ulConfig = $.extend( {}, dlConfig );
ulConfig.colour = ["#F8D010", "#F8D010", "#F8D010", "#00A1FF"];

var can = document.querySelector("canvas"),
    ctx = can.getContext("2d"),
    mouse = {
      x: window.innerWidth / 3,
      y: window.innerHeight / 3
    },
    downloadParticles = [],
    uploadParticles = [];

window.addEventListener("resize", resizeCanvas);
//resizeCanvas();


function updateVisualizationFromData(dl, ul, ping){

    //Speed (correlates with network speed)
    var minSpeed = 40;
    var maxSpeed = 800;
    var speedMult = 7.5; 

    var dlSpeed = Math.min(dl * speedMult + minSpeed, maxSpeed);
    var ulSpeed = Math.min(ul * speedMult + minSpeed, maxSpeed);

    //Lifespan (inverse correlation with speed)
    var minLife = 300;
    var maxLife = 5000;
    var lifeMult = 1.2;

    var dlLife = Math.max(maxLife - (maxLife / maxSpeed) * dlSpeed * lifeMult, minLife);
    var ulLife = Math.max(maxLife - (maxLife / maxSpeed) * ulSpeed * lifeMult, minLife);

    //TODO: change alpha and radius decay as well

    //Particle frequency (directly correlates with ping)
    var minFreq = 1;
    var particleFreq = Math.max(ping, minFreq);



    //Store values
    dlConfig.speed = dlSpeed;
    ulConfig.speed = ulSpeed;

    dlConfig.lifeSpan = dlLife;
    ulConfig.lifeSpan = ulLife;

    dlConfig.spawnDelay = particleFreq;
    ulConfig.spawnDelay = particleFreq;

}

function createDownloadParticle() {
  var p = {
    lifeSpan: getRandomSpread(dlConfig.lifeSpan),
    life: 0,
    alpha: getRandom(dlConfig.alpha),
    alphaDecay: getRandom(dlConfig.alphaDecay),
    colour: getColour(dlConfig.colour),
    x: mouse.x,
    y: mouse.y,
    radius: getRandom(dlConfig.radius),
    radiusDecay: getRandom(dlConfig.radiusDecay),
    direction: getRandom(dlConfig.direction),
    speed: getRandomSpread(dlConfig.speed)
  };
  
  downloadParticles.push(p);
}

function createUploadParticle() {
  var p = {
    lifeSpan: getRandomSpread(ulConfig.lifeSpan),
    life: 0,
    alpha: getRandom(ulConfig.alpha),
    alphaDecay: getRandom(ulConfig.alphaDecay),
    colour: getColour(ulConfig.colour),
    x: mouse.x,
    y: mouse.y - 20,
    radius: getRandom(ulConfig.radius),
    radiusDecay: getRandom(ulConfig.radiusDecay),
    direction: getRandom(ulConfig.direction),
    speed: getRandomSpread(ulConfig.speed)
  };
  
  uploadParticles.push(p);
}

function getRandom(o) {
  return Math.random() * (o.max - o.min) + o.min;
}

function getRandomSpread(i) {
    return Math.random() * (i/randomSpreadDivider) + i/randomSpreadDivider;
}

function getColour(a) {
  return a[Math.floor(Math.random() * a.length)];
}

var lastTime = null,
    delta = 0,
    downloadSpawnTimer = 0,
    uploadSpawnTimer = 0;
function update(timestamp) {
  if (lastTime === null) lastTime = timestamp;
  delta = timestamp - lastTime;
  lastTime = timestamp;
  downloadSpawnTimer += delta;
  uploadSpawnTimer += delta;
  
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "white";
  ctx.globalAlpha = 1;
  ctx.fillRect(0, 0, can.width, can.height);
  
  var p;
  for (var i=downloadParticles.length-1; i>=0; i--) {
    p = downloadParticles[i];
    
    p.life += delta;
    if (p.life >= p.lifeSpan) {
      downloadParticles.splice(i, 1);
      continue;
    }
    
    p.alpha -= p.alphaDecay * delta / 1000;
    if (p.alpha <= 0) {
      downloadParticles.splice(i, 1);
      continue;
    }
    
    p.radius -= p.radiusDecay * delta / 1000;
    if (p.radius <= 0) {
      downloadParticles.splice(i, 1);
      continue;
    }
    
    p.x += p.speed * Math.cos(p.direction) * delta / 1000;
    p.y += p.speed * Math.sin(p.direction) * delta / 1000;
  }
  
  for (var i=uploadParticles.length-1; i>=0; i--) {
    p = uploadParticles[i];
    
    p.life += delta;
    if (p.life >= p.lifeSpan) {
      uploadParticles.splice(i, 1);
      continue;
    }
    
    p.alpha -= p.alphaDecay * delta / 1000;
    if (p.alpha <= 0) {
      uploadParticles.splice(i, 1);
      continue;
    }
    
    p.radius -= p.radiusDecay * delta / 1000;
    if (p.radius <= 0) {
      uploadParticles.splice(i, 1);
      continue;
    }
    
    p.x += p.speed * Math.cos(p.direction) * delta / 1000;
    p.y += p.speed * Math.sin(p.direction) * delta / 1000;
  }
  
  if (downloadParticles.length < dlConfig.maxParticles && downloadSpawnTimer >= dlConfig.spawnDelay) {
    createDownloadParticle();
    downloadSpawnTimer -= dlConfig.spawnDelay;
  }
  
  if (uploadParticles.length < ulConfig.maxParticles && uploadSpawnTimer >= ulConfig.spawnDelay) {
    createUploadParticle();
    uploadSpawnTimer -= ulConfig.spawnDelay;
  }
  
  for (var i=0; i<uploadParticles.length; i++) {
    p = uploadParticles[i];
    ctx.fillStyle = p.colour;
    ctx.globalAlpha = p.alpha;
    ctx.fillRect(p.x, p.y, p.radius, p.radius);
  }
  
  ctx.globalCompositeOperation = "hard-light";
  for (var i=0; i<downloadParticles.length; i++) {
    p = downloadParticles[i];
    ctx.fillStyle = p.colour;
    ctx.globalAlpha = p.alpha;
    ctx.fillRect(p.x, p.y, p.radius, p.radius);
  }

  ctx.fillStyle = "#F81810";
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";

  ctx.fillRect(mouse.x, mouse.y, dlConfig.radius.max, dlConfig.radius.max);
  requestAnimationFrame(update);
}

function resizeCanvas() {
  can.width = $("#flame").width();
  can.height = $("#flame").height();
  mouse.x = $("#flame").width() / 2;
  mouse.y = $("#flame").height() / 2;
}
