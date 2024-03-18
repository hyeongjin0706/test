const mysql = require('mysql2');
const dbInfo = {
    host: 'localhost',
    user: 'root',
    password: 'abcd1234',
    database: 'sys'
};

// 전체조회
exports.select = (data, cb) =>{
    const sql = "SELECT brand_table.brand_name, product_table.product_name, product_table.product_price FROM brand_table, product_table where brand_table.brand_id = product_table.brand_id";

    dbInfo.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( rows );
    });
}

// 상품구입
exports.select = (data, cb) =>{
    const sql = `INSERT INTO user_table (user_userID, user_count, product_id) 
    VALUES ("${data.user_userID}", "${data.user_count}", "${data.product_id}")`;

    dbInfo.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( rows );
    });
}

// 갯수변경
exports.update = (user_cnt, cb) =>{
    const sql = `update user_table set user_cnt = '${user_cnt}' where user_id = user_id`;

    dbInfo.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( rows );
    });
}

// 상품 취소
exports.delete = (user_id, cb) =>{
    const sql = `delete from user_table where user_id ='${user_id}'`;
    dbInfo.query(sql, (err, rows) => {
        if ( err ) throw err;
        cb( rows );
    });
}

module.exports = {
    init: function () {
        return mysql.createConnection(dbInfo);
    },
    connect: function(conn) {
        conn.connect(function(err) {
            if(err) console.error('mysql 연결 에러 : ' + err);
            else console.log('mysql 연결 성공');
        });
    }
};