// miniprogram/pages/show/imgInfo/imgInfo.js
var imgid
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgid: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    imgid = options.id

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      imgid: imgid
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  delImg: function() {
    wx.showModal({
      title: '确定删除吗?',
      content: '',
      showCancel: true,
      cancelText: '确认',
      cancelColor: 'blue',
      confirmText: '取消',
      confirmColor: 'red',
      success: function(res) {
        console.log(res==true)
        if (res.cancel)
          wx.showToast({
            title: '暂时没开发',
          })
        else
          wx.showToast({
            title: '再想想吧',
          })

      },
      fail: function(res) {

      },
      complete: function(res) {},
    })
  },
  shareImg:function(){
    wx.showToast({
      title: '暂时没开发',
    })

  }
})