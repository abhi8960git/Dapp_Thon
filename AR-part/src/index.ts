// @ts-nocheck
/// Zappar for ThreeJS Examples
/// Instant Tracking 3D Model

// In this example we track a 3D model using instant world tracking

import * as THREE from "three";
import * as ZapparThree from "@zappar/zappar-threejs";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const model = new URL("../assets/pikachu.glb", import.meta.url).href;
const fbxModel = new URL("../assets/thrill.fbx", import.meta.url).href;
const pokemon1 = new URL(
  "../assets/wallhaven-4yjyvk_1920x1080.png",
  import.meta.url
).href;
const pokemon2 = new URL("../assets/favicon.png", import.meta.url).href;
const pokemon3 = new URL(
  "../assets/wallhaven-4yjyvk_1920x1080.png",
  import.meta.url
).href;

const tree1 = new URL("../assets/1.fbx", import.meta.url).href;
const tree2 = new URL("../assets/tree.glb", import.meta.url).href;

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

let mixer: THREE.AnimationMixer;
let modelReady = false;
const animationActions: THREE.AnimationAction[] = [];
let activeAction: THREE.AnimationAction;
let lastAction: THREE.AnimationAction;
const fbxLoader: FBXLoader = new FBXLoader();

gltfLoader.load(
  model,
  (gltf) => {
    console.log(gltf);
    gltf.scene.scale.set(5, 5, 5);
    gltf.scene.position.y = 2;
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    gltf.scene.traverse(function (node) {
      if (node.isMesh) {
        // node.material = material;
        console.log(node);
      }
    });
    mixer = new THREE.AnimationMixer(gltf);

    // Now the model has been loaded, we can add it to our instant_tracker_group
    instantTrackerGroup.add(gltf.scene);

    fbxLoader.load(
      fbxModel,
      (object) => {
        console.log("loaded goofyrunning");
        (object as THREE.Object3D).animations[0].tracks.shift(); //delete the specific track that moves the object forward while running
        //console.dir((object as THREE.Object3D).animations[0])
        const animationAction = mixer.clipAction(
          (object as THREE.Object3D).animations[0]
        );
        animationActions.push(animationAction);
        animationsFolder.add(animations, "Thrill");

        modelReady = true;
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
  (err) => {
    console.log("An error ocurred loading the GLTF model", err);
  }
);

// loading models

// fbxLoader.load(
//   tree1,
//   (object) => {
//     console.log("tree added", object);
//     object.scale.set(10, 10, 10);
//     instantTrackerGroup.add(object);
//   },
//   (xhr) => {
//     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//   },
//   (error) => {
//     console.log(error);
//   }
// );

gltfLoader.load(
  tree2,
  (gltf) => {
    console.log("tree", gltf);
    gltf.scene.scale.set(50, 50, 50);
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

//creating grid

const planeMesh2 = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, visible: false })
);

planeMesh2.rotateX(-Math.PI / 2);
planeMesh2.name = "ground";
//planeMesh2.position.y = -3;

instantTrackerGroup.add(planeMesh2);

const grid = new THREE.GridHelper(20, 20);
//grid.position.y = -3;
instantTrackerGroup.add(grid);

//highlight square

const hightSquare = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  new THREE.MeshBasicMaterial({ side: THREE.DoubleSide })
);

hightSquare.rotateX(-Math.PI / 2);
hightSquare.position.set(0.5, 0, 0.5);

instantTrackerGroup.add(hightSquare);

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

//adding rayRaster

canvas.addEventListener("click", onClick, false);
// canvas.addEventListener("mousemove", onMouseMove, false);
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function onClick(event: MouseEvent) {
  mouse.set(
    (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
  );
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(instantTrackerGroup.children);
  intersects.forEach(function (intersect) {
    console.log("intersecting", intersect);
    if (intersect.object.name === "ground") {
      const highlightPos = new THREE.Vector3()
        .copy(intersect.point)
        .floor()
        .addScalar(0.5);
      hightSquare.position.set(highlightPos.x, 0, highlightPos.z);
    }
  });
}

// console.log(sceneMeshes);

// creating nft

button_six.addEventListener("click", () => {
  // Create an image from the canvas
  // Temporarily set the camera to focus on the planeMesh
  const originalCameraPosition = camera.position.clone();
  camera.position.set(
    planeMesh.position.x,
    planeMesh.position.y,
    planeMesh.position.z + 5
  );
  camera.lookAt(planeMesh.position);

  // Render the scene
  renderer.render(scene, camera);

  // Capture the rendered image from the main renderer
  const screenshotImage = new Image();
  screenshotImage.src = renderer.domElement.toDataURL("image/png");

  // Create a link element for downloading
  const link = document.createElement("a");
  link.href = screenshotImage.src;
  link.download = "nft_image.png"; // Set the desired file name

  // Trigger the click event on the link to initiate the download
  link.click();

  // Reset the camera and visibility of the planeMesh
  camera.position.copy(originalCameraPosition);
  camera.lookAt(0, 0, 0);
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

const animations = {
  default: function () {
    setAction(animationActions[0]);
  },
  Boxing: function () {
    setAction(animationActions[1]);
  },
  bellydance: function () {
    setAction(animationActions[2]);
  },
  Thrill: function () {
    setAction(animationActions[3]);
  },
};

const setAction = (toAction: THREE.AnimationAction) => {
  if (toAction != activeAction) {
    lastAction = activeAction;
    activeAction = toAction;
    lastAction.stop();
    //lastAction.fadeOut(1)
    activeAction.reset();
    //activeAction.fadeIn(1)
    activeAction.play();
  }
};

const gui = new GUI();
const animationsFolder = gui.addFolder("Animations");
animationsFolder.open();
// Use a function to render our scene as usual
function render(): void {
  if (!hasPlaced) {
    // If the user hasn't chosen a place in their room yet, update the instant tracker
    // to be directly in front of the user
    instantTrackerGroup.setAnchorPoseFromCameraOffset(0, 0, -5);
  }

  // The Zappar camera must have updateFrame called every frame
  if (modelReady) mixer.update(clock.getDelta());
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
