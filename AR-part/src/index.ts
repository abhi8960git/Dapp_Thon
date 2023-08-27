// @ts-nocheck
/// Zappar for ThreeJS Examples
/// Instant Tracking 3D Model

// In this example we track a 3D model using instant world tracking

import * as THREE from "three";
import * as ZapparThree from "@zappar/zappar-threejs";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Stats from "three/examples/jsm/libs/stats.module";

const model = new URL("../assets/key_card.glb", import.meta.url).href;
const pokemon1 = new URL(
  "../assets/wallhaven-4yjyvk_1920x1080.png",
  import.meta.url
).href;
const pokemon2 = new URL("../assets/favicon.png", import.meta.url).href;
const pokemon3 = new URL(
  "../assets/wallhaven-4yjyvk_1920x1080.png",
  import.meta.url
).href;

import "./index.css";

if (ZapparThree.browserIncompatible()) {
  // The browserIncompatibleUI() function shows a full-page dialog that informs the user
  // they're using an unsupported browser, and provides a button to 'copy' the current page
  // URL so they can 'paste' it into the address bar of a compatible alternative.
  ZapparThree.browserIncompatibleUI();

  // If the browser is not compatible, we can avoid setting up the rest of the page
  // so we throw an exception here.
  throw new Error("Unsupported browser");
}

const manager = new ZapparThree.LoadingManager();

// ==================== Selectings dom elemets ====================
const canvas = document.querySelector("canvas.webgl");
const button_six = document.querySelector(".six");
const buttonFour = document.querySelector(".four");
const buttonOne = document.getElementById("button1");
const buttonTwo = document.getElementById("button2");
const buttonThree = document.getElementById("button3");

// Construct our ThreeJS renderer and scene as usual
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
const scene = new THREE.Scene();
// document.body.appendChild(renderer.domElement);

// Create a Zappar camera that we'll use instead of a ThreeJS camera
const camera = new ZapparThree.Camera();

// In order to use camera and motion data, we need to ask the users for permission
// The Zappar library comes with some UI to help with that, so let's use it
ZapparThree.permissionRequestUI().then((granted) => {
  // If the user granted us the permissions we need then we can start the camera
  // Otherwise let's them know that it's necessary with Zappar's permission denied UI
  if (granted) camera.start();
  else ZapparThree.permissionDeniedUI();
});

ZapparThree.glContextSet(renderer.getContext());

scene.background = camera.backgroundTexture;

// Create an InstantWorldTracker and wrap it in an InstantWorldAnchorGroup for us
// to put our ThreeJS content into
const instantTracker = new ZapparThree.InstantWorldTracker();
const instantTrackerGroup = new ZapparThree.InstantWorldAnchorGroup(
  camera,
  instantTracker
);

// Add our instant tracker group into the ThreeJS scene
scene.add(instantTrackerGroup);

// THREE-JS CODE STARTS HERE

// ==================== Creating custom movement using rayCaster ====================

// const arrowHelper = new THREE.ArrowHelper(
//   new THREE.Vector3(),
//   new THREE.Vector3(),
//   0.25,
//   0xffff00
// );
// instantTrackerGroup.add(arrowHelper);

// const material = new THREE.MeshNormalMaterial();

// const boxGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
// const coneGeometry = new THREE.ConeGeometry(0.05, 0.2, 8);

// const raycaster = new THREE.Raycaster();
// const sceneMeshes: THREE.Object3D[] = [];

// Load a 3D model to place within our group (using ThreeJS's GLTF loader)
// Pass our loading manager in to ensure the progress bar works correctly
const gltfLoader = new GLTFLoader(manager);

