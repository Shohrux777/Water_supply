export default {
    state: {
        m_test: {
            rows: [],
            columns: ['name', 'min_value', 'max_value', 'active_status'],
            col: []
        },

    },
    actions: {
        async fetchTest(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/OquvMarkazClient/getOquvMarkazTestPagination?page=0&size=200');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateTest', res_data);
        },
        // async fetchTest_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_company&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('updateTest_column', res_data);
        // },
    },
    mutations: {
        updateTest(state, data) {
            console.log(data)
            state.m_test.rows = data.items_list;
        },
        test_delete_row(state, index) {
            state.m_test.rows.splice(parseInt(index), 1);
        },

    },
    getters: {
        allTest(state) {
            return state.m_test;
        }

    }
}