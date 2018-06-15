const { mongoose } = require('./index')
// const mongoose = require('mongoose')
const models = require('./models')
const modelMap = {
  models: {},
  modelstag: {}
}
for (let i = 0; i < models.length; i++) {
  let schema = new mongoose.Schema(models[i].model)
  modelMap[models[i].name] = mongoose.model(models[i].name, schema)
  modelMap.models[models[i].name] = models[i].model
  modelMap.modelstag[models[i].name] = models[i].__id
}
modelMap.methods = {
  formatParam: function (target, param) {
    let model = {}
    for (let i in modelMap.models[target]) {
      model[i] = param[i]
    }
    model.id = param.id
    return model
  },
  parseModel: function (target, model) {
    let result = {}
    for (let i in modelMap.models[target]) {
      result[i] = model[i]
    }
    result.id = model.id
    return result
  },
  parseModels: function (target, models) {
    return models.map((model) => {
      return this.parseModel(target, model)
    })
  }
}
module.exports = modelMap
