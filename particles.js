const particlesRoot = document.getElementById("particles");

if (particlesRoot) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  particlesRoot.appendChild(canvas);

  const particles = [];
  const PARTICLE_COUNT = 120;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles.length = 0;

    for (let i = 0; i < PARTICLE_COUNT; i += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.3,
        speed: Math.random() * 0.5 + 0.1
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#a855f7";

    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      particle.y += particle.speed;

      if (particle.y > canvas.height) {
        particle.y = -10;
        particle.x = Math.random() * canvas.width;
      }
    });

    requestAnimationFrame(animate);
  }

  resizeCanvas();
  createParticles();
  animate();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });
}
