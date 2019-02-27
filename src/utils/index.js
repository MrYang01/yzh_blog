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
}

export default $
