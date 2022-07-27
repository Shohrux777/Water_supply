export default {
    state: {
        product_t: {
            rows: [],
            columns: ['name','info','code','main_product','note'],
            col: []
        },

    },
    actions: {
        async fetch_product_t(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/WaterProducts');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('update_product_t', res_data);
        },
        // async fetch_product_t_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_company&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('update_product_t_column', res_data);
        // },
    },
    mutations: {
        update_product_t(state, data) {
            console.log(data)
            state.product_t.rows = data;
        },
        product_t_delete_row(state, index) {
            state.product_t.rows.splice(parseInt(index), 1);
        },
        update_product_t_column(state, data) {
            state.product_t.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.product_t.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        all_product_t(state) {
            return state.product_t;
        }

    }
}