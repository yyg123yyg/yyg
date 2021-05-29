<template>
  <div class="category">
    <nav-bar class="cate-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!--    侧标栏数据-->
    <slide-bar :slide-bar-list="categoryList" @slideBarItemClick="slideBarItemClick"/>
    <scroll class="scroll-height" ref="scroll">
      <subcategory :category-list="subcategoryList" @imgLoad="imgLoad"></subcategory>
      <tab-control ref="tabControl" :titles="titleList" class="control" @tabClick="tabClick"></tab-control>
      <goods-list :goods="categoryDetailList"/>
    </scroll>

  </div>
</template>

<script>

    import NavBar from "components/common/navbar/NavBar";
    //网络请求
    import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
    //导入侧标栏
    import SlideBar from "./childComps/SlideBar";
    //导入右边栏
    import Subcategory from "./childComps/Subcategory";
    import TabControl from "components/contens/tabControl/TabControl";
    import GoodsList from "components/contens/goods/GoodsList";
    //滚动
    import Scroll from "components/common/scroll/Scroll";

    export default {
        name: "Category",
        components: {TabControl, SlideBar, NavBar, Subcategory, Scroll, GoodsList},
        data() {
            return {
                // 分类侧边栏数据
                categoryList: [],
                // 分类内容数据
                subcategoryList: [],
                categoryDetailList: [],
                titleList: ["流行", "新款", "精选"],
                currentIndex: 0
            }
        },
        created() {
            this.getCategory()
        },
        methods: {
            slideBarItemClick({maitKey, index}) {
                // 防止反复请求
                // if (this.currentIndex === index) return;
                this.currentIndex = index;
                // 每次切换分类初始化tabControl的下标
                this.$refs.tabControl.currentIndex = 0;
                // 请求对应的推荐列表
                this.getCategoryDetail(this.categoryList[index].miniWallkey, "pop");
                this.getSubcategory(maitKey);
            },
            //侧边数据请求
            getCategory() {
                getCategory().then(res => {
                    console.log(res);
                    this.categoryList = res.data.category.list;
                    this.$nextTick(() => {
                        this.getSubcategory(this.categoryList[0].maitKey);
                        this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop")
                    });

                })
            },
            //右边数据请求
            getSubcategory(key) {
                getSubcategory(key).then(res => {
                    // console.log(res);
                    this.subcategoryList = [...res.data.list]
                })
            },
            getCategoryDetail(key, type) {
                getCategoryDetail(key, type).then(res => {
                    // console.log(res);
                    this.categoryDetailList = [...res];

                    // console.log(this.categoryDetailList)
                });
            },
            tabClick(index) {
                const typeList = ["pop", "new", "sell"];
                this.getCategoryDetail(this.categoryList[this.currentIndex].miniWallkey, typeList[index])
            },
            //图片刷新
            imgLoad() {
                this.$refs.scroll.refresh()
            },

        },
        mounted() {
            // 监听图片加载完成
            this.$bus.$on("itemImageLoad", () => {
                this.$refs.scroll.refresh()
            })


        }


    };
</script>

<style scoped>
  .category {
    position: fixed;
    width: 100%;
    height: 100vh;
  }

  .cate-nav {
    background-color: #ff5777;
    color: #fff;
    font-weight: 700;
  }

  .scroll-height {
    position: fixed;
    top: 44px;
    right: 0;
    left: 100px;
    bottom: 49px;
    overflow: hidden;

  }

  .control {
    margin-bottom: 10px;
  }
</style>
