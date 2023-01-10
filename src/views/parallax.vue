<template lang="pug">
main.about
	.about__wrapper
		.about__block
		section.section(v-for="section in sectionArray", ref="section")
			h2.section__heading(ref="heading") {{ section.heading }}
			img.section__image(:src="section.image", :alt="section.heading")
</template>

<script>
// モジュール
import PARALLAX from "@/modules/parallax";

export default {
	name: "About",
	components: {
	},
	data(){
		return{
			sectionArray: [
				{ image: "/assets/img/sample_01.jpg", heading: "イメージ 01" },
				{ image: "/assets/img/sample_02.jpg", heading: "イメージ 02" },
				{ image: "/assets/img/sample_03.jpg", heading: "イメージ 03" },
				{ image: "/assets/img/sample_04.jpg", heading: "イメージ 04" },
				{ image: "/assets/img/sample_05.jpg", heading: "イメージ 05" },
			]
		}
	},
	mounted(){
		PARALLAX(this.$refs["heading"]);
	}
}
</script>

<style scoped lang="scss">
.about{
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 36px 24px;
	width: 100%;
	&__wrapper{
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	&__block{
		width: 100%;
		height: 100vh;
	}
	.section{
		position: relative;
		margin-bottom: 240px;
		max-width: 500px;
		&__heading{
			position: absolute;
			left: -25%;
			font-size: 4rem;
		}
		&__image{
			width: 100%;
		}
	}
	[data-parallax="on"]{
		@include transition(300);
	}
}
</style>
