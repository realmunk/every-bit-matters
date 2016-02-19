var sizeMult = 2;

var fireConfig = {
  maxParticles: 500,
  spawnDelay: 10,
  lifeSpan: {
    min: 2000,
    max: 2000
  },
  alpha: {
    min: 1.0,
    max: 1.0
  },
  alphaDecay: {
    min: 0.0,
    max: 0.2
  },
  colour: ["#F81810", "#6D0703","#F8D010"],
  radius: {
    min: 10*sizeMult,
    max: 40*sizeMult
  },
  radiusDecay: {
    min: 5,
    max: 10
  },
  direction: {
    min: -Math.PI / 2 + 0.3,
    max: -Math.PI / 2 + 1.3
  },
  speed: {
    min: 50,
    max: 200
  }
};

var smokeConfig = {
  maxParticles: 5,
  spawnDelay: 150,
  lifeSpan: {
    min: 6000,
    max: 10000
  },
  alpha: {
    min: 0.8,
    max: 1.0
  },
  alphaDecay: {
    min: 0,
    max: 0.3
  },
  colour: ["#7CB5EC"],//["#1A1A1A", "#0A0A0A", "#2B2B2B"],
  radius: {
    min: 20*sizeMult,
    max: 40*sizeMult
  },
  radiusDecay: {
    min: 0,
    max: 5
  },
  direction: {
    min: -Math.PI / 2 + 0.3,
    max: -Math.PI / 2 + 1.6
  },
  speed: {
    min: 50,
    max: 100
  }
};

var can = document.querySelector("canvas"),
    ctx = can.getContext("2d"),
    mouse = {
      x: window.innerWidth / 3,
      y: window.innerHeight / 3
    },
    fireParticles = [],
    smokeParticles = [];

window.addEventListener("resize", resize);
/*document.body.addEventListener("mousemove", mouseMove);
document.body.addEventListener("touchmove", touchMove);
document.body.addEventListener("mouseout", mouseOut);
document.body.addEventListener("touchend", mouseOut);*/
resize();
requestAnimationFrame(update);

function createFireParticle() {
  var p = {
    lifeSpan: getRandom(fireConfig.lifeSpan),
    life: 0,
    alpha: getRandom(fireConfig.alpha),
    alphaDecay: getRandom(fireConfig.alphaDecay),
    colour: getColour(fireConfig.colour),
    x: mouse.x,
    y: mouse.y,
    radius: getRandom(fireConfig.radius),
    radiusDecay: getRandom(fireConfig.radiusDecay),
    direction: getRandom(fireConfig.direction),
    speed: getRandom(fireConfig.speed)
  };
  
  fireParticles.push(p);
}

function createSmokeParticle() {
  var p = {
    lifeSpan: getRandom(smokeConfig.lifeSpan),
    life: 0,
    alpha: getRandom(smokeConfig.alpha),
    alphaDecay: getRandom(smokeConfig.alphaDecay),
    colour: getColour(smokeConfig.colour),
    x: mouse.x,
    y: mouse.y - 20,
    radius: getRandom(smokeConfig.radius),
    radiusDecay: getRandom(smokeConfig.radiusDecay),
    direction: getRandom(smokeConfig.direction),
    speed: getRandom(smokeConfig.speed)
  };
  
  smokeParticles.push(p);
}

function getRandom(o) {
  return Math.random() * (o.max - o.min) + o.min;
}

function getColour(a) {
  return a[Math.floor(Math.random() * a.length)];
}

var lastTime = null,
    delta = 0,
    fireSpawnTimer = 0,
    smokeSpawnTimer = 0;
function update(timestamp) {
  if (lastTime === null) lastTime = timestamp;
  delta = timestamp - lastTime;
  lastTime = timestamp;
  fireSpawnTimer += delta;
  smokeSpawnTimer += delta;
  
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "white";
  ctx.globalAlpha = 1;
  ctx.fillRect(0, 0, can.width, can.height);
  
  var p;
  for (var i=fireParticles.length-1; i>=0; i--) {
    p = fireParticles[i];
    
    p.life += delta;
    if (p.life >= p.lifeSpan) {
      fireParticles.splice(i, 1);
      continue;
    }
    
    p.alpha -= p.alphaDecay * delta / 1000;
    if (p.alpha <= 0) {
      fireParticles.splice(i, 1);
      continue;
    }
    
    p.radius -= p.radiusDecay * delta / 1000;
    if (p.radius <= 0) {
      fireParticles.splice(i, 1);
      continue;
    }
    
    p.x += p.speed * Math.cos(p.direction) * delta / 1000;
    p.y += p.speed * Math.sin(p.direction) * delta / 1000;
  }
  
  for (var i=smokeParticles.length-1; i>=0; i--) {
    p = smokeParticles[i];
    
    p.life += delta;
    if (p.life >= p.lifeSpan) {
      smokeParticles.splice(i, 1);
      continue;
    }
    
    p.alpha -= p.alphaDecay * delta / 1000;
    if (p.alpha <= 0) {
      smokeParticles.splice(i, 1);
      continue;
    }
    
    p.radius -= p.radiusDecay * delta / 1000;
    if (p.radius <= 0) {
      smokeParticles.splice(i, 1);
      continue;
    }
    
    p.x += p.speed * Math.cos(p.direction) * delta / 1000;
    p.y += p.speed * Math.sin(p.direction) * delta / 1000;
  }
  
  if (fireParticles.length < fireConfig.maxParticles && fireSpawnTimer >= fireConfig.spawnDelay) {
    createFireParticle();
    fireSpawnTimer -= fireConfig.spawnDelay;
  }
  
  if (smokeParticles.length < smokeConfig.maxParticles && smokeSpawnTimer >= smokeConfig.spawnDelay) {
    createSmokeParticle();
    smokeSpawnTimer -= smokeConfig.spawnDelay;
  }
  
  for (var i=0; i<smokeParticles.length; i++) {
    p = smokeParticles[i];
    ctx.fillStyle = p.colour;
    ctx.globalAlpha = p.alpha;
    ctx.fillRect(p.x, p.y, p.radius, p.radius);
  }
  
  ctx.globalCompositeOperation = "hard-light";
  for (var i=0; i<fireParticles.length; i++) {
    p = fireParticles[i];
    ctx.fillStyle = p.colour;
    ctx.globalAlpha = p.alpha;
    ctx.fillRect(p.x, p.y, p.radius, p.radius);
  }

  ctx.fillStyle = "#222";
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";

  ctx.fillRect(mouse.x, mouse.y, fireConfig.radius.max, fireConfig.radius.max);
  requestAnimationFrame(update);
}

function resize() {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
  mouse.x = window.innerWidth / 3.5;
  mouse.y = window.innerHeight / 1.35;
}
