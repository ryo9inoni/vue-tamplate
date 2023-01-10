<template lang="pug">
.grid
  ul.grid__list.list(ref="list")
    li.list__item(ref="items", v-for="key, index of num")
      img(:src="'/assets/img/grid/img_'+index+'.jpg'" alt="")
</template>

<script>
export default {
  name: "Grid",
  data(){
    return{
      col: 0,
      row: 0,
      num: 46,
      bp:{
        s: 600,
        m: 768,
        l: 960,
        xl: 1024
      },
    }
  },
  watch:{
  },
  mounted(){
    this.BreakPoint(this.$el.clientWidth);
    window.addEventListener("load", this.SetPosition);
    window.addEventListener("resize", this.Resize);
  },
  methods:{
    BreakPoint(w){
      if(this.bp.s > w){
        this.size = this.bp.s;
        this.col = 2;
      }else if(this.bp.m > w){
        this.size = this.bp.m;
        this.col = 3;
      }else if(this.bp.l > w){
        this.size = this.bp.l;
        this.col = 4;
      }else if(this.bp.xl > w){
        this.size = this.bp.l;
        this.col = 5;
      }else if(this.bp.xl <= w){
        this.size = this.bp.l;
        this.col = 6;
      }
    },
    SetPosition(){
      let j = 0;
      for (let i = 0; i < this.$refs["items"].length; i++) {
        if(i % this.col == 0){
          j = 0;
          if(i > 0) this.row++;
        }else{
          j++;
        }

        // 横並び
        if(i > 0) this.$refs["items"][i].style.left = (this.$refs["items"][i - 1].clientWidth * j)+"px";
        this.$refs["items"][i].dataset.col = j;
        this.$refs["items"][i].dataset.row = this.row;
        this.$refs["items"][i].style.width = 100 / this.col+"%";

        // 縦並び
        // カラム数でインデックスを引いた数が上に位置しているグリッドになる
        // 0以下になる数は一番上に位置しているグリッド
        const calc = i - this.col;
        if(calc > 0){
          const pos = this.$refs["items"][i - this.col].getBoundingClientRect().top + this.$refs["items"][i - this.col].clientHeight;
          this.$refs["items"][i].style.top = pos+"px";
        }
      }
    },
    Resize(){
      this.BreakPoint(this.$el.clientWidth);
      this.SetPosition();
    }
  }
}
</script>

<style lang="scss" scoped>
.grid{
  margin: 0 auto;
  max-width: 1024px;
  .list{
    position: relative;
    width: 100%;
    &__item{
      position: absolute;
      // object-fit: cover;
      // aspect-ratio: 4 / 3;
      @include transition(300);
      img{
        width: 100%;
      }
    }
  }
}
</style>