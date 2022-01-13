<template lang="pug">
.controller
    .controller__wrap
        .controller__button.-next(@click="Next")
        .controller__button.-prev(@click="Prev")
</template>

<script>

export default {
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
    width: 100%;
    height: 100%;
    &__wrap{}
    &__button{
        &.-next{
            right: 8px;
        }
        &.-prev{
            left: 8px;
        }
        &::before,
        &::after{
            content: "";
        }
    }
}
</style>