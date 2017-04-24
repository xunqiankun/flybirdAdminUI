<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="login-form">
        <h1 align="center"><p>系统登录</p></h1>
	<br>
        <Form-item prop="user">
            <Input type="text" v-model="formInline.user" size="large" style="width:300px" placeholder="请输入用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
        <Form-item prop="password">
            <Input type="password" v-model="formInline.password" size="large" style="width:300px" placeholder="请输入用户密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </Form-item>
	<p>{{formInline.loginerrinfo}}</p>
        <Form-item>
            <Button type="primary" @click="handleSubmit('formInline')" icon="log-in" size="large" long>登录</Button>
        </Form-item>
	
    </Form>
</template>
<script>
import * as types from '../store/types'
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: '',
		    loginerrinfo: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted () {
        console.log(this.$store.state.loginstatus);
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      let params = {
                        username: this.formInline.user,
			password: this.formInline.password
                      }
                        this.axios.post(this.api.login,params).then(response => {

                          var token = response.data.token;
                          var ret = response.data.ret;
                          if(ret=='succeed'){
                            this.$store.commit('login',token);
                            this.$Message.success('登录成功!');
                            this.$router.push({path :'/main/page1',params: {loginerrinfo:'认证失败，请重新登录'}});
                          }else{
                            this.formInline.loginerrinfo= '用户密码错误';
                          }

                        });
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss' rel="stylesheet/scss" type="text/css">
  .login-form{
    width: 300px;
    margin:100px auto;
  }
</style>