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
const pokemon1 = new URL("../assets/pokemon_home_urshifu.glb", import.meta.url)
  .href;
const luxury1 = new URL("../assets/LUXARY.glb", import.meta.url).href;
const stadium = new URL("../assets/platform.glb", import.meta.url).href;
const fight = new URL("../assets/fire.glb", import.meta.url).href;
const damage = new URL("../assets/damage.glb", import.meta.url).href;

let chari, lux, luxuryHealthBar, pokemon1HealthBar;

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
          countdownElement.innerText = "FIGHT";
          setTimeout(() => {
            // Start your game logic or remove the countdown element
            countdownElement.style.display = "none";
            tapToPlaceElement.style.display = "block"; // Show the game instructions or elements
          }, 1000); // Wait for 1 second for "1" to be displayed
        }, 1000);
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
// Create health bar materials
const healthBarMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const damageMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Create health bar geometries
const healthBarGeometry = new THREE.BoxGeometry(2, 0.2, 0.2); // Adjust the size as needed
const damageGeometry = new THREE.BoxGeometry(2, 0.2, 0.2); // Same size as health bar

gltfLoader.load(
  pokemon2,
  (gltf) => {
    chari = gltf.scene;
    //gltf.scene.scale.set(0.5, 0.5, 0.5);
    gltf.scene.position.set(-4, 1, -7);
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

    // Create health bars
    pokemon1HealthBar = new THREE.Mesh(healthBarGeometry, healthBarMaterial);

    // Position health bars above the models
    pokemon1HealthBar.position.set(
      chari.position.x,
      chari.position.y + 2,
      chari.position.z
    );

    instantTrackerGroup.add(pokemon1HealthBar);

    //add an animation from another file
    gltfLoader.load(
      fight,
      (gltf) => {
        console.log("fire");
        const animationActions1 = mixer.clipAction((gltf as any).animations[0]);
        const animationActions2 = mixer.clipAction((gltf as any).animations[1]);
        const animationActions3 = mixer.clipAction((gltf as any).animations[2]);
        const animationActions4 = mixer.clipAction((gltf as any).animations[3]);
        const animationActions5 = mixer.clipAction((gltf as any).animations[4]);
        const animationActions6 = mixer.clipAction((gltf as any).animations[5]);
        const animationActions7 = mixer.clipAction((gltf as any).animations[6]);

        // Create an array to hold the animation actions you want to combine
        const actionsToCombine = [
          animationActions1,
          animationActions2,
          animationActions3,
          animationActions4,
          animationActions5,
          animationActions6,
          animationActions7,
        ];

        // Play the combined animation action

        pokemon1AttackAnimations.push(...actionsToCombine);

        //add an animation from another file
        gltfLoader.load(
          damage,
          (gltf) => {
            console.log("damage");
            const animationAction = mixer.clipAction(
              (gltf as any).animations[0]
            );
            pokemon1AttackAnimations.push(animationAction);
          },
          (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

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
  pokemon1,
  (gltf) => {
    lux = gltf.scene;
    gltf.scene.scale.set(2, 2, 2);
    gltf.scene.position.set(0.8, -1.3, -7);
    mixer2 = new THREE.AnimationMixer(gltf.scene);

    const angleInRadians = THREE.MathUtils.degToRad(-60);

    // Rotate the model to the right by 45 degrees
    gltf.scene.rotation.y = angleInRadians;

    const animationAction2 = mixer2.clipAction((gltf as any).animations[0]);
    const animationAction3 = mixer2.clipAction((gltf as any).animations[2]);
    const animationAction4 = mixer2.clipAction((gltf as any).animations[3]);
    pokemon2AttackAnimations.push(animationAction2);
    pokemon2AttackAnimations.push(animationAction3);
    pokemon2AttackAnimations.push(animationAction4);

    mixers.push(mixer2);

    //animationAction2.play();

    console.log("luxury", gltf);

    luxuryHealthBar = new THREE.Mesh(healthBarGeometry, healthBarMaterial);

    luxuryHealthBar.position.set(
      lux.position.x,
      lux.position.y + 2,
      lux.position.z
    );

    instantTrackerGroup.add(luxuryHealthBar);

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

gltfLoader.load(
  stadium,
  (gltf) => {
    gltf.scene.scale.set(0.5, 0.5, 0.5);
    gltf.scene.position.set(0, -2, -5);
    const angleInRadians = THREE.MathUtils.degToRad(-90);

    // Rotate the model to the right by 45 degrees
    gltf.scene.rotation.y = angleInRadians;

    console.log("stadium", gltf);

    gltf.scene.traverse(function (object) {
      object.frustumCulled = false;
    });

    instantTrackerGroup.add(gltf.scene);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

//------------------MODEL LOADING FINISHED---------------------

// Set initial health values
let pokemon1Health = 100;
let luxuryHealth = 100;

// Function to show the defeat message for Pokémon 1
function showPokemon1DefeatMessage() {
  console.log("here1111");
  const defeatMessage = document.getElementById("defeatMessage");
  defeatMessage.style.display = "block";
}

// Function to show the win message for Luxury
function showLuxuryWinMessage() {
  console.log("here1111");
  const winMessage = document.getElementById("winMessage");
  winMessage.style.display = "block";
}

// Function to update health bars
function updateHealthBars() {
  const scaleFactor = 0.02; // Adjust the scale factor as needed

  // Update health bar scales based on health
  const pokemon1Scale = new THREE.Vector3(pokemon1Health * scaleFactor, 1, 1);
  const luxuryScale = new THREE.Vector3(luxuryHealth * scaleFactor, 1, 1);

  pokemon1HealthBar.scale.copy(pokemon1Scale);
  luxuryHealthBar.scale.copy(luxuryScale);

  // Change health bar material to red when health is low
  if (pokemon1Health < 50) {
    pokemon1HealthBar.material = damageMaterial;
  } else {
    pokemon1HealthBar.material = healthBarMaterial;
  }

  if (luxuryHealth < 50) {
    luxuryHealthBar.material = damageMaterial;
  } else {
    luxuryHealthBar.material = healthBarMaterial;
  }
}

function handleAttack(targetModel) {
  // Implement your attack logic here
  // For example, you can reduce the health of the target model
  reduceHealth(targetModel);
}

// Example of reducing health (you can update this logic based on your game)
function reduceHealth(model) {
  const minDamage = 5; // Minimum damage to be dealt
  const maxDamage = 30; // Maximum damage to be dealt
  const randomDamage =
    Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage;

  if (model === "pokemon1") {
    pokemon1Health -= randomDamage; // Reduce health by random damage
    if (pokemon1Health <= 0) {
      // Pokemon 1 is defeated
      document.getElementById("defeatMessage").style.display = "block";
      document.getElementById("luxuryAttackButton").disabled = true; // Disable Luxury's attack button
    }
  } else if (model === "luxury") {
    luxuryHealth -= randomDamage; // Reduce health by random damage
    if (luxuryHealth <= 0) {
      // Luxury is defeated
      document.getElementById("winMessage").style.display = "block";
      document.getElementById("pokemon1AttackButton").disabled = true; // Disable Pokemon 1's attack button
    }
  }

  // Update health bars
  updateHealthBars();
}

// Add event listeners to attack buttons
const pokemon1AttackButton = document.querySelector("#pokemon1AttackButton");
const luxuryAttackButton = document.querySelector("#luxuryAttackButton");

pokemon1AttackButton.addEventListener("click", () => {
  // Call the handleAttack function with the target model
  console.log("here");
  handleAttack("pokemon1");
});

luxuryAttackButton.addEventListener("click", () => {
  // Call the handleAttack function with the target model
  console.log("here");
  handleAttack("luxury");
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

console.log(pokemon1AttackAnimations, pokemon2AttackAnimations);

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
    }
  }

  requestAnimationFrame(render);
}

// Start things off
render();
