// miniprogram/pages/show/show.js
//展示用户已上传的图片
const db = wx.cloud.database()
const app = getApp()
var temp
var login
var mytime
var myDate = new Date();
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
      }
    })

    var that = this
    console.log(that.data.imgurls)
    db.collection("imginfo").get({
      success(e) {
        console.log(e.data)
        if (e.data.length == 0) {
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
  gotoindex: function() {
    wx.navigateTo({
      url: '../index/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  setImg: function(e) {
    console.log(e)
    wx.navigateTo({
      url: "imgInfo/imgInfo?id=" + e.target.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getIMG: function () {
    var myDate = new Date(); //不能在初始化是将time固定,要不然会造成一些错误
    var that = this
    // var mytime = myDate.toLocaleDateString()
    // var time = myDate.toLocaleString('chinese', { hour12: false });
    // time=time.trim()//去空格
    // var myDate = new Date();
    // myDate.getYear();        //获取当前年份(2位)
    // myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    // myDate.getMonth();       //获取当前月份(0-11,0代表1月)
    // myDate.getDate();        //获取当前日(1-31)
    // myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
    // myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
    // myDate.getHours();       //获取当前小时数(0-23)
    // myDate.getMinutes();     //获取当前分钟数(0-59)
    // myDate.getSeconds();     //获取当前秒数(0-59)
    // myDate.getMilliseconds();    //获取当前毫秒数(0-999)
    // myDate.toLocaleDateString();     //获取当前日期
    // var mytime = myDate.toLocaleTimeString();     //获取当前时间
    // myDate.toLocaleString();        //获取日期与时间
    //time = time.replace(/\s+/g, "");//去掉所有空格
    var year = myDate.getFullYear()
    var month = myDate.getMonth() + 1
    var second = myDate.getTime()
    var time = year + "/" + month + "/" + second + "/"

    //console.log(mytime)
    wx.chooseImage({
      success: function (res) {
        //console.log(res)
        var tempFilePaths = res.tempFilePaths[0]
        //console.log(tempFilePaths)
        wx.cloud.uploadFile({
          cloudPath: login + "/" + time + tempFilePaths.slice(-8),
          filePath: tempFilePaths, // 文件路径
          success: res => {
            // get resource ID
            console.log(time)
            console.log(res)
            console.log(res.fileID)
            db.collection("imginfo").add({
              data: {
                time: myDate.toLocaleDateString() + '/' + time,
                fileID: res.fileID
              },
              success(res) {
                wx.navigateTo({
                  url: '../show/show',
                })
              }
            })
            //temp2=res.fileID
            //获得的是文件id,不可以直接使用,必须获得临时文件才可以使用
            // var urls
            // urls[0]=res.fileID
            // tempFilePaths=wx.previewImage({
            //   urls:urls
            // })
            // wx.cloud.getTempFileURL({
            //   fileList: [{
            //     fileID: res.fileID,
            //     maxAge: 60 * 60, // one hour
            //   }]
            // }).then(res => {
            //   // get temp file URL
            //   temp = res.fileList
            //   console.log(res.fileList)
            //   //console.log(temp.length)
            //   console.log(temp[0].fileID)

            // }).catch(error => {
            //   // handle error
            // })
            // that.setData({
            //   imgsrc: tempFilePaths //res.fileID
            // })
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