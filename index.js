import * as THREE from '/node_modules/three/build/three.module.js';
import * as dat from '/node_modules/dat.gui/build/dat.gui.module.js';

import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

//GUI
//On ajoute gui quie est un controller et qui va nous permettre de tester facilement différentes valeur pour les parametres de facon tres visuels
// console.log(dat)
const gui = new dat.GUI()
// console.log(gui)
// On choisit/selectionne les parametres que l'on souhaite controler facilement grace à GUI
const world = {
    plane: {
        //on définit les valeurs par défault
        width: 5,
        height: 5,
        widthSegments: 10,
        heightSegments: 10
    }
}

//GUI WIDTH
//On associe la valeur de width de plane qui est égale à 10, au string "width", le 3e argument est le minimum autorisé et le 4e le max
gui.add(world.plane, 'width', 1, 20).
//On définit une fonction que l'on appelle à chaque fois que la valeur "width" est modifié
    onChange(generatePlane)

//GUI HEIGHT
//On associe la valeur de width de plane qui est égale à 10, au string "height", le 3e argument est le minimum autorisé et le 4e le max
gui.add(world.plane, 'height', 1, 20).
//On définit une fonction que l'on appelle à chaque fois que la valeur "height" est modifié
    onChange(generatePlane)

//GUI WIDTHSEGMENTS
//On associe la valeur de width de plane qui est égale à 10, au string "widthSegments", le 3e argument est le minimum autorisé et le 4e le max
gui.add(world.plane, 'widthSegments', 1, 50).
//On définit une fonction que l'on appelle à chaque fois que la valeur "widthSegments" est modifié
    onChange(generatePlane)

//GUI HEIGHT
//On associe la valeur de width de plane qui est égale à 10, au string "heightSegments", le 3e argument est le minimum autorisé et le 4e le max
gui.add(world.plane, 'heightSegments', 1, 50).
//On définit une fonction que l'on appelle à chaque fois que la valeur "heightSegments" est modifié
    onChange(generatePlane)

function generatePlane(){
    //On enleve/supprime le planeMesh de la scène
    planeMesh.geometry.dispose()
    // On recrée le nouveau planeMesh avec les nouvelles valeurs
    planeMesh.geometry = new THREE.
        PlaneGeometry(
            world.plane.width, 
            world.plane.height, 
            world.plane.widthSegments, 
            world.plane.heightSegments
        )


    //RE-UTILISE le bloc de code qui vient de plus bas pour obtenir nos différences de positions aléatoires
    // On boucle sur ce tableau le nombre de fois qu'il y a d'index, 1 index sur 3 car on veut traiter 1 point à la fois
    const {array} = planeMesh.geometry.attributes.position
    for (let i = 0; i < array.length; i+= 3){
        // console.log(i)
        const x = array[i]
        const y = array[i+1]
        const z = array[i+2]
        console.log(array[i])

    //Pour chaque valeur Z de chaque point, on ajoute à sa position intiale un nombre aléatoire
        array[i+2] = z + Math.random()
    }
}

// Le raycaster permet de calculer la trajectoire d'un faiseau laser par rapport aux elements qui l'entoure dans une espace. Par exemple: Mon faisceau mesure 1 pixel de large il a des coordonnées, il va calculer a combier de ? unités il est de toucher un mur.
const raycaster = new THREE.Raycaster();
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
        side: THREE.DoubleSide,
        //Pour voir le reflief avec la lumiere à l'interieur/au milieu de notre mesh et pas seulement sur les cotés 
        flatShading: THREE.FlatShading
    })
    console.log(planeMaterial)
// On assemble le meshBasic et la geometrie pour avoir le mesh final
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
console.log(planeMesh)
//On selectionne la matrice de point de notre objet planeMesh
//La position d'un point est definis dans l'array par serie de 3 index {0,1,2}{3,4,5}{6,7,8}...
//Le premier index correspond au x, le 2e au y et le 3e au z. Pour des raisons d'optimisation ils n'ont pas été mis dans le meme objet avec des sous divisions
console.log(planeMesh.geometry.attributes.position.array)
// On boucle sur ce tableau le nombre de fois qu'il y a d'index, 1 index sur 3 car on veut traiter 1 point à la fois
const {array} = planeMesh.geometry.attributes.position
for (let i = 0; i < array.length; i+= 3){
    // console.log(i)
    const x = array[i]
    const y = array[i+1]
    const z = array[i+2]
    // console.log(array[i])
//Pour chaque valeur Z de chaque point, on ajoute à sa position intiale un nombre aléatoire
    array[i+2] = z + Math.random()
}
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
const lightBack = new THREE.
// Directional Light prend 2 arguments(la couleur de la lumiere (hexadécimal) et l'intensité de la lumiere(entre 0 et 1))
    DirectionalLight(0xffffff, 1)
//On positionne la lumiere pour qu'elle ne soit plus au mileu de la scène. set() prend 3 arguemnts(x, y, z)
lightBack.position.set(0, 0, -1)
//On ajoute la lumiere à la scène
scene.add(lightBack)


//HOVER LIGHT
const mouse = {
    x: undefined,
    y: undefined
}
addEventListener('mousemove', (event) => {
    //On normalize les coordonnées de la souris. Dans le naviguateur l'origine des axes (x:0,y:0) est le coin haut/gauche or on a besoin que l'origine soit le centre de notre canvas
    mouse.x = (event.clientX / innerWidth) * 2 - 1
    mouse.y = - (event.clientY / innerHeight) * 2 + 1
    // console.log(mouse)
})


//CAMERA
// On deplace la camera de 5 unités pour qu'elle ne soit pas au centre de la scene et qu'on puisse voir nos objets
camera.position.z = 5
//OrbitsCOntrols prend 2 arguments, la camera que l'on souhaite utliser et le renderer que l'on utilise
const controls = new OrbitControls( camera, renderer.domElement );


//RENDER THE BIG SCENE
// On créé une loupe pour que la fonction soit appelée en continu et refresh les animations à la meme fréquence que le moniteur
const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    
     // On veut que notre raycaster comprenne notre position en fonction de ou se place la camera, pas seulement de la vue d'en haut
     //setFromCamera prend 2 arguments (cordonnées normalisé de la souris, la camera utilisé)
    raycaster.setFromCamera(mouse, camera)
     // On veut vérifier si notre raycaster rentre en contact avec un objet 3D de la scene, ici notre surface plane
    const intersects = raycaster.intersectObject(planeMesh)
    // Quand le raycaster ne rentre pas au contact de notre objet on obtient un tableau vide
    // Quand le raycaster rentre en contact, le tableau se remplit avec un objet avec des coordonnées 
    // console.log(intersects)
    if (intersects.length > 0){
        console.log('intersecting')
    }
}
animate()



