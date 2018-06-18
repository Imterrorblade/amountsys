const models = [{
  name: 'Bill',
  model: {
    content: String,
    date: Date,
    money: Number,
    user: String
  }
}, {
  name: 'BillUser',
  __id: 'username',
  model: {
    username: String,
    password: String
  }
}]
export default models
