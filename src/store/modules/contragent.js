export default {
    state: {
        contragent_t: {
            rows: [],
            columns: ['name', 'phone_number', 'phone_number_1', 'dokon_number', 'address' ],
            col: []
        },

    },
    actions: {
        async fetch_contragent_t(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/WaterContragents');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('update_contragent_t', res_data);
        },
        // async fetch_contragent_t_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_company&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('update_contragent_t_column', res_data);
        // },
    },
    mutations: {
        update_contragent_t(state, data) {
            console.log(data)
            state.contragent_t.rows = data;
        },
        contragent_t_delete_row(state, index) {
            state.contragent_t.rows.splice(parseInt(index), 1);
        },
        update_contragent_t_column(state, data) {
            state.contragent_t.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.contragent_t.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        all_contragent_t(state) {
            return state.contragent_t;
        }

    }
}