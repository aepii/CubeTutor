import * as THREE from './three.module.js';
import {fetchCubeData, rotateCube} from './cube_api.js';
import {VALUE_TO_COLOR, FACE_GENERATION_ORDER, CUBE_MAP} from './cube_constants.js';

// API

fetchCubeData()
    .then(cubeData => {
        console.log("FETCH");
        createCube(cubeData);
    });

// Call this function when the rotation is finished
const onRotationComplete = async (face) => {
    const updatedCubeData = await rotateCube(face);
    console.log('Updated cube:', updatedCubeData);
    // Optionally update the cube state on the front end
};

// Set up Scene and Camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x003632)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.x = -2;
camera.position.y = 2;
camera.position.z = 7.5;

// Create and setup Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Array to hold all cubies
const allCubies = [];
// Pivot which holds the cubies affected by a rotation
const pivot = new THREE.Object3D();
// Cubies to be rotated
const activeGroup = [];

// Create a cubie
const createCubie = (cubeData, position) => {
    const cubie = createCubieMesh(position);
    const colors = generateCubieColors(cubeData, position);
    setCubieColors(cubie.geometry, colors);
    addEdgesToCubie(cubie, position);
    
    // TEMPORARY FOR TESTING
    if(activeGroup.length != 9 && position[2] == 1){
        activeGroup.push(cubie);
    }

    allCubies.push(cubie);
};

const createCubieMesh = (position) => {
    const geometry = new THREE.BoxGeometry().toNonIndexed();
    const material = new THREE.MeshBasicMaterial({ vertexColors: true });
    const cubie = new THREE.Mesh(geometry, material);
    cubie.position.set(...position);
    scene.add(cubie);
    return cubie;
};

const generateCubieColors = (cubeData, position) => {
    const colors = [];
    const positionAttribute = new THREE.BoxGeometry().toNonIndexed().getAttribute('position'); // Create temp geometry for attribute
    let faceIndex = 0;

    for (let i = 0; i < positionAttribute.count; i += 6) {
        const currentCubieFace = FACE_GENERATION_ORDER[faceIndex];
        const key = `(${position[0]},${position[1]},${position[2]})`;
        const colorsDict = CUBE_MAP[key] || {};
        const [col, row] = colorsDict[currentCubieFace] || [-1, -1];

        const value = col === -1 ? 0 : cubeData.faces[currentCubieFace][col][row];
        const color = VALUE_TO_COLOR[value];

        for (let j = 0; j < 6; j += 1) {
            colors.push(color.r, color.g, color.b);
        }
        faceIndex += 1;
    }

    return colors;
};

const setCubieColors = (geometry, colors) => {
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
};

const addEdgesToCubie = (cubie, position) => {
    const edges = new THREE.EdgesGeometry(cubie.geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: '#000000' }));
    line.position.set(...position);
    cubie.attach(line);
};

const createPlane = (cubeData, j) => {
    for (let i = 0; i < 9; i+=1){
        const position = [(i%3)-1,Math.floor(i/3)-1,(j%3)-1];
        createCubie(cubeData, position);
    };
};

const createCube = (cubeData) => {
    for (let i = 0; i < 3; i+=1){
        createPlane(cubeData, i)
    };
    attachCubiesToPivot();
    render(0.01);
};

let isRotationComplete = false; // Track if rotation is done

// Temporary Rotation only rotates z axis
const rotate = (rotationSpeed) => {
    // Rotate only if the current rotation is less than Math.PI / 2
    if (pivot.rotation.z < Math.PI / 2) {
        // Increment the rotation, but clamp it to a maximum of Math.PI / 2
        pivot.rotation.z = Math.min(pivot.rotation.z + rotationSpeed, Math.PI / 2);
    } else {
        // Ensure the final rotation is exactly Math.PI / 2
        pivot.rotation.z = Math.PI / 2;
        isRotationComplete = true;
        pivot.clear()
        for (let i in activeGroup) {
            console.log(activeGroup[i].rotation)
            scene.add(activeGroup[i]);
        }

        //console.log(pivot,"Rotation complete");
        onRotationComplete('front')
    }

    pivot.updateMatrixWorld();
};

// Attach cubies to the pivot once before starting the animation
const attachCubiesToPivot = () => {
    pivot.position.set(0, 0, 0); // Make sure pivot is at the origin
    pivot.rotation.set(0, 0, 0);
    pivot.updateMatrixWorld();
    scene.add(pivot); // Add pivot to the scene
    // Attach cubies to the pivot only once
    for (let i in activeGroup) {
        console.log(activeGroup[i].rotation)
        pivot.add(activeGroup[i]);
    }
};

// Animate function remains mostly the same
const render = function (rotationSpeed) {
    requestAnimationFrame(() => render(rotationSpeed));
    if (!isRotationComplete) {
        rotate(rotationSpeed); // Only rotate if not complete
    }

    renderer.render(scene, camera);
};

