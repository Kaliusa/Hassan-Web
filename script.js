// Animation setup for the background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.animation-container').appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
}

Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.1;
}

Particle.prototype.draw = function() {
    ctx.fillStyle = 'rgba(255, 165, 0, 0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function init() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.size <= 0) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

init();
animate();

// Dropdown menu functionality
const menuButton = document.getElementById('menuButton');
const menuDropdown = document.getElementById('menuDropdown');

menuButton.addEventListener('click', function() {
    menuDropdown.style.display = menuDropdown.style.display === 'block' ? 'none' : 'block';
});

// Close the dropdown if clicked outside
window.addEventListener('click', function(event) {
    if (!menuButton.contains(event.target) && !menuDropdown.contains(event.target)) {
        menuDropdown.style.display = 'none';
    }
});
