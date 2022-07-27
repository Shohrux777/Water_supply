export default {
    state: {
        m_groups: {
            rows: [],
            columns: ['name','note','begin_time', 'end_time', 'active_status'],
            col: []
        },
        m_groups_pagn: {
            rows: [],
            columns: ['name','note','begin_time', 'end_time', 'active_status'],
            col: []
        },
        group_client_list: [],

    },
    actions: {
        async fetchGroups(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/OquvMarkazPupilGroups');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateGroups', res_data);
        },
        async fetchGroupsPagn(ctx) {
            const res = await fetch(ctx.rootState.hostname + '/OquvMarkazPupilGroups/getPagination?page=0&size=1000');
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateGroupsPagn', res_data);
        },
        async fetchGroupsClientList(ctx, id) {
            const res = await fetch(ctx.rootState.hostname + '/OquvMarkazPupilGroupDetailInfo/getPaginationByGroupId?page=0&size=100&group_id=' + id);
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            ctx.commit('updateGroupsClientList', res_data);
        },
    },
    mutations: {
        updateGroups(state, data) {
            console.log(data)
            state.m_groups.rows = data;
        },
        updateGroupsPagn(state, data) {
            console.log(data)
            state.m_groups_pagn.rows = data;
        },
        groups_delete_row(state, index) {
            state.m_groups.rows.splice(parseInt(index), 1);
        },
        updateGroups_column(state, data) {
            state.m_groups.col = data;
            console.log(data)
                //status true bolgan ustun nomlarini olish uchun
            state.m_groups.columns = data.column_default_obj.filter(obj => { return obj.status === true }).map(({ name }) => name);
        },
        updateGroupsClientList(state, data){
            state.group_client_list = data.items_list;
        }

    },
    getters: {
        allGroups(state) {
            return state.m_groups;
        },
        allGroupsPagn(state) {
            return state.m_groups_pagn;
        },
        group_client_list(state){
            return state.group_client_list;
        }
    }
}