import layout from '@/layout'
export default {
  path: '/social',
  component: layout,
  name: 'social-securitys',
  children: [
    {
      path: '',
      component: () => import ('@/views/social'),
      meta: {
        title: '社保',
        icon: 'table'
      }
    }
  ]
}
