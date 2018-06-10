const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')
const mongod = {
  start () {
    let result = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'config.json')))
    exec(result.workpath + ' --dbpath ' + result.workpath.replace('bin\\mongod.exe', 'data\\db'), function (err, data) {
      if (err) {
        console.log(err)
        return
      }
      console.log('mongodb启动成功')
      console.log(data)
    })
  }
}
module.exports = mongod
