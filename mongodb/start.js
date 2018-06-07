const exec = require('child_process').exec
const path = require('path')
exec(path.resolve(__dirname, 'mongodb\\bin\\mongod.exe --dbpath ') + path.resolve(__dirname, 'mongodbdata'), function (err, data) {
  if (err) {
    console.log(err)
    return
  }
  console.log('mongodb启动成功')
  console.log(data)
})
console.log(__dirname)
console.log('执行完毕')
exec('dir', function (err, data) {
  console.log(__dirname)
  console.log(err)
  console.log(data)
})
