import * as THREE from 'three';

export const GAP = .05; // Determine how far apart cubies should be

// Colors associated with a value
export const VALUE_TO_COLOR = {
    0: new THREE.Color(0x232b2b),
    1: new THREE.Color("green"),
    2: new THREE.Color("blue"),
    3: new THREE.Color("orange"),
    4: new THREE.Color("red"),
    5: new THREE.Color("white"),
    6: new THREE.Color("yellow")
};

// The order in which the cube is generated
export const FACE_GENERATION_ORDER = ['right', 'left', 'upper', 'lower', 'front', 'back'];

// Map serialized cube data to 3D position
export const CUBE_MAP = {
    "(-1,-1,-1)": {"back": [2,2], "left": [2,0], "lower": [2,0]},
    "(0,-1,-1)": {"back": [2,1], "lower": [2,1]},
    "(1,-1,-1)": {"back": [2,0], "right": [2,2], "lower": [2,2]},
    "(-1,0,-1)": {"back": [1,2], "left": [1,0]},
    "(0,0,-1)": {"back": [1,1]},
    "(1,0,-1)": {"back": [1,0], "right": [1,2]},
    "(-1,1,-1)": {"back": [0,2], "left": [0,0], "upper": [0,0]},
    "(0,1,-1)": {"back": [0,1], "upper": [0,1]},
    "(1,1,-1)": {"back": [0,0], "right": [0,2], "upper": [0,2]},
    "(-1,-1,0)": {"left": [2,1], "lower": [1,0]},
    "(0,-1,0)": {"lower": [1,1]},
    "(1,-1,0)": {"right": [2,1], "lower": [1,2]},
    "(-1,0,0)": {"left": [1,1]},
    "(0,0,0)": {},
    "(1,0,0)": {"right": [1,1]},
    "(-1,1,0)": {"left": [0,1], "upper": [1,0]},
    "(0,1,0)": {"upper": [1,1]},
    "(1,1,0)": {"right": [0,1], "upper": [1,2]},
    "(-1,-1,1)": {"front": [2,0], "left": [2,2], "lower": [0,0]},
    "(0,-1,1)": {"front": [2,1], "lower": [0,1]},
    "(1,-1,1)": {"front": [2,2], "right": [2,0], "lower": [0,2]},
    "(-1,0,1)": {"front": [1,0], "left": [1,2]},
    "(0,0,1)": {"front": [1,1]},
    "(1,0,1)": {"front": [1,2], "right": [1,0]},
    "(-1,1,1)": {"front": [0,0], "left": [0,2], "upper": [2,0]},
    "(0,1,1)": {"front": [0,1], "upper": [2,1]},
    "(1,1,1)": {"front": [0,2], "right": [0,0], "upper": [2,2]}
};

// Map faces to axis and direction
export const FACE_AXIS = {
    'front': ['z', 1],
    'back': ['z', -1],
    'left': ['x', -1],
    'right': ['x', 1],
    'upper': ['y', 1],
    'lower': ['y', -1]
};

// Map keys to face
export const KEY_TO_FACE = {
    'f': 'front',
    'b': 'back',
    'l': 'left',
    'r': 'right',
    'u': 'upper',
    'd': 'lower'
}