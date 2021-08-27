import * as THREE from 'three'

import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import Fresnel_vShader from './glsl/Fresnel.vert';
import Fresnel_fShader from './glsl/Fresnel.frag';
import dissolve_vShader from './glsl/dissolve.vert';
import dissolve_fShader from './glsl/dissolve.frag';
import fire_vShader from './glsl/fire.vert';
import fire_fShader from './glsl/fire.frag';
import morph_vShader from './glsl/morph.vert';
import morph_fShader from './glsl/morph.frag';


import { Test } from './Test';
import { BufferAttribute, BufferGeometry, Material, Mesh } from 'three';

let Time: number;
let deltaTime: number;

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
    "texture1": { value: texture1 },
    "texture2": { value: texture2 },
    "texture3": { value: normal_texture },
    "texture4": { value: noise },
    "time": { value: Time },
  }

  const Fresnel_material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    transparent: true,
    vertexShader: Fresnel_vShader,
    fragmentShader: Fresnel_fShader,
    //vertexShader: dissolve_vShader,
    //fragmentShader: dissolve_fShader,
  });

  const dissolve_material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    transparent: true,
    vertexShader: dissolve_vShader,
    fragmentShader: dissolve_fShader,
  });

  const fire_material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    transparent: true,
    vertexShader: fire_vShader,
    fragmentShader: fire_fShader,
  });

  const morph_material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    transparent: true,
    vertexShader: morph_vShader,
    fragmentShader: morph_fShader,
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

  //console.log(  geometry.getAttribute('position'));

  let teapot_attribute: BufferAttribute;
  const loader = new GLTFLoader();
  loader.load(
    '/dist/asset/models/teapot.gltf',

    function (gltf) {
      const model = gltf.scene;

      model.traverse(function (node: any) {

        if (node instanceof THREE.Mesh) {
          node.material = Fresnel_material;
          node.material.transparent = true;
          teapot_attribute = node.geometry.getAttribute('position');
        }
      });

      scene.add(model);
      model.position.y = 5.0;
    }
  )

  loader.load(
    '/dist/asset/models/bunny.gltf',

    function (gltf) {
      const model = gltf.scene;

      model.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          console.log(node.geometry);
          node.geometry.setAttribute( 'Target', teapot_attribute );
          node.material = morph_material;
          node.material.transparent = true;
        }
      });

      scene.add(model);
      model.position.x = 6.0;
      model.position.y = 5.0;
    }
  )

  camera.position.z = 5;
  camera.position.y = 10;


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