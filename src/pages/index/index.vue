<template>
  <view class="content">

    <!-- #ifdef MP-WEIXIN -->
    <ui-privacy @agree="doAgree()" @disagree="doDisagree()"></ui-privacy>
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">

let doAgree = () => {
  console.log("用户同意隐私授权, 接下来可以调用隐私协议中声明的隐私接口");
};

let doDisagree = () => {
  console.log("用户拒绝隐私授权, 未同意过的隐私协议中的接口将不能调用");
};
</script>

<style lang="scss" scoped>
.content{
  
}
</style>
