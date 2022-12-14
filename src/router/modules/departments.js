import layout from '@/layout'
export default {
  path: '/departments',
  component: layout,
  name: 'departments',
  children: [
    {
      path: '',
      component: () => import ('@/views/departments'),
      meta: {
        title: '组织架构',
        icon: 'tree'
      }
    }
  ]
}
