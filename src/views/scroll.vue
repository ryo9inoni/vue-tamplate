<template lang="pug">
.road(ref="road" @wheel="wheel")
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
      move: 0,
      range: 0,
		}
	},
  watch:{},
  computed:{},
  mounted(){
    this.range = this.$refs["truck"].clientWidth - window.innerWidth;
  },
  methods:{
    wheel(e){
      if(this.range >= this.move && 0 <= this.move){
        // 移動距離
        this.move += e.deltaY;

        // 移動範囲を超えてしまった場合、最大・最小値に戻す
        if(this.move >= this.range){
          this.move = this.range;
        }else if(this.move <= 0){
          this.move = 0;
        }

        this.$refs["truck"].style.transform = "translate3d(-"+this.move+"px, 0, 0)";
      }
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
  .truck{
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    height: 100%;
    transition-duration: 140ms;
    transition-timing-function: ease-out;
    &__block{
      flex-shrink: 0;
      width: 100vw;
      text-align: center;
      img{
        width: 640px;
      }
    }
  }

}
</style>