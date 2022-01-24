<template lang="pug">
.road(
    ref="road",
    @wheel="Wheel",
    @mousedown="Start",
    @mousemove="Move",
    @mouseup="End",
    @touchstart="Start",
    @touchmove="Move",
    @touchend="End"
  )
  .truck(ref="truck")
    .truck__block(v-for="img in images")
      img(:src="img.path", :alt="img.alt")
</template>

<script>

export default {
	name: "Scroll",
	data(){
		return{
			images: [
				{ path: "/assets/img/img_01.jpg", alt: "イメージ 01" },
				{ path: "/assets/img/img_02.jpg", alt: "イメージ 02" },
				{ path: "/assets/img/img_03.jpg", alt: "イメージ 03" },
				{ path: "/assets/img/img_04.jpg", alt: "イメージ 04" },
				{ path: "/assets/img/img_05.jpg", alt: "イメージ 05" },
			],
      width: 0,
      range: 0,
      startX: 0,
      moveX: 0,
      endX: 0
		}
	},
  watch:{},
  computed:{},
  mounted(){
    document.querySelector("body").classList.add("overflow-hidden");
    this.width = this.$refs["truck"].clientWidth - window.innerWidth;
  },
  methods:{
    Wheel(e){
      if(e.deltaY > 0){
        this.$store.state.interactive = true;
      }else{
        this.$store.state.interactive = false;
      }

      if(this.range >= 0 && this.range <= this.width){
        // 移動範囲取得
        this.range += e.deltaY;

        // 移動範囲を超えてしまった場合、最大・最小値に戻す
        if(this.range <= 0){
          this.range = 0;
        }else if(this.range >= this.width){
          this.range = this.width;
        }

        // 移動範囲設定
        this.$refs["truck"].style.transform = "translate3d(-"+this.range+"px, 0, 0)";
      }
    },
    Start(e){
      this.$store.state.interactive = true;
      this.startX = e.pageX;
    },
    Move(e){
      if(!this.$store.state.interactive) return;
      if(this.range >= 0 && this.range <= this.width){
        this.moveX = e.pageX;
        this.endX = this.startX - this.moveX + this.range;

        // 移動範囲を超えてしまった場合、最大・最小値に戻す
        if(this.endX <= 0){
          this.endX = 0;
        }else if(this.endX >= this.width){
          this.endX = this.width;
        }

        // 移動範囲設定
        this.$refs["truck"].style.transform = "translate3d(-"+this.endX+"px, 0, 0)";
      }
    },
    End(){
      this.$store.state.interactive = false;
      this.range = this.endX;
    }
  }
}
</script>

<style scoped lang="scss">
.road{
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: grab;
  &:active{
    cursor: grabbing;
  }
  .truck{
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    height: 100%;
    transition-duration: 500ms;
    transition-timing-function: ease-out;
    &__block{
      flex-shrink: 0;
      width: 100vw;
      text-align: center;
      pointer-events: none;
      img{
        width: 460px;
      }
    }
  }

}
</style>