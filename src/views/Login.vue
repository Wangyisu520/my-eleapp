<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.jpg" alt>
    </div>
    <!-- 输入手机号 -->
    <InputGroup
      type="number"
      v-model="phone"
      placehalder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
    />
    <!-- 输入验证码 -->
    <InputGroup
      type="number"
      v-model="verifyCode"
      placehalder="验证码"
      :error="errors.code"
    />
<!-- 协议 -->
    <div class="login_des">
        <p>新用户登陆即自动注册，表示已同意</p>
        <span>《用户服务协议》</span>
    </div>
    <!-- 登陆 -->
    <div class="login_btn">
        <button :disabled ='isClick' @click="login">登陆</button>
    </div>
  </div>
</template> 


<script>
import InputGroup from "../components/InputGroup";
import { setInterval } from 'timers';
export default {
  name: "login",
  data() {
    return {
      phone:"",
      verifyCode: "",
      errors: {},
      btnTitle: "获取验证码",
      disabled: false
    };
  },
  computed:{
      isClick(){
          if(!this.phone || !this.verifyCode) return true;
          else return false;
      }
  },
  methods:{
      //请求验证码是否正确
      getVerifyCode(){
          if(this.validatePhone()){
              this.validateBtn()

              this.$axois.post("/api/posts/sms_send",{
                  tpl_id:"143713",
                  AppKey:'93828cd8107bba59edcba1652d9aa60a',
                  phone: this.phone
              })
              .then(res =>{
                  console.log(res)
              })
          }
      },
      //验证码倒计时
      validateBtn(){
          let time = 60;
          let timer = setInterval(()=>{
              if(time == 0 ){
                  clearInterval(timer)
                  this.btnTitle ="获取验证码"
                  this.disabled = false
              }else{
                  this.btnTitle = `${time}秒后重试`
                  this.disabled = true
                  time --
              }
          },10)
      },
      //手机号验证
      validatePhone(){
          if(!this.phone){
              this.errors = {
                  phone:"手机号码不能为空"
              }
              return false
          }else if(!/^1[345678]\d{9}$/.test(this.phone)){
              this.errors = {
                  phone:"请填写真确的手机号码"
              }
              return false
          }else{
              this.errors = {}
              return true
          }
      },
      login(){
         this.errors ={} 
         this.$axois.post("/api/sms_back",{
             phone: this.phone,
             code: this.verifyCode
         })
         .then(res =>{
             console.log(res)
             localStorage.setItem('username',true)
             this.$router.push('/')
         })
         .catch(err =>{
             this.errors = {
                 code: err.respnse.data.msg
             }
         })
      }
  },
  components: {
    InputGroup
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
}
.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}
.text_group,
.login_des,
.login_btn{
    margin-top: 20px
}
.login_des{
    color: #aaa;
    line-height: 22px;
}
.login_des span{
    color: #4d90fe;
}
.login_btn button{
    width: 100%;
    height: 40px;
    background-color: #48ca38;
    border-radius: 4px;
    color:#fff;
    font-size: 14px;
    border:none;
    outline:  none;
}
.login_btn button[disabled] {
    background-color: #8bda81;
}
</style>
