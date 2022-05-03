import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import { TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js"
import { RGBA_ASTC_10x10_Format, SpotLightHelper } from 'three'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'


const parameters = {
    color: 0xff0000
}

/**
 * Debug
 */
 const gui = new dat.GUI()


/**
 * Txtures
 */

const textureLoader = new THREE.TextureLoader()
const bakedShadow = textureLoader.load("/textures/bakedshadow.jpg")
const simpleShadow = textureLoader.load("/textures/simpleshadow.jpg")
// const cubeTextureLoader = new THREE.CubeTextureLoader()

// const doorColorTexture = textureLoader.load("/textures/door/color.jpg")
// const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg")
// const doorAmbientOcclusionTexture = textureLoader.load("/textures/door/AmbientOcclusion.jpg")
// const doorHeightTexture = textureLoader.load("/textures/door/Height.jpg")
// const doorNormalTexture = textureLoader.load("/textures/door/Normal.jpg")
// const doorMetalnessTexture = textureLoader.load("/textures/door/Metalness.jpg")
// const doorRoughnessTexture = textureLoader.load("/textures/door/Roughness.jpg")

// const matcapTexture = textureLoader.load("/textures/matcaps/6.png")
// const gradientTexture = textureLoader.load("/textures/gradients/3.jpg")
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false

// const environmentMapTexture = cubeTextureLoader.load([
//     "./textures/environmentMaps/0/px.jpg",
//     "./textures/environmentMaps/0/nx.jpg",
//     "./textures/environmentMaps/0/py.jpg",
//     "./textures/environmentMaps/0/ny.jpg",
//     "./textures/environmentMaps/0/pz.jpg",
//     "./textures/environmentMaps/0/nz.jpg"
// ])

/**
 * fonts

const fontLoader = new FontLoader()
fontLoader.load(
     "/fonts/helvetiker_regular.typeface.json",
     (font)=>{
         const textGeometry = new TextGeometry(
         "Hello! Welcome to GreenDon.",
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
 
 */


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



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

const material = new THREE.MeshStandardMaterial()
// material.metalness = 0.45
material.roughness = 0.1
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

// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 0.2
// material.envMap = environmentMapTexture

/**
 * Geometry 
 */
// const sphere = new THREE.Mesh (
//     new THREE.SphereGeometry(0.5,64,64),
//     material
// )
// sphere.position.x = -1.5
// sphere.position.y = 1

// sphere.geometry.setAttribute("uv2",
//     new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2)
// )
const plane = new THREE.Mesh (
    new THREE.PlaneGeometry(5,5),
    material
)
plane.rotation.x = - (Math.PI / 2)
plane.position.y = -0.5
plane.receiveShadow = true

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5,1.5),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        alphaMap:simpleShadow,
        transparent:true
    })
)
sphereShadow.rotation.x = - Math.PI / 2
sphereShadow.position.y = plane.position.y + 0.01
scene.add(sphereShadow)
// plane.geometry.setAttribute("uv2",
//     new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2)
// )

// const torus = new THREE.Mesh (
//     new THREE.TorusGeometry(0.3,0.2,64,128),
//     material
// )
// torus.position.x = 1.5
// torus.position.y = 1

// torus.geometry.setAttribute("uv2",
//     new THREE.BufferAttribute(torus.geometry.attributes.uv.array,2)
// )

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75,0.75,0.75, 16, 16, 16),
    material
)

cube.castShadow = true
scene.add(plane,cube)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff,0.3)


const directtionalLight = new THREE.DirectionalLight(0xffffff,0.3)
directtionalLight.position.set(2,2,1)


directtionalLight.castShadow = true

directtionalLight.shadow.mapSize.width = 1024
directtionalLight.shadow.mapSize.height = 1024

directtionalLight.shadow.camera.top = 2
directtionalLight.shadow.camera.right = 2
directtionalLight.shadow.camera.bottom = -2
directtionalLight.shadow.camera.left = -2

directtionalLight.shadow.camera.near = 1
directtionalLight.shadow.camera.far = 6

// directtionalLight.shadow.radius = 10

// const directtionalLightCameraHelper = new THREE.CameraHelper(directtionalLight.shadow.camera)
// scene.add(directtionalLightCameraHelper)


//Spot Light 
const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3)
spotLight.castShadow = true
spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024
spotLight.shadow.camera.fov = 30
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6
spotLight.position.set (0,2,2)


scene.add(spotLight,spotLight.target)

// Point light 
const pointLight = new THREE.PointLight(0xffffff,0.3)
pointLight.castShadow = true
pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 3
pointLight.position.set (-1, 1, 0 )
scene.add(pointLight)

// const pointLightHelper = new THREE.CameraHelper(pointLight.shadow.camera)
// scene.add(pointLightHelper)
// // const spotLightHelper = new THREE.CameraHelper(spotLight.shadow.camera)
// scene.add(spotLightHelper)

// const hemisphereLight = new THREE.HemisphereLight(0x0000ff,0xff0000,1)

// const pointLight = new THREE.PointLight(0xff9000,0.5,3)
// pointLight.position.set( 1,0.5,1)

// const recAreaLight = new THREE.RectAreaLight(0x4e00ff,2,4,4)
// recAreaLight.position.set(1,-0.5,1)
// recAreaLight.lookAt(new THREE.Vector3())

// const spotLight = new THREE.SpotLight(0x78ff00,0.5,10,Math.PI * 0.1,0.25,1)
// spotLight.position.set(0,2,3)
// scene.add(spotLight.target)
// spotLight.target.position.x = 2

scene.add(ambientLight, directtionalLight)

gui.add(ambientLight, "intensity").min(0).max(1).step(0.01).name("AmbientLight")
gui.add(directtionalLight, "intensity").min(0).max(1).step(0.01).name("DirectionalLight")
gui.add(directtionalLight.position, "x").min(-1).max(1).step(0.01).name("DirectionalLightX")
// gui.addColor(parameters,"color").onChange(()=>{
//     hemisphereLight.color.set(parameters.color)
// }).name("SkyLightColor")


/**
 * Helpers
 */
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight,0.5)
// scene.add(hemisphereLightHelper)

// const directtionalLightHelper = new THREE.DirectionalLightHelper(directtionalLight,0.2)
// scene.add(directtionalLightHelper)

// const pointLightHelper = new THREE.PointLightHelper(pointLight,0.2)
// scene.add(pointLightHelper)

// const spotLightHelper = new THREE.SpotLightHelper(spotLight)
// scene.add(spotLightHelper)

// window.requestAnimationFrame(()=>{
//     spotLightHelper.update()
// })

// const rectAreaLightHelper = new RectAreaLightHelper(recAreaLight)
// scene.add(rectAreaLightHelper)
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

renderer.shadowMap.enabled = false
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //Update objects

    cube.position.x = Math.cos(elapsedTime)
    cube.position.z = Math.sin(elapsedTime)
    cube.position.y = Math.abs(Math.sin(elapsedTime * 3))

    //update shadow

    sphereShadow.position.x = cube.position.x
    sphereShadow.position.z = cube.position.z
    sphereShadow.material.opacity = (1 - cube.position.y) * 0.3
    // sphere.rotation.y = 0.1 * elapsedTime
    // cube.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime

    // sphere.rotation.x = 0.15 * elapsedTime
    // cube.rotation.x = 0.15 * elapsedTime
    // torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()