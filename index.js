import bodyParser from "body-parser";
import axios from "axios"
import express from "express"

const app = express()
const port = 3000


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res)=>{
    res.render('index.ejs')
})

app.get('/about', (req, res)=>{
    res.render('about')
})

app.get('/feedback', (req, res)=>{
    res.render('feedback')
})
app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`)
})
