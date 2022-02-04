<template lang="pug">
.three
  canvas#canvas
</template>

<script>
import * as THREE from 'three';

import vertSource from "@/shaders/shader.vert";
import fragSource from "@/shaders/shader.frag";

export default {
  mounted(){
    this.Init();
  },
  methods:{
    Init(){
      this.canvasEl = document.getElementById('canvas');
      this.canvasSize = {
        w: window.innerWidth,
        h: window.innerHeight,
      };

      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvasEl });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.canvasSize.w, this.canvasSize.h);

      this.fov = 60;
      this.fovRad = (this.fov / 2) * (Math.PI / 180);
      this.dist = this.canvasSize.h / 2 / Math.tan(this.fovRad);
      this.camera = new THREE.PerspectiveCamera(
        this.fov,
        this.canvasSize.w / this.canvasSize.h,
        0.1,
        1000
      );
      this.camera.position.z = this.dist;

      this.scene = new THREE.Scene();

      this.loader = new THREE.TextureLoader();
      this.texture = this.loader.load("/assets/img/texture_01.jpg");

      const uniforms = {
        uTexture: { value: this.texture },
        uImageAspect: { value: (8192 / 20) / (6161 / 20) }, // 画像のアスペクト
        uPlaneAspect: { value: 8192 / 6161 }, // プレーンのアスペクト
        uTime: { value: 0 }, // 時間経過
      }

      this.geo = new THREE.PlaneBufferGeometry(800, 500, 100, 100);
      this.mat = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: vertSource,
        fragmentShader: fragSource,
      });

      this.mesh = new THREE.Mesh(this.geo, this.mat);
      this.scene.add(this.mesh);

      const tick = () => {
        uniforms.uTime.value++;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(tick);
      }
      tick();
    }
  }
}
</script>

<style>
.three{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

#canvas{
  width: 100%;
  height: 100%;
}

</style>