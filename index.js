const express = require("express")
const app = express()
const AppError = require("./AppError")

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
    throw new AppError("パスワードが必要です", 401) //* こんな感じで呼べる独自のclassあったほうがいい
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

// app.use((err, req, res, next) => {
//   //* errorハンドラーは最後に書く
//   //* http://localhost:3001/secrets?password=super とかにアクセスしたらパス自体はあるけどerrorが出る
//   //* それがデフォルトのエラーハンドラからこれになってる resは返らない
//   console.log("***************************************")
//   console.log("**************エラー!******************")
//   console.log("***************************************")
//   console.log(err) //* ReferenceError: hoge is not defined
//   // res.status(500).send("エラーが出てきた")
//   next(err) //* これを呼ぶと普通のミドルウェアが呼び出されちゃう　Cannot GET /error
// })

app.use((err, req, res, next) => {
  const { status } = err //* errにはAppErrorから来たerrorが返ってくる
  res.status(status).send("エラー")
})

app.listen(3001, () => {
  console.log("localhost:3001で起動中")
})
