// miniprogram/pages/myMoney/myMoney.js
var num=0
var price=1
var cost=0.0316
var netProfit=num*(price-cost)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    price:0.1,
    cost: 0.0316,
    netProfit:0,//净利润
    time:null
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //setProfit(e)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //this.netProfit = this.num * (this.price - this.cost)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  setProfitBynum: function (e) {
    console.log(e.detail.value)
    this.setData({
      num: e.detail.value
    })
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();  
    var hour = myDate.getHours();
    var min = myDate.getMinutes();
    var time=hour+":"+min
    var that = this.data
    console.log(this.data.num)
    this.setData({
      netProfit: that.num * (that.price - that.cost),
      time: time
    })
    
  },
  setProfitByCost: function (e) {
    console.log(e.detail.value)
    this.setData({
      cost: e.detail.value
    })
    var myDate = new Date();
    var hour = myDate.getHours();
    var min = myDate.getMinutes();
    var time = hour + ":" + min
    var that = this.data
    console.log(this.data.num)
    this.setData({
      netProfit: that.num * (that.price - that.cost),
      time: time
    })

  },
  setProfitByPrice: function (e) {
    console.log(e.detail.value)
    this.setData({
      price: e.detail.value
    })
    var myDate = new Date();
    var hour = myDate.getHours();
    var min = myDate.getMinutes();
    var time = hour + ":" + min
    var that = this.data
    console.log(this.data.num)
    this.setData({
      netProfit: that.num * (that.price - that.cost),
      time: time
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
})