import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import vShader from './glsl/test.vert';
import fShader from './glsl/test.frag';

let Time : number;
let deltaTime : number;

window.addEventListener("DOMContentLoaded", () => {

  const clock = new THREE.Clock();
  Time = clock.getElapsedTime();
  deltaTime = clock.getDelta();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  const gridHelper = new THREE.GridHelper(100, 100);
  scene.add(gridHelper);

  console.log(vShader);

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


  camera.position.z = 5;

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

    controls.update();
    renderer.render(scene, camera);
  };

  animate();
})