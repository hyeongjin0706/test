const express = require('express');
const controller = require('./controller.js');
const bodyParser = require('body-parser');
const app = express();
const dbConfig = require('./mysql.js');
const db = require("./mysql.js");
const PORT = 8080;
const conn = dbConfig.init();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true})); //확장할 수 있도록 허락
app.use(express.json());

dbConfig.connect(conn);

const handleListener = () => {
    console.log(`Hello!`);
}

app.get("/select",(req,res)=>{
    const sql = "SELECT brand_table.brand_name, product_table.product_name, product_table.product_price FROM brand_table, product_table where brand_table.brand_id = product_table.brand_id";

    conn.query(sql, (err, rows) => {
        if ( err ) throw err;
        res.send( rows );
    });
})

// 상품 구입
app.post("/buy",(req,res)=>{
    const { user_userID, user_count, product_id } = req.body;
    const sql = `INSERT INTO user_table (user_userID, user_count, product_id) 
    VALUES ("${user_userID}", "${user_count}", "${product_id}")`;

    conn.query(sql, (err, rows) => {
        if ( err ) throw err;
        res.send( "구입완료" );
    });
})

// 갯수 변경
app.put("/change",(req,res)=>{
    const {user_cnt, user_id} = req.body;
    const sql = `update user_table set user_count = '${user_cnt}' where user_id = '${user_id}'`;

    conn.query(sql, (err, rows) => {
        if ( err ) throw err;
        res.send( "수정완료" );
    });
})

// 취소
app.delete("/user",(req,res)=>{
    let {user_id} = req.body;
    // console.log(user_id)
    // user_id = Number(user_id)
    // console.log(user_id)
    const sql = `delete from user_table where user_id ='${user_id}'`;
    conn.query(sql, (err, rows) => {
        if ( err ) throw err;
        res.send('취소완료');
    });
})

app.listen(PORT,handleListener);

