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
/*
(Position): {face: [index]}
*/
const CUBEMAP = {
    // Negative Slice
    "(-1,-1,-1)": {"back": [2,2], "left": [2,0], "bottom": [2,0]},
    "(0,-1,-1)": {"back": [2,1], "bottom": [2,1]},
    "(1,-1,-1)": {"back": [2,0], "right": [2,2], "bottom": [2,2]},

    "(-1,0,-1)": {"back": [1,2], "left": [1,0]},
    "(0,0,-1)": {"back": [1,1]},
    "(1,0,-1)": {"back": [1,0], "right": [1,2]},

    "(-1,1,-1)": {"back": [0,2], "left": [0,0], "top": [0,0]},
    "(0,1,-1)": {"back": [0,1], "top": [0,1]},
    "(1,1,-1)": {"back": [0,0], "right": [0,2], "top": [0,2]},

    // Neutral Slice
    "(-1,-1,0)": {"left": [2,1], "bottom": [1,0]},
    "(0,-1,0)": {"bottom": [1,1]},
    "(1,-1,0)": {"right": [2,1], "bottom": [1,2]},

    "(-1,0,0)": {"left": [1,1]},
    "(0,0,0)": {},
    "(1,0,0)": {"right": [1,1]},

    "(-1,1,0)": {"left": [0,1], "top": [1,0]},
    "(0,1,0)": {"top": [1,1]},
    "(1,1,0)": {"right": [0,1], "top": [1,2]},

    // Positive Slice
    "(-1,-1,1)": {"front": [2,0], "left": [2,2], "bottom": [0,0]},
    "(0,-1,1)": {"front": [2,1], "bottom": [0,1]},
    "(1,-1,1)": {"front": [2,2], "right": [2,0], "bottom": [0,2]},

    "(-1,0,1)": {"front": [1,0], "left": [1,2]},
    "(0,0,1)": {"front": [1,1]},
    "(1,0,1)": {"front": [1,2], "right": [1,0]},

    "(-1,1,1)": {"front": [0,0], "left": [0,2], "top": [2,0]},
    "(0,1,1)": {"front": [0,1], "top": [2,1]},
    "(1,1,1)": {"front": [0,2], "right": [0,0], "top": [2,2]},
};

// Set up Scene and Camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x003632)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create and setup Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a Cube
const cube = new THREE.Group();

const createCubie = (cubeData, position) => {

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

        let value;

        const currentCubieFace = CUBIEFACEORDER[genPointer];
        const key = `(${position[0]},${position[1]},${position[2]})`;
        const colorsDict = CUBEMAP[key] || {};

        const [col, row] = colorsDict[currentCubieFace] || [-1, -1];

        if (col == -1){
            value = 0
        }else{
            value = cubeData.faces[currentCubieFace][col][row]
        };

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
};

fetch('/api/cube/')
        .then(response => response.json())
        .then(cubeData => {
            console.log("GOT CUBE")
            createCube(cubeData);
        })
        .catch(error => console.error('Error fetching cube data:', error));

scene.add(cube); 

//camera.position.x = 2.5;
//camera.position.y = 2.5;
camera.position.z = 5;


const animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x -= 0.01; // Rotate around the x-axis
    cube.rotation.y -= 0.01; // Rotate around the y-axis
    renderer.render(scene, camera);
};

animate();
