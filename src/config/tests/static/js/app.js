import * as THREE from 'three';
import {CubeRender} from './cube_render.js';
import {fetchCubeData} from './cube_api.js';

// Set up Scene and Camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x003632);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.x = -2;
camera.position.y = 2;
camera.position.z = 7;

// Create and setup Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let cubeRender; // Declare cubeRender variable outside the fetch function
let isMoving = false; // Flag to check if cube is currently moving

// API
fetchCubeData()
.then(cubeData => {
    console.log("FETCH");
    cubeRender = new CubeRender(scene, cubeData); // Assign to the declared variable
    console.log(cubeRender);
    cubeRender.createCube();
});

// Animate function remains mostly the same
const render = function () {
    requestAnimationFrame(() => render());
    if (isMoving){
        isMoving = !cubeRender.animRotate()
    }
    renderer.render(scene, camera);
};

// Listen for keydown events
document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;

    if (keyPressed === 'f' && cubeRender) { // Check if cubeRender is defined
        console.log("F pressed");
        isMoving = cubeRender.doMove('front', -1);
    } else {
        console.log(`Key ${keyPressed} was pressed.`);
    }
});

// Start rendering
render();
