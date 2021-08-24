import * as THREE from 'three'

import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';

import Fresnel_vShader from './glsl/Fresnel.vert';
import Fresnel_fShader from './glsl/Fresnel.frag';
import dissolve_vShader from './glsl/dissolve.vert';
import dissolve_fShader from './glsl/dissolve.frag';
import fire_vShader from './glsl/fire.vert';
import fire_fShader from './glsl/fire.frag';


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

  const texture1 = new THREE.TextureLoader().load("/dist/asset/textures/HexPulse.png");
  const texture2 = new THREE.TextureLoader().load("/dist/asset/textures/UV_Grid_Sm.jpg");
  const normal_texture = new THREE.TextureLoader().load("/dist/asset/textures/normal.jpg");
  normal_texture.wrapS = THREE.RepeatWrapping;
  normal_texture.wrapT = THREE.RepeatWrapping;
  
  const noise = new THREE.TextureLoader().load("/dist/asset/textures/noise/noise_texture_0006.png");
  noise.wrapS = THREE.RepeatWrapping;
  noise.wrapT = THREE.RepeatWrapping;

  const geometry = new THREE.SphereGeometry();
  const uniforms = {
    "texture1" : { value : texture1},
    "texture2" : { value : texture2},
    "texture3" : { value : normal_texture},
    "texture4" : { value : noise},
    "time": { value: Time },
  }

  const Fresnel_material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    transparent : true,
    vertexShader: Fresnel_vShader,
    fragmentShader: Fresnel_fShader,
    //vertexShader: dissolve_vShader,
    //fragmentShader: dissolve_fShader,
  });

  const dissolve_material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    transparent : true,
    vertexShader: dissolve_vShader,
    fragmentShader: dissolve_fShader,
  });

  const fire_material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    transparent : true,
    vertexShader: fire_vShader,
    fragmentShader: fire_fShader,
  });

  const shpere = new THREE.Mesh(geometry, Fresnel_material);
  scene.add(shpere);
  shpere.position.y = 1.0;

  const shpere2 = new THREE.Mesh(geometry, dissolve_material);
  scene.add(shpere2);
  shpere2.position.x = 2.5;
  shpere2.position.y = 1.0;

  const shpere3 = new THREE.Mesh(geometry, fire_material);
  scene.add(shpere3);
  shpere3.position.x = -2.5;
  shpere3.position.y = 1.0;

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
    console.log(Time);

    stats.update();
    controls.update();
    renderer.render(scene, camera);
  };

  animate();
})