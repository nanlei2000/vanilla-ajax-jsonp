/**
 *  封装jsonP
 * @param {String} url 请求地址
 * @param {String} callback callback 函数名
 * @param {Function} success 成功后的回调
 */

function genJsonpReq(url, success = () => {}) {
    let script = document.createElement("script")
    let callbackName = "callback" + Date.now()
    script.src = `${url}&callback=${callbackName}`
    script.type = "text/javascript"
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
 * 原生xhr的promise封装
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
