<template lang="pug">
.drawing
  .picture
  canvas#canvas
</template>

<script>
// EaselJS系の読み込み
import { Stage, Touch, Shape, Ticker } from "@createjs/easeljs";

export default {
  mounted(){
    const stage = new Stage("canvas");
    const handleTick = () => {
      stage.update();
    }
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
    Ticker.timingMode = Ticker.RAF;
    Ticker.addEventListener("tick", handleTick);

    if (Touch.isSupported()) {
      Touch.enable(stage);
    }

    const shape = new Shape();
    stage.addChild(shape);

    stage.addEventListener("stagemousedown", handleDown);
    function handleDown(event) {
      var paintColor = "#FFFFFF"

      shape.graphics
        .beginStroke(paintColor)
        .setStrokeStyle(1, "round")
        .moveTo(event.stageX, event.stageY);

      stage.addEventListener("stagemousemove", handleMove);
      stage.addEventListener("stagemouseup", handleUp);
    }

    function handleMove(event) {
      shape.graphics.lineTo(event.stageX, event.stageY);
    }

    function handleUp(event) {
      shape.graphics.lineTo(event.stageX, event.stageY);
      shape.graphics.endStroke();

      stage.removeEventListener("stagemousemove", handleMove);
      stage.removeEventListener("stagemouseup", handleUp);
    }
  },
  methods:{
  }
}
</script>

<style scoped lang="scss">
.drawing{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .picture{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(/assets/img/canvas_01.jpg);
    background-size: cover;
  }
  #canvas{
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>