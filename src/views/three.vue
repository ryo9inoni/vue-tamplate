<template lang="pug">
.stage
  canvas#canvas
</template>

<script>
import * as THREE from "three";

export default {
  data(){
    return{
    }
  },
  mounted(){
    const canvas = document.querySelector("#canvas");

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
    camera.position.set(0, 0, 1000);

    // ライト
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    // 平面
    var num = 45;
    for (let index = 0; index < num; index++) {
      const loader = new THREE.TextureLoader()
      .load("/assets/img/img_"+index+".jpg", (texture) => { // 読み込み完了時
        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshPhongMaterial({map: loader});
        const mesh = new THREE.Mesh(geometry, material);
        if (index % 4 == 0) {
          mesh.position.set(index * 10, index * 10, index * -50);
        } else if (index % 4 == 1) {
          mesh.position.set(index  * -10, index * 10, index * -50);
        } else if (index % 4 == 2) {
          mesh.position.set(index * 10, index * -10, index * -50);
        } else if (index % 4 == 3) {
          mesh.position.set(index * -10, index  * -10, index * -50);
        }
        mesh.scale.set(texture.image.width / 3, texture.image.height / 3, 1);
        scene.add(mesh);
      });
    }

    // レンダリング
    const render = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    render();
  }
}
</script>

<style lang="scss" scoped>
.three{
}
</style>