import {debounce} from "./utils";
import BackTop from "components/contens/backTop/BackTop";

export const itemListenerMixin = {
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      //调用多次
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }
}

//不能抽取methods的方法
export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  mounted(){
    // console.log('dfd')
  },
  methods:{
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    }
  }
}
