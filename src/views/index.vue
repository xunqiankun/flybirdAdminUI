<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <h2>
                    <p>Welcome to your iView app!中国</p>
                    <Button type="ghost" @click="toindex">全换内容</Button>
		    <Button type="ghost" @click="testapi">返回登录页面</Button>
                </h2>
            </Col>
        </Row>
    </div>
</template>
<script>
//    import api from '../constant/api'
    export default {
        data(){
	  return{
	    list: []
	  }
	},
        methods: {
            toindex () {
                //this.$Modal.info({
                //    title: 'Bravo',
                //    content: 'Now, enjoy the convenience of iView.'
                //});
		this.$router.push({path : '/main/page1'});
            },
	    testapi () {
	       this.$router.push({path : '/login'});
	    }
        }
    }
</script>
