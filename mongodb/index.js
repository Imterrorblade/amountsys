import mongod from './init'
const mongoose = require('mongoose')
const dataBase = {
  mongoose: mongoose,
  mongod,
  _url: 'mongodb://localhost/mydb',
  connect: function () {
    try {
      mongoose.connect(this._url).then((data) => {
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    } catch (err) {
      console.log(err)
    }
    let db = mongoose.connection
    db.on('error', () => {
      console.log('connect error')
    })
    db.on('disconnected', function () {
      console.log('mongodb 断开连接')
    })
    db.on('connected', (message) => {
      console.log('mongodb 已连接')
    })
    // db.once('open', function () {
    //   console.log('mongodb连接成功')
    // })
  },
  start: function () {
    mongod.start(() => {
      this.connect()
    })
  }
}
export default dataBase