gltfLoader.load(
  model,
  (gltf) => {
    console.log(gltf);
    gltf.scene.scale.set(0.01, 0.01, 0.01);
    gltf.scene.rotation.y = Math.PI / 2;
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    gltf.scene.traverse(function (node) {
      if (node.isMesh) {
        // node.material = material;
        console.log(node);
      }
    });
    //gltf.scene.position.y = -1;

    // Now the model has been loaded, we can add it to our instant_tracker_group
    instantTrackerGroup.add(gltf.scene);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (err) => {
    console.log("An error ocurred loading the GLTF model", err);
  }
);

const planeGeometry = new THREE.PlaneGeometry(6, 2, 1, 1);
// Load the pre-saved image texture
const textureLoader = new THREE.TextureLoader();
let newTexture = textureLoader.load(pokemon1);
console.log(newTexture);
const planeMaterial = new THREE.MeshBasicMaterial({ map: newTexture });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMaterial.visible = false;
planeMesh.receiveShadow = true;
planeMesh.position.set(0, 2, -5);
// Add the plane to the scene
instantTrackerGroup.add(planeMesh);

// adding image dynamically
buttonOne.addEventListener("click", async () => {
  planeMaterial.visible = true;
  newTexture = textureLoader.load(pokemon1);
  planeMaterial.map = newTexture;
  planeMaterial.needsUpdate = true;
});

buttonTwo.addEventListener("click", () => {
  planeMaterial.visible = true;
  newTexture2 = textureLoader.load(pokemon2);
  planeMaterial.map = newTexture2;
  planeMaterial.needsUpdate = true;
});

buttonThree.addEventListener("click", () => {
  planeMaterial.visible = true;
  newTexture3 = textureLoader.load(pokemon1);
  planeMaterial.map = newTexture3;
  planeMaterial.needsUpdate = true;
});

// canvas.addEventListener("dblclick", onDoubleClick, false);
// canvas.addEventListener("mousemove", onMouseMove, false);

// const mouse = new THREE.Vector2();

// function onMouseMove(event: MouseEvent) {
//   console.log("started");
//   mouse.set(
//     (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
//     -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
//   );

//   console.log(mouse.x, mouse.y);
//   camera.position.x += 1;
//   camera.position.y += 1;

//   raycaster.setFromCamera(mouse, camera);

//   const intersects = raycaster.intersectObjects(sceneMeshes, false);
//   console.log(intersects);
//   if (intersects.length > 0) {
//     // console.log(sceneMeshes.length + " " + intersects.length)
//     // console.log(intersects[0])
//     // console.log(intersects[0].object.userData.name + " " + intersects[0].distance + " ")
//     // console.log((intersects[0].face as THREE.Face).normal)
//     // line.position.set(0, 0, 0)
//     // line.lookAt((intersects[0].face as THREE.Face).normal)
//     // line.position.copy(intersects[0].point)

//     const n = new THREE.Vector3();
//     n.copy((intersects[0].face as THREE.Face).normal);
//     n.transformDirection(intersects[0].object.matrixWorld);

//     arrowHelper.setDirection(n);
//     arrowHelper.position.copy(intersects[0].point);
//   }
// }

// function onDoubleClick(event: MouseEvent) {
//   mouse.set(
//     (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
//     -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
//   );
//   raycaster.setFromCamera(mouse, camera);
//   camera.position.z += 10;
//   camera.position.y += 10;

//   const intersects = raycaster.intersectObjects(sceneMeshes, false);

//   if (intersects.length > 0) {
//     const n = new THREE.Vector3();
//     n.copy((intersects[0].face as THREE.Face).normal);
//     n.transformDirection(intersects[0].object.matrixWorld);

//     // const cube = new THREE.Mesh(boxGeometry, material)
//     const cube = new THREE.Mesh(coneGeometry, material);

//     cube.lookAt(n);
//     cube.rotateX(Math.PI / 2);
//     cube.position.copy(intersects[0].point);
//     cube.position.addScaledVector(n, 0.1);

//     instantTrackerGroup.add(cube);
//     sceneMeshes.push(cube);
//   }
// }

// console.log(sceneMeshes);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera._updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Let's add some lighting, first a directional light above the model pointing down
const directionalLight = new THREE.DirectionalLight("white", 1);
directionalLight.position.set(0, 5, 0);
directionalLight.lookAt(0, 0, 0);
instantTrackerGroup.add(directionalLight);

// And then a little ambient light to brighten the model up a bit
const ambientLight = new THREE.AmbientLight("white", 0.4);
instantTrackerGroup.add(ambientLight);

camera.position.set(0, 10, 1);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// const clock = new THREE.Clock();
// When the experience loads we'll let the user choose a place in their room for
// the content to appear using setAnchorPoseFromCameraOffset (see below)
// The user can confirm the location by tapping on the screen
let hasPlaced = false;
const placeButton =
  document.getElementById("tap-to-place") || document.createElement("div");
placeButton.addEventListener("click", () => {
  hasPlaced = true;
  placeButton.remove();
});

console.log(instantTrackerGroup);

const clock = new THREE.Clock();
let delta = 0;

const stats = new Stats();
document.body.appendChild(stats.dom);
// Use a function to render our scene as usual
function render(): void {
  if (!hasPlaced) {
    // If the user hasn't chosen a place in their room yet, update the instant tracker
    // to be directly in front of the user
    instantTrackerGroup.setAnchorPoseFromCameraOffset(0, 0, -5);
  }

  // The Zappar camera must have updateFrame called every frame
  camera.updateFrame(renderer);
  stats.update();
  // Draw the ThreeJS scene in the usual way, but using the Zappar camera
  renderer.render(scene, camera);
  // controls.update(0.01);
  delta = clock.getDelta();

  // camera.position.y += 1;
  // console.log(camera.position);
  // Call render() again next frame

  requestAnimationFrame(render);
}

// Start things off
render();
