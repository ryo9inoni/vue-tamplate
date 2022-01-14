<template lang="pug">
.slideShow__controller.controller
    .controller__button.-next(@click="$emit('next')")
    .controller__button.-prev(@click="$emit('prev')")
</template>

<script>
export default {
    name: "Controller",
    props:{
    },
    data(){
        return{
        }
    },
    mounted(){

    },
    watch:{

    },
    computed:{

    },
    methods:{
        
    }
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
        position: absolute;
        top: 50%;
        cursor: pointer;
        transform: translateY(-50%);
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