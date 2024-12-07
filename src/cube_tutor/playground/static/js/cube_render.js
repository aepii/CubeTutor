import * as THREE from 'three'; // Import Three.js module
import {fetchCubeData, callCubeRotation} from './cube_api.js'; // Import cube API
import {VALUE_TO_COLOR, FACE_GENERATION_ORDER, CUBE_MAP, FACE_AXIS, GAP} from './cube_constants.js'; // Import cube constants

// CubeRender class responsible for rendering the cube
export class CubeRender{
    // Construct CubeRender given scene and cubeData
    constructor(scene, cubeData){
        this.scene = scene; // Hold the Three.js scene
        this.cubeData = cubeData; // Hold serializd cube data

        this.currentFaceMoving; // Hold face currently being moved
        this.isClockwise; // Hold whether the move should be: 1: Clockwise, -1: Counterclockwise

        this.rotationSpeed = 0.01 // Animation rotation speed
        this.allCubies = []; // Hold all Three.js cubies
        this.pivot = new THREE.Object3D(); // Create a pivot point, responsible for rotating a face.
        this.isMoving = false; // Flag if an animation is in process
    };

    // Creates a cube, which holds 3 planes/27 cubies
    createCube(){
        for (let i = 0; i < 3; i+=1){
            this.#createPlane(i); 
        }
    };

    // Set up the cube for a move and return a flag indicating if the cube is moving
    setupMove(face, direction){
        // If the cube is not already moving, set up the movement flags and pivot
        if (!this.isMoving) {
            this.isMoving = true; // Mark the cube as moving
            this.currentFaceMoving = face; // Set the face currently being moved
            this.isClockwise = direction ? 1 : -1; // Set the direction of movement (clockwise or counter-clockwise)
            this.#attachCubiesToPivot(face); // Attach the cubies to the pivot based on the face
        }
        return this.isMoving; // Return the movement status of the cube
    };

    // Perform animation on cube
    animateRotate(){
        const [axis, direction] = FACE_AXIS[this.currentFaceMoving]; // Get axis and direction from face currently being moved
        // If the rotation is greatero Math.PI / 2, stop the animation
        if (this.pivot.rotation[axis] > Math.PI / 2) {
            this.pivot.rotation[axis] = Math.PI / 2; // Set to exact limit
            this.isMoving = false // Set is moving flag to false
            this.#animComplete() // Call animation complete
        } 
        // If the rotation is less than to Math.PI / -2, stop the animation
        else if (this.pivot.rotation[axis] < Math.PI / -2) {
            this.pivot.rotation[axis] = Math.PI / -2; // Set to exact limit
            this.isMoving = false // Set is moving flag to false
            this.#animComplete() // Call animation complete
        } 
        else {
            this.pivot.rotation[axis] += (-this.isClockwise * direction * this.rotationSpeed); // Apply rotation speed
        }
        this.pivot.updateMatrixWorld(); // Update the pivot's world matrix
        
        return this.isMoving; // Return whether cube is still moving or not
    };

    // Asynchronous task when animation is complete
    async #animComplete() {
        try {
            // Wait for cube rotation to complete and store the cubeData
            const cubeData = await callCubeRotation(this.currentFaceMoving, this.isClockwise === 1 ? true : false);
            this.cubeData = cubeData; // Store cubeData
            this.#redrawCube(); // Redraw the cube with updated data
        } catch (error) {
            console.error('Error completing animation:', error);
        }
    }

    // Redraw the cube
    #redrawCube(){
        // Remove all cubies from scene
        this.allCubies.forEach(cubie => {
            this.scene.remove(cubie);
        });
        this.allCubies = []; // Empty cubie array
        this.pivot.clear(); // Clear pivot
        this.createCube(); // Recreate cube
    }

    // Attach cubies to the pivot once before starting the animation
    #attachCubiesToPivot(face){
        const [axis, direction] = FACE_AXIS[face] // Get axis and direction from face currently being moved
        
        // Add cubies to active group
        for (const cubie of this.allCubies) {
            const position = cubie.position;
            // If the pivot already has 9 children, stop the loop early
            if (this.pivot.children.length == 9) {
                break;
            }
            // Add cubie to pivot if it matches the specified condition
            if (position[axis] == direction + (direction * GAP)) {
                this.pivot.add(cubie);
            }
        }

        this.pivot.position.set(0, 0, 0); // Make sure pivot is at the origin
        this.pivot.rotation.set(0, 0, 0); // Set the pivot rotation to the origin
        this.pivot.updateMatrixWorld(); // Update the pivot's world matrix

        this.scene.add(this.pivot); // Add pivot to the scene
    };

    // Creates a plane which holds 9 cubies
    #createPlane(slice){
        for (let i = 0; i < 9; i+=1){
            const position = [(i%3)-1,Math.floor(i/3)-1,(slice%3)-1];
            this.#createCubie(position);
        }
    };

    // Creates a cubie
    #createCubie = (position) => {
        // Creates a mesh for the cubie
        const createCubieMesh = (position) => {
            const geometry = new THREE.BoxGeometry().toNonIndexed();
            const material = new THREE.MeshPhongMaterial({ vertexColors: true });
            const cubie = new THREE.Mesh(geometry, material);

            cubie.position.set(...position.map(coord => coord * (1 + GAP))); // Add gaps between cubies.
            this.scene.add(cubie);

            return cubie;
        };

        // Generates colors for a cubie
        const generateCubieColors = (position) => {
            const colors = []; // Array which holds colors
            const totalVertices = 36; // Each cubie has 6 vertices per face
            
            for (let i = 0; i < totalVertices; i += 6) {
                const currentCubieFace = FACE_GENERATION_ORDER[Math.floor(i/6)]; // Each face has 6 vertices
                const key = `(${position[0]},${position[1]},${position[2]})`; // Get the key which will determine value associated to face
                const colorsDict = CUBE_MAP[key] || {};
                const cubieFaceMapping = colorsDict[currentCubieFace];

                let colorValue = 0; // Default value for unmapped faces
                if (cubieFaceMapping) {
                    const [col, row] = cubieFaceMapping;
                    colorValue = this.cubeData.faces[currentCubieFace][col][row];
                }

                const color = VALUE_TO_COLOR[colorValue]; // Translates color value to an actual color

                // Push colors for each vertex
                for (let j = 0; j < 6; j += 1) {
                    colors.push(color.r, color.g, color.b);
                }
            }

            return colors;
        };

        // Sets colors for a cubie
        const setCubieColors = (geometry, colors) => {
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        };

        const cubie = createCubieMesh(position);
        const colors = generateCubieColors(position);

        setCubieColors(cubie.geometry, colors);

        this.allCubies.push(cubie);
    };

};