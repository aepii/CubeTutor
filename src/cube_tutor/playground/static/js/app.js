import * as THREE from 'three';
import {CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {KEY_TO_FACE} from './cube_constants.js';
import {CubeRender} from './cube_render.js';
import {fetchCubeData} from './cube_api.js';

// Select the container div
const container = document.querySelector('.canvas-container');

// Set up Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, container.clientWidth / container.clientHeight);

camera.position.x = 5 * Math.sin(Math.PI/4); // X position
camera.position.y = 5 * Math.sin(Math.PI/6); // Y position
camera.position.z = 5 * Math.cos(Math.PI/4); // Z position

// Make the camera look at the center of the scene
camera.lookAt(0, 0, 0);

// Create and setup Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true } );
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    camera.aspect = container.clientWidth / container.clientHeight;
    
    camera.updateProjectionMatrix();

    renderer.setSize( container.clientWidth, container.clientHeight );
}

// Set up lighting
const ambientLight = new THREE.AmbientLight("white", Math.PI/1.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("white", .5);
scene.add(directionalLight);

// Set up controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false

// Set up info
const textRenderer = new CSS2DRenderer()

let cubeRender;
let isMoving = false;
let isClockwise = true;

// Setup Cube
fetchCubeData().then(cubeData => {
    cubeRender = new CubeRender(scene, cubeData);
    cubeRender.createCube();
});

// Render scene
const render = function (time) {
    requestAnimationFrame(render);

    const deltaTime = time / 1000 // time is in milliseconds, so divide by 1000 to convert to seconds

    // Call animation with deltaTime
    if (isMoving){
        isMoving = cubeRender.animateRotate(deltaTime)
    }

    directionalLight.position.copy(camera.position);
    controls.update();
    renderer.render(scene, camera);
};

// Listen for keylower events
document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;

    if (!isMoving){
        if (KEY_TO_FACE[keyPressed]  && cubeRender) { // Check if cubeRender is defined
            const face = KEY_TO_FACE[keyPressed]
            isMoving = cubeRender.setupMove(face, isClockwise);
        }
    }
    
    if (keyPressed === "Enter"){
        isClockwise = !isClockwise
    }
});

// Start rendering
render();
