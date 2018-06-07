// const nodeCmd = require('node-cmd')
// nodeCmd.get('mongod.exe', function (err, data) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log(data)
//   }
// })
var exec = require('child_process').exec
exec('..\\mongodb\\mongodb\\bin\\mongod.exe --dbpath ..\\mongodb\\mongodbdata', function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
console.log('执行完毕')
