//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    phone: "",
    password: "",
    code: "",
    passwordVisible: false,
    countDown: 60,
    isValid: false
  },
  onLoad: function(opt){
    console.log(opt)
  },
  timer: null,
  //绑定手机号码更新
  bindPhoneChange(e) {
    this.setData({"phone": e.detail.value});
    this.valid();
  },
  //绑定验证码更新
  bindCodeChange(e) {
    this.setData({"code": e.detail.value});
    this.valid();
  },
  //绑定密码更新
  bindPasswordChange(e) {
    this.setData({"password": e.detail.value});
    this.valid();
  },
  // 密码是否可见
  bindPasswordVisibleToggle() {
    this.setData({"passwordVisible": !this.data.passwordVisible});
  },
  // 重置密码
  clearPassword() {
    this.setData({"password": ""});
  },
  // 倒计时
  startCountDown() {
    if(this.data.countDown < 60) return undefined;
    this.setData({"countDown": this.data.countDown - 1});
    this.timer = setInterval(() => {
      if(this.data.countDown === 1) {
        clearInterval(this.timer);
        this.timer = null;
        this.setData({"countDown": 60});
        return undefined;
      }
      this.setData({"countDown": this.data.countDown - 1});
    }, 1000);
  },
  // 验证填写是否通过
  valid() {
    let isValid = false;
    const { phone, code, password } = this.data;
    if(/^\d+$/.test(phone) && /^\d{6}$/.test(code) && password.length >= 6) { // 简单的手机正则和验证码
        isValid = true;
    }
    if(isValid !== this.data.isValid) this.setData({"isValid": isValid});
    return isValid;
  },
  redirect(e) {
    wx.switchTab({
      url: '../account/index'
    });
  }
})
