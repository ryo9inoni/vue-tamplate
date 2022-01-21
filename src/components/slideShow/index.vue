<template lang="pug">
.slideShow
	.slideShow__truck(ref="truck")
		.slideShow__slide(:data-index="index" v-for="img, index in contents", ref="slides")
			img(:src="img.path", :alt="img.alt", ref="images")
	Controller(v-if="controller", @next="Next", @prev="Prev")
	Pagination(v-if="pagination", :length="contents", :index="index", @paging="Paging")
</template>

<script>
// コンポーネント
import Controller from "@/components/slideShow/controller";
import Pagination from "@/components/slideShow/pagination";

// モジュール
// import FADE from "@/modules/fade";

export default {
	name: "SlideShow",
	components:{
		Controller,
		Pagination
	},
	props:{
		contents: Array,
		interval: Number,
		duration: Number,
		easing: String,
		controller: Boolean,
		pagination: Boolean
	},
	data(){
		return{
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
			this.lastIndex = this.$refs["slides"].length + 1;

			// 最初と最後の要素のクローンを生成
			const fistClone = this.$refs["truck"].firstElementChild.cloneNode(true);
			const lastClone = this.$refs["truck"].lastElementChild.cloneNode(true);
			this.$refs["truck"].append(fistClone);
			this.$refs["truck"].prepend(lastClone);

			// 初期位置設定
			this.range = this.$el.clientWidth * this.index;
			this.$refs["truck"].style.transform = "translate3d(-"+this.range+"px, 0, 0)";

			// オートスライド開始
			setTimeout(this.Tick, this.interval);
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
		Effect(){
			// エフェクト適応
			this.range = this.$el.clientWidth * this.index;
			this.$refs["truck"].style.transitionDuration = this.duration+"ms";
			this.$refs["truck"].style.transitionTimingFunction = this.easing;
			this.$refs["truck"].style.transform = "translate3d(-"+this.range+"px, 0, 0)";

			// エフェクトリセット
			this.$refs["truck"].addEventListener("transitionend", () => {
				this.$refs["truck"].style.transitionDuration = "";
				this.$refs["truck"].style.transitionTimingFunction = "";
				if(this.index  == this.lastIndex){
						this.$refs["truck"].style.transform = "translate3d(-"+this.$el.clientWidth+"px, 0, 0)";
				}else if(this.index == 0){
						this.$refs["truck"].style.transform = "translate3d(-"+(this.$el.clientWidth * (this.lastIndex - 1))+"px, 0, 0)";
				}
				// スライドロック解除
				this.lock = false;
			});
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
		Paging(i){
			this.Active("page", i);
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
.slideShow{
	overflow: hidden;
	position: relative;
	max-width: 640px;
	&__truck{
		display: flex;
		position: relative;
		width: 100%;
		height: 100%;
	}
	&__slide{
		flex-shrink: 0;
		width: 100%;
		img{
				width: 100%;
		}
	}
}
</style>