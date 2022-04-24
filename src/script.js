import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js"
import { RGBA_ASTC_10x10_Format } from 'three'




/**
 * Txtures
 */
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load("/textures/door/color.jpg")
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg")
const doorAmbientOcclusionTexture = textureLoader.load("/textures/door/AmbientOcclusion.jpg")
const doorHeightTexture = textureLoader.load("/textures/door/Height.jpg")
const doorNormalTexture = textureLoader.load("/textures/door/Normal.jpg")
const doorMetalnessTexture = textureLoader.load("/textures/door/Metalness.jpg")
const doorRoughnessTexture = textureLoader.load("/textures/door/Roughness.jpg")

const matcapTexture = textureLoader.load("/textures/matcaps/1.png")
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg")
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false

const environmentMapTexture = cubeTextureLoader.load([
    "./textures/environmentMaps/0/px.jpg",
    "./textures/environmentMaps/0/nx.jpg",
    "./textures/environmentMaps/0/py.jpg",
    "./textures/environmentMaps/0/ny.jpg",
    "./textures/environmentMaps/0/pz.jpg",
    "./textures/environmentMaps/0/nz.jpg"
])

/**
 * fonts
 */

const fontLoader = new FontLoader()
fontLoader.load(
     "/fonts/helvetiker_regular.typeface.json",
     (font)=>{
         const textGeometry = new TextGeometry(
         "ZIJIAN, HELLO!",
         {
             font:font,
             size: 0.5,
             height:0.2,
             curveSegment: 5,
             bevelEnabled: true,
             bevelThickness: 0.03,
             bevelSize: 0.02,
             bevelOffset: 0,
             bevelSegments: 3
         }
         )
         textGeometry.center()
         const textMaterial = new THREE.MeshMatcapMaterial()
         textMaterial.matcap = matcapTexture
         const text = new THREE.Mesh(textGeometry,textMaterial)
         scene.add(text)

         const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45)
         const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
         
         for (let i = 0; i<100; i++) {
             const donuts = new THREE.Mesh(donutGeometry,donutMaterial)
             
             donuts.position.x = (Math.random() - 0.5) * 10
             donuts.position.y = (Math.random() - 0.5) * 10
             donuts.position.z = (Math.random() - 0.5) * 10
        
             donuts.rotation.x = (Math.random() - 0.5) * Math.PI
             donuts.rotation.x = (Math.random() - 0.5) * Math.PI
        
             const scale = Math.random()
             donuts.scale.set(scale, scale, scale)
             scene.add(donuts)
         }
     }

     
 )
 



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Axes Helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Objects
 */

// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// material.color.set("green")
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color("red")

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.45
// material.roughness = 0.45
// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.1
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5,0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

const material = new THREE.MeshStandardMaterial()
material.metalness = 1
material.roughness = 0.2
material.envMap = environmentMapTexture

/**
 * Geometry 
 */
// const sphere = new THREE.Mesh (
//     new THREE.SphereGeometry(0.5,64,64),
//     material
// )
// sphere.position.x = -1.5

// sphere.geometry.setAttribute("uv2",
//     new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2)
// )
// const plane = new THREE.Mesh (
//     new THREE.PlaneGeometry(1,1, 100, 100),
//     material
// )

// plane.geometry.setAttribute("uv2",
//     new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2)
// )

// const torus = new THREE.Mesh (
//     new THREE.TorusGeometry(0.3,0.2,64,128),
//     material
// )
// torus.position.x = 1.5

// torus.geometry.setAttribute("uv2",
//     new THREE.BufferAttribute(torus.geometry.attributes.uv.array,2)
// )

// scene.add(sphere, plane, torus)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4

scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //Update objects
    // sphere.rotation.y = 0.1 * elapsedTime
    // plane.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime

    // sphere.rotation.x = 0.15 * elapsedTime
    // plane.rotation.x = 0.15 * elapsedTime
    // torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()