<template lang="pug">
.slider__pagination.pagination(ref="pagination")
  .pagination__button(data-show="false", v-for="img, index in contents", ref="buttons" @click="$emit('paging', index)")
</template>

<script>
export default {
	name: "Pagination",
	props:{
		contents: Array,
	},
	mounted(){
		this.$emit("GetPagination", this.$refs["buttons"]);
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