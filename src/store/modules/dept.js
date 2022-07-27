export default {
    state: {
        m_department: {
            rows: [],
            columns: ['name', 'province'],
            col: []
        },

    },
    actions: {
        async fetchDepartment(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/WaterTumen');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateDepartment', res_data);
        },
    },
    mutations: {
        updateDepartment(state, data) {
            console.log(data)
            state.m_department.rows = data;
        },
        department_delete_row(state, index) {
            state.m_department.rows.splice(parseInt(index), 1);
        },

    },
    getters: {
        allDepartment(state) {
            return state.m_department;
        }

    }
}