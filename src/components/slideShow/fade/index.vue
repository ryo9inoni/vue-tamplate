<template lang="pug">
.slideShow
    .slideShow__wrap
        .slideShow__contents
            .slideShow__slide(v-for="img in contents", ref="slides")
                img(:src="img.path", :alt="img.alt", @load="Init")
        Controller(v-if="controller")
        Pagination(v-if="pagination")
</template>

<script>
// コンポーネント
import Controller from "@/components/slideShow/controller";
import Pagination from "@/components/slideShow/pagination";

// 機能
import FADE from "@/features/fade";

export default {
    name: "SlideShow_fade",
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
            index: 0,
            lastIndex: Number
        }
    },
    mounted(){
        this.lastIndex = this.$refs["slides"].length - 1;
        this.Init();
    },
    watch:{
        Changing(index){
            const current = index == 0 ? this.lastIndex : index - 1;
            const next = index;
            FADE(this.$refs["slides"][current], "out", this.duration);
            FADE(this.$refs["slides"][next], "in", this.duration);
        }
    },
    computed:{
        Changing(){
            return this.index;
        }
    },
    methods:{
        Init(){
            this.Size();
            setTimeout(this.Tick, this.interval);
        },
        Size(){
            this.$el.style.width = this.$refs["slides"][0].clientWidth+"px";
            this.$el.style.height = this.$refs["slides"][0].clientHeight+"px";
        },
        Tick(){
            setTimeout(this.Tick.bind(), this.interval);
            this.index == this.lastIndex ? this.index = 0 : this.index++;
        }
    }
}
</script>

<style scoped lang="scss">
.slideShow{
    box-sizing: border-box;
    width: 100%;
    max-width: 640px;
    &__wrap{
        position: relative;
        width: 100%;
        height: 100%;
    }
    &__contents{
        position: relative;
        width: 100%;
        height: 100%;
    }
    &__slide{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        &:first-child{
            position: relative;
            opacity: 1;
        }
    }
}
</style>