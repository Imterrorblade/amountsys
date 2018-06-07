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
    if (param.id) {
      return new Promise(function (resolve, reject) {
        param.username = localStorage('username')
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
      param.data.date = {
        '$lte': param.data.date,
        'username': localStorage.getItem('username')
      }
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
