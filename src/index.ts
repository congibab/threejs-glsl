import * as THREE from 'three'

import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import vShader from './glsl/test.vert';
import fShader from './glsl/test.frag';

import { Test } from './Test';

let Time : number;
let deltaTime : number;

window.addEventListener("DOMContentLoaded", () => {

  const testManager = Test.getInstance();
  testManager.view();

  const clock = new THREE.Clock();
  Time = clock.getElapsedTime();
  deltaTime = clock.getDelta();

  const stats = Stats();
  document.body.appendChild(stats.dom)

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  const gridHelper = new THREE.GridHelper(100, 100);
  scene.add(gridHelper);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  console.log(vShader);
  console.log(fShader);

  const texture = new THREE.TextureLoader().load("/dist/asset/textures/HexPulse.png");
  const geometry = new THREE.SphereGeometry();
  
  const uniforms = {
    "texture1" : { value : texture},
    "time": { value: Time },
  }

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    transparent : true,
    vertexShader: vShader,
    fragmentShader: fShader
  });
  const shpere = new THREE.Mesh(geometry, material);
  scene.add(shpere);
  shpere.position.y = 1.0;

  const cube = new THREE.Mesh(new THREE.BoxGeometry(), material);
  scene.add(cube);
  cube.position.x = 2.5;
  cube.position.y = 1.0;

  camera.position.z = 5;
  camera.position.y = 1;

  window.addEventListener('resize', onWindowResize, false);
  function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    requestAnimationFrame(animate);

    Time = clock.getElapsedTime();
    deltaTime = clock.getDelta();
    uniforms['time'].value = Time;

    stats.update();
    controls.update();
    renderer.render(scene, camera);
  };

  animate();
})