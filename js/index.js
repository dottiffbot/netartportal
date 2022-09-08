import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.119.1/build/three.module.js";

import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.119.1/examples/jsm/loaders/GLTFLoader.js";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "https://unpkg.com/three@0.125.2/examples/jsm/renderers/CSS2DRenderer.js";

let object, posX, posY, posZ;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 1;
camera.position.y = 0.4;

// create scene
// const canvas = document.querySelector('#graphic')

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.className = "graphic";
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0x000000, 0);

// controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// light
const spotLight = new THREE.SpotLight();
spotLight.position.set(20, 150, 180);
scene.add(spotLight);

const color = 0xffffff;
const intensity = 0.5;
const ambiLight = new THREE.AmbientLight(color, intensity);
scene.add(ambiLight);

// const lightTwo = new THREE.SpotLight();
// lightTwo.position.set(50, 500, 180)
// scene.add(lightTwo);

const loadingManager = new THREE.LoadingManager(() => {
  const loadingScreen = document.getElementById("loading-screen");
  loadingScreen.classList.add("fade-out");

  // optional: remove loader from DOM via event listener
  loadingScreen.addEventListener("transitionend", onTransitionEnd);
});

// labels + links
const labelData = [
  {
    objectID: "mouth",
    text: "participants",
    url: "./pages/participants.html",
    msg: "kiss"
  },
  {
    objectID: "nose",
    text: "resources",
    url: "./pages/resources.html",
    msg: "sniff"
  },
  {
    objectID: "eye-L",
    text: "syllabus",
    url: "https://docs.google.com/document/d/1pZ0Wfn5dpBsSgjmpahOQN7ZdS1Um8gbdYB0wO4NF1nM/edit#",
    msg: "wink"
  },
  {
    objectID: "eye_R",
    text: "assignments",
    url: "./pages/assignments.html",
    msg: "twitch"
  },
];
let labelElements;
function initLabels(labelData) {
  console.log(labelData);
  return labelData.map(({ objectID, text, url, msg }) => {
    //generate label element
    const labelLink = document.createElement("a");
    labelLink.className = "label";
    labelLink.innerText = text;
    labelLink.href = url;
    labelLink.target = "_self";
    //add label into renderer
    const object = scene.getObjectByName(objectID);
    const { x, y, z } = object.position;
    const label = new CSS2DObject(labelLink);
    label.position.set(x, y, z);
    label.visible = false; //set label visibility on page load
    scene.add(label);
    return { objectID, msg, label, link: labelLink };
  });
}

// loader
const gltfLoader = new GLTFLoader(loadingManager);
const url =
  "https://cdn.glitch.me/ded3cc9d-d1c0-436f-a247-a553ba41ca53/house_face_baby.glb?v=1661870917730";

gltfLoader.load(url, (gltf) => {
  const haus = gltf.scene;
  scene.add(haus);

  //label setup needs to happen after house is loaded
  labelElements = initLabels(labelData);
  console.log(labelElements);
});

// raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

//label renderer
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.pointerEvents = "none";
labelRenderer.domElement.style.top = "0px";
document.body.appendChild(labelRenderer.domElement);

// event listeners
renderer.domElement.addEventListener("mousemove", showLabelOnHover, false);
renderer.domElement.addEventListener("click", touchLabel, true);
renderer.domElement.addEventListener("pointerup", showLabelOnHover, true); //for mobile
renderer.domElement.addEventListener("pointerup", touchLabel, true); //for mobile

function raycast(event) {
    // set mouse position where center of screen is origin
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // sets the ray from the camera position and mouse coordinates
  raycaster.setFromCamera(mouse, camera);
  // compute intersection
  const intersects = raycaster.intersectObjects(scene.children, true);
  return intersects;
}

function showLabelOnHover(event) {
  const intersects = raycast(event); //raycast from mouse pos & get intersections
  
  if (intersects.length > 0) {
    const object = intersects[0].object;
    const labelElement = labelElements.find(le => le.objectID === object.name);
    if (labelElement) {
      object.material.color.set(Math.random() * 0xffffff);
      labelElement.label.visible = true;
    } else {
      labelElements.forEach(le => {le.label.visible = false});
    }
  }
}

function touchLabel(event) {
  const intersects = raycast(event); //raycast from mouse pos & get intersections
  
  if (intersects.length > 0) {
    const object = intersects[0].object;
    const labelElement = labelElements.find(le => le.objectID === object.name);
    if (labelElement) {
      console.log(labelElement.msg);
      window.open(labelElement.link.href, "_self");
    }
  }
}

window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  // scene.rotation.y -= 0.001;
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();

function onTransitionEnd(event) {
  event.target.remove();
}

// let mobileMenu, menuScroll;
// const header = document.querySelector("header");

