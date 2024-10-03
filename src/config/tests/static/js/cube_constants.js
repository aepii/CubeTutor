import * as THREE from 'three';

export const VALUE_TO_COLOR = {
    0: new THREE.Color("gray"),
    1: new THREE.Color("green"),
    2: new THREE.Color("blue"),
    3: new THREE.Color("orange"),
    4: new THREE.Color("red"),
    5: new THREE.Color("white"),
    6: new THREE.Color("yellow")
};

export const FACE_GENERATION_ORDER = ['right', 'left', 'top', 'bottom', 'front', 'back'];

export const CUBE_MAP = {
    "(-1,-1,-1)": {"back": [2,2], "left": [2,0], "bottom": [2,0]},
    "(0,-1,-1)": {"back": [2,1], "bottom": [2,1]},
    "(1,-1,-1)": {"back": [2,0], "right": [2,2], "bottom": [2,2]},
    "(-1,0,-1)": {"back": [1,2], "left": [1,0]},
    "(0,0,-1)": {"back": [1,1]},
    "(1,0,-1)": {"back": [1,0], "right": [1,2]},
    "(-1,1,-1)": {"back": [0,2], "left": [0,0], "top": [0,0]},
    "(0,1,-1)": {"back": [0,1], "top": [0,1]},
    "(1,1,-1)": {"back": [0,0], "right": [0,2], "top": [0,2]},
    "(-1,-1,0)": {"left": [2,1], "bottom": [1,0]},
    "(0,-1,0)": {"bottom": [1,1]},
    "(1,-1,0)": {"right": [2,1], "bottom": [1,2]},
    "(-1,0,0)": {"left": [1,1]},
    "(0,0,0)": {},
    "(1,0,0)": {"right": [1,1]},
    "(-1,1,0)": {"left": [0,1], "top": [1,0]},
    "(0,1,0)": {"top": [1,1]},
    "(1,1,0)": {"right": [0,1], "top": [1,2]},
    "(-1,-1,1)": {"front": [2,0], "left": [2,2], "bottom": [0,0]},
    "(0,-1,1)": {"front": [2,1], "bottom": [0,1]},
    "(1,-1,1)": {"front": [2,2], "right": [2,0], "bottom": [0,2]},
    "(-1,0,1)": {"front": [1,0], "left": [1,2]},
    "(0,0,1)": {"front": [1,1]},
    "(1,0,1)": {"front": [1,2], "right": [1,0]},
    "(-1,1,1)": {"front": [0,0], "left": [0,2], "top": [2,0]},
    "(0,1,1)": {"front": [0,1], "top": [2,1]},
    "(1,1,1)": {"front": [0,2], "right": [0,0], "top": [2,2]}
};

export const FACE_AXIS = {
    'front': 'z',
    'back': 'z',
    'left': 'x',
    'right': 'x',
    'top': 'y',
    'down': 'y',
};