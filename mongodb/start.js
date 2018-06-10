const exec = require('child_process').exec
// const path = require('path')
const fs = require('fs')
module.exports = {
  start () {
    fs.readFile('.\\config.json', (err, fd) => {
      if (err) {
        console.log(err)
      }
      exec('' + ' --dbpath ' + '..\\data\\db', function (err, data) {
        if (err) {
          console.log(err)
          return
        }
        console.log('mongodb启动成功')
        console.log(data)
      })
      console.log(fd)
    })
  }
}
