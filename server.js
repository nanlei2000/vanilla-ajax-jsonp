const http = require("http")
const url = require("url")

var data = { msg: "cross origin from JsonP" }
var data1 = { msg: "cross origin from CORS" }
const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With")
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.setHeader("X-Powered-By", " 3.2.1")
    let params = url.parse(req.url, true)
    if (
        Object.keys(params.query) != 0 &&
        params.query.callback !== undefined &&
        params.query.callback !== ""
    ) {
        let str = `${params.query.callback}(${JSON.stringify(data)})`
        res.end(str)
    } else {
        res.end(JSON.stringify(data1))
    }
})

server.listen(8000, () => {
    console.log("server is listenning http://localhost:8000")
})
