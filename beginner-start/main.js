import * as ThreeJS from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new ThreeJS.Scene();
const camera = new ThreeJS.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new ThreeJS.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const points = [];
points.push( new ThreeJS.Vector3( -2, 0, 0 ));
points.push( new ThreeJS.Vector3( 0, 2, 0 ));
points.push( new ThreeJS.Vector3( 2, 0, 0));
points.push( new ThreeJS.Vector3( -2, 0, 0));

// const geometry = new ThreeJS.BoxGeometry(1, 1, 1);
const geometry = new ThreeJS.BufferGeometry().setFromPoints(points);
// const material = new ThreeJS.MeshBasicMaterial({ color: 0x00ff00 });
const material = new ThreeJS.LineBasicMaterial({color: 0x0000ff});
// const cube = new ThreeJS.Mesh(geometry, material);
const line = new ThreeJS.Line(geometry, material);

scene.add(line);
camera.position.z = 5;

// Need to render the scene
function animate() {
    requestAnimationFrame(animate);
    // line.rotation.x += 0.01;
    line.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();