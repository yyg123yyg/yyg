<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!--    商品列表-->
    <scroll class="content" ref="scroll">
      <cart-list/>
    </scroll>
    <!--    商品汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";
    import Scroll from "components/common/scroll/Scroll";
    import CartBottomBar from "./childComps/CartBottomBar";

    //引入加入商品数据
    import CartList from "./childComps/CartList";
    import {mapGetters} from 'vuex'

    export default {
        name: "Shopcart",
        data() {
            return {}
        },
        components: {
            NavBar,
            CartList,
            Scroll,
            CartBottomBar
        },
        computed: {
            ...mapGetters([
                'cartLength'
            ])
            // cartLength(){
            //     return this.$store.getters.cartLength
            // }
        },
        activated() {
            this.$refs.scroll.refresh()
        }
    }
</script>

<style scoped>
  .cart {
    height: 100vh;
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    left: 0;
    top: 0;

  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
    font-size: 20px;
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 93px;
  }
</style>
