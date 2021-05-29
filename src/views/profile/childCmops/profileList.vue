<template>
  <div class="profile-list">
    <div class="profile-list-item">
      <van-icon class="profile-list-icon" name="manager" />
      <span>我的消息</span>
    </div>
    <div class="profile-list-item">
      <van-icon class="profile-list-icon" name="point-gift" />
      <span>积分商城</span>
    </div>
    <div class="profile-list-item">
      <van-icon class="profile-list-icon" name="gem" />
      <span style="border-bottom: 0;">会员卡</span>
    </div>
    <div class="line"></div>
    <div class="profile-list-item name-car" >
      <van-icon class="profile-list-icon" name="shopping-cart" />
      <span>我的购物车</span>
    </div>
    <div class="profile-list-item">
      <van-icon class="profile-list-icon" name="good-job" />
      <span>点赞购物APP</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "profileList",

    }
</script>

<style scoped>
  .profile-list {
    width: 100%;
    border-top: 10px solid #eee;
  }
  .profile-list-item{
    display: flex;
    align-items: center;
    height: 45px;
    width: 100%;
    padding-left: 20px;
    line-height: 45px;
  }
  .profile-list-item span{
    width: 100%;
    display: inline-block;
    margin-left: 10px;
    border-bottom: 1px solid #ccc;
  }
  .name-car{
    border-top: 10px solid #eee;
  }
  .van-icon{
    font-size: 30px;
  }
</style>
