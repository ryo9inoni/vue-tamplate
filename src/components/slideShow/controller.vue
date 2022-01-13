<template lang="pug">
.slideShow__controller.controller
    .controller__button.-next(@click="Next")
    .controller__button.-prev(@click="Prev")
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
        Next(){

        },
        Prev(){

        }
    }
}
</script>

<style scoped lang="scss">
.controller{
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 120px;
    width: 100%;
    height: 100%;
    z-index: 1;
    &__button{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        &.-next{
            left: 0;
        }
        &.-prev{
            right: 0;
        }
        &::before{
            content: "";
            display: inline-block;
            width: 64px;
            height: 64px;
            border-bottom: solid 1px #fff;
        }
        &.-next::before{
            border-right: solid 1px #fff;
            transform: rotateZ(-45deg);
        }
        &.-prev::before{
            border-left: solid 1px #fff;
            transform: rotateZ(45deg);
        }
    }
}
</style>