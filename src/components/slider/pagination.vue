<template lang="pug">
.slideShow__pagination.pagination(ref="pagination")
  .pagination__button(data-show="false", v-for="slide, index in length", ref="buttons" @click="$emit('paging', index + 1)")
</template>

<script>
export default {
	name: "Pagination",
	props:{
		length: Array,
		index: Number,
	},
	data(){
		return{
			lastIndex: Number
		}
	},
	watch:{
		Auto(i){
			const showButton = document.querySelector(".pagination__button[data-show='true']");
			showButton.dataset.show = false;
			if(0 == i){
				i = this.lastIndex - 2;
			}else if(this.lastIndex == i){
				i = 0;
			}else{
				i = i - 1
			}
			this.$refs["buttons"][i].dataset.show = true;
		}
	},
	computed:{
		Auto(){
			return this.index;
		}
	},
	mounted(){
		this.lastIndex = this.$refs["buttons"].length + 1;
		this.$refs["buttons"][0].dataset.show = true;
	},
	methods: {
	}
}
</script>

<style scoped lang="scss">
.pagination{
	display: flex;
	justify-content: center;
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	margin: 0 auto;
	padding: 0 16px;
	z-index: 2;
	&__button{
		display: inline-block;
		position: relative;
		width: 32px;
		height: 32px;
		@include button();
		&::before{
			content: "";
			display: inline-block;
			width: 8px;
			height: 8px;
			background-color: #fff;
			border-radius: 50%;
			opacity: 0;
			@include middle("xy");
			@include transition();
		}
	}
	&__button[data-show="true"]{
		cursor: default;
		pointer-events: none;
		&::before{
				opacity: 0.7;
		}
	}
	&__button[data-show="false"]{
		&::before{
				opacity: 1;
		}
	}
}
</style>