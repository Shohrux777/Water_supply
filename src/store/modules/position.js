export default {
    state: {
        m_position: {
            rows: [],
            columns: ['name', 'active_status'],
            col: []
        },

    },
    actions: {
        async fetchPosition(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/OquvMarkazPosition');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updatePosition', res_data);
        },
        // async fetchCompany_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_company&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('updatePosition_column', res_data);
        // },
    },
    mutations: {
        updatePosition(state, data) {
            console.log(data)
            state.m_position.rows = data;
        },
        position_delete_row(state, index) {
            state.m_position.rows.splice(parseInt(index), 1);
        },
      

    },
    getters: {
        allPosition(state) {
            return state.m_position;
        }

    }
}