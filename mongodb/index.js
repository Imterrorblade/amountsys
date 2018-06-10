const mongod = require('./init')
const mongoose = require('mongoose')
const dataBase = {
  mongoose: mongoose,
  _timer: null,
  _url: 'mongodb://localhost/test',
  connect: function () {
    mongoose.connect(this._url)
    let db = mongoose.connection
    db.on('error', () => {
      console.log('connect error')
      this._timer = setTimeout(() => {
        mongoose.connect(this._url)
      }, 1000)
    })
    db.on('disconnected', function () {
      console.log('mongodb 断开连接')
    })
    db.on('connected', (message) => {
      this._timer = null
      console.log(message)
      console.log('mongodb 已连接')
    })
    db.once('open', function () {
      console.log('mongodb连接成功')
    })
  },
  start: function () {
    mongod.start()
    this.connect()
  }
}
dataBase.start()
module.exports = dataBase
