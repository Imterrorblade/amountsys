const exec = require('child_process').exec
const mongod = {
  start (callback) {
    try {
      exec('net start mongodb', function (err, data) {
        if (err) {
          console.log(err)
        }
        callback()
        console.log(data)
      })
    } catch (err) {
      callback()
      console.log(err)
    }
  }
}
export default mongod
