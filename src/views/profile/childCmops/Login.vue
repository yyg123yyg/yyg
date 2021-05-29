<template>
    <div class="login">
      <div class="user-pic">
        <van-image :src="defaultPic" class="user-pic-img" fit="cover" round />
      </div>

      <div class="user-info">
        <p>登录/注册</p>
        <div class="phone-num">
          <van-icon name="phone-o" />
          <p>暂未绑定手机号</p>
        </div>
      </div>

      <div class="profile-arrow-right">
        <van-icon name="arrow" />
      </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                defaultPic: require("@/assets/img/common/Boy-06.png")
            };
        }
    }
</script>

<style scoped>
  .login {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 90px;
    padding: 0 20px;
    background-color: #ff8198;
  }
  .user-pic {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: white;
  }

  .user-pic .user-pic-img {
    display: block;
    width: 60px;
    height: 60px;
  }
  .user-info{
    color: white;
    margin-left: 10px;
  }

  .phone-num{
    margin-top: 10px;
    display: flex;
  }
  .profile-arrow-right{
    position: absolute;
    right: 0;
    color: white;
    font-size: 35px;
  }
</style>
