const modelMap = require('./modelMap')
const __path = require('path')
const fs = require('fs')
const mongod = require('./start')
const entityDao = {
  checkOnlyTag: function (target, model, callback) {
    const onlytag = modelMap.modelstag[target]// 唯一校验字段
    if (onlytag) {
      const param = {
        data: {}
      }
      param.data[onlytag] = model[onlytag]
      this.find(target, param, (results) => {
        if (results.data.length > 0) {
          callback(new Error('唯一校验字段失败'))
        } else {
          callback()
        }
      })
    } else {
      callback()
    }
  },
  checkUser: function (target, model, callback) {
    if (modelMap.models[target].user) {
      if (model.user) {
        callback()
      } else {
        throw new Error('请用户登录')
      }
    } else {
      callback()
    }
  },
  add: function (target, model, callback) {
    this.checkUser(target, model, () => {
      this.checkOnlyTag(target, model, (results) => {
        if (results instanceof Error) {
          callback(results)
          return
        }
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
      })
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
    this.checkUser(target, params.data, () => {
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
    })
  },
  findOne (target, param, callback) {
    this.checkUser(target, param, () => {
      modelMap[target].findOne(param, (err, data) => {
        if (err) {
          console.log(err)
        }
        callback(data)
      })
    })
  },
  findByIdAndUpdate: function (target, param, callback) {
    this.checkUser(target, param, () => {
      param = modelMap.methods.formatParam(target, param)
      modelMap[target].findByIdAndUpdate(param.id, param, function (err, data) {
        if (err) {
          console.log(err)
        }
        console.log(data)
        callback(data)
      })
    })
  },
  findByIdAndRemove: function (target, param, callback) {
    this.checkUser(target, param, () => {
      modelMap[target].findByIdAndRemove(param.id, function (err, data) {
        if (err) {
          console.log(err)
        }
        console.log('删除成功')
        callback(data)
      })
    })
  },
  registerBillUser (param, callback) {
    try {
      this.add('BillUser', param, (user) => {
        callback(user)
      })
    } catch (e) {
      console.log(e)
    }
  },
  loginBillUser (param, callback) {
    this.findOne('BillUser', param, (user) => {
      if (user) {
        callback(user)
      } else {
        callback(new Error('用户名密码不匹配'))
      }
    })
  },
  // 设置工作路径
  setWorkPath (path, callback) {
    let result = JSON.parse(fs.readFileSync(__path.resolve(__dirname, 'config.json')))
    result.workpath = path
    fs.writeFileSync(__path.resolve(__dirname, 'config.json'), JSON.stringify(result))
    callback()
    mongod.start()
  }
}
export default entityDao
