<template>
  <div class="category">
    <nav-bar class="cate-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!--    侧标栏数据-->
    <slide-bar :slide-bar-list="categoryList"/>
    <scroll class="scroll-height" ref="scroll">
      <subcategory :category-list="subcategoryList" @imgLoad="imgLoad"></subcategory>
    </scroll>

  </div>
</template>

<script>

    import NavBar from "components/common/navbar/NavBar";
    //网络请求
    import {getCategory, getSubcategory} from "network/category";
    //导入侧标栏
    import SlideBar from "./childComps/SlideBar";
    //导入右边栏
    import Subcategory from "./childComps/Subcategory";
    //滚动
    import Scroll from "components/common/scroll/Scroll";

    export default {
        name: "Category",
        components: {SlideBar, NavBar, Subcategory, Scroll},
        data() {
            return {
                categoryList: [],
                subcategoryList:[]
            }
        },
        created() {
            this.getCategory()
        },
        methods: {
            //侧边数据请求
            getCategory() {
                getCategory().then(res => {
                    // console.log(res);
                    this.categoryList = res.data.category.list;
                    this.getSubcategory(this.categoryList[0].maitKey)
                })
            },
            //右边数据请求
            getSubcategory(key) {
                getSubcategory(key).then(res=>{
                    console.log(res);
                    this.subcategoryList=[...res.data.list]
                })
            },
            //图片刷新
            imgLoad(){
                this.$refs.scroll.refresh()
            }

        },


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
</style>
