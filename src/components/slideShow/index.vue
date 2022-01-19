<template lang="pug">
.slideShow(@load="Init")
    .slideShow__wrapper(ref="wrapper")
        .slideShow__slide(:data-index="index", data-show="false", v-for="img, index in contents", ref="slides")
            img(:src="img.path", :alt="img.alt", ref="images")
    Controller(v-if="controller", @next="Next", @prev="Prev")
    Pagination(v-if="pagination", @paging="Paging" :length="lastIndex", :index="index - 1")
</template>

<script>
// コンポーネント
import Controller from "@/components/slideShow/controller";
import Pagination from "@/components/slideShow/pagination";

// モジュール
// import FADE from "@/modules/fade";

export default {
    name: "SlideShow",
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
            autoLock: false,
            effectLock: false,
            saveTimerIds: []
        }
    },
    mounted(){
        window.addEventListener("load", this.Init);
    },
    watch:{
        Auto(){
            this.Effect();
        }
    },
    computed:{
        Auto(){
            return this.index;
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

            // オートスライド開始
            setTimeout(this.Tick, this.interval);
        },
        Direction(time){
            if(this.index == 0){
                switch (time) {
                    case "next":
                        this.index = this.lastIndex;
                        break;
                    case "prev":
                        this.index = this.lastIndex - 2;
                        break;
                }
            }else if(this.index == this.lastIndex){
                switch (time) {
                    case "next":
                        this.index = 2;
                        break;
                    case "prev":
                        this.index = 0;
                        break;
                }
            }else{
                switch (time) {
                    case "next":
                        this.index++;
                        break;
                    case "prev":
                        this.index--;
                        break;
                }
            }
        },
        Effect(){
            // スライドロック
            if(this.effectLock) return;
            this.effectLock = true;

            // エフェクト適応
            this.range = this.$el.clientWidth * this.index;
            this.$refs["wrapper"].style.transitionDuration = this.duration+"ms";
            this.$refs["wrapper"].style.transitionTimingFunction = this.easing;
            this.$refs["wrapper"].style.transform = "translate3d(-"+this.range+"px, 0, 0)";

            // エフェクトリセット
            this.$refs["wrapper"].addEventListener("transitionend", () => {
                this.$refs["wrapper"].style.transitionDuration = "";
                this.$refs["wrapper"].style.transitionTimingFunction = "";
                if(this.index  == this.lastIndex){
                    this.$refs["wrapper"].style.transform = "translate3d(-"+this.$el.clientWidth+"px, 0, 0)";
                }else if(this.index == 0){
                    this.$refs["wrapper"].style.transform = "translate3d(-"+(this.$el.clientWidth * (this.lastIndex - 1))+"px, 0, 0)";
                }

                // スライドロック解除
                this.effectLock = false;
            });
        },
        Active(time){
            this.AutoLock();
            this.Direction(time);
            this.Effect();
        },
        Tick(){
            setTimeout(this.Tick.bind(), this.interval);
            if(this.autoLock) return;
            this.Active("next");
        },
        AutoLock(){
            const active = () => {
                this.autoLock = false;
                this.saveTimerIds = [];
            }
            const timerId = setTimeout(active, this.interval * 2);
            this.saveTimerIds.push(timerId);
            for (let i = 0; i < this.saveTimerIds.length - 1; i++) {
                clearTimeout(this.saveTimerIds[i]);
            }
            this.autoLock = true;
        },
        Next(){
            this.Active("next");
        },
        Prev(){
            this.Active("prev");
        },
        Paging(i){
            if(i > this.index){
                this.index = i;
                this.Active("next");
            }else{
                this.index = i;
                this.Active("prev");
            }
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
        width: 100%;
        height: 100%;
    }
    &__slide{
        flex-shrink: 0;
        width: 100%;
        img{
            width: 100%;
        }
    }
}
</style>