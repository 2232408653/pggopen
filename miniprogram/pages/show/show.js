// miniprogram/pages/show/show.js
//展示用户已上传的图片
const db = wx.cloud.database()
const app = getApp()
var temp
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgurls: null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log(that.data.imgurls)
    db.collection("imginfo").get({
      success(e) {
        console.log(e.data)
        if(e.data.length==0){
          wx.showToast({
            title: '更新后未添加图片',
          })
        }
        that.setData({
          imgurls: e.data
        })
        //   // that.setData({
        //   //   imgurls: e.data
        //   // })

        //   //console.log(e.data)
        //   temp=[{}]
        //   for (var i = 0; i <e.data.length; ++i) {
        //     //console.log(i)
        //     //console.log(e.data[i].fileID)
        //     temp.push(e.data[i].fileID)
        //   }
        //   console.log(temp)
        //   wx.cloud.getTempFileURL({
        //     fileList: temp,
        //     success: res => {
        //       // get temp file URL
        //       //console.log(res.fileList)
        //       for (var i = 0; i < res.fileList.length-1; ++i) {
        //         //console.log(i)
        //         console.log(res.fileList[i].tempFileURL)
        //         //e.data[i].tempFileURL = res.fileList[i].tempFileURL
        //         //e.data[i].newwwww="x"
        //         e.data[i].tempFileURL = res.fileList[i].tempFileURL;
        //         //console.log(e.data)
        //       }
        //       console.log(e.data)

        //        that.setData({
        //         imgurls: e.data
        //        })
        //     },
        //     fail: err => {
        //       // handle error
        //     }
        //   })
        // }
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
    // this.setData({
    //   imgurls:"xx"
    // })




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
  gotoindex: function () {
    wx.navigateTo({
      url: '../index/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  setImg:function(e){
    console.log(e)
    wx.navigateTo({
      url: "imgInfo/imgInfo?id="+e.target.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})