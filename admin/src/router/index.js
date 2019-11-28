import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'main',
        component: Main,
        children:[
            {
                path:'/categories/create',
                component:CategoryEdit       
        },
        {
            path:'/categories/list',
            component:CategoryList
        },
        {
            // 两个不同的地址使用同一个页面组建  表示吧任何url参数都注入页面里面  使id可以直接使用
            path:'/categories/edit/:id',
            component:CategoryEdit,
            props:true

        },
        {
            path:'/items/create',
            component:ItemEdit 
        },
        {     
        path:'/items/list',
        component:ItemList

    },
    {
        // 两个不同的地址使用同一个页面组建  表示吧任何url参数都注入页面里面  使id可以直接使用
        path:'/items/edit/:id',
        component:ItemEdit,
        props:true

    },
        
        
        ]
    }

]

const router = new VueRouter({
    routes
})

export default router