<template lang="pug">
.slideShow__pagination.pagination
    .pagination__button(data-show="false", v-for="slide, index in length", ref="buttons", @click="$emit('paging', index)")
</template>

<script>
export default {
    name: "Pagination",
    props:{
        length: Number,
        index: Number
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
.pagination{
    display: flex;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0 auto;
    padding: 0 16px;
    z-index: 2;
    &__button{
        display: inline-block;
        position: relative;
        width: 32px;
        height: 32px;
        @include button();
        &::before{
            content: "";
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 8px;
            height: 8px;
            background-color: #fff;
            border-radius: 50%;
            transition-duration: 300ms;
            transition-timing-function: "ease-out";
            transform: translate3d(-50%, -50%, 0);
        }
    }
    &__button[data-show="true"]{
        &::before{
            opacity: 0.7;
        }
    }
    &__button[data-show="false"]{
        &::before{
            opacity: 1;
        }
    }
}
</style>