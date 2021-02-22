export default {
    methods: {
        changePage(url) {
            let vm = this;
            let token = {headers: {Authorization: 'Bearer ' + vm.$store.state.token}}
            vm.axios.get(url, token).then(response => {
                vm.setData(response);
            });
        },
        getQuery() {
            let query = "";
            for (let key in this.search) {
                if (typeof this.search[key] === 'string' && this.search[key] !== '') {
                    query += `${key}=${this.search[key]}&`;
                    continue;
                }

                if (Array.isArray(this.search[key]) && this.search[key].length > 0) {
                    query += `${this.camelToKebab(key)}=${this.search[key].join(',')}&`;
                }
            }

            return query === "" ? "" : `${query.substring(0, query.length - 1)}`;
        },

        camelToKebab(input) {
            return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        },
    }
}
