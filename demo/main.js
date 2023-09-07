import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

// You will need three things
// Camera
// Scene
// Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);
const gridView = new THREE.GridHelper(200, 50);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg") });
const orbitControls = new OrbitControls(camera, renderer.domElement);

scene.add(gridView);

// An object will need:
// A mesh
// A geometry
// Added to the scene
const geometry = new THREE.CapsuleGeometry(2, 20, 30, 30);
const material = new THREE.MeshStandardMaterial({color: 0xFF6B6B});
const mesh = new THREE.Mesh(geometry, material);

// Add some lighting
const lighting = new THREE.PointLight(0xffffff);
lighting.position.set(10, 8, 10);
lighting.intensity = 100;

scene.add(mesh);
scene.add(lighting);

camera.position.z = 30;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.005;
    mesh.rotation.z += 0.01;

    renderer.render(scene, camera);
}

animate();