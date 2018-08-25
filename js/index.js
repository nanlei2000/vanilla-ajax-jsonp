/**
 *  封装jsonP
 * @param {String} url 请求地址
 * @param {Function} success 成功后的回调
 */

function genJsonpReq(url, success = () => {}) {
    let script = document.createElement("script")
    // 不允许纯数字做变量名
    let callbackName = "callback" + Date.now()
    script.src = `${url}&callback=${callbackName}`
    script.type = "text/javascript"
    // 异步加载js 加载完就执行 defer则是在html所有元素解析完成之后，DOMContentLoaded 事件触发之前完成
    script.async = true
    window[callbackName] = function(data) {
        success(data)
    }
    document.body.appendChild(script)
}
window.onload = function() {
    genJsonpReq("http://localhost:8000?food=apple", res => {
        console.log(res.msg)
    })
}
/**
 * xhr的promise封装
 * @param {string} url 请求地址
 * @param {string} method 请求方法
 */
function ajax(url, method = "get") {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.send()
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    try {
                        resolve(JSON.parse(xhr.responseText))
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    reject(new Error(xhr.statusText))
                }
            }
        }
    })
}

ajax("http://localhost:8000?food=apple")
    .then(res => console.log(res.msg))
    .catch(err => console.error(err))
