<template>
  <div id="detail">
    <!--   导航-->
    <dtail-nav-bra class="detail-nav" @titleClick="titleClick" ref="nav"></dtail-nav-bra>
    <scroll class="detail-content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!--    导入轮播图片-->
      <detail-swiper :top-images="topImages"/>
      <!--    //导入商品基本信息-->
      <detail-base-info :goods="goods"/>
      <!--    //导入商家基本信息-->
      <detail-shop-info :shop="shop"/>
      <!--      //导入商品图片-->
      <detail-images-info :images-info="detailInfo" @imgLoad="imgLoad"/>
      <!--  商品参数-->
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <!--      评论信息-->
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <!--      推荐-->
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <!--      底部-->
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

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
    //导入详情图片
    import DetailImagesInfo from "./childComps/DetailImagesInfo";
    //导入参数
    import DetailParamInfo from "./childComps/DetailParamInfo";
    //导入评论信息
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    //导入GOODlist
    import GoodsList from "components/contens/goods/GoodsList";
    //导入底部
    import DetailBottomBar from "./childComps/DetailBottomBar";
    //网络请求方法
    import {getDetail, Goods, Shop, GoodsParams, getRecommend} from "network/detail";
    import {debounce} from "components/common/utils/utils";
    import {itemListenerMixin, backTopMixin} from "components/common/utils/mixin";
    // import BackTop from "../../components/contens/backTop/BackTop";


    export default {
        name: "Detail",
        mixins: [itemListenerMixin, backTopMixin],
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailImages: [],
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                itemImgListener: null,
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0

            }
        },
        //混入技术

        components: {
            // BackTop,
            DtailNavBra,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailImagesInfo,
            DetailParamInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar

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
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
                //创建店铺信息
                this.shop = new Shop(data.shopInfo);
                //商品图片数据
                this.detailInfo = data.detailInfo;
                //商品参数
                this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule);
                //评论信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0];
                }
            });
            getRecommend().then(res => {
                // console.log(res)
                this.recommends = res.data.list
            });
            //渲染出来数据中。offsetTop不包含其中的图片
            // this.$nextTick(() => {
            //     this.themeTopYs=[];
            //     this.themeTopYs.push(0);
            //     this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            // })
            //获取标题相应的高度
            this.getThemeTopY = debounce(() => {
                this.themeTopYs = [];
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                // console.log(this.themeTopYs)
            }, 100)
        },
        methods: {
            //图片加载完成
            imgLoad() {
                //图片刷新

                this.$refs.scroll.refresh();
//图片加载完成，获取相应的高度
                this.getThemeTopY();
                console.log('df')
                //图片刷新直接获取
                // this.themeTopYs = [];
                // this.themeTopYs.push(0);
                // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            },
            titleClick(index) {
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
            },
            contentScroll(position) {
                this.isShowBackTop = (-position.y) > 500;
                // console.log(position)
                // 获取y值
                const positionY = -position.y;
                this.themeTopYs.forEach((item, i) => {
                    // console.log(item)内容滚动显示正确的标题,判断值是否在一个区间
                    if ((positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
                        this.currentIndex = i;
                        this.$refs.nav.currentIndex = this.currentIndex;
                    } else if (positionY >= this.themeTopYs[this.themeTopYs.length - 1]) {
                        this.currentIndex = this.themeTopYs.length - 1;
                        this.$refs.nav.currentIndex = this.currentIndex;

                    }
                    // console.log(i)
                })


                //position.y和主题中的值进行对比

            },
            addToCart() {
                //获取商品信息
                const product = {};
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;
                //将商品添加到购物车
                // this.$store.commit('addCart', product)
                this.$store.dispatch('addCart',product)
            }
        },
        mounted() {

        },
        destroyed() {
            this.$bus.$off('itemImgLoad', this.itemImgListener)
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
    bottom: 49px;
    right: 0;
    left: 0;
    width: 100%;
    background-color: #ffffff;
  }
</style>
