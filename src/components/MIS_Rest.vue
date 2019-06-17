<template>
  <div class="layout">

    <Layout>
      <!--header-->

      <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
          <Icon type="ios-people"/>
          餐厅
        </MenuItem>
        <MenuItem name="2" style="float: right">
          <Icon type="ios-log-out" @click="logout()"/>
          退出
        </MenuItem>

      </Menu>


      <Layout>
        <!--Sider-->
        <!--<Sider hide-trigger>-->

        <!--</Sider>-->
        <!--<Content>Content</Content>-->

        <Menu active-name="1" :open-names="['1']" style="min-height: 1200px" @on-select="showItem">
          <MenuItem name="1">
            <Icon type="ios-analytics"/>
            菜品分析
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-filing"/>
            订单数据分析
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-people"/>
            用户数据分析
          </MenuItem>

        </Menu>


        <div style="position: absolute;left: 300px;top:100px;width: 90%;min-height: 600px">


          <div v-show="dishAnalyse">
            <br>
            <br>
            <span style="font-size: 18px;font-weight: bolder" v-show="dishAnalyse">菜品均价：</span>
            <div id="dishPrice" style="width: 600px;height: 400px;" v-show="dishAnalyse"></div>
            <br>
            <br>
            <span style="font-size: 18px;font-weight: bolder" v-show="dishAnalyse">菜品销量前三名：</span>
            <div id="dishRank" style="width: 600px;height: 400px;" v-show="dishAnalyse"></div>

          </div>


          <div v-show="orderAnalyse">
            <ButtonGroup shape="circle" v-show="orderAnalyse">
              <Button @click="changeTimeMode('month')">按月统计</Button>
              <Button @click="changeTimeMode('quarter')">按季度统计</Button>
              <Button @click="changeTimeMode('year')">按年统计</Button>
            </ButtonGroup>

            <br>
            <br>
            <span style="font-size: 18px;font-weight: bolder" v-show="orderAnalyse">营业额统计：</span>
            <div id="orderAmount" style="width: 500px;height: 300px;" v-show="orderAnalyse"></div>

            <br>
            <br>
            <span style="font-size: 18px;font-weight: bolder" v-show="orderAnalyse">订单数统计：</span>
            <div id="orderCount" style="width: 500px;height: 300px;" v-show="orderAnalyse"></div>

            <br>
            <br>
            <span style="font-size: 18px;font-weight: bolder" v-show="orderAnalyse">笔均订单金额统计：</span>
            <div id="avgAmount" style="width: 500px;height: 300px;" v-show="orderAnalyse"></div>


            <br>
            <br>
            <div style="position: absolute;right:180px;top:50px">
              <span style="font-size: 18px;font-weight: bolder" v-show="orderAnalyse">利润率统计：</span>
              <div id="rate" style="width: 500px;height: 300px;" v-show="orderAnalyse"></div>
            </div>
            <br>
            <br>
            <div style="position: absolute;right:180px;top:420px">
              <span style="font-size: 18px;font-weight: bolder" v-show="orderAnalyse">订单时间段分布：</span>
              <div id="dishTime" style="width: 500px;height: 300px;" v-show="orderAnalyse"></div>
            </div>
          </div>

          <div v-show="userAnalyse">
            <span style="font-size: 18px;font-weight: bolder" v-show="userAnalyse">回头率：</span>
            <div id="returnRate" style="width: 500px;height: 300px;" v-show="userAnalyse"></div>
            <br>
            <br>
            <span style="font-size: 18px;font-weight: bolder" v-show="userAnalyse">顾客年龄分布：</span>
            <div id="ageDistribution" style="width: 500px;height: 300px;" v-show="userAnalyse"></div>
          </div>

          <!--<br>-->
          <!--<br>-->
          <!--<br>-->
          <!--<span style="font-size: 18px;font-weight: bolder" v-show="actionAnalyse">菜品类型统计：</span>-->
          <!--<div id="dishType" style="width: 500px;height: 300px;" v-show="actionAnalyse"></div>-->
          <!--<span style="font-size: 18px;font-weight: bolder" v-show="actionAnalyse">最爱的菜品：传奇香锅</span>-->

          <!--<br>-->
          <!--<br>-->
          <!--<br>-->
          <!--<span style="font-size: 18px;font-weight: bolder" v-show="actionAnalyse">流失风险指数：</span>-->
          <!--<span style="font-size: 24px;font-weight: bolder;color: red" v-show="actionAnalyse">0.71</span>-->
          <!--<br>-->
          <!--<span style="font-size: 18px;font-weight: bolder" v-show="actionAnalyse">近30天订餐次数: 13次</span>-->


          <!--<div id="orderAmount" style="width: 500px;height: 300px;" v-show="selector"></div>-->
          <!--<div id="orderCount" style="width: 500px;height: 300px;" v-show="selector"></div>-->
          <!--<div id="avgAmount" style="width: 500px;height: 300px;" v-show="selector"></div>-->

        </div>

      </Layout>


      <!--<Footer>Footer</Footer>-->
    </Layout>

  </div>
