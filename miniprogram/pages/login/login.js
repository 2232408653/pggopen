// miniprogram/pages/login/login.js
const db = wx.cloud.database()
const app = getApp() //获取全局数据
//var loginName = getApp().globalData.login
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        //console.log('callFunction test result: ', res)
        //console.log(res.result.openid)
        getApp().globalData.login = res.result.openid
        //console.log(loginName)
        //console.log(getApp().globalData.login)
        //console.log(app)
        //console.log(getApp())
      }
    })
    // wx.getUserInfo({
    //   // success(m) {
    //   //   db.collection("uesrinfo").where({
    //   //     _openid: getApp().globalData.login
    //   //   }).get({
    //   //     success(e) {
    //   //       //console.log(e)
    //   //       //console.log(app.globalData.login)
    //   //       if (e.data.length == 0)
    //   //         db.collection("uesrinfo").add({
    //   //           data: m
    //   //         })
    //   //     }
    //   //   })
    //   //   wx.showToast({
    //   //     title: '欢迎使用本小程序',
    //   //   })
    //   //   //console.log(m)
    //   //   wx.navigateTo({
    //   //     url: '../index/index',
    //   //   })
    //   // },
    //   fail(e) {
    //     wx.showLoading({
    //       title: '请授予权限',
    //     })
    //     setTimeout(function () {
    //       wx.hideLoading()
    //     }, 1500)
    //     //console.log(e)
    //   }

    // })
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
    // wx.getUserInfo({
    //   success(m) {
    //     db.collection("uesrinfo").where({
    //       _openid: getApp().globalData.login
    //     }).get({
    //       success(e){
    //         //console.log(e)
    //         //console.log(app.globalData.login)
    //         if(e.data.length==0)
    //           db.collection("uesrinfo").add({
    //             data: m
    //           })
    //         return
    //       }
    //     })
    //     //console.log(m)
    //   }
    // })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  click:function(e){
    // wx.showToast({
    //   title: '欢迎使用本小程序',
    // })
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
        wx.redirectTo({
          url: '../index/index',
        })
      },
      fail(e){

      }

    })
    
  }
})