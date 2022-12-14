import layout from '@/layout'
export default {
  path: '/setting',
  component: layout,
  name: 'setting',
  children: [
    {
      path: '',
      component: () => import ('@/views/setting'),
      meta: {
        title: '公司设置',
        icon: 'setting'
      }
    }
  ]
}
