import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

////
// Creating a scene
////

/* 
* Will always need three objects
*   - Scene
*   - Camera
*   - Renderer
*/

// Scene is like a container that contains all of your objects, cameras, and lights
const scene = new THREE.Scene();

// Perspective camera = Designed to mimic what human eyes can see
const camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000); // Args: FOV, Aspect ratio, last two args for the view frustum

// View Frustrum - To control which objects are visible relative to the camera itself

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

////
// Creating Objects
////

/*
* There are three basic steps to create an object
*   1. Geometry
*   2. Material - The wrapping paper for an object
*   3. Mesh - Create a mesh by combining the geometry with the material
*/

// Geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial({color: 0xff6347, wireframe: true});
// Some materials will need light bouncing off of it
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(10, 8, 10);
// pointLight.intensity = 106;

// Ambient light is more like a flood light in a room and will light up everything in the scene equally
const ambientLight = new THREE.AmbientLight(0xffffff);

const mesh = new THREE.Mesh(geometry, material);

// Shows where the light source is
// const lightHelper = new THREE.PointLightHelper(pointLight);

// Draws a 2d grid along the scene
const gridHelper = new THREE.GridHelper(200, 50);

// Listen to dom events on the mouse and update the camera position accordingly
const orbitControls = new OrbitControls(camera, renderer.domElement);

// Render the scene
// scene.add(lightHelper);
scene.add(mesh);
// scene.add(gridHelper);
scene.add(ambientLight);
// scene.add(pointLight);


// Add a bunch of rng positioned stars
function addRngStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);

    scene.add(star);
}

Array(200).fill().forEach(addRngStar);

// Loading the background
const spaceTexture = new THREE.TextureLoader().load("space.jpeg");
const moonTexture = new THREE.TextureLoader().load("moon.jpeg");
const normalMap = new THREE.TextureLoader().load("normal.jpeg");
scene.background = spaceTexture;

// Make the moon
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 30, 30),
    new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalMap })
);

moon.position.z = 30;
moon.position.x = -10;
scene.add(moon);


function moveCamera() {
    // We first need to calculate where the user is currently scrolled to
    const t = document.body.getBoundingClientRect().top;

    moon.position.x += 0.01;
    moon.position.y += 0.075;
    moon.position.z += 0.01;

    camera.position.z = t * -0.02;
    camera.position.y = t * -0.0002;
    camera.position.x = t * -0.002;
}

document.body.onscroll = moveCamera;

// You don't want call the render method over and over again, a better approach is to setup a recursive function
// renderer.render(scene, camera);
function animate() {
    // Mechanism that tells the browser you want to perform an animation
    requestAnimationFrame(animate);

    // Every object we create has different properties like rotation, position, and scale
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.005;
    mesh.rotation.z += 0.1;


    renderer.render(scene, camera);
}

animate();