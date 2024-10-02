import * as THREE from './three.module.js';

// Color map
const VALUETOCOLOR = {
    0: new THREE.Color("gray"), // gray
    1: new THREE.Color("green"), // default front
    2: new THREE.Color("blue"), // default back 
    3: new THREE.Color("orange"), // default left 
    4: new THREE.Color("red"), // default right 
    5: new THREE.Color("white"), // default top 
    6: new THREE.Color("yellow") // default bottom 
};

// The order in which faces on a cubie are generated
const CUBIEFACEORDER = ['right', 'left', 'top', 'bottom', 'front', 'back']

// Cube map
const CUBEMAP = {
    "(-1,-1,-1)": { "front": 1, "left": 3, "bottom": 6},
    "(0,-1,-1)": { "front": 1, "bottom": 6},
    "(1,-1,-1)": { "front": 1, "right": 4, "bottom": 6},
    "(-1,0,-1)": { "front": 1, "left": 3},
    "(0,0,-1)": { "front": 1},
    "(1,0,-1)": { "front": 1, "right": 4},
    "(-1,1,-1)": { "front": 1, "left": 3, "top": 5},
    "(0,1,-1)": { "front": 1, "top": 5},
    "(1,1,-1)": { "front": 1, "right": 4, "top": 5}
};

// Set up Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create and setup Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a Cube
const cube = new THREE.Group();

const createCubie = (position) => {

    // Create Cubie
    const geometry = new THREE.BoxGeometry().toNonIndexed(); // Non-indexed Geometry
    const material = new THREE.MeshBasicMaterial({ vertexColors: true }); // Create material with vertex color support
    const cubie = new THREE.Mesh(geometry, material); // Create a mesh for cubie
    
    cubie.position.set(...position);

    // Generate color data for each vertex
    const positionAttribute = geometry.getAttribute('position'); // Get position attribute
    const colors = []; // Array to hold colors

    // Create an array to hold vertex colors
    let genPointer = 0
    for (let i = 0; i < positionAttribute.count; i += 6){

        const currentCubieFace = CUBIEFACEORDER[genPointer];
        const key = `(${position[0]},${position[1]},${position[2]})`;
        const colorsDict = CUBEMAP[key] || {};

        const value = colorsDict[currentCubieFace] || 0;
        
        const color = VALUETOCOLOR[value];
        console.log(color, position, currentCubieFace);
        for(let j =0; j < 6; j+= 1) {
            colors.push(color.r, color.g, color.b); 
        };
        genPointer += 1
    };

    // Set the color attribute in geometry
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    cube.add(cubie)
};

const createPlane = (j) => {
    for (let i = 0; i < 9; i+=1){
        const position = [(i%3)-1,Math.floor(i/3)-1,(j%3)-1];
        createCubie(position);
    };
};

const createCube = (cubeData) => {
    for (let i = 0; i < 1; i+=1){
        createPlane(i)
    };
};

fetch('/api/cube/')
        .then(response => response.json())
        .then(cubeData => {
            console.log("GOT CUBE")
            createCube(cubeData);
        })
        .catch(error => console.error('Error fetching cube data:', error));

scene.add(cube); 

camera.position.z = 5;
camera.position.y = -2.5;
camera.position.x = -2.5;


const animate = function () {
    requestAnimationFrame(animate);
    //cube.rotation.x -= 0.01; // Rotate around the x-axis
    //cube.rotation.y -= 0.01; // Rotate around the y-axis
    renderer.render(scene, camera);
};

animate();
