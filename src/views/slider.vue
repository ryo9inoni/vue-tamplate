<template lang="pug">
.home
	.home__block
		Slider(
			:id="'a'",
			:contents="images",
			:interval="1000",
			:duration="300",
			:easing="'ease-out'",
			:controller="true",
			:pagination="true"
		)
	.home__block
		Slider_Fade(
			:id="'b'",
			:contents="images",
			:interval="3000",
			:duration="500",
			:easing="'ease-out'",
			:controller="true",
			:pagination="true"
		)
	.home__block
		Slider(
			:id="'c'",
			:contents="images",
			:interval="5000",
			:duration="1000",
			:easing="'ease-out'",
			:controller="true",
			:pagination="true"
		)
	.home__block
		Slider_Fade(
			:id="'d'",
			:contents="images",
			:interval="7000",
			:duration="1300",
			:easing="'ease-out'",
			:controller="true",
			:pagination="true"
		)
</template>

<script>
import Slider from "@/components/slider/";
import Slider_Fade from "@/components/slider/fade";

export default {
	name: "Home",
	components: {
		Slider,
		Slider_Fade,
	},
	data(){
		return{
			images: [
				{ path: "/assets/img/sample_01.jpg", alt: "イメージ 01" },
				{ path: "/assets/img/sample_02.jpg", alt: "イメージ 02" },
				{ path: "/assets/img/sample_03.jpg", alt: "イメージ 03" },
				{ path: "/assets/img/sample_04.jpg", alt: "イメージ 04" },
				{ path: "/assets/img/sample_05.jpg", alt: "イメージ 05" },
			]
		}
	},
}
</script>

<style scoped lang="scss">
.home{
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: 36px 120px;
	width: 100%;
	&__block{
		margin: 0 auto 40px;
	}
}
</style>
