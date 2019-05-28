// miniprogram/pages/show/imgInfo/imgInfo.js
var imgInfoID
const db = wx.cloud.database()
const app = getApp()
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
    //var imgInfoID
    var that = this
    console.log(options)
    imgInfoID = options.id
    db.collection("imginfo").where({
      _id: imgInfoID
    }).get({
      success(e) {
        console.log(e.data)
        if (e.data.length == 0) {
          wx.showToast({
            title: '更新后未添加图片',
          })
        }
        that.setData({
          imgid: e.data[0].fileID
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
  delImg: function(e) {
    wx.showModal({
      title: '确定删除吗?',
      content: '',
      showCancel: true,
      cancelText: '确认',
      cancelColor: 'blue',
      confirmText: '取消',
      confirmColor: 'red',
      success: function(res) {
        //console.log(res == true)
        if (res.cancel) {
          wx.showToast({
            title: '开发中',
          })
          db.collection('imginfo').doc(imgInfoID).remove({
            success: res => {
              wx.showToast({
                title: '删除成功',
              })
              // this.setData({
              //   counterId: '',
              //   count: null,
              // })
              wx.redirectTo({
                url: '../show',
              })
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '删除失败',
              })
              console.error('[数据库] [删除记录] 失败：', err)
            }
          })
          // db.collection('tempimginfo').doc('57896b495cea3f3005d86f536eb1242d'|1).get({
          //   success: function (res) {
          //     console.log(res.data)
          //   }
          // })
          // db.collection('tempimginfo').doc(
          //   '57896b495cea3f3005d86f536eb1242d'
          // ).get({
          //   success(res){
          //     console.log(res)
          //   }
          // })
        } else
          wx.showToast({
            title: '再想想吧',
          })

      },
      fail: function(res) {

      },
      complete: function(res) {},
    })
  },
  shareImg: function() {
    wx.showToast({
      title: '暂时没开发',
    })

  }
})