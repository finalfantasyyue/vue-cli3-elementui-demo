<template>
  <div class="container">
    <h2>flex</h2>
    <div class="main1">
      <div class="left">left</div>
      <div class="middle">middle</div>
      <div class="right">right</div>
    </div>
    <h2>float</h2>
    <div class="main2">
      <div class="left">left</div>
      <div class="middle">middle</div>
      <div class="right">right</div>
    </div>
    <h2>position</h2>
    <div class="main3">
      <div class="left">left</div>
      <div class="right">right</div>
      <div class="middle">middle</div>
    </div>
    <h2>左边固定右边自适应</h2>
    <div class="main4">
      <div class="left">left</div>
      <div class="right">right</div>
    </div>
    <h2>opera标志</h2>
    <div class="opera">
    </div>
  </div>
</template>

<script>
  export default {
    name: "layout"
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .container {
    margin: 0 auto;

    .opera {
      &::before {
        content: '';
        display: block;
        width: 90px;
        height: 100px;
        border-radius: 50%;
        background: red;
      }
      &::after {
        content: "";
        display: block;
        position: relative;
        z-index: 1;
        top: -94px;
        left: 23px;
        width: 46px;
        height: 90px;
        border-radius: 50%;
        background: #fff;
      }
    }

    .main1 {
      display: flex;

      .left {
        width: 200px;
        height: 200px;
        background: red;
      }

      .middle {
        flex-grow: 1;
        height: 200px;
        background: blue;
      }

      .right {
        width: 200px;
        height: 200px;
        background: red;
      }
    }

    .main2 {
      margin: 20px auto;

      .left {
        float: left;
        width: 200px;
        height: 200px;
        background: red;
      }

      .middle {
        float: left;
        width: calc(100% - 400px);
        height: 200px;
        background: blue;
      }

      .right {
        float: left;
        width: 200px;
        height: 200px;
        background: red;
      }
    }

    .main3 {
      position: relative;
      margin: 20px auto;

      .left {
        position: absolute;
        width: 200px;
        height: 200px;
        background: red;
      }

      .middle {
        margin: 0 200px;
        height: 200px;
        background: blue;
      }

      .right {
        position: absolute;
        right: 0;
        width: 200px;
        height: 200px;
        background: red;
      }
    }

    .main4 {
      margin: 20px auto;
      display: flex;

      .left {
        width: 200px;
        height: 200px;
        background: red;
      }

      .right {
        flex: 1;
        height: 200px;
        background: blue;
      }
    }
  }
</style>
