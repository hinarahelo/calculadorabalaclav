const particlesRoot = document.getElementById("particles");

if (particlesRoot) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  particlesRoot.appendChild(canvas);

  const DESKTOP_COUNT = 90;
  const MOBILE_COUNT = 55;
  const particles = [];
  let animationId = null;
  let resizeTimer = null;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createParticle() {
    return {
      x: random(0, window.innerWidth),
      y: random(0, window.innerHeight),
      size: random(1, 3.2),
      speedX: random(-0.18, 0.18),
      speedY: random(-0.22, -0.04),
      alpha: random(0.2, 0.9),
      alphaSpeed: random(0.003, 0.012),
      glow: random(8, 22)
    };
  }

  function createParticles() {
    particles.length = 0;

    const total = window.innerWidth < 768 ? MOBILE_COUNT : DESKTOP_COUNT;

    for (let i = 0; i < total; i += 1) {
      particles.push(createParticle());
    }
  }

  function updateParticle(particle) {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.alpha += particle.alphaSpeed;

    if (particle.alpha >= 1 || particle.alpha <= 0.15) {
      particle.alphaSpeed *= -1;
    }

    if (particle.y < -20) {
      particle.y = window.innerHeight + 20;
      particle.x = random(0, window.innerWidth);
    }

    if (particle.x < -20) {
      particle.x = window.innerWidth + 20;
    }

    if (particle.x > window.innerWidth + 20) {
      particle.x = -20;
    }
  }

  function drawParticle(particle) {
    ctx.save();

    ctx.globalAlpha = particle.alpha;
    ctx.shadowBlur = particle.glow;
    ctx.shadowColor = "#c084fc";
    ctx.fillStyle = "#a855f7";

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawLinks() {
    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i];
        const b = particles[j];

        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          const opacity = (1 - distance / 110) * 0.14;

          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = "#a855f7";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function drawBackgroundGlow() {
    const gradient = ctx.createRadialGradient(
      window.innerWidth * 0.5,
      window.innerHeight * 0.25,
      0,
      window.innerWidth * 0.5,
      window.innerHeight * 0.25,
      window.innerWidth * 0.45
    );

    gradient.addColorStop(0, "rgba(168,85,247,0.08)");
    gradient.addColorStop(1, "rgba(168,85,247,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    drawBackgroundGlow();

    for (let i = 0; i < particles.length; i += 1) {
      updateParticle(particles[i]);
      drawParticle(particles[i]);
    }

    drawLinks();

    animationId = requestAnimationFrame(animate);
  }

  function setup() {
    resizeCanvas();
    createParticles();

    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    animate();
  }

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setup, 120);
  });

  setup();
}
