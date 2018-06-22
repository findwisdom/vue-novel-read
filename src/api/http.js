import axios from 'axios'
import vue from 'vue'
const service = axios.create({
    headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
        'Content-Type': 'application/json;charset=utf-8',
    }
})

export default {
    put: function (url, data) {
        return service.put(url, data)
            .then((res) => {
                return res.data
            })
            .catch(function (error) {
                let err = ''
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                    err += `状态码: ${JSON.stringify(error.response.status)}` + '<bar/>' + `请求头: ${JSON.stringify(error.response.headers)}` + '<bar/>' + `报错信息: ${JSON.stringify(error.response.data)}`
                } else {
                    // Something happened in setting up the request that triggered an Error
                    err += error.message
                    console.log('Error', error.message)
                }
                console.log(error.config)
                vue.prototype.$Notice.error({
                    title: '错误信息',
                    desc: err,
                    duration: 5
                })
                throw err
            })
    },
    post: function (url, data) {
        return service.post(url, data)
            .then((res) => {
                return res.data
            })
            .catch(function (error) {
                let err = ''
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                    err += `状态码: ${JSON.stringify(error.response.status)}` + '<bar/>' + `请求头: ${JSON.stringify(error.response.headers)}` + '<bar/>' + `报错信息: ${JSON.stringify(error.response.data)}`
                } else {
                    // Something happened in setting up the request that triggered an Error
                    err += error.message
                    console.log('Error', error.message)
                }
                console.log(error.config)
                vue.prototype.$Notice.error({
                    title: '错误信息',
                    desc: err,
                    duration: 5
                })
                throw err
            })
    },
    delete: function (url) {
        return service.delete(url)
            .then((res) => {
                return res.data
            })
            .catch(function (error) {
                let err = ''
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                    err += `状态码: ${JSON.stringify(error.response.status)}` + '<bar/>' + `请求头: ${JSON.stringify(error.response.headers)}` + '<bar/>' + `报错信息: ${JSON.stringify(error.response.data)}`
                } else {
                    // Something happened in setting up the request that triggered an Error
                    err += error.message
                    console.log('Error', error.message)
                }
                console.log(error.config)
                vue.prototype.$Notice.error({
                    title: '错误信息',
                    desc: err,
                    duration: 5
                })
                throw err
            })
    },
    get: function (url) {
        return service.get(url)
            .then((res) => {
                return res.data
            })
            .catch(function (error) {
                let err = ''
                if (error.response) {
                    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                    err += `状态码: ${JSON.stringify(error.response.status)}` + '<bar/>' + `请求头: ${JSON.stringify(error.response.headers)}` + '<bar/>' + `报错信息: ${JSON.stringify(error.response.data)}`
                } else {
                    // Something happened in setting up the request that triggered an Error
                    err += error.message
                    console.log('Error', error.message)
                }
                console.log(error.config)
                vue.prototype.$Notice.error({
                    title: '错误信息',
                    desc: err,
                    duration: 5
                })
                throw err
            })
    }
}
