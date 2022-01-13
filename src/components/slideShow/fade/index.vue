<template lang="pug">
.slideShow(:data-id="id")(:data-interval="interval")
    .slideShow__wrap
        .slideShow__contents
            .slideShow__slide(v-for="img in contents", ref="slides")
                img(:src="img.path", :alt="img.alt")
        Controller
        Pagination
</template>

<script>
// コンポーネント
import Controller from "@/components/slideShow/controller";
import Pagination from "@/components/slideShow/pagination";

// 機能
import FADE from "@/feature/fade";

export default {
    contents:{
        Controller,
        Pagination
    },
    props:{
        contents: Array,
        id: Number,
        interval: Number
    },
    data(){
        return{
            index: 0,
            lastIndex: Number
        }
    },
    mounted(){
        this.lastIndex = this.$refs["slides"].length - 1;
        setTimeout(this.Tick(), this.interval);
    },
    watch:{
        Changing(index){
            const current = index == 0 ? this.lastIndex : index - 1;
            const next = index;
            FADE(this.$refs["slides"][current], "out");
            FADE(this.$refs["slides"][next], "in");
        }
    },
    computed:{
        Changing(){
            return this.index;
        }
    },
    methods:{
        Tick(){
            setTimeout(this.Tick.bind(), this.interval);
            this.index == this.lastIndex ? this.index = 0 : this.index++;
        }
    }
}
</script>

<style scoped lang="scss">
.slideShow{
    width: 100%;
    max-width: 640px;
    &__wrap{
        position: relative;
        width: 100%;
    }
    &__contents{
        position: relative;
        width: 100%;
    }
    &__slide{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        &:first-child{
            opacity: 1;
        }
    }
}
</style>