import Vue from 'vue'
import router from '../router'
import axios from 'axios'
import $ from './index'

let $axios = (obj) => {
    let ajaxData = ""; // res数据
    let a = {
        url: '',
        type: 'get',
        data: {}, // 需要传递的参数
        elseData: { // 用于其他扩充
            cache: false, //是否缓存接口
            loading: false, //是否需要提交加载
            formData: true, //判断数据是否需要formData
            tip: false,
            tipTxt: '提交成功！',
            tipTime: 1000,
            alias: {},
            errorList: [], //ajax code返回特定code不需要提示，调用方接管示错
            tipFn: () => {

            },
            fail() {}, //程序错误，服务器返回不成功，以及success为false的时候都会有该回调
            ajaxFail() {}, //请求返回success为false回调
            string: false, //是否需要进行数据转换
            ajaxLoading: false, //页面loading提示，一般用于table搜索
        },
        config: { //设置即将被发送的自定义请求头
            headers: {

            }
        },
    };

    obj = $.extend(true, a, obj); //合并参数

    //去除传递参数第一层为null的值，将其变为‘’
    if (obj.data) {
        for (let key in obj.data) {
            if (obj.data[key] === null) {
                obj.data[key] = '';
            }
        }
    }

    let newAxios = axios($.extend(true, {
        url: obj.url,
        method: obj.type,
        headers: obj.headers,
        baseURL: (() => {
            let url = '';
            if ($.currentRoute) {
                url = baseURL[$.currentRoute][$.dev ? 'dev' : 'product'];
            }
            return url;
        })(),
        timeout: 10000,
        data: obj.type === 'get' ? {} : a.data,
        params: obj.type === 'post' ? {} : a.data,
    }, obj.config)).then((res) => {
        //请求完成
        n.loading(false);
        ajaxData = res.data;
        // console.log(2222,res)
        if (res.data.success == true) { //正确返回
            //请求返回数据成功
            n.ajaxLoading(true, res);
            res.codeFlag = true;
            res.d = res.data.data;
            n.tip(res);
            n.cache(res);
            n.ls(res);
            n.windowCache(res);
            // console.log(1111,res)
            return Promise.resolve(res);
        } else {
            //请求数据失败
            res.d = res.data.data;
            obj.elseData.ajaxFail(res);
            obj.elseData.fail(res);
            // console.log(obj.elseData.errorList,res.data.code)
            // console.log(obj.elseData.errorList.indexOf(res.data.code) != -1)
            if (res.data.code == 9999 || res.data.code == 10001) { // 未登录和无用户
                window.location.href = 'https://passport.jd.com/new/login.aspx?ReturnUrl=' + window.location.href;
            } else if (res.data.code == 10000) { // 没权限
                $._self.$message({
                    message: res.data.msg || "没有权限，请联系先关人员！",
                    type: 'warning'
                });
            } else if (obj.elseData.errorList.indexOf(res.data.code) != -1) {

            } else if (res.data.code == 4000) {
                $._self.$message({
                    message: res.data.promptMessages.join(',') || "请求出错！",
                    type: 'warning'
                });
            } else {
                // $._self.$message({
                //     message: res.data.msg || "请求出错！",
                //     type: 'error'
                // });
                return Promise.reject(new Error(res.data.msg || "请求出错"));
            }

        }

    }).catch((error) => {
        let errorMsg = '服务器请求失败，请稍后！';
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    errorMsg = '请求错误'
                    break

                case 401:
                    errorMsg = '未授权，请登录'
                    break

                case 403:
                    errorMsg = '拒绝访问'
                    break

                case 404:
                    errorMsg = `请求地址出错: ${error.response.config.url}`
                    break

                case 408:
                    errorMsg = '请求超时'
                    break

                case 500:
                    errorMsg = '服务器内部错误'
                    break

                case 501:
                    errorMsg = '服务未实现'
                    break

                case 502:
                    errorMsg = '网关错误'
                    break

                case 503:
                    errorMsg = '服务不可用'
                    break

                case 504:
                    errorMsg = '网关超时'
                    break

                case 505:
                    errorMsg = 'HTTP版本不受支持'
                    break

                default:
                    errorMsg = '服务器出错，接口异常'
                    break
            }
        }
        if (ajaxData && ajaxData.msg|| ajaxData.message) {
            errorMsg = ajaxData.msg || ajaxData.message
        }
        $._self.$message({
            message: errorMsg,
            type: 'error'
        });
        n.loading(false);
        // console.log(errorMsg)
        n.ajaxLoading(false, errorMsg);
        obj.elseData.fail(ajaxData);
        return Promise.reject(ajaxData.msg || ajaxData.message || error);
    })
    //请求之前处理逻辑
    n.loading(true); //提交数据loading
    return newAxios;

};

export  {
    $axios
}
