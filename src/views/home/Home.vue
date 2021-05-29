<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物界面</div>
    </NavBar>
    <tab-control class="tabControl1" :titles="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabControl1"
                 v-show="isTabFixed">
    </tab-control>
    <scroll class="content" ref="scroll" :probe-type="3"
            @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore">
      <!--      轮播图-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <!--吸顶-->
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick" ref="tabControl2"
      >
      </tab-control>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--    监听组件的原生事件时，必须给对应的事件加上对应的修饰符-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
    // @ is an alias to /src

    import HomeSwiper from "./chiildComps/HomeSwiper";
    import RecommendView from "./chiildComps/RecommendView";
    import FeatureView from "./chiildComps/FeatureView";

    import NavBar from "components/common/navbar/NavBar";
    import TabControl from "components/contens/tabControl/TabControl";
    import GoodsList from "components/contens/goods/GoodsList";
    //返回顶部
    import BackTop from "components/contens/backTop/BackTop";
    // 滚动
    import Scroll from "components/common/scroll/Scroll";
    import {itemListenerMixin} from "components/common/utils/mixin";
    //网络
    import {
        getHomeMultiData,
        getHomeGoods
    } from "network/home.js";
    //防抖函数
    import {debounce} from "common/utils/utils";

    export default {
        name: 'Home',
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentType: 'pop',
                isShowBackTop: false,
                tabOffsetTop: 0,
                isTabFixed: false,
                saveY: 0,
                itemImgListener: null
            }
        },
        mixins:[itemListenerMixin],

        components: {
            HomeSwiper,
            RecommendView,
            FeatureView,
            NavBar,
            TabControl,
            BackTop,
            Scroll,
            GoodsList,
        },
        created() {
            //1.请求多个数据
            this.getHomeMultiData();
            // 请求商品数据
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');

        },
        mounted() {
            //调用防抖函数
            const refresh = debounce(this.$refs.scroll.refresh, 500);
            this.itemImgListener = () => {
                //调用多次
                refresh()
            }
            //监听item中图片的加载完成main.js中利用原型
            this.$bus.$on('itemImageLoad', this.itemImgListener)
            //默认实在第一个
            this.tabClick(0)
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            },
        },
        methods: {
            //事件监听相关方法
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop';
                        break;
                    case 1:
                        this.currentType = 'new';
                        break;
                    case 2:
                        this.currentType = 'sell';
                        break;
                }
                if(this.$refs.tabControl1!==undefined){
                    this.$refs.tabControl1.currentIndex = index;
                    this.$refs.tabControl2.currentIndex = index;
                }

            },
            // 网络请求
            getHomeMultiData() {
                //1.请求多个数据
                getHomeMultiData().then((res) => {
                    // console.log(res);
                    this.banners = res.data.banner.list;
                    //list当中才是数据
                    this.recommends = res.data.recommend.list;
                });
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1;
                getHomeGoods(type, page).then(res => {
                    // console.log(res)
                    this.goods[type].list.push(...res.data.list);
                    this.goods[type].page += 1;
                    //完成上拉加载更多
                    this.$refs.scroll.finishPullUp()
                })
            },
            // 滚动到顶部
            backClick() {
                this.$refs.scroll.scrollTo()
            },
            //内容滚动按钮的隐藏或显示
            contentScroll(position) {
                //判断backtop是否显示
                this.isShowBackTop = (-position.y) > 500;
                // this.isShowBackTop = position.y < -900 ? true : false;
                //决定tabcontrol是否吸顶(fixed)
                this.isTabFixed = (-position.y) > this.tabOffsetTop;

            },
            //加载更多
            loadMore() {
                this.getHomeGoods(this.currentType);
                this.$refs.scroll.refresh()
            },
            //实现吸顶
            swiperImageLoad() {
                //获取tabcontrol的offsettop，所有组件都有一个属性：
                // $el:用于获取组件的元素
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
            }
        },
        //记录当前位置
        activated() {
            // console.log('act')
            this.$refs.scroll.scrollTo(0, this.saveY, 0);
            this.$refs.scroll.refresh()
        },
        //离开位置
        deactivated() {
            //保存Y值
            this.saveY = this.$refs.scroll.getScrollY()
            //取消全局事件监听
            this.$bus.$off('itemImageLoad',)
        }
    }
</script>
<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    width: 100%;
    position: fixed;
    /*bottom: 45px;*/
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #ffffff;
    font-weight: bold;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .tabControl1{
    position: relative;
    top: 44px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    bottom: 49px;
    top: 44px;
    left: 0;
    right: 0;
  }

</style>
