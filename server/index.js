const express = require('express')
const app = express()
const router = express.Router({
  mergeParams: true
})

// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// });
app.use(require('cors')())
// let cors = require('cors');
// app.use(cors({
//   origin:['http://localhost:8080'],
//   methods:['GET','POST', 'PUT', 'DELETE'],
//   alloweHeaders:['Conten-Type', 'Authorization']
// }));
app.use(express.json())

const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/node-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const schema = mongoose.Schema

const articleSchema = new schema({
  name: { type: String },
  age: { type: Number },
})

const Article = mongoose.model('Article', articleSchema)


// 新建文章
app.post('/api/articles', async(req, res) => {
  const article = await Article.create(req.body)
  res.send(article)
})

// 列表
app.get('/api/articles', async(req, res) => {
  const article = await Article.find()
  // res.send('index')
  res.send(article)
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})