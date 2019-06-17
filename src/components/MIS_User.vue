<template>
  <div class="layout">

    <Layout>
      <!--header-->

      <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
          <Icon type="ios-people"/>
          用户
        </MenuItem>
        <MenuItem name="2" style="float: right">
          <Icon type="ios-log-out" @click="logout()"/>
          退出
        </MenuItem>
        <!--<Submenu name="3">-->
        <!--<template slot="title">-->
        <!--<Icon type="ios-stats"/>-->
        <!--统计分析-->
        <!--</template>-->
        <!--<MenuGroup title="使用">-->
        <!--<MenuItem name="3-1">新增和启动</MenuItem>-->
        <!--<MenuItem name="3-2">活跃分析</MenuItem>-->
        <!--<MenuItem name="3-3">时段分析</MenuItem>-->
        <!--</MenuGroup>-->
        <!--<MenuGroup title="留存">-->
        <!--<MenuItem name="3-4">用户留存</MenuItem>-->
        <!--<MenuItem name="3-5">流失用户</MenuItem>-->
        <!--</MenuGroup>-->
        <!--</Submenu>-->
        <!--<MenuItem name="4">-->
        <!--<Icon type="ios-construct"/>-->
        <!--综合设置-->
        <!--</MenuItem>-->
      </Menu>


      <Layout>
        <!--Sider-->
        <!--<Sider hide-trigger>-->

        <!--</Sider>-->
        <!--<Content>Content</Content>-->

        <Menu active-name="1" :open-names="['1']" style="min-height: 1200px" @on-select="restCount">
          <MenuItem name="1" ><Icon type="ios-analytics"/>消费数据分析</MenuItem>
          <MenuItem name="2" ><Icon type="ios-filing"/>消费行为分析</MenuItem>
          <!--<Submenu name="1">-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-analytics"/>-->
              <!--消费数据分析-->
            <!--</template>-->
            <!--<MenuItem name="1-1" >消费金额</MenuItem>-->
            <!--<MenuItem name="1-2" >订餐次数</MenuItem>-->
            <!--<MenuItem name="1-3" >笔均金额</MenuItem>-->
          <!--</Submenu>-->
          <!--<Submenu name="2" >-->
            <!--<template slot="title">-->
              <!--<Icon type="ios-filing"/>-->
              <!--消费行为分析-->
            <!--</template>-->
            <!--<MenuItem name="2-1">餐厅类型统计</MenuItem>-->
            <!--<MenuItem name="2-2">口味偏好统计</MenuItem>-->
            <!--<MenuItem name="2-3">流失风险指数</MenuItem>-->
          <!--</Submenu>-->

        </Menu>

        <!--<el-menu-->
          <!--default-active="1"-->
          <!--class="el-menu-vertical-demo"-->
          <!--@open="handleOpen"-->
          <!--@close="handleClose" style="min-height: 1200px">-->
          <!--<el-submenu index="1">-->
            <!--<template slot="title">-->
              <!--<i class="el-icon-location"></i>-->
              <!--<span>消费数据统计</span>-->
            <!--</template>-->

              <!--<el-menu-item index="1-1">消费金额</el-menu-item>-->
              <!--<el-menu-item index="1-2">订餐次数</el-menu-item>-->
              <!--<el-menu-item index="1-3">笔均订单金额</el-menu-item>-->


          <!--</el-submenu>-->

          <!--<el-submenu index="2" @select=" ">-->
            <!--<template slot="title">-->
              <!--<i class="el-icon-location"></i>-->
              <!--<span>消费行为统计</span>-->
            <!--</template>-->
            <!--<el-menu-item index="2-1">餐厅类型统计</el-menu-item>-->
            <!--<el-menu-item index="2-2">口味偏好统计</el-menu-item>-->
            <!--<el-menu-item index="2-3">流失风险指数</el-menu-item>-->


          <!--</el-submenu>-->


        <!--</el-menu>-->


        <div style="position: absolute;left: 300px;top:100px;width: 60%;min-height: 600px">
          <!--<Select v-model="selectMode" style="width:100px" :on-change="changeTimeMode()">-->
            <!--<Option v-for="item in timeMode" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
          <!--</Select>-->

          <ButtonGroup shape="circle" v-show="selector">
            <Button @click="changeTimeMode('month')">按月统计</Button>
            <Button @click="changeTimeMode('quarter')">按季度统计</Button>
            <Button @click="changeTimeMode('year')">按年统计</Button>
          </ButtonGroup>

          <br>
          <br>
          <span style="font-size: 18px;font-weight: bolder" v-show="actionAnalyse">消费过的餐厅类型统计：</span>
          <div id="restType" style="width: 500px;height: 300px;" v-show="actionAnalyse"></div>
          <span style="font-size: 18px;font-weight: bolder" v-show="actionAnalyse">最常去的餐厅：金陵传奇麻辣香锅</span>

          <br>
          <br>
          <br>
          <span style="font-size: 18px;font-weight: bolder" v-show="actionAnalyse">菜品类型统计：</span>
          <div id="dishType" style="width: 500px;height: 300px;" v-show="actionAnalyse"></div>
          <span style="font-size: 18px;font-weight: bolder" v-show="actionAnalyse">最爱的菜品：传奇香锅</span>

          <br>
          <br>
          <br>
          <span style="font-size: 18px;font-weight: bolder" v-show="actionAnalyse">流失风险指数：</span>
          <span style="font-size: 24px;font-weight: bolder;color: red" v-show="actionAnalyse">0.71</span>
          <br>
          <span style="font-size: 18px;font-weight: bolder" v-show="actionAnalyse">近30天订餐次数: 13次</span>


          <div id="orderAmount" style="width: 500px;height: 300px;" v-show="selector"></div>
          <div id="orderCount" style="width: 500px;height: 300px;" v-show="selector"></div>
          <div id="avgAmount" style="width: 500px;height: 300px;" v-show="selector"></div>

        </div>

      </Layout>


      <!--<Footer>Footer</Footer>-->
    </Layout>

  </div>
