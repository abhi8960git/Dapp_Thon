// @ts-nocheck
/// Zappar for ThreeJS Examples
/// Instant Tracking 3D Model

// In this example we track a 3D model using instant world tracking

import * as THREE from "three";
import * as ZapparThree from "@zappar/zappar-threejs";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";

const pokeLand = new URL("../assets/poke.glb", import.meta.url).href;

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

const gltfLoader = new GLTFLoader(manager);
//------------------MODEL LOADING STARTED---------------------
// loading models

gltfLoader.load(
  pokeLand,
  (gltf) => {
    model1 = gltf.scene;
    console.log("tree", gltf);
    gltf.scene.scale.set(1, 1, 1);

    instantTrackerGroup.add(gltf.scene);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (err) => {
    console.log("An error ocurred loading the GLTF model", err);
  }
);

//------------------MODEL LOADING FINISHED---------------------

//adding rayRaster

// canvas.addEventListener("click", onClick, false);
// // canvas.addEventListener("mousemove", onMouseMove, false);
// const mouse = new THREE.Vector2();
// const raycaster = new THREE.Raycaster();

// function onClick(event: MouseEvent) {
//   mouse.set(
//     (event.offsetX / renderer.domElement.clientWidth) * 2 - 1,
//     -(event.offsetY / renderer.domElement.clientHeight) * 2 + 1
//   );
//   raycaster.setFromCamera(mouse, camera);

//   const intersects = raycaster.intersectObjects(instantTrackerGroup.children);
//   intersects.forEach(function (intersect) {
//     console.log("intersecting", intersect);
//     if (intersect.object.name === "ground") {
//       const highlightPos = new THREE.Vector3()
//         .copy(intersect.point)
//         .floor()
//         .addScalar(0.5);

//       hightSquare.position.set(highlightPos.x, 0, highlightPos.z + 5);
//     }
//   });
// }

//----------LIGHTING-----------

// Add directional light to illuminate the model
const directionalLight2 = new THREE.DirectionalLight("white", 1);
directionalLight2.position.set(0, 5, 0);
directionalLight2.lookAt(0, 0, 0);
instantTrackerGroup.add(directionalLight2);

// Add ambient light for better visibility
const ambientLight2 = new THREE.AmbientLight("white", 0.4);
instantTrackerGroup.add(ambientLight2);

//------------- Add fog to the scene---------

const fogColor = new THREE.Color(0xffffff); // Adjust fog color
const fogNear = 0.1; // Adjust near fog distance
const fogFar = 40; // Adjust far fog distance
scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

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
