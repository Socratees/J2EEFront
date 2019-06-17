<template>
  <div class="layout">

    <Layout>
      <Menu mode="horizontal" :theme="theme1" active-name="1">
        <MenuItem name="1">
          <Icon type="ios-people"/>
          Yummy
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

        <Menu active-name="1" :open-names="['1']" style="min-height: 1400px" @on-select="showItem">
          <MenuItem name="1">
            <Icon type="ios-analytics"/>
            订单数据分析
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-filing"/>
            趋势分析
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-people"/>
            用户分析
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-home"/>
            餐厅分析
          </MenuItem>

        </Menu>

        <!--content-->
        <div style="position: absolute;left: 300px;top:100px;width: 70%;min-height: 600px">

          <!--订单分析-->
          <div v-show="orderAnalyse">
            <ButtonGroup shape="circle" v-show="orderAnalyse">
              <Button @click="changeTimeMode('month')">按月统计</Button>
              <Button @click="changeTimeMode('quarter')">按季度统计</Button>
              <Button @click="changeTimeMode('year')">按年统计</Button>
            </ButtonGroup>
            <br>
            <br>

            <span style="font-size: 18px;font-weight: bolder" v-show="orderAnalyse">订单金额与订单数：</span>
            <div id="orderShow" style="width: 600px;height: 300px;" v-show="orderAnalyse"></div>
          </div>

          <!--趋势分析-->
          <div v-show="increaseAnalyse">
            <span style="font-size: 18px;font-weight: bolder" v-show="increaseAnalyse">用户数量变化：</span>
            <div id="userIncrease" style="width: 600px;height: 300px;" v-show="increaseAnalyse"></div>

            <br>
            <br>
            <span style="font-size: 18px;font-weight: bolder" v-show="increaseAnalyse">餐厅数量变化：</span>
            <div id="restIncrease" style="width: 600px;height: 300px;" v-show="increaseAnalyse"></div>

            <br>
            <br>
            <span style="font-size: 18px;font-weight: bolder" v-show="increaseAnalyse">营业额变化：</span>
            <div id="amountIncrease" style="width: 600px;height: 400px;" v-show="increaseAnalyse"></div>
          </div>

          <!--用户分析-->
          <div v-show="userAnalyse">
            <span style="font-size: 18px;font-weight: bolder" v-show="userAnalyse">用户年龄段结构：</span>
            <div id="ageDistribution" style="width: 600px;height: 300px;" v-show="userAnalyse"></div>

            <br>
            <br>
            <span style="font-size: 18px;font-weight: bolder" v-show="userAnalyse">用户地域分布：</span>
            <!--<div id="addressDistribution" style="width: 600px;height: 300px;" v-show="userAnalyse"></div>-->
            <Table border :columns="columns1" :data="userDistrict"></Table>

            <br>
            <br>
            <span style="font-size: 18px;font-weight: bolder" v-show="userAnalyse">用户流失风险指数：</span>
            <div id="lossIndex" style="width: 600px;height: 300px;" v-show="userAnalyse"></div>
          </div>

          <!--餐厅分析-->
          <div v-show="restAnalyse">
            <span style="font-size: 18px;font-weight: bolder" v-show="restAnalyse">餐厅类型分布图：</span>
            <div id="restType" style="width: 600px;height: 300px;" v-show="restAnalyse"></div>

            <br>
            <br>
            <span style="font-size: 18px;font-weight: bolder" v-show="restAnalyse">餐厅地域统计：</span>
            <Table border :columns="columns2" :data="restDistrict"></Table>

            <br>
            <br>
            <span style="font-size: 18px;font-weight: bolder" v-show="restAnalyse">平均回头率：</span>
            <div id="returnRate" style="width: 1100px;height: 600px;" v-show="restAnalyse"></div>


          </div>


        </div>


      </Layout>


    </Layout>
  </div>
</template>

