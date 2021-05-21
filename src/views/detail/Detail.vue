<template>
  <div id="detail">
    <!--   导航-->
    <dtail-nav-bra class="detail-nav"></dtail-nav-bra>
    <scroll class="detail-content" ref="scroll">
      <!--    导入轮播图片-->
      <detail-swiper :top-images="topImages"/>
      <!--    //导入商品基本信息-->
      <detail-base-info :goods="goods"/>
      <!--    //导入商家基本信息-->
      <detail-shop-info :shop="shop"/>
      <!--      //导入商品图片-->
      <detail-images-info :images-info="detailInfo" @imgLoad="imgLoad"/>

      <ul>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
        <li>111</li>
      </ul>
    </scroll>


  </div>
</template>

<script>
    //导入导航栏
    import DtailNavBra from "./childComps/DtailNavBra";
    //导入轮播图片
    import DetailSwiper from "./childComps/DetailSwiper";
    //导入商品基本信息
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    //店铺信息
    import DetailShopInfo from "./childComps/DetailShopInfo";
    //引入Scroll
    import Scroll from "components/common/scroll/Scroll";
    //导入详情
    import DetailImagesInfo from "./childComps/DetailImagesInfo";
    //网络请求方法
    import {getDetail, Goods, Shop,GoodsParams} from "network/detail";

    export default {
        name: "Detail",
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailImages: [],
                detailInfo: {},
                GoodsParams:{}
            }
        },
        components: {
            DtailNavBra,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailImagesInfo

        },
        created() {
            //保存传入的iid
            this.iid = this.$route.params.iid;
            //根据iid请求详情数据
            getDetail(this.iid).then(res => {
                //获取顶部的图片轮播数据
                console.log(res);
                const data = res.result;
                this.topImages = data.itemInfo.topImages;
                //获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                //创建店铺信息
                this.shop = new Shop(data.shopInfo);
                //商品图片数据
                this.detailInfo = data.detailInfo;
                //商品参数
                this.GoodsParams=new GoodsParams(data.itemParams)
            })

        },
        methods: {
            //图片加载完成
            imgLoad() {
                //图片刷新
                this.$refs.scroll.refresh()
            }
        }
    }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
  }

  .detail-content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
  }
</style>
