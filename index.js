const express = require("express")
const app = express()

const verifyPassword =
  ("/secrets",
  (req, res, next) => {
    //* 関数式に変えちゃう
    console.log(req.query)
    const { password } = req.query
    if (password === "supersecret") {
      return next() //* returnいる
    }
    // res.status(404).send("error")
    throw new Error("パスワードが必要です")
  })

app.get("/", (req, res) => {
  res.send(`<h1>hello</h1>`)
})

app.get("/error", (req, res) => {
  hoge.moge() //* わけわかんねえのだけやばれたらエラーがresponseで返commentsって行っちゃう
})

app.get("/secrets", verifyPassword, (req, res) => {
  //* next()がさすのがverifyPasswordの後ろだから前に書かなきゃダメ
  res.send("<h1>this is a secret page!</h1>")
}) //* コールバック関数無限

app.use((req, res) => {
  res.status(404).send("<h1>not found</h1>")
})

app.use((err, req, res, next) => {
  //* errorハンドラーは最後に書く
  //* http://localhost:3001/secrets?password=super とかにアクセスしたらパス自体はあるけどerrorが出る
  //* それがデフォルトのエラーハンドラからこれになってる resは返らない
  console.log("***************************************")
  console.log("**************エラー!******************")
  console.log("***************************************")
  // res.status(500).send("エラーが出てきた")
  next() //* これを呼ぶと普通のミドルウェアが呼び出されちゃう　Cannot GET /error
})

app.listen(3001, () => {
  console.log("localhost:3001で起動中")
})
