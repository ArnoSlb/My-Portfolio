import * as THREE from '/node_modules/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.
// PerspectiveCamera prend 4 arguments (le champ de vision ou field of view en degré, l'aspect ratio de la scene, clipping plane: la distance entre l'objet et la camera dans laquelle il est visible. D'abord la plus proche et ensuite la plus lointaine )
    PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

console.log(scene)
console.log(camera)
console.log(renderer)

//RENDERER TO HTML
// On définit la taille que l'on souhaite rendre, ici la totalité de l'écran donc innerWidth en largeur et innerHeight en hauteur
renderer.setSize(innerWidth, innerHeight)
// On injecte notre renderer dans le body de notre page HTML pour qu'il soit visible. Il sera visible dans une balise canvas
document.body.appendChild(renderer.domElement)

//CUBE
const boxGeometry = new THREE.
//BoxGeometry prend 3 arguments(largeur, profondeur, hauteur)
    BoxGeometry(1, 1, 1)
    console.log(boxGeometry)
// Pour le voir, nous avons besoin de rajouter un mesh
const material = new THREE.
//MeshBasicMaterial prend un argument d'un objet, et dans cet objet on peut spécifier la couleur
    MeshBasicMaterial({color: 0x00FF00})
    console.log(material)
// On assemble le meshBasic et la geometrie pour avoir le mesh final
const mesh = new THREE.Mesh(boxGeometry, material)
console.log(mesh)
// On ajoute le mesh final à la scene
scene.add(mesh)

// On deplace la camera de 5 unités pour qu'elle ne soit pas au centre de la scene et qu'on puisse voir nos objets
camera.position.z = 5

//RENDER THE BIG SCENE
renderer.render(scene, camera)