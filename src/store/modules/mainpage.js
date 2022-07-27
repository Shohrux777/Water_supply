export default {
  state: {
      today_groups: []

  },
  actions: {
      async fetch_today_groups(ctx,date) {
          try{
            const res = await fetch(ctx.rootState.hostname + '/OquvMarkazDailyPupilsCalculationInfo/getAllCalculatedLessonsList?date=' + date);
            const res_data = await res.json();
            // console.log(ctx.rootState.hostname);
            console.log('res_data')
            console.log(res_data)
          }
          catch{
            console.log('error')
          }
          
      },
      async fetch_today_groups_get_list(ctx) {
        const res = await fetch(ctx.rootState.hostname + '/OquvMarkazDailyPupilsCalculation/getPaginationNoAcceptedMain?page=0&size=100' );
        const res_data = await res.json();
        // console.log(ctx.rootState.hostname);
        ctx.commit('update_today_groups', res_data);
    },
      // async fetch_today_groups_column(ctx, id) {
      //     const res = await fetch(ctx.rootState.hostname + '/TexColumnConfigs/getColumnListAsJsonObj?tableName=pos_company&auth_id=' + id);
      //     const res_data = await res.json();
      //     ctx.commit('update_today_groups_column', res_data);
      // },
  },
  mutations: {
      update_today_groups(state, data) {
          console.log(data)
          state.today_groups = data.items_list;
          console.log('state.today_groups')
          console.log(state.today_groups)
      },

  },
  getters: {
      all_today_groups(state) {
          return state.today_groups;
      }

  }
}