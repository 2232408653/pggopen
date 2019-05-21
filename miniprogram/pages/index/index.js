// miniprogram/pages/index/index.js
const app = getApp() //获取全局数据
var login
var mytime
var myDate = new Date();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents: {
      "button": 'x',
      "img": {
        "url": null
      }
    },
    imgsrc: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        if (res.errMsg == "cloud.callFunction:ok" == false) {
          wx.showLoading({
            title: '无网络/其他状况',
          })
          return
          }
        getApp().globalData.login = res.result.openid
        //console.log(getApp().globalData.login)
        login = getApp().globalData.login
        wx.getUserInfo({
          success(m) {
            db.collection("uesrinfo").where({
              _openid: getApp().globalData.login
            }).get({
              success(e) {
                //console.log(e)
                //console.log(app.globalData.login)
                if (e.data.length == 0)
                  db.collection("uesrinfo").add({
                    data: m
                  })
              }
            })
            wx.showToast({
              title: '欢迎使用本小程序',
            })
            //console.log(m)
          },
          fail(e) {
            wx.showLoading({
              title: '请授予权限',
            })
            setTimeout(function() {
              wx.hideLoading()
            }, 1500)
            wx.redirectTo({
              url: '../login/login',
            })
          }
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
  getIMG: function() {
    var that = this
    var mytime = myDate.toLocaleDateString()
    var time = myDate.toLocaleTimeString()

    console.log(mytime)
    wx.chooseImage({
      success: function(res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: login + "/" + myDate.toLocaleDateString() + '/' + time + tempFilePaths.slice(-8),
          filePath: tempFilePaths, // 文件路径
          success: res => {
            // get resource ID
            //console.log(res.fileID)
            that.setData({
              imgsrc: tempFilePaths
            })
            wx.showToast({
              title: '添加成功',
            })
          },
          fail: err => {
            // handle error
            console.log(err)
          }
        })
      },
    })
  }
})