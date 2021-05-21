<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from "components/common/swiper"

    export default {
        name: "HomeSwiper",
        props: {
            banners: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return{
                isLoad:false
            }
        },
        components: {
            SwiperItem,
            Swiper
        },
        methods: {
            imageLoad() {
                //只需发射一次
                if (!this.isLoad) {
                    this.$emit('swiperImageLoad');
                    this.isLoad = true
                }
            }
        }
    }
</script>

<style scoped>

</style>