</template>


<script>
  export default {
    name: "MIS_Rest",
    data() {
      return {
        dishAnalyse: true,
        orderAnalyse: false,
        userAnalyse: false,
        selector: false,
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
      showItem(name) {
        if (name === '1') {
          this.showDish();
        }
        else if (name === '2') {
          this.showOrder();
        }
        else if (name === '3') {
          this.showUser()
        }
      },


      showDish() {
        this.dishAnalyse = true;
        this.orderAnalyse = false;
        this.userAnalyse = false;
        let myChart1 = this.$echarts.init(document.getElementById("dishPrice"))
        let myChart2 = this.$echarts.init(document.getElementById("dishRank"))

        let option1 = {
          title: {
            text: '菜品均价比较'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['餐厅菜品均价', '平台菜品均价']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06']
          },
          yAxis: {
            type: 'value',
            min: 10,
            max: 13,
          },
          series: [
            {
              name: '餐厅菜品均价',
              type: 'line',
              data: [10.4, 10.3, 10.6, 10.7, 10.5, 10.8, 10.9, 11.3, 11.5, 11.5, 11.6, 11.9]
            },
            {
              name: '平台菜品均价',
              type: 'line',
              data: [10.1, 10.4, 10.7, 10.6, 11.0, 11.2, 11.1, 11.5, 11.8, 12.0, 12.4, 12.5]
            },

          ]
        };

        let option2 = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            // feature: {
            //   dataView: {show: true, readOnly: false},
            //   magicType: {show: true, type: ['line', 'bar']},
            //   restore: {show: true},
            //   saveAsImage: {show: true}
            // }
          },
          legend: {
            data: ['第一名', '第二名', '第三名']
          },
          xAxis: [
            {
              type: 'category',
              data: ['2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '销量',
              min: 0,
              max: 250,
              interval: 50,
              // axisLabel: {
              //   formatter: '{value} ml'
              // }
            },
            // {
            //   type: 'value',
            //   name: '第二名',
            //   min: 0,
            //   max: 250,
            //   interval: 50,
            //   // axisLabel: {
            //   //   formatter: '{value} ml'
            //   // }
            // },
            // {
            //   type: 'value',
            //   name: '第三名',
            //   min: 0,
            //   max: 250,
            //   interval: 50,
            //   // axisLabel: {
            //   //   formatter: '{value} ml'
            //   // }
            // }
          ],
          series: [
            {
              name: '菜品_008',
              type: 'bar',
              data: [100, 110, 115, 124, 118, 138, 148, 155, 170, 165, 176, 182]
            },
            {
              name: '菜品_012',
              type: 'bar',
              data: [90, 90, 105, 108, 108, 118, 120, 115, 130, 140, 136, 142]
            },
            {
              name: '菜品_021',
              type: 'bar',
              data: [70, 80, 92, 98, 100, 107, 112, 101, 108, 120, 115, 122]
            }
          ]
        };


        myChart1.setOption(option1);
        myChart2.setOption(option2);
      },

      showOrder() {
        this.dishAnalyse = false;
        this.orderAnalyse = true;
        this.userAnalyse = false;
        this.changeTimeMode('month');
        this.showDishTime();
      },

      showUser() {
        this.dishAnalyse = false;
        this.orderAnalyse = false;
        this.userAnalyse = true;
        this.returnRate();
        this.ageDistribution();
      },

      returnRate() {
        let myChart = this.$echarts.init(document.getElementById('returnRate'));
        let option = {
          title: {
            text: '回头率（点过第二单顾客数/总顾客数）'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}"
          },

          // legend: {
          //   data: ['餐厅回头率', '平台回头率']
          // },
          xAxis: {
            type: 'category',
            data: ['2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06'],
          },
          yAxis: {
            type: 'value',
            min:0.3,
            max:0.6
          },
          series: [{
            name: '餐厅回头率',
            data: [0.43, 0.42, 0.43, 0.44, 0.47, 0.47, 0.48, 0.51, 0.49, 0.53, 0.51, 0.50],
            type: 'line'
          },
            {
              name: '平台同期回头率',
              data: [0.34, 0.36, 0.37, 0.40, 0.43, 0.41, 0.41, 0.44, 0.47, 0.49, 0.51, 0.52],
              type: 'line'
            }
          ]
        };

        myChart.setOption(option);
      },

      ageDistribution() {
        let myChart1 = this.$echarts.init(document.getElementById("ageDistribution"));
        let option = {
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
            data: ['<18', '18-25', '25-35', '35-45', '>45']
          },
          series: [
            {
              name: '年龄段',
              type: 'pie',
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
              data: [
                {value: 66, name: '<18'},
                {value: 306, name: '18-25'},
                {value: 254, name: '25-35'},
                {value: 133, name: '35-45'},
                {value: 55, name: '>45'}
              ]
            }
          ]
        };

        myChart1.setOption(option);
      },


      showDishTime() {
        let myChart = this.$echarts.init(document.getElementById('dishTime'));
        let option = {
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
            data: ['9点之前', '9点-13点', '13点-17点', '17点-20点', '20点之后']
          },
          series: [
            {
              name: '时间段',
              type: 'pie',
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
              data: [
                {value: 660, name: '9点之前'},
                {value: 955, name: '9点-13点'},
                {value: 325, name: '13点-17点'},
                {value: 1200, name: '17点-20点'},
                {value: 746, name: '20点之后'}
              ]
            }
          ]
        };


        myChart.setOption(option);

      },

      changeTimeMode(mode) {
        // console.log(this.selectMode)
        let xData = [], yData = [];
        let title1, title2, title3, title4;
        title4 = '利润率'
        let orderCountX = [], orderCountY = [];
        let avgAmountY = [];
        let rate = [];
        if (mode === 'month') {
          title1 = '每月营业额';
          title2 = '每月订单数'
          title3 = '笔均订单金额'
          xData = ['2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06']
          yData = [6398.0, 6506.5, 6648.4, 6730.5, 7060.8, 7580.8, 7790.0, 7884.2, 7940.1, 8460.8, 8788.5, 8810.4]
          orderCountY = [285, 285, 287, 297, 288, 309, 315, 328, 325, 336, 348, 350]
          rate = [0.074, 0.078, 0.079, 0.082, 0.085, 0.081, 0.085, 0.086, 0.089, 0.09, 0.095, 0.096]
          for (let k = 0; k < yData.length; k++) {
            avgAmountY.push((yData[k] / orderCountY[k]).toFixed(1))
          }
        }
        else if (mode === 'quarter') {
          title1 = '每季度营业额';
          title2 = '每季度订单数'
          title3 = '笔均订单金额'
          xData = ['2018第三季度', '2018第四季度', '2019第一季度', '2019第二季度']
          yData = [18349.9, 19471.6, 21620.0, 23860.7]
          orderCountY = [840, 860, 950, 1022];
          rate = [0.078, 0.083, 0.087, 0.094];
          for (let k = 0; k < yData.length; k++) {
            avgAmountY.push((yData[k] / orderCountY[k]).toFixed(1))
          }
        }
        else {
          title1 = '每年营业额';
          title2 = '每年订单数'
          title3 = '笔均订单金额'
          title4 = '利润率'
          xData = ['2018年', '2019年']
          yData = [38820.5, 44280.7]
          orderCountY = [1770, 1972];
          rate = [0.085, 0.093];
          for (let k = 0; k < yData.length; k++) {
            avgAmountY.push((yData[k] / orderCountY[k]).toFixed(1))
          }
        }
        let myChart = this.$echarts.init(document.getElementById('orderAmount'));
        let myChart2 = this.$echarts.init(document.getElementById('orderCount'));
        let myChart3 = this.$echarts.init(document.getElementById('avgAmount'));
        let myChart4 = this.$echarts.init(document.getElementById('rate'));

        let option = {
          title: {
            text: title1
          },
          tooltip: {
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
            name: '数据',
            data: yData,
            type: 'line'
          }]
        };

        let option2 = {
          title: {
            text: title2
          },
          tooltip: {
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
            name: '数据',
            data: orderCountY,
            type: 'line'
          }]
        };

        let option3 = {
          title: {
            text: title3
          },
          tooltip: {
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
            name: '数据',
            data: avgAmountY,
            type: 'line'
          }]
        };

        let option4 = {
          title: {
            text: title4
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}"
          },
          xAxis: {
            type: 'category',
            data: xData,
          },
          yAxis: {
            type: 'value',
            min: 0.07,
            max: 0.1,
          },
          series: [{
            name: '数据',
            data: rate,
            type: 'line'
          }]
        };

        myChart.setOption(option);
        myChart2.setOption(option2);
        myChart3.setOption(option3);
        myChart4.setOption(option4);
      },

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
