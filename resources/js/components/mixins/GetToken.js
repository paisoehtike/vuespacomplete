var getToken = {
    data() {
        return {
            headerConfig: {
                headers: {
                    'Authorization': 'Bearer ' + this.$cookie.get('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            },
        }
    },
    methods: {
        getCookie(name) {
            let v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return v ? v[2] : null;
        },
    }
}
export default getToken