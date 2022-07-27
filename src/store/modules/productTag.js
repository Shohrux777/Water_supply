export default {
    state: {
        m_order: {
            rows: [],
            columns: ['client_name_str', 'water_count','order_date'],
            col: []
        },
    },
    actions: {
        async fetchOrder(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/WaterOrders/getPagination?page=0&size=100');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateOrder', res_data);
        },
        // async fetchProductTag_column(ctx, id) {
        //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_product_tag&auth_id=' + id);
        //     const res_data = await res.json();
        //     ctx.commit('updateOrder_column', res_data);
        // },
    },
    mutations: {
        updateOrder(state, data) {
            console.log(data)
            state.m_order.rows = data.items_list;
        },
        productTag_delete_row(state, index) {
            state.m_order.rows.splice(parseInt(index), 1);
        },


    },
    getters: {
        allOrder(state) {
            return state.m_order;
        }
    }
}