<template lang="pug">
.slider__controller.controller
	.controller__button.-next(@click="$emit('next')")
	.controller__button.-prev(@click="$emit('prev')")
</template>

<script>
export default {
	name: "Controller"
}
</script>

<style scoped lang="scss">
.controller{
	box-sizing: border-box;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	&__button{
		@include middle("y");
		@include button();
		&.-next{
			right: 24px;
		}
		&.-prev{
			left: 24px;
		}
		&::before{
			content: "";
			display: inline-block;
			width: 46px;
			height: 46px;
			border-bottom: solid 2px #fff;
		}
		&.-next::before{
			border-right: solid 2px #fff;
			transform: rotateZ(-45deg);
		}
		&.-prev::before{
			border-left: solid 2px #fff;
			transform: rotateZ(45deg);
		}
	}
}
</style>