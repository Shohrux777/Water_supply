export default {
    state: {
        m_order_list: [],

    },
    actions: {
        async fetchOrder_list(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/WaterOrders/getPaginationOpenOrdersList?page=0&size=500');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateDevice', res_data);
        },
    },
    mutations: {
        updateDevice(state, data) {
            state.m_order_list = data.items_list;
        },
        order_delete_row(state, index) {
            state.m_order_list.splice(parseInt(index), 1);
        },

    },
    getters: {
        allOrder_list(state){
            return state.m_order_list;
        }

    }
}