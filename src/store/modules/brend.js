export default {
    state: {
        m_brend: {
            rows: [],
            columns: ['name'],
            col: []
        },

    },
    actions: {
        async fetchBrend(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/ArchiveRoom');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateBrend', res_data);
        }
    },
    mutations: {
        updateBrend(state, data) {
            console.log(data)
            state.m_brend.rows = data;
        },
        brend_delete_row(state, index) {
            state.m_brend.rows.splice(parseInt(index), 1);
        },

    },
    getters: {
        allBrend(state) {
            return state.m_brend;
        }

    }
}