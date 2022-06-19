const bodyParser = require("body-parser")
const express = require("express")
const app = express()
const mysql = require('mysql')
const cors= require('cors')

 
const db = mysql.createPool({
    host: "10.211.55.2",
    user:"ani", 
    password:"password",
    database:"project_repo",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended :true}))


app.get("/api/get", (req,res)=> {
    const sqlSelect = "SELECT * FROM project;";
    db.query(sqlSelect, (err,result) => {
        res.send(result)
    });

});
   
 
app.post("/api/insert", (req,res)=> {
    const proj_title = req.body.proj_title
    const proj_desc = req.body.proj_desc
    const proj_year = req.body.proj_year
    const proj_sem = req.body.proj_sem
    const proj_type = req.body.proj_type
    const proj_course = req.body.proj_course



    const sqlInsert = "insert into project(proj_title,proj_desc,proj_year,proj_sem,proj_type,proj_course) values(?,?,?,?,?,?)";
    db.query(sqlInsert,[proj_title,proj_desc,proj_year,proj_sem,proj_type,proj_course], (err,result) => {
        console.log(err)
    });

});

app.listen(3001, ()=> {
    console.log("Running on the port");
});