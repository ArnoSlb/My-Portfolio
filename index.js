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


//PLAN
const planeGeometry = new THREE.
// PlaneGeomtry prend 4 arguments (largeur, hauteur, nmbre de segments en largeur et en hauteur)
    PlaneGeometry(5,5, 10, 10)
    console.log(planeGeometry)
// Pour le voir, nous avons besoin de rajouter un mesh
const planeMaterial = new THREE.
//MeshPhongMaterial prend un argument d'un objet, et dans cet objet on peut spécifier la couleur. A la difference du basic ce mesh reagit à la lumiere. 
// !!! IL FAUT DONC AJOUTER DE LA LUMIERE A LA SCENE SINON ON NE VOIT RIEN !!!
    MeshPhongMaterial({
        color: 0xFF0000,
        //On demande à Three JS de rendre les 2 cotés du plan, autrement par soucis de performance il n'en rendra qu'un seul
        side: THREE.DoubleSide
    })
    console.log(planeMaterial)
// On assemble le meshBasic et la geometrie pour avoir le mesh final
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
console.log(planeMesh)
// On ajoute le mesh final à la scene
scene.add(planeMesh)


//LIGHTS
const light = new THREE.
// Directional Light prend 2 arguments(la couleur de la lumiere (hexadécimal) et l'intensité de la lumiere(entre 0 et 1))
    DirectionalLight(0xffffff, 1)
//On positionne la lumiere pour qu'elle ne soit plus au mileu de la scène. set() prend 3 arguemnts(x, y, z)
light.position.set(0, 0, 1)
//On ajoute la lumiere à la scène
scene.add(light)


//CAMERA
// On deplace la camera de 5 unités pour qu'elle ne soit pas au centre de la scene et qu'on puisse voir nos objets
camera.position.z = 5


//RENDER THE BIG SCENE
// On créé une loupe pour que la fonction soit appelée en continu et refresh les animations à la meme fréquence que le moniteur
const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    // planeMesh.rotation.x += 0.01
}
animate()

