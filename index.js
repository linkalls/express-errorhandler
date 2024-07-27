const express = require("express")
const app = express()


const verifyPassword = ("/secrets",(req,res,next)=>{ //* 関数式に変えちゃう
  console.log(req.query)
  const {password} = req.query
  if(password === "supersecret") {
   return  next() //* returnいる
  }
  res.status(404).send("error")
})


app.get("/", (req, res) => {
  console.log(req.requestTime)
  res.send(`<h1>hello</h1>`)
})


app.get("/error",(req,res)=>{
  hoge.moge()
})

app.get("/secrets",verifyPassword,(req,res)=>{ //* next()がさすのがverifyPasswordの後ろだから前に書かなきゃダメ
  res.send("<h1>this is a secret page!</h1>")
},) //* コールバック関数無限

app.use((req,res)=>{
  res.status(404).send("<h1>not found</h1>")
})


app.listen(3001, () => {
  console.log("localhost:3001で起動中")
})
