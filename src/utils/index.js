import extend from 'extend'
import moment from 'moment'

let $ = {
    install(Vue){
        Vue.prototype.$ = this;
    },
    extend,
    timeFormat: ['yyyy-MM-dd', 'yyyy.MM.dd'],
    getTime(time, s) {
        s = s || 'YYYY-MM-DD HH:mm:ss';
        if (time) {
            return moment(time).format(s);
        } else {
            return '--';
        }
    },
    debounce(fn, wait) {
        var timeout = null;
        return function() {
            if(timeout !== null)   clearTimeout(timeout);
            timeout = setTimeout(fn, wait);
        }
    },
    getData(name){
        if(localStorage[name]){
            return JSON.parse(localStorage[name]);
        }else {
            localStorage.setItem(name, '');
            return [];
        }
    },
    setData(name, obj){
        localStorage.setItem(name, JSON.stringify(obj));
    },
    label: [{
        id: 0,
        label: "一",
    },{
        id: 1,
        label: '二'
    },{
        id: 2,
        label: '三',
    },{
        id: 3,
        label: '四',
    },{
        id: 4,
        label: '五',
    }]
}

export default $
