<template>
  <div>
    <div class="border-bottom d-flex justify-content-between navbar_sticky">
      <router-link to="/client">
         <h5 class="m-0 ml-4 d-flex" style="padding: 16px 0px">
            {{$t('client')}}</h5>
      </router-link>
      <div>
         <router-link to="/client_Add/0">
            <mdb-btn color="success mt-3" m="r3" size="sm" p="r4 l4 t2 b2"><mdb-icon icon="plus" class="mr-2"/>{{$t('add')}}</mdb-btn>
          </router-link>
      </div>
      <div style="position:absolute; top:89px; left:18%;">
        <input-icon style="width: 400px; height:30px;" v-model="search" @input="searchClick" :placeholder="$t('search_client')"></input-icon>
      </div>
    </div>
    <div class="row mt-3 mb-2 px-3">
      <div class="col-3">
      </div>
    </div>
    <loaderTable v-if="loading"/>
    <anyTable v-else
      :datasource="clientList"
      @for_delete="for_delete"
      @for_edit="for_edit"
      @page="page"
      @size="size"
    />
    <massage_box :hide="modal_status" :detail_info="modal_info"
      :m_text="$t('Failed_to_add')" @to_hide_modal="modal_status= false"/>
      <Toast ref="message"></Toast>
  </div>
</template>

<script>
import {
  mdbIcon,
  mdbBtn,
} from "mdbvue";
import {mapActions, mapGetters, mapMutations} from 'vuex'
import anyTable from "../../components/erpTable"
export default {
  data(){
    return {
      modal_info: '',
      modal_status: false,
      loading: false,
      auth_id: localStorage.AuthId,
      clientList: {
        rows: [],
        columns: ['fio','first_phone_number_name','first_address_name'],
        col: []
      },
      search: '',
    }
  },
  components: {
    anyTable, mdbIcon,
    mdbBtn,
  },
  computed: mapGetters(['allClient', 'get_pagination']),
  methods: {
    ...mapActions(['fetchClient', ]),
    ...mapMutations(['client_delete_row', 'product_delete_row', 'update_pagination_first']),
  
      for_edit(edit_data)
      {
        this.$router.push("/client_add/" + edit_data.id);
      },
      async for_delete(del_data,index,note)
      {
        console.log(index)
          const response = await fetch(this.$store.state.hostname + "/WaterClients/deleteClientByIdAndNote?id=" + del_data.id + '&note=!' + note);
          const data = await response.json();
          if(response.status == 201 || response.status == 200)
          {
            this.$refs.message.success('Successfully_removed')
            this.alert_success = true;
            await this.refresh();
          }
          else{
            this.modal_info = data;
            this.modal_status = true;
          }
      },
      page(){
        this.refresh();
      },
      size(){
        this.refresh();
      },
      async refresh(){
        const res = await fetch(this.$store.state.hostname + '/WaterClients/getPagination?page=' + this.get_pagination.page + '&size=' + this.get_pagination.size);
        const res_data = await res.json();
        // await this.update_column();
        this.update_pagination_first({current_item_count: res_data.current_item_count, current_page: res_data.current_page+1, items_count: res_data.items_count});
        this.clientList.rows = res_data.items_list;
        this.loading = false;
      },
      async searchClick(){
        if(this.search == '' || this.search == null){
          await this.refresh();
        }
        else{
          const res = await fetch(this.$store.state.hostname + '/WaterClients/getPaginationByName?page=' + this.get_pagination.page + '&size=' + this.get_pagination.size + '&fio=' + this.search);
          const res_data = await res.json();
          console.log('dasd')
          console.log(res_data)
          // await this.update_column();
          // this.update_pagination_first({current_item_count: res_data.current_item_count, current_page: res_data.current_page+1, items_count: res_data.items_count});
          this.clientList.rows = res_data.items_list;
          this.loading = false;
        }
        
      }
  },
  async mounted(){
    this.loading = true;
    await this.refresh();
    this.loading = false;
    if(this.$store.state.alert){
      this.$refs.message.success('Added_successfully')
      this.$store.state.alert = false
    }
  }
}
</script>

<style>

</style>