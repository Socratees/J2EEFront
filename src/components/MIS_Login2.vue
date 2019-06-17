<template>
  <center>
    <div class="bg" :style="{height: mapHeight}">
      <div style="position: relative;top:20em">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="user">
            <i-input type="text" v-model="formInline.user" placeholder="用户ID/餐厅ID">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <br>
          <FormItem prop="password">
            <i-input type="password" v-model="formInline.password" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <br>
          <FormItem>
            <Button type="primary" @click="misLogin()">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>

  </center>


</template>

<script>
  export default {
    computed: {
      //计算浏览器的高度
      mapHeight() {
        return window.innerHeight +'px'
      }

    },
    data() {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {type: 'string', min: 1, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        // this.$refs[name].validate((valid) => {
        //   if (valid) {
        //     this.$Message.success('Success!');
        //   } else {
        //     this.$Message.error('Fail!');
        //   }
        // })
      },
      misLogin(){
        var self = this
        var userId = this.formInline.user;
        var password = this.formInline.password;
        if(userId === '1000001'){
          self.$router.push({
            name:'user_data',
            params:{
              'userId': userId
            }

          })
        } else if(userId === '100001'){
          self.$router.push({
            name:'restaurant_data',
            params:{
              'restId': userId
            }
          })
        }else if(userId === 'yummy'){
          self.$router.push({
            name:'manager',
            params:{
              'restId': userId
            }
          })
        }
      },



    }
  }
</script>

<style scoped>
  .bg{
    background-image: url('../images/wallhaven-142267.jpg');
    background-size: cover;
    border: 1px solid white;
  }
</style>
