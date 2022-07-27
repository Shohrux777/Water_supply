import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/login/login.vue')
    },
    {
        path: '/province',
        name: 'province',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/province/province.vue')
    },
    {
        path: '/waiter',
        name: 'waiter',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/waiter/waiter.vue')  
    },
    {
        path: '/checkGroup/:id',
        name: 'checkGroup',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/check/checkGroup.vue')  
    },
    {
        path: '/testResultGroup/:id',
        name: 'testResultGroup',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/check/testResultGroup.vue')  
    },
    {
        path: '/payGroup/:id',
        name: 'payGroup',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/pay/payGroup.vue')  
    },
    {
        path: '/notPayed',
        name: 'notPayed',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/pay/notPayed.vue')  
    },
    // {
    //     path: '/check_date',
    //     name: 'check_date',
    //     meta: { layout: 'main' },
    //     component: () =>
    //         import ('../views/report/check_date.vue')  
    // },
    {
        path: '/rasxod_report',
        name: 'rasxod_report',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/rasxod_report.vue')  
    },
    {
        path: '/kassa',
        name: 'kassa',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/pay/kassa.vue')  
    },

    {
        path: '/debit_list',
        name: 'debit_list',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/debit/debit_list.vue')  
    },
    {
        path: '/payed_list',
        name: 'payed_list',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/debit/payed_list.vue')  
    },
    {
        path: '/province_add/:id',
        name: 'province_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/province/province_Add.vue')
    },
    {
        path: '/position',
        name: 'position',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/position/position.vue')
    },
    {
        path: '/position_add/:id',
        name: 'position_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/position/position_Add.vue')
    },
    {
        path: '/product',
        name: 'product',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/product/product.vue')
    },
    {
        path: '/product_add/:id',
        name: 'product_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/product/product_Add.vue')
    },
    {
        path: '/invoice',
        name: 'invoice',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/buy/buy.vue')
    },
    {
        path: '/invoice_add/:id',
        name: 'invoice_add',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/buy/buy_Add.vue')
    },
    {
        path: '/contragent',
        name: 'contragent',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/contragent/contragent.vue')
    },
    {
        path: '/contragent_add/:id',
        name: 'contragent_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/contragent/contragent_Add.vue')
    },
    {
        path: '/contragent_type',
        name: 'contragent_type',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/contragent_type/contragent_type.vue')
    },
    {
        path: '/contragent_type_add/:id',
        name: 'contragent_type_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/contragent_type/contragent_type_Add.vue')
    },
    {
        path: '/test',
        name: 'test',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/test/test.vue')
    },
    {
        path: '/test_add/:id',
        name: 'test_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/test/test_Add.vue')
    },
   
    
    {
        path: '/user',
        name: 'user',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/user.vue')
    },
    {
        path: '/user_add/:id',
        name: 'user_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/user_Add.vue')
    },
    {
        path: '/district',
        name: 'district',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/district/district.vue')
    },
    {
        path: '/district_add/:id',
        name: 'district_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/district/district_Add.vue')
    },
    {
        path: '/client',
        name: 'client',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/client/client.vue')
    },
    {
        path: '/client_add/:id',
        name: 'client_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/client/client_Add.vue')
    },
    {
        path: '/authorization/:id',
        name: 'authorization',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/user/authorization.vue')
    },
    
    {
        path: '/order',
        name: 'order',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/order/order.vue')
    },
    {
        path: '/order_add/:id',
        name: 'order_add',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/order/order_Add.vue')
    },
    {
        path: '/map_order',
        name: 'map_order',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/order/map_order.vue')
    },
   
    {
        path: '/know_mark_in_map',
        name: 'know_mark_in_map',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/order/know_mark_in_map.vue')
    },
    {
        path: '/new_order_list',
        name: 'new_order_list',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/order/new_order_list.vue')
    },
    {
        path: '/map_order_car',
        name: 'map_order_car',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/order_car/map_order_car.vue')
    },
    {
        path: '/pos_order_list',
        name: 'pos_order_list',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/order_car/pos_order_list.vue')
    },
    {
        path: '/map_order_postavchik',
        name: 'map_order_postavchik',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/order_car/map_order_postavchik.vue')
    },

    {
        path: '/postavchik_list',
        name: 'postavchik_list',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/postavchik/postavchik_list.vue')
    },
    {
        path: '/postavchik_map',
        name: 'postavchik_map',
        meta: { layout: 'empty' },
        component: () =>
            import ('../views/postavchik/postavchik_map.vue')
    },

    
    {
        path: '/check',
        name: 'check',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/check_date.vue')
    },
    {
        path: '/accept_order',
        name: 'accept_order',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/accept_order.vue')
    },
    {
        path: '/postov_money_report',
        name: 'postov_money_report',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/postov_money_report.vue')
    },
    {
        path: '/statistic',
        name: 'statistic',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/statistic.vue')
    },
    {
        path: '/deleteReport',
        name: 'deleteReport',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/deleteReport.vue')
    },
    {
        path: '/lastOrderReport',
        name: 'lastOrderReport',
        meta: { layout: 'main' },
        component: () =>
            import ('../views/report/lastOrderReport.vue')
    },
    


    // <----    Tegirmon  ---->

   

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    console.log(from)
    if (to.path != '/') {
        if (localStorage.Login != '') {
            if (localStorage.Type == 1) {
                if (to.path == '/bron' || to.path == '/medicineMin' || to.path == '/byuzi_date' || to.path == '/groupReport' || to.path == '/bydate' ||
                    to.path == '/medicine' || to.path == '/apply_admin' || to.path == '/return_report' || to.path == '/m_users' || 
                    to.path == '/bycont_data' || to.path == '/info'  || to.path == '/biox'  || to.path == '/send_doc' || to.path == '/cashbox'
                    || to.path == '/bycontragent' || to.path == '/bytime' || to.path == '/dailyForPayment' || to.path == '/kunlik' || to.path == '/return_money'
                    || to.path == '/bonus_contragent' || to.path == '/bonus_repot' || to.path == '/bonus_full') {
                    next('/doctor')
                }
            } else if (localStorage.Type == 0) {
                next()
            } else if (localStorage.Type == 2) {
                if (to.path == '/doctor' || to.path == '/antigen' || to.path == '/bron' || to.path == '/medicineMin' ||
                    to.path == '/medicine'  || to.path == '/return_report' || to.path == '/m_users' || 
                    to.path == '/bycont_data' || to.path == '/result_lab' || to.path == '/info'  || to.path == '/biox'  || to.path == '/send_doc'
                    || to.path == '/bycontragent' || to.path == '/bytime' || to.path == '/kunlik' || to.path == '/return_money'
                    || to.path == '/bonus_contragent' || to.path == '/bonus_repot' || to.path == '/bonus_full' || to.path == '/byuzi_date' 
                    || to.path == '/groupReport' || to.path == '/bydate') {
                    next('/cashbox')
                }
            } else if (localStorage.Type == 3) {
                if (to.path == '/bron' || to.path == '/medicineMin' || to.path == '/byuzi_date' || to.path == '/groupReport' || to.path == '/bydate' ||
                    to.path == '/medicine' || to.path == '/apply_admin' || to.path == '/return_report' || to.path == '/m_users' || 
                    to.path == '/bycont_data' || to.path == '/info'  || to.path == '/send_doc' || to.path == '/cashbox'
                    || to.path == '/bycontragent' || to.path == '/bytime' || to.path == '/dailyForPayment' || to.path == '/kunlik' || to.path == '/return_money'
                    || to.path == '/bonus_contragent' || to.path == '/bonus_repot' || to.path == '/bonus_full') {
                    next('/doctor')
                }
                // if (to.path == '/profil' || to.path == '/antigen' || to.path == '/selectShablon' || to.path == '/blankaPrint' ) {
                //     next()
                // } else if (to.path != '/doctor') {
                //     next('/doctor')
                // }
            } else if (localStorage.Type == 4) {
                if (to.path == '/kassa' || to.path == '/antigen' || to.path == '/bron' || to.path == '/doctor' ||
                    to.path == '/word_search' || to.path == '/apply_admin' || to.path == '/return_report') {
                    next('/bycont_data')
                }
            }
            else if (localStorage.Type == 5) {
                if ( to.path == '/medicineMin' || to.path == '/byuzi_date' || to.path == '/groupReport' || to.path == '/bydate' ||
                    to.path == '/medicine' || to.path == '/apply_admin' || to.path == '/return_report' || 
                    to.path == '/bycont_data' || to.path == '/info'  || to.path == '/biox'  || to.path == '/doctor'
                    || to.path == '/bycontragent' || to.path == '/bytime' || to.path == '/dailyForPayment' || to.path == '/kunlik' || to.path == '/return_money'
                    || to.path == '/bonus_contragent' || to.path == '/bonus_repot' || to.path == '/bonus_full' || to.path == '/cashbox' ) {
                    next('/send_doc')
                    // || to.path == '/cashbox'
                }
            }
             else {
                next()
            }
            // else if (localStorage.Type == 2) {
            //     if (to.path != '/bemor' && to.path != '/doctor') {
            //         next('/bemor')
            //     }
            // }

            next()

        } else {
            next('/')
        }
    } else {
        next()
    }
})

export default router