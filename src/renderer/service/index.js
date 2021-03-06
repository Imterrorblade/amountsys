import dataApi from '../../../mongodb/dataApi'

const service = {
  addBill: function (param) {
    return new Promise(function (resolve, reject) {
      dataApi.add('Bill', param, function (response) {
        if (response instanceof Error) {
          reject(response)
        } else {
          resolve(response)
        }
      })
    })
  },
  updataBill: function (param) {
    param.user = localStorage.getItem('username')
    if (param.id) {
      return new Promise(function (resolve, reject) {
        dataApi.findByIdAndUpdate('Bill', param, function (response) {
          if (response instanceof Error) {
            reject(response)
          } else {
            resolve(response)
          }
        })
      })
    } else {
      return this.addBill(param)
    }
  },
  getBillList: function (filter) {
    let param = JSON.parse(JSON.stringify(filter))
    return new Promise(function (resolve, reject) {
      param.data.user = localStorage.getItem('username')
      dataApi.find('Bill', param, function (response) {
        if (response instanceof Error) {
          reject(response)
        } else {
          resolve(response)
        }
      })
    })
  },
  removeBill: function (param) {
    param.user = localStorage.getItem('username')
    return new Promise(function (resolve, reject) {
      dataApi.findByIdAndRemove('Bill', param, function (response) {
        if (response instanceof Error) {
          reject(response)
        } else {
          resolve(response)
        }
      })
    })
  },

  // 用户接口
  registerBillUser (param) {
    return new Promise(function (resolve, reject) {
      dataApi.registerBillUser(param, function (response) {
        if (response instanceof Error) {
          reject(response)
        } else {
          resolve(response)
        }
      })
    })
  },
  checkUserRepeat (param) {
    return new Promise(function (resolve, reject) {
      dataApi.findOne('BillUser', {username: param.username}, function (response) {
        if (response) {
          reject(new Error('用户名已存在'))
        } else {
          resolve()
        }
      })
    })
  },
  loginBillUser (param) {
    return new Promise(function (resolve, reject) {
      dataApi.loginBillUser(param, function (response) {
        if (response instanceof Error) {
          reject(response)
        } else {
          resolve(response)
        }
      })
    })
  }
}
export default service
