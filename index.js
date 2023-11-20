import * as THREE from '/node_modules/three/build/three.module.js';
import * as dat from '/node_modules/dat.gui/build/dat.gui.module.js';
import gsap from '/node_modules/gsap/index.js'

var currentPage = ""
const learnMoreBtn = document.querySelector('.learn-more')
const homePageContent = document.getElementById('homepage_content')
const headerPortfolio = document.getElementById('header_portfolio')
const aboutMe = document.getElementById('about_me')
const projects = document.getElementById('projects')
const btn_aboutMe = document.getElementById('btn_aboutme')
const btn_projects = document.getElementById('btn_projects')
const btn_contacts = document.getElementById('btn_contacts')

//GUI
//On ajoute gui quie est un controller et qui va nous permettre de tester facilement différentes valeur pour les parametres de facon tres visuels
// console.log(dat)
const gui = new dat.GUI()
document.querySelector('.dg.ac').style.display = "none"
// console.log(gui)
// On choisit/selectionne les parametres que l'on souhaite controler facilement grace à GUI
const world = {
    plane: {
        //on définit les valeurs par défault
        width: 1000,
        height: 1000,
        widthSegments: 55,
        heightSegments: 55
    }
}

//GUI WIDTH
//On associe la valeur de width de plane qui est égale à 10, au string "width", le 3e argument est le minimum autorisé et le 4e le max
gui.add(world.plane, 'width', 1, 400).
//On définit une fonction que l'on appelle à chaque fois que la valeur "width" est modifié
    onChange(generatePlane)

//GUI HEIGHT
//On associe la valeur de width de plane qui est égale à 10, au string "height", le 3e argument est le minimum autorisé et le 4e le max
gui.add(world.plane, 'height', 1, 400).
//On définit une fonction que l'on appelle à chaque fois que la valeur "height" est modifié
    onChange(generatePlane)

//GUI WIDTHSEGMENTS
//On associe la valeur de width de plane qui est égale à 10, au string "widthSegments", le 3e argument est le minimum autorisé et le 4e le max
gui.add(world.plane, 'widthSegments', 1, 100).
//On définit une fonction que l'on appelle à chaque fois que la valeur "widthSegments" est modifié
    onChange(generatePlane)

//GUI HEIGHT
//On associe la valeur de width de plane qui est égale à 10, au string "heightSegments", le 3e argument est le minimum autorisé et le 4e le max
gui.add(world.plane, 'heightSegments', 1, 100).
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

    
    //VERTICE POSITION RANDOM
    //RE-UTILISE le bloc de code qui vient de plus bas pour obtenir nos différences de positions aléatoires
    // On boucle sur ce tableau le nombre de fois qu'il y a d'index, 1 index sur 3 car on veut traiter 1 point à la fois
    const {array} = planeMesh.geometry.attributes.position
    for (let i = 0; i < array.length; i+= 3){
        // console.log(i)
        const x = array[i]
        const y = array[i+1]
        const z = array[i+2]
        // console.log(array[i])

        array[i] = x + (Math.random() - 0.5)
        array[i+1] = y + (Math.random() - 0.5)
        console.log(array[i+1])
    //Pour chaque valeur Z de chaque point, on ajoute à sa position intiale un nombre aléatoire
        array[i+2] = z + Math.random()
    }

    //COLOR ATTRIBUT ADDITION
    const colors = []
    // On loupe sur le nombre de groupe (donc de position) qui constite un point, 3 coordonnées = 1 points, 363 coordonnés = 121 points, on loope 121 fois
    for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++){
        colors.push(0.08, .11, .17)
    }

    // On ajoute un attribut au planeMesh en plus de normal, position et uv
    // console.log(planeMesh.geometry.attributes)
    // On fait en sorte d'avoir une structure similaire au autres attribut avec buffer attribute et float32array([r,g,b]), nombre de valeur qui constitue un groupe)))
    // Ici on définit la couleur pour un seul point
    planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))
}

