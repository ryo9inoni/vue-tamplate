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
		path: '/grid',
		name: 'Grid',
		component: () => import('../views/grid.vue')
	},
	{
		path: '/side',
		name: 'side',
		component: () => import('../views/side.vue')
	},
	{
		path: '/drawing',
		name: 'Drawing',
		component: () => import('../views/drawing.vue')
	},
	{
		path: '/three',
		name: 'Three',
		component: () => import('../views/three.vue')
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router;
