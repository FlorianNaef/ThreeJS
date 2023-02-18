import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);


// Torus shape

const geometry = new THREE.TorusGeometry(5, 1, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x5FFF47 });
const torus = new THREE.Mesh(geometry,material);
torus.position.set(-10,10,30)
scene.add(torus);


// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);


// Stars

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);


// Box

const boxTexture = new THREE.TextureLoader().load('oh.jpg')

const box = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: boxTexture})
);
box.position.set(5,0,-5)
scene.add(box);


// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('moon_normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);
moon.position.set(-10,10,30)
scene.add(moon);


// Background

const spaceTexture = new THREE.TextureLoader().load('stars.jpg');
scene.background = spaceTexture;


// Scroll

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.75;
  moon.rotation.z += 0.05;

  box.rotation.y += 0.01;
  box.rotation.z += 0.01;

  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  camera.position.z = t * -0.02;
}
document.body.onscroll = moveCamera;



// Animate loop

animate();

function animate(){
  requestAnimationFrame(animate); 

  torus.rotation.x += 0.01;
  torus.rotation.z += 0.01;

  renderer.render(scene, camera);
}

