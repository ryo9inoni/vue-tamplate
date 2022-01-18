<template lang="pug">
.slideShow__pagination.pagination
    .pagination__button(v-for="slide, index in length", ref="buttons", @click="$emit('paging')")
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
        Auto(){
            console.log(length);
            // this.$refs["buttons"][this.index].style.opacity = "0.7";
            // console.log(this.$refs["buttons"][this.index]);
        }
    },
    computed:{
        Auto(){
            return this.index;
        }
    },
    methods:{
        paging(){

        }
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
        cursor: pointer;
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
            transform: translate3d(-50%, -50%, 0);
        }
    }
}
</style>