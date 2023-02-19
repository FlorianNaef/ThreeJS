import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


// Setup

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);


// Controlls

const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 20, 100 );
controls.update();


// Box

const boxTexture = new THREE.TextureLoader().load('oh.jpg')

const box = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: boxTexture})
);
scene.add(box);


// Torus
const geometry = new THREE.TorusGeometry( 10, 3, 2, 100 );
const material = new THREE.MeshBasicMaterial( { color: 0x025cb3, mesh: true} );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

// Grid

const gridHelper = new THREE.GridHelper( 100, 10 );
scene.add( gridHelper );

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);


// Animate loop

animate();

function animate(){
  requestAnimationFrame(animate); 

  controls.update();

  renderer.render(scene, camera);
}

