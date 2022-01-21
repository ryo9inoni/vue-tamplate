<template lang="pug">
.home
	SlideShow(
		:contents="images",
		:interval="3000",
		:duration="300",
		:easing="'ease-out'",
		:controller="true",
		:pagination="true"
	)
</template>

<script>
import SlideShow from "@/components/slideShow/";

export default {
	name: "Home",
	components: {
		SlideShow,
	},
	data(){
		return{
			images: [
				{ path: "/assets/img/img_01.jpg", alt: "イメージ 01" },
				{ path: "/assets/img/img_02.jpg", alt: "イメージ 02" },
				{ path: "/assets/img/img_03.jpg", alt: "イメージ 03" },
				{ path: "/assets/img/img_04.jpg", alt: "イメージ 04" },
				{ path: "/assets/img/img_05.jpg", alt: "イメージ 05" },
			]
		}
	},
}
</script>

<style scoped lang="scss">
.home{
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 36px 24px;
	width: 100%;
}
</style>