// Le raycaster permet de calculer la trajectoire d'un faiseau laser par rapport aux elements qui l'entoure dans une espace. Par exemple: Mon faisceau mesure 1 pixel de large il a des coordonnées, il va calculer a combier de ? unités il est de toucher un mur.
const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const camera = new THREE.
// PerspectiveCamera prend 4 arguments (le champ de vision ou field of view en degré, l'aspect ratio de la scene, clipping plane: la distance entre l'objet et la camera dans laquelle il est visible. D'abord la plus proche et ensuite la plus lointaine )
    PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 2700)
const renderer = new THREE.WebGLRenderer({antialias:true})

// console.log(scene)
// console.log(camera)
// console.log(renderer)


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
    PlaneGeometry(world.plane.width, world.plane.height, world.plane.widthSegments, world.plane.heightSegments)
    // console.log(planeGeometry)
// Pour le voir, nous avons besoin de rajouter un mesh
const planeMaterial = new THREE.
//MeshPhongMaterial prend un argument d'un objet, et dans cet objet on peut spécifier la couleur. A la difference du basic ce mesh reagit à la lumiere. 
// !!! IL FAUT DONC AJOUTER DE LA LUMIERE A LA SCENE SINON ON NE VOIT RIEN !!!
    MeshPhongMaterial({
        // color: 0xFF0000,
        //On demande à Three JS de rendre les 2 cotés du plan, autrement par soucis de performance il n'en rendra qu'un seul
        side: THREE.DoubleSide,
        //Pour voir le reflief avec la lumiere à l'interieur/au milieu de notre mesh et pas seulement sur les cotés 
        flatShading: THREE.FlatShading,
        //On specifie que l'on veut utiliser le nouvel attribut couleur que l'on définit plus bas pour le hover light
        vertexColors: true
    })
    // console.log(planeMaterial)
// On assemble le meshBasic et la geometrie pour avoir le mesh final
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
// console.log(planeMesh)
//On selectionne la matrice de point de notre objet planeMesh
//La position d'un point est definis dans l'array par serie de 3 index {0,1,2}{3,4,5}{6,7,8}...
//Le premier index correspond au x, le 2e au y et le 3e au z. Pour des raisons d'optimisation ils n'ont pas été mis dans le meme objet avec des sous divisions
// console.log(planeMesh.geometry.attributes.position.array)
// On boucle sur ce tableau le nombre de fois qu'il y a d'index, 1 index sur 3 car on veut traiter 1 point à la fois
const {array} = planeMesh.geometry.attributes.position
const randomValues = []
// On boucle sur le nombre de vertex
for (let i = 0; i < array.length; i++){
    // console.log(i)
    //On veut que ce code s'execute une fois tous les 3 itérations car les coordonnées marchent par groupe de 3
    if(i % 3 === 0){
        const x = array[i]
        const y = array[i+1]
        const z = array[i+2]
        // console.log(array[i])
        array[i] = x + (Math.random() - 0.5) * 3
        array[i+1] = y + (Math.random() - 0.5) * 3
    //Pour chaque valeur Z de chaque point, on ajoute à sa position intiale un nombre aléatoire
        array[i+2] = z + (Math.random() - 0.5) * 3
    }

//On ajoute des valeurs aléatoires dans notre tableau
    randomValues.push(Math.random() - 0.5)
}

// console.log(randomValues)

planeMesh.geometry.attributes.position.randomValues = randomValues

planeMesh.geometry.attributes.position.originalPosition = planeMesh.geometry.attributes.position.array

// console.log(planeMesh.geometry.attributes.position)
// console.log(planeMesh.geometry.attributes.position)

const colors = []
// On loupe sur le nombre de groupe (donc de position) qui constite un point, 3 coordonnées = 1 points, 363 coordonnés = 121 points, on loope 121 fois
for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++){
    colors.push(0.25, .26, .33)
}

// On ajoute un attribut au planeMesh en plus de normal, position et uv
// console.log(planeMesh.geometry.attributes)
// On fait en sorte d'avoir une structure similaire au autres attribut avec buffer attribute et float32array([r,g,b]), nombre de valeur qui constitue un groupe)))
// Ici on définit la couleur pour un seul point
planeMesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))

