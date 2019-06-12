// miniprogram/pages/index/index.js
const app = getApp() //获取全局数据
var userDB = "uesrinfo"
var login
var mytime
//var myDate = new Date();
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
    adImgSrc:null,
    //adImgSrc: "cloud://wxx-dbbe2f.7778-wxx-dbbe2f/ad2.PNG",
    wxOpenUrl: 'https://git.weixin.qq.com/2232408653/pggopen.git',
    gitopenUrl: 'https://github.com/2232408653/pggopen',
    myword:"欢迎使用本小程序,一直在更新",
    experienceVersion:null,
    version:null,
    qqGroupUrl:"点击链接加入群聊【皮果果粉丝群】：https://jq.qq.com/?_wv=1027&k=5ZF5LZK"
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
        db.collection(userDB).get({
          success(e) {
            console.log(e.data)
            if (e.data.length > 0) {//只有有数据即可
              console.log("x")
              wx.showToast({
                title: '欢迎使用',
              })
              return
            } else {
              wx.getUserInfo({
                success(m) {
                  m.nickName = m.userInfo.nickName
                  m.avatarUrl = m.userInfo.avatarUrl
                  console.log(m)
                  db.collection(userDB).add({
                    data: m
                  })
                },
                fail(e) {
                  wx.showLoading({
                    title: '请注册',
                  })
                  setTimeout(function() {
                    wx.hideLoading()
                    wx.navigateTo({
                      url: '../login/login',
                    })
                  }, 500)
                  // wx.redirectTo({
                  //   url: '../login/login',
                  // })
                  
                }
              })

            }
          }
        })
        //修改登录验证设置,允许不进行登录,直接使用本系统
        // wx.getUserInfo({
        //   success(m) {
        //     m.nickName=m.userInfo.nickName
        //     m.avatarUrl = m.userInfo.avatarUrl
        //     console.log(m.userInfo.nickName)
        //     db.collection("tempUser").where({
        //       //如果在云开发的数据库中将一个集合设置为仅创建者可读写,则_openid参数无效直接为申请人使用的openid
        //       //_openid: "abc"//getApp().globalData.login
        //     }).get({
        //       success(e) {
        //         console.log(e)
        //         //console.log(app.globalData.login)
        //         if (e.data.length == 0)
        //           db.collection("tempUser").add({
        //             data: m
        //           })
        //       }
        //     })
        //     wx.showToast({
        //       title: '欢迎使用本小程序',
        //     })
        //     //console.log(m)
        //   },
        //   fail(e) {
        //     wx.showLoading({
        //       title: '请授予权限',
        //     })
        //     setTimeout(function() {
        //       wx.hideLoading()
        //     }, 1500)
        //     wx.redirectTo({
        //       url: '../login/login',
        //     })
        //   }
        // })

      }
    })
    // wx.showToast({
    //   title: '欢迎使用',
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    //用云开发数据库进行判断,来实时跟新数据,不写死
    db.collection("msg").where({
      _id: "82bb4616-437f-4168-acdd-f8a34a877c16"
    }).get({
      success(e) {
        console.log(e)
        that.setData({
          gitopenUrl: e.data[0].gitopenUrl,
          wxOpenUrl: e.data[0].wxOpenUrl,
          myword: e.data[0].myword,
          version: e.data[0].version,
          experienceVersion: e.data[0].experienceVersion,
          adImgSrc: e.data[0].adImgSrc
        })
      }
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
  getIMG: function() {
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
      success: function(res) {
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
  },
  gotoshow: function() {
    wx.navigateTo({
      url: '../show/show',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})