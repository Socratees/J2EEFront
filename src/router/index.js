import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/Login2'
import goodsview from '@/components/GoodsView'
import requestortag from '@/components/RequestorTag'
import shopcreate from '@/components/ShopCreate'
import requestorrecord from '@/components/RequestorRecord'


import usertag from '@/components/UserTag'
import order from '@/components/Order'
import orderdetail from '@/components/OrderDetail'
import userrecord from '@/components/UserRecord'
import personal from '@/components/Personal'

import admintag from '@/components/AdminTag'
import check from '@/components/Check'
import checkII from '@/components/CheckII'
import checkIII from '@/components/CheckIII'
import analysis from '@/components/Analysis'

import test from '@/components/test'

import mis_login from '@/components/MIS_Login2'
import mis_user from '@/components/MIS_User'
import mis_restaurant from '@/components/MIS_Rest'
import mis_manager from '@/components/MIS_Manager'

// import echarts from 'echarts'

Vue.use(Router)
// Vue.use(echarts)

export default new Router({
  routes: [
    {
      path: '/manager',
      name: 'manager',
      component: mis_manager
    },
    {
      path: '/restaurant_data',
      name: 'restaurant_data',
      component: mis_restaurant
    },
    {
      path: '/user_data',
      name: 'user_data',
      component: mis_user
    },
    {
      path: '/',
      name: 'mis_login',
      component: mis_login
    },


  ]
})
