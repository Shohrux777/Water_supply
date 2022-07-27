export default {
    state: {
        m_level: {
            rows: [],
            columns: ['name', 'active_status'],
            col: []
        },

    },
    actions: {
        async fetchLevel(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/WaterContragentTypes');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateLevel', res_data);
        },
        // async fetchLevel_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_company&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('updateLevel_column', res_data);
        // },
    },
    mutations: {
        updateLevel(state, data) {
            console.log(data)
            state.m_level.rows = data;
        },
        level_delete_row(state, index) {
            state.m_level.rows.splice(parseInt(index), 1);
        },

    },
    getters: {
        allLevel(state) {
            return state.m_level;
        }

    }
}