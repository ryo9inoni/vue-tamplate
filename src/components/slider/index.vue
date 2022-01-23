<template lang="pug">
.slider(:id="id")
	.slider__carousel.carousel(ref="carousel")
		.carousel__cell(:data-index="index" v-for="img, index in contents", ref="cells")
			img(:src="img.path", :alt="img.alt", ref="images")
	Controller(v-if="controller", @next="Next", @prev="Prev")
	Pagination(v-if="pagination", :contents="contents", @paging="Paging" @GetPagination="InitPagination")
</template>

<script>
// コンポーネント
import Controller from "@/components/slider/controller";
import Pagination from "@/components/slider/pagination";

export default {
	name: "Slider",
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
			index: 1,
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
			this.lastIndex = this.$refs["cells"].length + 1;

			// 最初と最後の要素のクローンを生成
			const fistClone = this.$refs["carousel"].firstElementChild.cloneNode(true);
			const lastClone = this.$refs["carousel"].lastElementChild.cloneNode(true);
			this.$refs["carousel"].append(fistClone);
			this.$refs["carousel"].prepend(lastClone);

			// 初期位置設定
			this.range = this.$el.clientWidth * this.index;
			this.$refs["carousel"].style.transform = "translate3d(-"+this.range+"px, 0, 0)";

			// オートスライド開始
			setTimeout(this.Tick, this.interval);
		},
		InitPagination(buttons){
			this.paginationButtons = buttons;
			this.paginationButtons[0].dataset.show = true;
		},
		Direction(time){
			if(0 == this.index){
				switch (time) {
					case "next":
						this.index = this.lastIndex;
						break;
					case "prev":
						this.index = this.lastIndex - 2;
						break;
				}
			}else if(this.lastIndex == this.index){
				switch (time) {
					case "next":
						this.index = 2;
						break;
					case "prev":
						this.index = 0;
						break;
				}
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
			let i;
			if(0 == this.index ){
				i = this.lastIndex - 2;
			}else if(this.lastIndex == this.index){
				i = 0;
			}else{
				i = this.index - 1;
			}
			this.EffectPagination(i);
		},
		Effect(){
			// エフェクト適応
			this.range = this.$el.clientWidth * this.index;
			this.$refs["carousel"].style.transitionDuration = this.duration+"ms";
			this.$refs["carousel"].style.transitionTimingFunction = this.easing;
			this.$refs["carousel"].style.transform = "translate3d(-"+this.range+"px, 0, 0)";

			// エフェクトリセット
			this.$refs["carousel"].addEventListener("transitionend", () => {
				this.$refs["carousel"].style.transitionDuration = "";
				this.$refs["carousel"].style.transitionTimingFunction = "";
				if(this.index  == this.lastIndex){
						this.$refs["carousel"].style.transform = "translate3d(-"+this.$el.clientWidth+"px, 0, 0)";
				}else if(this.index == 0){
						this.$refs["carousel"].style.transform = "translate3d(-"+(this.$el.clientWidth * (this.lastIndex - 1))+"px, 0, 0)";
				}
				// スライドロック解除
				this.lock = false;
			});
		},
		EffectPagination(index){
			const showButton = document.querySelector("#"+this.id+" .pagination__button[data-show='true']");
			showButton.dataset.show = false;
			this.paginationButtons[index].dataset.show = true;
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
			this.Active("page", index + 1);
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
		display: flex;
		position: relative;
		width: 100%;
		height: 100%;
		&__cell{
			flex-shrink: 0;
			width: 100%;
			img{
					width: 100%;
			}
		}
	}
}
</style>