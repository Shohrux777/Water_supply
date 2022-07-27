export default {
    state: {
        district_t: {
            rows: [],
            columns: ['name' ],
            col: []
        },

    },
    actions: {
        async fetch_district_t(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/TegirmonDistrict');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('update_district_t', res_data);
        },
        // async fetch_district_t_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_company&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('update_district_t_column', res_data);
        // },
    },
    mutations: {
        update_district_t(state, data) {
            console.log(data)
            state.district_t.rows = data;
        },
        district_t_delete_row(state, index) {
            state.district_t.rows.splice(parseInt(index), 1);
        },
        update_district_t_column(state, data) {
            state.district_t.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.district_t.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        all_district_t(state) {
            return state.district_t;
        }

    }
}