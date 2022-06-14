import * as THREE from '/node_modules/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.
// PerspectiveCamera prend 4 arguments (le champ de vision ou field of view en degré, l'aspect ratio de la scene, clipping plane: la distance entre l'objet et la camera dans laquelle il est visible. D'abord la plus proche et ensuite la plus lointaine )
    PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

console.log(scene)
console.log(camera)
console.log(renderer)

// On définit la taille que l'on souhaite rendre, ici la totalité de l'écran donc innerWidth en largeur et innerHeight en hauteur
renderer.setSize(innerWidth, innerHeight)
// On injecte notre renderer dans le body de notre page HTML pour qu'il soit visible. Il sera visible dans une balise canvas
document.body.appendChild(renderer.domElement)