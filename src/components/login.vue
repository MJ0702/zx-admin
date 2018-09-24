<template>
  <div class="hello">
    <div id="banner">
      <img src="../assets/login_banner.jpg"/>
    </div>
    <div id="login_box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item>
          <div style="font-size:18px;font-weight:bold;">登录</div>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
         <el-form-item prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      labelPosition: 'right',
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');

          this.$router.push('/home/first');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello{
  text-align: center;
  #banner{
    position:absolute;
    left:0px;
    top:0px; 
    width:100%;
    height:100%;
    img{
      width:100%;
      height:100%;
      opacity: 0.9;
    }
  }
  #login_box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 350px;
    min-height: 300px;
    padding: 30px 20px 20px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: #fff;
  }
}
</style>
