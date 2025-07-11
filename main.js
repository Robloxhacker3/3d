const socket = io();

// Setup Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 800/600, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);
document.getElementById('game').appendChild(renderer.domElement);

// Add simple fighters (boxes)
const geometry = new THREE.BoxGeometry(1, 2, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(geometry, material1);
const opponent = new THREE.Mesh(geometry, material2);
scene.add(player);
scene.add(opponent);

player.position.x = -2;
opponent.position.x = 2;

camera.position.z = 8;

// Handle simple input
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') player.position.x -= 0.1;
  if (e.key === 'ArrowRight') player.position.x += 0.1;
  // Send action to server
  socket.emit('player-action', { x: player.position.x });
});

// Listen for opponent moves
socket.on('player-action', (data) => {
  opponent.position.x = data.x;
});

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
