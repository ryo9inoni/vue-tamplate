<template lang="pug">
.slideShow(@load="Init")
    .slideShow__wrapper(ref="wrapper")
        .slideShow__slide(:data-index="index", data-show="false", v-for="img, index in contents", ref="slides")
            img(:src="img.path", :alt="img.alt", ref="images")
    Controller(v-if="controller", @next="Next", @prev="Prev")
    Pagination(v-if="pagination", :length="lastIndex")
</template>

<script>
// コンポーネント
import Controller from "@/components/slideShow/controller";
import Pagination from "@/components/slideShow/pagination";

// 機能
// import SLIDE from "@/features/slide";
// import FADE from "@/features/fade";

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
            index: 1,
            lastIndex: Number,
            range: Number,
            next_num: Number,
            lock: false
        }
    },
    mounted(){
        window.addEventListener("load", this.Init);
        setTimeout(this.Tick, this.interval);
    },
    watch:{
        Auto(){
            console.log("auto");
            this.Active();
        }
    },
    computed:{
        Auto(){
            return this.index;
        },
        Lock(){
            return false;
        }
    },
    methods:{
        Init(){
            // 最初と最後の要素のクローンを生成
            const fistChildClone = this.$refs["wrapper"].firstElementChild.cloneNode(true);
            const lastChildClone = this.$refs["wrapper"].lastElementChild.cloneNode(true);
            this.$refs["wrapper"].append(fistChildClone);
            this.$refs["wrapper"].prepend(lastChildClone);

            // スライドの長さ取得
            this.lastIndex = this.$refs["slides"].length + 1;

            // 初期位置設定
            this.range = this.$el.clientWidth * this.index;
            this.$refs["wrapper"].style.transform = "translate3d(-"+this.range+"px, 0, 0)";
        },
        Tick(){
            setTimeout(this.Tick.bind(), this.interval);
            this.index == this.lastIndex ? this.index = 2 : this.index++;
        },
        Active(){
            this.range = this.$el.clientWidth * this.index;
            this.$refs["wrapper"].style.transitionDuration = this.duration+"ms";
            this.$refs["wrapper"].style.transitionTimingFunction = this.easing;
            this.$refs["wrapper"].style.transform = "translate3d(-"+this.range+"px, 0, 0)";
            this.$refs["wrapper"].addEventListener("transitionend", () => {
                this.$refs["wrapper"].style.transitionDuration = "";
                this.$refs["wrapper"].style.transitionTimingFunction = "";
                if(this.index  == this.lastIndex){
                    this.$refs["wrapper"].style.transform = "translate3d(-"+this.$el.clientWidth+"px, 0, 0)";
                }
            });
        },
        Next(){
            this.index++;
            this.Active();
        },
        Prev(){
            console.log("prev");
        }
    }
}
</script>

<style scoped lang="scss">
.slideShow{
    overflow: hidden;
    position: relative;
    max-width: 640px;
    &__wrapper{
        display: flex;
        position: relative;
        width:100%;
        height:100%;
    }
    &__slide{
        flex-shrink: 0;
        img{
            width: 100%;
        }
    }
}
</style>