<template lang="pug">
.about
  .about__wrapper
    .about__block(data-effect="fade-out", v-for="img in images", ref="blocks")
      img(:src="img.path", :alt="img.alt")
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
      images: [
        { path: "/assets/img/img_01.jpg", alt: "イメージ 01" },
        { path: "/assets/img/img_02.jpg", alt: "イメージ 02" },
        { path: "/assets/img/img_03.jpg", alt: "イメージ 03" },
        { path: "/assets/img/img_04.jpg", alt: "イメージ 04" },
        { path: "/assets/img/img_05.jpg", alt: "イメージ 05" },
      ]
    }
  },
  mounted(){
    PARALLAX(this.$refs["blocks"]);
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
    padding-top: 320px;
  }
  &__block{
    margin-bottom: 240px;
    max-width: 500px;
    @include transition(1300);
    img{
      width: 100%;
    }
  }
}
</style>
