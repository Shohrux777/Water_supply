export default {
    state: {
        m_probniyFans: {
            rows: [],
            columns: ['name','begin_time', 'end_time', 'intermade_date',  'finish_group'],
            col: []
        },

    },
    actions: {
        async fetchProbniyFans(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/OquvMarkazProbniyDarslar');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateProbniyFans', res_data);
        },
        // async fetchCompany_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_company&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('updateProbniyFans_column', res_data);
        // },
    },
    mutations: {
        updateProbniyFans(state, data) {
            console.log(data)
            state.m_probniyFans.rows = data;
        },
        probniyFans_delete_row(state, index) {
            state.m_probniyFans.rows.splice(parseInt(index), 1);
        },
        updateProbniyFans_column(state, data) {
            state.m_probniyFans.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.m_probniyFans.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },

    },
    getters: {
        allProbniyFans(state) {
            return state.m_probniyFans;
        }

    }
}