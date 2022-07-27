export default {
    state: {
        m_client: {
            rows: [],
            columns: ['fio','first_phone_number_name','first_address_name'],
            col: []
        },
        auth_list: [],
        client_list_by_date: [],

    },
    actions: {
        async fetchClient(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/WaterClients/getPagination?page=0&size=100');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateClient', res_data);
        },
        async fetchClientListByDate(ctx, data) {
            const res = await fetch(ctx.rootState.hostname + '/OquvMarkazClient/getPaginationByDateTime?page=0&size=1000&b_date=' + data.begin + '&e_date=' + data.end);
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateClientListByDate', res_data);
        },
        // async fetchClient_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_client&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('updateClient_column', res_data);
        // },
    },
    mutations: {
        updateClient(state, data) {
            console.log(data)
            state.m_client.rows = data.items_list;
        },
        updateClientListByDate(state, data) {
            console.log(data)
            console.log('state.hostname')
            console.log(state.hostname)
            state.client_list_by_date = data.items_list;
        },
        client_delete_row(state, index) {
            state.m_client.rows.splice(parseInt(index), 1);
        },
        updateClient_column(state, data) {
            state.m_client.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.m_client.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allClient(state) {
            return state.m_client;
        },
        client_list_by_date(state) {
            return state.client_list_by_date;
        },
    }
}