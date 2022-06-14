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
//Pour éviter d'avoir des bords en escalier, une mauvaise résolution sur les edges de nos objets, une pixellisation (Reduce the jagginess)
//On indique à three.js le ratio de nos pixels sur notre device
renderer.setPixelRatio(devicePixelRatio)
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


//PLAN
const planeGeometry = new THREE.
// PlaneGeomtry prend 4 arguments (largeur, hauteur, nmbre de segments en largeur et en hauteur)
    PlaneGeometry(5,5, 10, 10)
    console.log(planeGeometry)
// Pour le voir, nous avons besoin de rajouter un mesh
const planeMaterial = new THREE.
//MeshBasicMaterial prend un argument d'un objet, et dans cet objet on peut spécifier la couleur
    MeshBasicMaterial({
        color: 0xFF0000,
        //On demande à Three JS de rendre les 2 cotés du plan, autrement par soucis de performance il n'en rendra qu'un seul
        side: THREE.DoubleSide
    })
    console.log(material)
// On assemble le meshBasic et la geometrie pour avoir le mesh final
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
console.log(planeMesh)
// On ajoute le mesh final à la scene
scene.add(planeMesh)


//CAMERA
// On deplace la camera de 5 unités pour qu'elle ne soit pas au centre de la scene et qu'on puisse voir nos objets
camera.position.z = 5


//RENDER THE BIG SCENE
// On créé une loupe pour que la fonction soit appelée en continu et refresh les animations à la meme fréquence que le moniteur
const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    mesh.rotation.x += 0.01
    mesh.rotation.y += 0.01
    planeMesh.rotation.x += 0.01
}
animate()