// On ajoute le mesh final à la scene
scene.add(planeMesh)


//LIGHTS
const light = new THREE.
// Directional Light prend 2 arguments(la couleur de la lumiere (hexadécimal) et l'intensité de la lumiere(entre 0 et 1))
    DirectionalLight(0xffffff, .85)
//On positionne la lumiere pour qu'elle ne soit plus au mileu de la scène. set() prend 3 arguemnts(x, y, z)
light.position.set(2, 2, 1)
//On ajoute la lumiere à la scène
scene.add(light)
const redlightBack = new THREE.
// Directional Light prend 2 arguments(la couleur de la lumiere (hexadécimal) et l'intensité de la lumiere(entre 0 et 1))
    DirectionalLight(0xff8841, 2)
//On positionne la lumiere pour qu'elle ne soit plus au mileu de la scène. set() prend 3 arguemnts(x, y, z)
redlightBack.position.set(3, 1, -1)
//On ajoute la lumiere à la scène
scene.add(redlightBack)
const bluelightBack = new THREE.
// Directional Light prend 2 arguments(la couleur de la lumiere (hexadécimal) et l'intensité de la lumiere(entre 0 et 1))
    DirectionalLight(0x03492c, 2)
//On positionne la lumiere pour qu'elle ne soit plus au mileu de la scène. set() prend 3 arguemnts(x, y, z)
bluelightBack.position.set(-3, 1, -1)
//On ajoute la lumiere à la scène
scene.add(bluelightBack)


// STARS
// On créé le mesh pour les étoiles
const starGeometry = new THREE.
    BufferGeometry()
// On a joute le material qui avec avec
// PointsMaterial prend un argument sous forme d'objet
const starMaterial = new THREE.
    PointsMaterial({
        color: 0xffffff
    })
// console.log(starGeometry)
// console.log(starMaterial)

//On créé un tableau vide
const starVerticies = []
// On remplit ce tableau avec 10 000 points
for (let i = 0; i < 10000; i ++) {
    // On veut une valeur comprise entre -1000 et +1000
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 2000
    const z = (Math.random() - 1.02) * 2000
    // console.log(x, y, z)
    starVerticies.push(x,y,z)
}
// console.log(starVerticies)

// On transfere nos points random vers l'attribut position de notre star geometry 
// avec une norme Float32BUfferAttribute pour qu'il soit compris par l'attribut de notre geometry
// et on lui précise qu'il faut "3" valeurs pour créer une position
starGeometry.setAttribute('position', new THREE.
    Float32BufferAttribute(starVerticies, 3)
)

// Maintenant qu'on a une starGeometry remplit de plusieurs points et une startMaterial prete
// on peut les combiner ensemble
const stars = new THREE.Points(starGeometry, starMaterial)
//On ajoute les stars à la scène
scene.add(stars)


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
camera.position.z = 250

let frame = 0.01

