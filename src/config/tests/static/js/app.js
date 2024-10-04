import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {KEY_TO_FACE} from './cube_constants.js';
import {CubeRender} from './cube_render.js';
import {fetchCubeData} from './cube_api.js';

// Set up Scene and Camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x003632);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);

camera.position.x = 5 * Math.sin(Math.PI/4); // X position
camera.position.y = 5 * Math.sin(Math.PI/4); // Y position
camera.position.z = 5 * Math.cos(Math.PI/6); // Z position

// Make the camera look at the center of the scene
camera.lookAt(0, 0, 0);

// Create and setup Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up lighting
const ambientLight = new THREE.AmbientLight(0xe0e0e0, Math.PI); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xe0e0e0, Math.PI);
directionalLight.position.set(5, 5, 5); // Position the light
scene.add(directionalLight);

// Set up controls
const controls = new OrbitControls(camera, renderer.domElement);

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
    controls.update();
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
