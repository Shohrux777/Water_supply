export default {
    state: {
        fans: {
            rows: [],
            columns: ['name', 'price', 'summ_for_teacher'],
            col: []
        },

    },
    actions: {
        async fetchFans(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/OquvMarkazFanlar');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateFans', res_data);
        },
        // async fetchCompany_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_company&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('updateFans_column', res_data);
        // },
    },
    mutations: {
        updateFans(state, data) {
            console.log(data)
            state.fans.rows = data;
        },
        fans_delete_row(state, index) {
            state.fans.rows.splice(parseInt(index), 1);
        },
        updateFans_column(state, data) {
            state.fans.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.fans.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allFans(state) {
            return state.fans;
        }

    }
}