//RENDER THE BIG SCENE
// On créé une loupe pour que la fonction soit appelée en continu et refresh les animations à la meme fréquence que le moniteur
const animate = () => {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    frame += .15

    // Ajoute mouvement dans le temps
    for (let i = 0; i < planeMesh.geometry.attributes.position.array.length; i += 3){
        // //x
        array[i] = planeMesh.geometry.attributes.position.originalPosition[i] + (Math.cos(frame * planeMesh.geometry.attributes.position.randomValues[i]) * 0.036)
        // //y
        array[i+1] = planeMesh.geometry.attributes.position.originalPosition[i+1] + (Math.cos(frame * planeMesh.geometry.attributes.position.randomValues[i+1]) * 0.02) 
        // //z
        array[i+2] = planeMesh.geometry.attributes.position.originalPosition[i+2] + (Math.cos(frame * planeMesh.geometry.attributes.position.randomValues[i+2]) * 0.01) 
        planeMesh.geometry.attributes.position.needsUpdate = true

        // console.log(Math.cos(frame * planeMesh.geometry.attributes.position.randomValues[i]) * 0.15)
    }   
    
    
     // On veut que notre raycaster comprenne notre position en fonction de ou se place la camera, pas seulement de la vue d'en haut
     //setFromCamera prend 2 arguments (cordonnées normalisé de la souris, la camera utilisé)
    raycaster.setFromCamera(mouse, camera)
     // On veut vérifier si notre raycaster rentre en contact avec un objet 3D de la scene, ici notre surface plane
    const intersects = raycaster.intersectObject(planeMesh)
    // Quand le raycaster ne rentre pas au contact de notre objet on obtient un tableau vide
    // Quand le raycaster rentre en contact, le tableau se remplit avec un objet avec des coordonnées 
    // console.log(intersects)
    if (intersects.length > 0){
        // console.log('intersecting')
        // console.log(intersects[0].object.geometry.attributes.color)
        // console.log(intersects[0].face)
        // On change la couleur R avec setX de la face que l'on survole, setX(l'index du groupe que l'on veut sélectionné donc la face, la valeur de Rouge que l'on veut donner à cette face)
        // intersects[0].object.geometry.attributes.color.setX(0, 0)
        //Avec face.a on ne change qu'un seul des 3 cotés qui fait une face. On doit faire de meme pour b et c pour que l'entiereté de notre face change quand on la survole
        
        //COLOR HOVER
        // Vertice/vertex 1
        intersects[0].object.geometry.attributes.color.setX(intersects[0].face.a, .34)
        intersects[0].object.geometry.attributes.color.setY(intersects[0].face.a, .43)
        intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.a, .51)

        //vertice/vertex 2
        intersects[0].object.geometry.attributes.color.setX(intersects[0].face.b, .34)
        intersects[0].object.geometry.attributes.color.setY(intersects[0].face.b, .43)
        intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.b, .51)

        //vertice/vertex 3
        intersects[0].object.geometry.attributes.color.setX(intersects[0].face.c, .34)
        intersects[0].object.geometry.attributes.color.setY(intersects[0].face.c, .43)
        intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.c, .51)

        // On force le refresh de l'attribut couleur 
        intersects[0].object.geometry.attributes.color.needsUpdate = true

        //On veut que la face qui a changé de couleur retourne immédiatment à sa couleur précédente quand on arrete de la survoler
        const initalColor = {
            r:.25, 
            g:.26,
            b:.33      
        }
        const hoverColor = {
            r:.867, 
            g:.609,
            b:.453
        }
        // gsap.to() prend 2 arguments (ce que l'on souhaite animé, les valeurs que l'on souhaite lui donner)
        gsap.to(hoverColor, {
            r:initalColor.r,
            g:initalColor.g,
            b:initalColor.b,
            onUpdate: () => {
                //COLOR HOVER passing to geometry
                //On veut animer la hoverColor
                // Vertice/vertex 1
                intersects[0].object.geometry.attributes.color.setX(intersects[0].face.a, hoverColor.r)
                intersects[0].object.geometry.attributes.color.setY(intersects[0].face.a, hoverColor.g)
                intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.a, hoverColor.b)

                //vertice/vertex 2
                intersects[0].object.geometry.attributes.color.setX(intersects[0].face.b, hoverColor.r)
                intersects[0].object.geometry.attributes.color.setY(intersects[0].face.b, hoverColor.g)
                intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.b, hoverColor.b)

                //vertice/vertex 3
                intersects[0].object.geometry.attributes.color.setX(intersects[0].face.c, hoverColor.r)
                intersects[0].object.geometry.attributes.color.setY(intersects[0].face.c, hoverColor.g)
                intersects[0].object.geometry.attributes.color.setZ(intersects[0].face.c, hoverColor.b)

                // On force le refresh de l'attribut couleur 
                intersects[0].object.geometry.attributes.color.needsUpdate = true
            }
        })
    }

    stars.rotation.z +=0.0002
}
animate()

function goToWebsite(url) {
    window.open(
        `${url}`,
        '_blank' 
      );
}

