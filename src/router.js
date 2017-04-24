const routers = [
    {
       path: '/',
       redirect:'/login',
    },
	{
       path: '/index',
        meta: {
            title: '',
            requireAuth: true, //是否要求登录验证
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
	},
	{
       path: '/login',
       requireAuth: false,
        meta: {
            title: ''
        },
        params: {
            loginerrinfo:''
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
	},
	{
       path: '/main',
        meta: {
            title: '',
            requireAuth: true,
        },
        component: (resolve) => require(['./views/main.vue'], resolve),
        children: [
        {path: 'page1',component: (resolve) => require(['./views/index.vue'], resolve)}
		
		]
	}
];
export default routers;