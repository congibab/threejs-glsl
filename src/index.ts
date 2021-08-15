import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import vShader from './glsl/test.vert';
import fShader from './glsl/test.frag';

window.addEventListener("DOMContentLoaded", () => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  const gridHelper = new THREE.GridHelper(100, 100);
  scene.add(gridHelper);

  console.log(vShader);

  const geometry = new THREE.SphereGeometry();
  const material = new THREE.ShaderMaterial({

    uniforms: {
      "time": { value: 1.0 },
    },
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

    controls.update();
    renderer.render(scene, camera);
  };

  animate();
})