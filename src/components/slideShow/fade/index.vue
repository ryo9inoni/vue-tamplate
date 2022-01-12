<template lang="pug">
.slideShow(:data-id="id")(:data-interval="interval")
    .slideShow__wrap
        .slideShow__slide(v-for="img in contents", ref="slides")
            img(:src="img.path", :alt="img.alt")
</template>

<script>

export default {
    props:{
        contents: Array,
        id: Number,
        type: String,
        interval: Number
    },
    data(){
        return{
            duration: 300,
            easing: "ease-out",
            current: 0,
        }
    },
    mounted(){
        console.log(this.lastSlide);
        this.Update();
    },
    watch:{

    },
    computed:{
        valueFirst(type){
            return type == "in" ? "block" : "0";
        },
        valueLast(type){
            return type == "in" ? "1" : "none";
        },
        property(type){
            return type == "in" ? "display" : "opacity";
        }
    },
    methods:{
        Update(){
            console.log(this.current);
            setTimeout(this.Update.bind(), this.interval);
            this.current++;
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