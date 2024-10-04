import * as THREE from 'three';
import {KEY_TO_FACE} from './cube_constants.js';
import {CubeRender} from './cube_render.js';
import {fetchCubeData} from './cube_api.js';

// Set up Scene and Camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x003632);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 7;

// Create and setup Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let cubeRender;
let isMoving = false;

// Setup Cube
fetchCubeData()
.then(cubeData => {
    cubeRender = new CubeRender(scene, cubeData);
    console.log(cubeRender);
    cubeRender.createCube();
});

// Render scene
const render = function () {
    requestAnimationFrame(() => render());
    if (isMoving){
        isMoving = cubeRender.animRotate()
    }
    renderer.render(scene, camera);
};

// Listen for keylower events
document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;

    if (!isMoving){
        if (KEY_TO_FACE[keyPressed]  && cubeRender) { // Check if cubeRender is defined
            const face = KEY_TO_FACE[keyPressed]
            console.log("DO MOVE")
            isMoving = cubeRender.doMove(face, true);
        } else if (keyPressed === "Enter"){
            console.log(`Key ${keyPressed} was pressed.`);
        }
    }
});

// Start rendering
render();
