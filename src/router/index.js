import { createRouter, createWebHistory } from 'vue-router'
import Slider from '../views/slider.vue'

const routes = [
	{
		path: '/',
		name: 'Slider',
		component: Slider
	},
	{
		path: '/parallax',
		name: 'Parallax',
		component: () => import('../views/parallax.vue')
	},
	{
		path: '/scroll',
		name: 'Scroll',
		component: () => import('../views/scroll.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
