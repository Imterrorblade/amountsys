const modelMap = require('./modelMap')
const entityDao = {
  add: function (target, model, callback) {
    let entity = new modelMap[target](modelMap.methods.formatParam(target, model))
    entity.save().then(function (err, res) {
      if (err) {
        callback(err)
        console.log(err)
      } else {
        callback(res)
      }
      console.log(model)
      console.log('存储成功')
    })
  },
  find: function (target, params, callback) {
    // 注 此处由于混用了impotent 和model.export 使用Object中方法会报错原因未知所以不能用Object.assin（）
    const defaultParam = {
      pageNo: 1,
      pageSize: 20,
      orderBy: 'id',
      order: -1
    }
    for (let i in params) {
      defaultParam[i] = params[i]
    }

    modelMap[target].find(defaultParam.data).count(defaultParam.data, function (err, count) {
      if (err) {
        console.log(err)
      }
      const results = defaultParam
      results.count = count
      const orderParam = {}
      orderParam[defaultParam.orderBy] = defaultParam.order
      modelMap[target].find(defaultParam.data).sort(orderParam).skip((defaultParam.pageNo - 1) * defaultParam.pageSize).limit(defaultParam.pageSize).exec(function (err, data) {
        if (err) {
          console.log(err)
        }
        results.data = modelMap.methods.parseModels(target, data)
        callback(results)
      })
    })
  },
  findByIdAndUpdate: function (target, param, callback) {
    param = modelMap.methods.formatParam(target, param)
    modelMap[target].findByIdAndUpdate(param.id, param, function (err, data) {
      if (err) {
        console.log(err)
      }
      console.log(data)
      callback(data)
    })
  },
  findByIdAndRemove: function (target, param, callback) {
    modelMap[target].findByIdAndRemove(param.id, function (err, data) {
      if (err) {
        console.log(err)
      }
      console.log('删除成功')
      callback(data)
    })
  }
}
module.exports = entityDao