function cameraGoTo(page) {
    if (page == 'aboutme'){
        //On ajoute une animation à la camera en lui donnant de nouvelle coordonnées
        gsap.to(camera.position, {
            x: 0,
            y: 0,
            z: 50,
            //On lisse la vitesse en entrée et sortie
            // si expo.inOut est trop fort on peut utiliser power3.inOut
            ease: 'power3.inOut',
            // On determine une durée pour l'animation
            duration: 1.5
        })
        gsap.to(camera.rotation, {
            // valeur en Radian !!!! et pas degré
            //3.14 = 180deg
            x: 1.37,
            y: -.9,
            z: 1,
            ease: 'power3.inOut',
            duration: 1.5
        })
    }
    if (page == 'projects'){
        //On ajoute une animation à la camera en lui donnant de nouvelle coordonnées
        gsap.to(camera.position, {
            x: -700,
            y: 100,
            z: -600,
            //On lisse la vitesse en entrée et sortie
            // si expo.inOut est trop fort on peut utiliser power3.inOut
            ease: 'power3.inOut',
            // On determine une durée pour l'animation
            duration: 1.5
        })
        gsap.to(camera.rotation, {
            // valeur en Radian !!!! et pas degré
            //3.14 = 180deg
            x: 0,
            y: -1.5,
            z: 1.1,
            ease: 'power3.inOut',
            duration: 1.5
        })
    }
    if (page == 'contacts'){
        //On ajoute une animation à la camera en lui donnant de nouvelle coordonnées
        gsap.to(camera.position, {
            x: -1300,
            y: 0,
            z: -480,
            //On lisse la vitesse en entrée et sortie
            // si expo.inOut est trop fort on peut utiliser power3.inOut
            ease: 'power3.inOut',
            // On determine une durée pour l'animation
            duration: 1.5
        })
        gsap.to(camera.rotation, {
            // valeur en Radian !!!! et pas degré
            //3.14 = 180deg
            x: 0,
            y: -1.5,
            z: 4.715,
            ease: 'power3.inOut',
            duration: 1.5
        })
    }
}

//Event Listener
learnMoreBtn.addEventListener('click', () => {
    currentPage = "aboutme"
    homePageContent.classList.add('fade-out')
    setTimeout(() => {
        homePageContent.style.display = "none"
        cameraGoTo(currentPage)
    }, "1200")
    setTimeout(() => {
        headerPortfolio.classList.add('fade-in')
    }, "2000")
    setTimeout(() => {
        aboutMe.style.display = "flex"
        aboutMe.classList.add('fade-in')
    }, "3100")
})

btn_aboutMe.addEventListener('click', () => {
    if (currentPage == "aboutme"){
    } else {
        currentPage = "aboutme"
        projects.classList.replace('fade-in', 'fade-out')
        contacts.classList.replace('fade-in', 'fade-out')
        setTimeout(() => {
            projects.style.display = "none"
            contacts.style.display = "none"
            cameraGoTo(currentPage)
        }, "1200")
        setTimeout(() => {
            headerPortfolio.classList.add('fade-in')
        }, "2000")
        setTimeout(() => {
            aboutMe.style.display = "flex"
            aboutMe.classList.add('fade-in')
        }, "3100")
    }
})

btn_projects.addEventListener('click', () => {
    if (currentPage == "projects"){
    } else {
        currentPage = "projects"
        aboutMe.classList.replace('fade-in', 'fade-out')
        contacts.classList.replace('fade-in', 'fade-out')
        setTimeout(() => {
            aboutMe.style.display = "none"
            contacts.style.display = "none"
            cameraGoTo(currentPage)
        }, "1200")
        setTimeout(() => {
            projects.classList.replace('fade-out', 'fade-in')
            projects.style.display = "flex"
        }, "4000")
    }
})

btn_contacts.addEventListener('click', () => {
    if (currentPage == "contacts"){
    } else {
        currentPage = "contacts"
        aboutMe.classList.replace('fade-in', 'fade-out')
        projects.classList.replace('fade-in', 'fade-out')
        setTimeout(() => {
            aboutMe.style.display = "none"
            projects.style.display = "none"
            cameraGoTo(currentPage)
        }, "1200")
        setTimeout(() => {
            contacts.classList.replace('fade-out', 'fade-in')
            contacts.style.display = "flex"
        }, "3500")
    }
})
