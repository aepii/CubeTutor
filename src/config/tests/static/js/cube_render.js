import * as THREE from 'three';
import {fetchCubeData, callCubeRotation} from './cube_api.js'; 
import {VALUE_TO_COLOR, FACE_GENERATION_ORDER, CUBE_MAP, FACE_AXIS} from './cube_constants.js';

export class CubeRender{
    constructor(scene, cubeData){
        this.scene = scene;
        this.cubeData = cubeData;

        this.currentFaceMoving;
        this.isClockwise;

        this.rotationSpeed = 0.01
        this.allCubies = [];
        this.pivot = new THREE.Object3D();
        this.isMoving = false;
    };

    // Creates a cube, which holds 3 planes/27 cubies
    createCube(){
        for (let i = 0; i < 3; i+=1){
            this.#createPlane(i);
        }
    };

    doMove(face, direction){
        if (!this.isMoving) {
            this.#attachCubiesupperivot(face);
            this.isMoving = true
            this.currentFaceMoving = face
            this.isClockwise = direction ? 1 : 0
            return true
        } else {
            return false
        }
    };

    // Temporary Rotation only rotates z axis
    animRotate(){
        const [axis, coordinate] = FACE_AXIS[this.currentFaceMoving];
        if (this.pivot.rotation[axis] >= Math.PI / 2) {
            console.log(this.pivot.rotation[axis])
            this.pivot.rotation[axis] = Math.PI / 2;
            this.isMoving = false
            this.#animComplete()
        } else if (this.pivot.rotation[axis] <= Math.PI / -2) {
            console.log(this.pivot.rotation[axis])
            this.pivot.rotation[axis] = Math.PI / -2;
            this.isMoving = false
            this.#animComplete()
        } else {
            this.pivot.rotation[axis] += (-this.isClockwise * coordinate * this.rotationSpeed);
        }

        this.pivot.updateMatrixWorld();
        
        return this.isMoving;
    };

    async #animComplete() {
        // Wait for cube rotation to complete
        await callCubeRotation(this.currentFaceMoving, true); 
        
        fetchCubeData()
        .then(cubeData => {
            this.cubeData = cubeData;
            console.log("FETCHED:", this.cubeData.faces['upper']);
            this.#redrawCube(); 
        });
    }
    
    #redrawCube(){
        this.allCubies.forEach(cubie => {
            this.scene.remove(cubie);
        });
        this.allCubies = [];
        this.pivot.clear();
        this.scene.remove(this.pivot);
        this.createCube();
    }

    // Attach cubies to the pivot once before starting the animation
    #attachCubiesupperivot(face){
        this.pivot.clear();
        const [axis, coordinate] = FACE_AXIS[face]
        // Add cubies to active group, Temporary
        for (let i = 0; i < this.allCubies.length ; i += 1) {
            const cubie = this.allCubies[i]
            const position = cubie.position
            if (this.pivot.children.length != 9 && position[axis] == coordinate){
                this.pivot.add(cubie)
            }
        }

        this.pivot.position.set(0, 0, 0); // Make sure pivot is at the origin
        this.pivot.rotation.set(0, 0, 0);
        this.pivot.updateMatrixWorld();

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

            cubie.position.set(...position);
            this.scene.add(cubie);

            return cubie;
        };

        // Generates colors for a cubie
        const generateCubieColors = (position) => {
            const colors = []; // Array which holds colors
            const totalVertices = 36; // Each cubie has 6 vertices per face
            
            for (let i = 0; i < totalVertices; i += 6) {
                const currentCubieFace = FACE_GENERATION_ORDER[Math.floor(i/6)];
                const key = `(${position[0]},${position[1]},${position[2]})`;
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

        // Adds edges to a cubie
        const addEdgesToCubie = (cubie, position) => {
            const edges = new THREE.EdgesGeometry(cubie.geometry);
            const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: '#000000' }));
            cubie.castShadow = true;
            cubie.receiveShadow = true;
            line.position.set(...position);
            cubie.attach(line);
        };

        const cubie = createCubieMesh(position);
        const colors = generateCubieColors(position);

        setCubieColors(cubie.geometry, colors);
        addEdgesToCubie(cubie, position);

        this.allCubies.push(cubie);
    };

};