<script>
  export default {
    name: "MIS_Manager",
    data() {
      return {
        columns1: [
          {
            title: '地区',
            key: 'district'
          },
          {
            title: '人数',
            key: 'number'
          },
          {
            title: '排名',
            key: 'rank'
          }
        ],

        columns2: [
          {
            title: '地区',
            key: 'district'
          },
          {
            title: '餐厅数',
            key: 'number'
          },
          {
            title: '用户餐厅比',
            key: 'ratio'
          },
          {
            title: '排名',
            key: 'rank'
          }
        ],
        restDistrict: [],
        userDistrict: [],
        theme1: 'dark',
        orderAnalyse: true,
        increaseAnalyse: false,
        userAnalyse: false,
        restAnalyse: false,
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
          this.showOrder();
        }
        else if (name === '2') {
          this.showIncrease();
        }
        else if (name === '3') {
          this.showUser();
        } else if (name === '4') {
          this.showRest();
        }
      },

      changeTimeMode(mode) {
        let xData = [];
        let orderAmount = [], orderCount = [], avgAmount = [];

        if (mode === 'month') {
          xData = ['2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06'];
          orderAmount = [800561.2, 870561.2, 951231.5, 1023211.5, 1203564.8, 1483564.6, 1568971.0, 1656581.0, 1706592.3, 1803695.1, 1896587.0, 1983654.0]
          orderCount = [34005, 36021, 37995, 39980, 42360, 46035, 47972, 48651, 53050, 56130, 58002, 59687]
        } else if (mode === 'quarter') {
          xData = ['2018第三季度', '2018第四季度', '2019第一季度', '2019第二季度'];
          orderAmount = [2615420.6, 3760548.5, 4956300.2, 5765340.8];
          orderCount = [108901, 126054, 145925, 175256]
        } else if (mode === 'year') {
          xData = ['2018年', '2019年'];
          orderAmount = [6320594.2, 10682354.0];
          orderCount = [234568, 320256]
        }
        let myChart1 = this.$echarts.init(document.getElementById("orderShow"));
        let option1 = {
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
            data: ['订单总额', '订单数', '笔均订单金额']
          },
          xAxis: [
            {
              type: 'category',
              data: xData,
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '订单总金额',
              // min: 0,
              // max: 250,
              // interval: 50,
              // axisLabel: {
              //   formatter: '{value} ml'
              // }
            },
            {
              type: 'value',
              name: '订单数',
              // min: 0,
              // max: 25,
              // interval: 5,
              // axisLabel: {
              //   formatter: '{value} °C'
              // }
            }
          ],
          series: [
            {
              name: '订单总金额',
              type: 'bar',
              data: orderAmount
            },
            // {
            //   name: '降水量',
            //   type: 'bar',
            //   data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            // },
            {
              name: '订单数',
              type: 'line',
              yAxisIndex: 1,
              data: orderCount
            }
          ]
        };

        myChart1.setOption(option1);
      },

      showOrder() {
        this.orderAnalyse = true;
        this.increaseAnalyse = false;
        this.userAnalyse = false;
        this.restAnalyse = false;

        this.changeTimeMode('month')


      },
      showIncrease() {
        this.orderAnalyse = false;
        this.increaseAnalyse = true;
        this.userAnalyse = false;
        this.restAnalyse = false;

        let myChart1 = this.$echarts.init(document.getElementById("userIncrease"));
        let myChart2 = this.$echarts.init(document.getElementById("restIncrease"));
        let myChart3 = this.$echarts.init(document.getElementById("amountIncrease"));

        let option1 = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['<18岁', '18-25岁', '25-35岁', '35-45岁', '>45岁']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '<18岁',
              stack: '用户',
              type: 'bar',
              data: [80, 154, 214, 259, 298, 347, 380, 421, 458, 499, 526, 548]
            },
            {
              name: '18-25岁',
              type: 'bar',
              stack: '用户',
              data: [280, 421, 602, 771, 869, 1089, 1153, 1205, 1364, 1498, 1568, 1638]
            },
            {
              name: '25-35岁',
              type: 'bar',
              stack: '用户',
              data: [220, 401, 562, 721, 839, 949, 1103, 1105, 1194, 1378, 1418, 1508]
            },
            {
              name: '35-45岁',
              type: 'bar',
              stack: '用户',
              data: [120, 201, 262, 361, 439, 449, 543, 585, 605, 668, 718, 757]
            },
            {
              name: '>45岁',
              type: 'bar',
              stack: '用户',
              data: [90, 174, 234, 279, 318, 367, 420, 437, 478, 519, 546, 578]
            },


          ]
        };

        let option2 = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['香锅冒菜', '地方菜系', '汉堡披萨', '面食粥点', '其它']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '香锅冒菜',
              stack: '餐厅',
              type: 'bar',
              data: [16, 37, 54, 69, 78, 88, 94, 101, 110, 115, 121, 125]
            },
            {
              name: '地方菜系',
              type: 'bar',
              stack: '餐厅',
              data: [12, 30, 40, 51, 59, 68, 74, 81, 87, 91, 95, 100],
            },
            {
              name: '汉堡披萨',
              type: 'bar',
              stack: '餐厅',
              data: [6, 12, 17, 21, 25, 29, 32, 37, 42, 44, 46, 49],
            },
            {
              name: '面食粥点',
              type: 'bar',
              stack: '餐厅',
              data: [6, 12, 15, 18, 20, 24, 28, 30, 38, 40, 42, 45],
            },
            {
              name: '其它',
              type: 'bar',
              stack: '餐厅',
              data: [16, 22, 27, 35, 45, 51, 59, 66, 72, 80, 89, 95],
            },


          ]
        };

        let data3 = [800561.2, 870561.2, 951231.5, 1023211.5, 1203564.8, 1483564.6, 1568971.0, 1656581.0, 1706592.3, 1803695.1, 1896587.0, 1983654.0];

        let option3 = {
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
            data: ['订单总金额', '增长率']
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
              name: '订单总金额',
              // min: 0,
              // max: 250,
              // interval: 50,
              // axisLabel: {
              //   formatter: '{value} ml'
              // }
            },
            {
              type: 'value',
              name: '增长率',
              // min: 0,
              // max: 25,
              // interval: 5,
              // axisLabel: {
              //   formatter: '{value} °C'
              // }
            }
          ],
          series: [
            {
              name: '订单总金额',
              type: 'bar',
              data: [800561.2, 870561.2, 951231.5, 1023211.5, 1203564.8, 1483564.6, 1568971.0, 1656581.0, 1706592.3, 1803695.1, 1896587.0, 1983654.0]
            },
            // {
            //   name: '降水量',
            //   type: 'bar',
            //   data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            // },
            {
              name: '增长率',
              type: 'line',
              yAxisIndex: 1,
              data: [0, 0.087, 0.091, 0.095, 0.098, 0.096, 0.099, 0.102, 0.099, 0.103, 0.105, 0.107]
            }
          ]
        };


        myChart1.setOption(option1);
        myChart2.setOption(option2);
        myChart3.setOption(option3);


      },
      showUser() {
        console.log('showUser')
        this.orderAnalyse = false;
        this.increaseAnalyse = false;
        this.userAnalyse = true;
        this.restAnalyse = false;

        this.userAge();
        this.showMap();
        this.lossIndex();
      },
      showRest() {
        this.orderAnalyse = false;
        this.increaseAnalyse = false;
        this.userAnalyse = false;
        this.restAnalyse = true;
        this.restType();
        this.restRatio();
        this.showReturnRate();
      },

      showReturnRate() {
        let myChart1 = this.$echarts.init(document.getElementById("returnRate"));
        let colors = ['#5793f3', '#d14a61', '#675bba'];
        let option = {
          color: colors,

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '20%'
          },
          toolbox: {
            // feature: {
            //   dataView: {show: true, readOnly: false},
            //   restore: {show: true},
            //   saveAsImage: {show: true}
            // }
          },
          legend: {
            data: ['香锅冒菜', '地方菜系', '汉堡披萨', '面食粥点', '其它', '平均回头率']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              data: ['2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12', '2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06'],
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '香锅冒菜',
              // min: 0,
              // max: 250,
              // position: 'right',
              // axisLine: {
              //   lineStyle: {
              //     color: colors[0]
              //   }
              // },
              // axisLabel: {
              //   formatter: '{value} ml'
              // }
            },
            {
              type: 'value',
              name: '地方菜系',
              // min: 0,
              // max: 250,
              // position: 'right',
              // offset: 80,
              // axisLine: {
              //   lineStyle: {
              //     color: colors[1]
              //   }
              // },
              // axisLabel: {
              //   formatter: '{value} ml'
              // }
            },
            {
              type: 'value',
              name: '汉堡披萨',
            },
            {
              type: 'value',
              name: '面食粥点',
            },
            {
              type: 'value',
              name: '其它',
            },
            {
              type: 'value',
              name: '平均回头率',
              min: 0.3,
              max: 0.6,
              // position: 'left',
              // axisLine: {
              //   lineStyle: {
              //     color: colors[2]
              //   }
              // },
              // axisLabel: {
              //   formatter: '{value} °C'
              // }
            }
          ],
          series: [
            {
              name: '香锅冒菜',
              type: 'bar',
              data: [0.39, 0.37, 0.39, 0.43, 0.45, 0.45, 0.46, 0.47, 0.49, 0.50, 0.50, 0.51]
            },
            {
              name: '地方菜系',
              type: 'bar',
              data: [0.33, 0.34, 0.35, 0.35, 0.37, 0.37, 0.39, 0.40, 0.41, 0.40, 0.42, 0.43]
            },
            {
              name: '汉堡披萨',
              type: 'bar',
              data: [0.39, 0.40, 0.40, 0.43, 0.46, 0.47, 0.49, 0.50, 0.52, 0.53, 0.53, 0.52]
            },
            {
              name: '面食粥点',
              type: 'bar',
              data: [0.31, 0.32, 0.33, 0.32, 0.34, 0.36, 0.35, 0.37, 0.37, 0.36, 0.38, 0.41]
            },
            {
              name: '其它',
              type: 'bar',
              data: [0.38, 0.37, 0.37, 0.38, 0.39, 0.39, 0.40, 0.41, 0.43, 0.42, 0.43, 0.43]
            },
            // {
            //   name:'降水量',
            //   type:'bar',
            //   yAxisIndex: 1,
            //   data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            // },
            {
              name: '平均回头率',
              type: 'line',
              // yAxisIndex: 2,
              data: [0.37, 0.36, 0.37, 0.40, 0.43, 0.41, 0.41, 0.44, 0.47, 0.47, 0.46, 0.45],
            }
          ]
        };


        let option1 = {
          title: {
            text: '回头率（点过第二单顾客数/点过第一单顾客数）'
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
            min: 0.3,
            max: 0.6
          },
          series: [
            //   {
            //   name: '餐厅回头率',
            //   data: [0.43, 0.42, 0.43, 0.44, 0.47, 0.47, 0.48, 0.51, 0.49, 0.53, 0.51, 0.50],
            //   type: 'line'
            // },
            {
              name: '平均回头率',
              data: [0.37, 0.36, 0.37, 0.40, 0.43, 0.41, 0.41, 0.44, 0.47, 0.47, 0.46, 0.45],
              type: 'line'
            }
          ]
        };
        myChart1.setOption(option);
      },

      restRatio() {
        this.restDistrict = [
          {district: '江苏省-苏州市', number: 60, ratio: '9.8%', rank: 1},
          {district: '江苏省-南京市', number: 60, ratio: '9.6%', rank: 2},
          {district: '江苏省-常州市', number: 53, ratio: '8.7%', rank: 3},
          {district: '江苏省-南通市', number: 50, ratio: '8.2%', rank: 4},
          {district: '江苏省-无锡市', number: 35, ratio: '8.0%', rank: 5},
          {district: '江苏省-扬州市', number: 18, ratio: '7.5%', rank: 6},
          {district: '江苏省-徐州市', number: 28, ratio: '7.1%', rank: 7},
          {district: '江苏省-盐城市', number: 10, ratio: '5.3%', rank: 8},
        ];
      },

      restType() {
        let myChart1 = this.$echarts.init(document.getElementById("restType"));
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
            data: ['香锅冒菜', '地方菜系', '汉堡披萨', '面食粥点', '其它']
          },
          series: [
            {
              name: '餐厅类型',
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
                {value: 125, name: '香锅冒菜'},
                {value: 100, name: '地方菜系'},
                {value: 49, name: '汉堡披萨'},
                {value: 45, name: '面食粥点'},
                {value: 95, name: '其它'}
              ]
            }
          ]
        };

        myChart1.setOption(option1);
      },


      lossIndex() {
        let myChart1 = this.$echarts.init(document.getElementById("lossIndex"));
        let option1 = {
          title: {
            text: '流失风险指数（Index>2.0）'
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
            // min:0.3,
            // max:0.6
          },
          series: [{
            name: '流失风险指数',
            data: [0, 0.15, 0.17, 0.14, 0.19, 0.22, 0.24, 0.23, 0.21, 0.20, 0.20, 0.18],
            type: 'line'
          },
            // {
            //   name: '平台同期回头率',
            //   data: [0.34, 0.36, 0.37, 0.40, 0.43, 0.41, 0.41, 0.44, 0.47, 0.49, 0.51, 0.52],
            //   type: 'line'
            // }
          ]
        };
        ;

        myChart1.setOption(option1);
      },


      userAge() {
        let myChart1 = this.$echarts.init(document.getElementById("ageDistribution"));
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
                {value: 548, name: '<18'},
                {value: 1638, name: '18-25'},
                {value: 1508, name: '25-35'},
                {value: 757, name: '35-45'},
                {value: 578, name: '>45'}
              ]
            }
          ]
        };

        myChart1.setOption(option1);
      },


      showMap() {

        this.userDistrict = [
          {district: '江苏省-南京市', number: 621, rank: 1},
          {district: '江苏省-苏州市', number: 587, rank: 2},
          {district: '江苏省-常州市', number: 525, rank: 3},
          {district: '江苏省-南通市', number: 471, rank: 4},
          {district: '江苏省-无锡市', number: 420, rank: 5},
          {district: '江苏省-徐州市', number: 321, rank: 6},
          {district: '江苏省-扬州市', number: 214, rank: 7},
          {district: '江苏省-盐城市', number: 102, rank: 8},
        ];
        // let myChart1 = this.$echarts.init(document.getElementById("addressDistribution"));
        //
        // let option1;
        //
        // myChart1.setOption(option1);
      }


    }

  }
</script>

<style scoped>

</style>
