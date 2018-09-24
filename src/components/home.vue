<template>
  <div class="hello">
    <el-container>
      <el-aside width="225px">
        <el-row class="tac">
          <el-col :span="18">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              @select="handleSelect"
              >
              <el-menu-item index="1">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <!-- <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item> -->
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header></el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if(key == 1){
        this.$router.push('/home/first')
      }else if(key == 2){
        this.$router.push('/home/second')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello{
  height: 100%;
  .el-aside{
    .el-menu{
      min-height: 974px;
    }
    .el-col-18{
      width: 100%
    }
  }
  .el-header{
    height: 68px;
    border:1px solid #ddd;
  }
}
</style>
