const db = require("./mysql.js");


exports.select_ALL = (req, res) => {
    db.select( req, function (result) {
        res.send({ result: result});
    })
}

// 상품 구입

// 갯수 변경


// 취소
