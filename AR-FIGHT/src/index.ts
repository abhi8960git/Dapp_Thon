// @ts-nocheck
/// Zappar for ThreeJS Examples
/// Instant Tracking 3D Model

// In this example we track a 3D model using instant world tracking

import * as THREE from "three";
import * as ZapparThree from "@zappar/zappar-threejs";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";

let isPokeballRotating = false;

// const model = new URL("../assets/pikachu2.glb", import.meta.url).href;
const pokemon2 = new URL("../assets/fly1.glb", import.meta.url).href;
const pokemon1 = new URL("../assets/FLY ACTTACK.fbx", import.meta.url).href;
const luxury1 = new URL("../assets/LUXARY.glb", import.meta.url).href;

import "./index.css";
import { formToJSON } from "axios";

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
const forwardButton = document.querySelector(".forward");
const jumpButton = document.querySelector(".jump");
const buttonOne = document.getElementById("button1");
const buttonTwo = document.getElementById("button2");

// index.ts
document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown");
  const tapToPlaceElement = document.getElementById("tap-to-place");

  // Function to start the countdown animation
  function startCountdown() {
    countdownElement.innerText = "3";
    countdownElement.classList.add("animate-countdown");
    setTimeout(() => {
      countdownElement.innerText = "2";
      setTimeout(() => {
        countdownElement.innerText = "1";
        setTimeout(() => {
          // Start your game logic or remove the countdown element
          countdownElement.style.display = "none";
          tapToPlaceElement.style.display = "block"; // Show the game instructions or elements
        }, 1000); // Wait for 1 second for "1" to be displayed
      }, 1000); // Wait for 1 second for "2" to be displayed
    }, 2000); // Wait for 1 second for "3" to be displayed
  }

  // Trigger the countdown animation
  startCountdown();
});

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

//camera.position.z = -40;
// THREE-JS CODE STARTS HERE

const gltfLoader = new GLTFLoader(manager);

let mixers: THREE.AnimationMixer[] = [];

let modelReady = false;
let modelReady2 = false;
let pokemon1AttackAnimations: THREE.AnimationClip[] = []; // Array for Pokémon 1 attack animations
let pokemon2AttackAnimations: THREE.AnimationClip[] = []; // Array for Pokémon 2 attack animations

//------------------MODEL LOADING STARTED---------------------

gltfLoader.load(
  pokemon2,
  (gltf) => {
    //gltf.scene.scale.set(0.5, 0.5, 0.5);
    gltf.scene.position.set(-3, 0, -7);
    mixer = new THREE.AnimationMixer(gltf.scene);

    const angleInRadians = THREE.MathUtils.degToRad(60);

    // Rotate the model to the right by 45 degrees
    gltf.scene.rotation.y = angleInRadians;

    const animationAction = mixer.clipAction((gltf as any).animations[0]);
    pokemon1AttackAnimations.push(animationAction);

    mixers.push(mixer);

    console.log("charizard", gltf);

    gltf.scene.traverse(function (object) {
      object.frustumCulled = false;
    });

    // // Create a directional light
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(1, 1, 1); // Set the light's position

    // // Add the light to the scene
    // gltf.scene.add(directionalLight);

    // // You can also add an ambient light for overall illumination
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color, Intensity
    // gltf.scene.add(ambientLight);

    instantTrackerGroup.add(gltf.scene);

    modelReady = true;
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

gltfLoader.load(
  luxury1,
  (gltf) => {
    // gltf.scene.scale.set(.01, .01, .01)
    gltf.scene.position.set(3, 0, -7);
    mixer2 = new THREE.AnimationMixer(gltf.scene);

    const angleInRadians = THREE.MathUtils.degToRad(-60);

    // Rotate the model to the right by 45 degrees
    gltf.scene.rotation.y = angleInRadians;

    const animationAction2 = mixer2.clipAction((gltf as any).animations[0]);
    pokemon2AttackAnimations.push(animationAction2);

    mixers.push(mixer2);

    //animationAction2.play();

    console.log("luxury", gltf);

    instantTrackerGroup.add(gltf.scene);

    // //add an animation from another file
    // gltfLoader.load(
    //   "models/vanguard@samba.glb",
    //   (gltf) => {
    //     console.log("loaded samba");
    //     const animationAction = mixer.clipAction((gltf as any).animations[0]);
    //     animationActions.push(animationAction);
    //     animationsFolder.add(animations, "samba");
    //   },
    //   (xhr) => {
    //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    modelReady2 = true;
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

// fbxLoader.load(
//   pokemon2,
//   (object) => {
//     object.scale.set(1, 1, 1);
//     mixer = new THREE.AnimationMixer(object);

//     const animationAction = mixer.clipAction(
//       (object as THREE.Object3D).animations[0]
//     );
//     pokemon1AttackAnimations.push(animationAction);
//     animationsFolder.add(animations, "default");
//     activeAction = pokemon1AttackAnimations[0];

//     console.log(object, pokemon1AttackAnimations);

//     instantTrackerGroup.add(object);

//     // add an animation from another file
//     fbxLoader.load(
//       pokemon1,
//       (object) => {
//         console.log("loaded charizard attack");

//         const animationAction = mixer.clipAction(
//           (object as THREE.Object3D).animations[0]
//         );
//         pokemon1AttackAnimations.push(animationAction);
//         animationsFolder.add(animations, "samba");
//       },
//       (xhr) => {
//         console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   },
//   (xhr) => {
//     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//   },
//   (error) => {
//     console.log(error);
//   }
// );

//------------------MODEL LOADING FINISHED---------------------

document.addEventListener("DOMContentLoaded", () => {
  const countdownElement = document.getElementById("countdown");
  const tapToPlaceElement = document.getElementById("tap-to-place");

  // Function to start the game after the countdown
  function startGame() {
    countdownElement.style.display = "none"; // Hide the countdown
    tapToPlaceElement.style.display = "block"; // Show the game instructions or elements
    // Add your game initialization logic here
  }

  // Listen for animation end event and start the game when the countdown finishes
  countdownElement.addEventListener("animationend", startGame);
});

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

camera.position.set(0, 10, 100);

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

const stats = new Stats();
document.body.appendChild(stats.dom);

console.log(instantTrackerGroup);

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

  // camera.position.y += 1;
  // console.log(camera.position);
  // Call render() again next frame
  //console.log(modelReady, modelReady2);
  let delta = clock.getDelta();
  if (modelReady && modelReady2) {
    for (let i = 0, l = mixers.length; i < l; i++) {
      mixers[i].update(delta);
      mixers[i]._actions[0].play();

      console.log(i, mixers[i]);
    }
  }

  requestAnimationFrame(render);
}

// Start things off
render();
