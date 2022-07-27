<template>
  <div>
    <div class="border-bottom navbar_sticky">
      <router-link to="/invoice">
         <h5 class="m-0 ml-3 d-flex" style="padding: 14px 0px">
           <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left mr-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2.5" stroke="#007BFF" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <polyline points="15 6 9 12 15 18" />
            </svg>
            {{$t('Add_invoice')}}</h5>
      </router-link>
    </div>
    <div class="d-flex justify-content-between mt-4 mb-1 px-4" >
      <div class="d-inline">
        <mdb-btn
          class="mr-1"
          style="font-size: 12px"
          outline="orange"
          darkWaves
          tag="a"
          floating
          @click="addRow"
          icon="plus"
          size="sm"
          >{{ $t("Add_product") }}</mdb-btn
        >
      </div>
    </div>
    <div class="px-4">
        <div class="d_table">
          <mdb-tbl class="fixed-column">
            <mdb-tbl-head>
              <tr>
                <td></td>
                <!-- product -->
                <td style="width:400px; font-size: 13px">
                  {{ $t(datasource.columns[0]) }}
                </td>
                <td
                  style=" font-size: 13px"
                >
                  {{ $t(datasource.columns[1]) }}
                </td>
                <td
                  style=" font-size: 13px"
                >
                  {{ $t(datasource.columns[2]) }}
                </td>
                <td style=" font-size: 13px">
                  {{ $t(datasource.columns[3]) }}
                </td>
                
                <!-- ed_izm -->
              </tr>
            </mdb-tbl-head>
            <mdb-tbl-body>
              <tr
                scope="row"
                v-for="(row, rowIndex) in datasource.rows"
                :key="rowIndex"
      
              >
                <th>
                  <i
                    class="
                      fas
                      fa-trash
                      delIcon
                      mask
                      waves-effect
                      m-0
                      pl-2
                    "
                    @click="datasource.rows.splice(parseInt(rowIndex), 1)"
                  ></i>
                </th>
                <th>
                  <lineSelect
                    :options="all_product_t.rows"
                    :row_index="rowIndex"
                    :searchshow="true"
                    @select="selectproduct"
                    :selected="row.product_name"
                  
                    :label="$t('product')"
                  />
                  <small
                    class="invalid-text"
                    style="
                      margin: 0;
                      margin-top: 26px;
                      position: relative;
                    "
                    v-if="
                      $v.datasource.rows.$each[rowIndex].product_name
                        .$dirty &&
                      !$v.datasource.rows.$each[rowIndex].product_name
                        .required
                    "
                  >
                    {{ $t("Select_product") }}
                  </small>
                </th>

                <th>
                  <input
                    v-model="row.qty"
                    type="number"
                    min="0"
                    step=".1"
                    @input="onChangeCount(row.qty, rowIndex) "
                    onkeypress="return event.charCode >= 48"
                    class="form-control form-control-sm"
                  />
                  <small
                    class="invalid-text"
                    style="
                      margin: 0;
                      margin-top: 26px;
                      position: relative;
                    "
                    v-if="
                      ($v.datasource.rows.$each[rowIndex].qty.$dirty &&
                        !$v.datasource.rows.$each[rowIndex].qty
                          .minValue) ||
                      ($v.datasource.rows.$each[rowIndex].qty.$dirty &&
                        !$v.datasource.rows.$each[rowIndex].qty.required)
                    "
                  >
                    {{ $t("minValue") }}
                  </small>
                </th>
                <th>
                  <input
                    v-model="row.unit_price"
                    type="text"
                    class="form-control form-control-sm"
                  />
                </th>
                <th>
                  <input
                    v-model="row.summ"
                    
                    type="text"
                    class="form-control form-control-sm"
                  />
                </th>
                
              </tr>
            </mdb-tbl-body>
          </mdb-tbl>

          <hr class="mt-4 mb-3 gradint" />
          <div class="d-flex justify-content-end">
            <mdb-btn
              class="mr-1 px-3 py-2 text-white"
              style="font-size: 12px"
              color="success"
              darkWaves
              tag="a"
              floating
              @click="save"
              size="sm"
              >{{ $t("save") }}</mdb-btn
            >
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mdbInput, mdbBtn,
  mdbTbl,
  mdbTblHead,
  mdbTblBody,
  

  } from "mdbvue";
import { required, minValue } from "vuelidate/lib/validators";
import {mapActions,mapGetters} from 'vuex'
import lineSelect from "../../components/lineSelect.vue";

export default {
components:{
  lineSelect,
  mdbInput,
    mdbBtn,
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
},
 validations: {
     datasource: {
      rows: {
        $each: {
          qty: { minValue: minValue(0.1), required },
          product_name: { required },
        },
      },
    },
  },
data() {
  return {
    datasource: {
        rows: [],
        // real_time
        columns: [
          "product",
          "qty",
          "unit_qty",
          "summ",
        ],
      },
  }
},
mounted() {
  this.fetch_product_t();
},
  computed: mapGetters([ 'all_product_t']),
methods: {
   ...mapActions([ 'fetch_product_t']),
  addRow(){
    this.datasource.rows.unshift({
      oquvMarkazProductid: 0,
      product_name: "",
      qty: 0,
      summ: 0,
      unit_price: 0,
      id: 0,
    });
    console.log(this.datasource)
  },

  selectproduct(option) {
    console.log(option);
    this.datasource.rows[option.row].product_name = option.data.name;
    this.datasource.rows[option.row].oquvMarkazProductid = option.data.id;
  },
  async save(){
    console.log('save')
  }
},
}
</script>

<style lang="scss">
.applied {
  pointer-events: none;
}
.fixed-column {
  // overflow-x: scroll;
  /* overflow-x: hidden; */

  margin-left: 50px;
  padding-bottom: 200px;
}

.fixed-column th,
.fixed-column td {
  white-space: nowrap;
}

.fixed-column tr th:first-child,
.fixed-column tr td:first-child {
  position: absolute;
  width: 50px;
  top: auto;
  margin-left: -50px;
  margin-top: 0;
}
.delIcon:hover {
  color: #000;
}
.delIcon {
  // padding-top:5px;
  color: red;
}
.gradint {
  background: #8e2de2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #4a00e0,
    #8e2de2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #4a00e0,
    #8e2de2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>