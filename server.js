var express = require("express");
var app = express();
var cors = require("cors");
var cookieParser = require('cookie-parser');
var multer = require("multer");
var path = require("path");
app.use(cookieParser());
app.use(cors());
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './public/images');
  },
  filename: function(req, file, cb) {
      var extname = path.extname(file.originalname);
      cb(null, decodeURI(Date.now() + extname));
  }
});
var upload = multer({ storage });

app.post("/upload",upload.single("avatar"),(req,res)=>{
  console.log(req.body.name,req.body.department);
  res.send("success")
});
app.post("/test",(req,res)=>{
  console.log(req)
  res.send("test success");
})

app.listen(3000,()=>{
  console.log("port on 3000")
});