</template>

<script>

  export default {

    components: {},
    name: "MIS_User",
    data() {
      return {
        actionAnalyse: false,
        selector: true,
        consumeData: 1,
        theme1: 'dark',
        timeMode: [
          {value: 'month', label: '按月统计'},
          {value: 'quarter', label: '按季度统计'},
          {value: 'year', label: '按年统计'}
        ],
        selectMode: 'month',

      }
    },
    methods: {
      logout() {
        console.log('ok');
        var self = this;
        self.$router.push({
          name: 'mis_login'
        })
      },

      restCount(name){
        // alert(name)
        console.log('ok')
        if(name === '1'){
          this.selector = true;
          this.actionAnalyse = false;
        }
        else if(name === '2'){
          this.selector = false;
          this.actionAnalyse = true;

          let myChart = this.$echarts.init(document.getElementById('restType'));
          let myChart2 = this.$echarts.init(document.getElementById('dishType'));

          let option1 = {
            // title:{
            //   text: '消费过的餐厅类型统计'
            // },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data:['香锅冒菜','地方菜系','汉堡披萨','面食粥点','其它']
            },
            series: [
              {
                name:'类型',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:[
                  {value:37, name:'香锅冒菜'},
                  {value:29, name:'地方菜系'},
                  {value:19, name:'汉堡披萨'},
                  {value:16, name:'面食粥点'},
                  {value:8, name:'其它'}
                ]
              }
            ]
          };

          let option2 = {
            // title:{
            //   text: '消费过的餐厅类型统计'
            // },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data:['香锅','冒菜','盖浇饭' ,'西式快餐' ,'面食','其它']
            },
            series: [
              {
                name:'类型',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data:[
                  {value:30, name:'香锅'},
                  {value:7, name:'冒菜'},
                  {value:10, name:'盖浇饭'},
                  {value:7, name:'西式快餐'},
                  {value:10, name:'面食'},
                  {value:18, name:'其它'}
                ]
              }
            ]
          };



          myChart.setOption(option1);
          myChart2.setOption(option2);

        }

      },

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      changeTimeMode(mode) {
        // console.log(this.selectMode)
        let xData = [], yData = [];
        let title1,title2,title3;
        let orderCountX = [], orderCountY = [];
        let avgAmountY = [];
        if (mode === 'month') {
          title1 = '每月消费金额';
          title2 = '每月订单数'
          title3 = '笔均消费金额'
          xData = ['2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06']
          yData = [98.0, 106.5, 148.4, 130.5, 160.8, 180.8, 190.0, 184.2, 240.1, 260.8, 288.5, 310.4]
          orderCountY = [5, 5, 7, 7, 8, 9 ,8, 8, 11, 12, 14, 14]
          for(let k=0;k<yData.length;k++){
            avgAmountY.push((yData[k]/orderCountY[k]).toFixed(1))
          }
        }
        else if (mode === 'quarter') {
          title1 = '每季度消费金额';
          title2 = '每季度订单数'
          title3 = '笔均消费金额'
          xData = ['2018第三季度', '2018第四季度', '2019第一季度', '2019第二季度']
          yData = [349.9, 471.6, 620.0, 860.7]
          orderCountY = [16,23, 26, 39];
          for(let k=0;k<yData.length;k++){
            avgAmountY.push((yData[k]/orderCountY[k]).toFixed(1))
          }
        }
        else {
          title1 = '每年消费金额';
          title2 = '每年订单数'
          title3 = '笔均消费金额'
          xData = ['2018年', '2019年']
          yData = [820.5, 1480.7]
          orderCountY = [39, 63];
          for(let k=0;k<yData.length;k++){
            avgAmountY.push((yData[k]/orderCountY[k]).toFixed(1))
          }
        }
        let myChart = this.$echarts.init(document.getElementById('orderAmount'));
        let myChart2 = this.$echarts.init(document.getElementById('orderCount'));
        let myChart3 = this.$echarts.init(document.getElementById('avgAmount'));

        let option = {
          title:{
            text:title1
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}"
          },

          xAxis: {
            type: 'category',
            data: xData,
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name:'数据',
            data: yData,
            type: 'line'
          }]
        };

        let option2 = {
          title:{
            text:title2
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}"
          },
          xAxis: {
            type: 'category',
            data: xData,
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name:'数据',
            data: orderCountY,
            type: 'line'
          }]
        };

        let option3 = {
          title:{
            text:title3
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}"
          },
          xAxis: {
            type: 'category',
            data: xData,
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name:'数据',
            data: avgAmountY,
            type: 'line'
          }]
        };

        myChart.setOption(option);
        myChart2.setOption(option2);
        myChart3.setOption(option3);

      },

      showAmount(){
        this.consumeData = 1;
      },

      showCount(){
        this.consumeData = 2;
      },

      showAvgAmount(){
        this.consumeData = 3;
      }
    }

  }
</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

  .layout-footer-center {
    text-align: center;
  }
</style>
