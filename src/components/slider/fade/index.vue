<template lang="pug">
.slider(:id="id")
	.slider__carousel.carousel(ref="carousel")
		.carousel__cell(data-show="false" :data-index="index" v-for="img, index in contents", ref="cells")
			img(:src="img.path", :alt="img.alt", ref="images")
	Controller(v-if="controller", @next="Next", @prev="Prev")
	Pagination(v-if="pagination", :contents="contents", @paging="Paging" @GetPagination="InitPagination")
</template>

<script>
// コンポーネント
import Controller from "@/components/slider/controller";
import Pagination from "@/components/slider/pagination";

export default {
	name: "Slider_Fade",
	components:{
		Controller,
		Pagination
	},
	props:{
		id: String,
		contents: Array,
		interval: Number,
		duration: Number,
		easing: String,
		controller: Boolean,
		pagination: Boolean,
	},
	data(){
		return{
			paginationButtons: [],
			index: 0,
			lastIndex: 0,
			slideLength: 0,
			range: 0,
			lock: false,
			tickLock: false,
			saveTimerIds: []
		}
	},
	mounted(){
			window.addEventListener("load", this.Init);
	},
	watch:{
		Auto(){
			this.Effect();
			this.DirectionPagination();
		}
	},
	computed:{
		Auto(){
			return this.index;
		}
	},
	methods:{
		Init(){
			// スライドの長さ取得
			this.lastIndex = this.$refs["cells"].length - 1;

			// 初期位置設定
			this.$refs["cells"][this.index].dataset.show = "true";
      this.$refs["cells"].forEach(element => {
        element.style.transition = this.duration+"ms";
      });

			// オートスライド開始
			setTimeout(this.Tick, this.interval);
		},
		InitPagination(buttons){
			this.paginationButtons = buttons;
			this.paginationButtons[0].dataset.show = true;
		},
		Direction(time){
			if(0 == this.index && time == "prev"){
				this.index = this.lastIndex;
			}else if(this.lastIndex == this.index && time == "next"){
				this.index = 0;
			}else{
				switch (time) {
					case "next":
						this.index++;
						break;
					case "prev":
						this.index--;
						break;
				}
			}
		},
		DirectionPagination(){
			this.EffectPagination(this.index);
		},
		Effect(){
			// エフェクト適応
      const showCell = document.querySelector("#"+this.id+" .carousel__cell[data-show='true']");
      showCell.dataset.show = "false";
      this.$refs["cells"][this.index].dataset.show = "true";

			// エフェクトリセット
			this.$refs["cells"][this.index].addEventListener("transitionend", () => {
				// スライドロック解除
				this.lock = false;
			});
		},
		EffectPagination(){
			const showButton = document.querySelector("#"+this.id+" .pagination__button[data-show='true']");
			showButton.dataset.show = false;
			this.paginationButtons[this.index].dataset.show = true;
		},
		Tick(){
			setTimeout(this.Tick.bind(), this.interval);
			if(this.tickLock) return;
			this.Active("next");
		},
		TickLock(){
			const active = () => {
				this.tickLock = false;
				this.saveTimerIds = [];
			}
			const timerId = setTimeout(active, this.interval);
			this.saveTimerIds.push(timerId);
			for (let i = 0; i < this.saveTimerIds.length - 1; i++) {
				clearTimeout(this.saveTimerIds[i]);
			}
			this.tickLock = true;
		},
		Next(){
			this.Active("next");
		},
		Prev(){
			this.Active("prev");
		},
		Paging(index){
			this.EffectPagination(index);
			this.Active("page", index);
		},
		Active(time, page){
			if(this.lock) return;
			this.lock = true;
			this.TickLock();
			time == "page" ? this.index = page : this.Direction(time);
			this.Effect();
		},
	}
}
</script>

<style scoped lang="scss">
.slider{
	overflow: hidden;
	position: relative;
	max-width: 640px;
	.carousel{
		position: relative;
		width: 100%;
		height: 100%;
		&__cell{
      position: absolute;
      top: 0;
      left: 0;
			flex-shrink: 0;
			width: 100%;
      opacity: 0;
      &:first-child{
        position: relative;
      }
			img{
					width: 100%;
			}
		}
    &__cell[data-show="true"]{
      opacity: 1;
    }
    &__cell[data-show="false"]{
      opacity: 0;
    }
	}
}
</style>