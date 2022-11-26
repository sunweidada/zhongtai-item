import layout from '@/layout'
export default {
  path: '/employees',
  component: layout,
  name: 'employees',
  children: [
    {
      path: '',
      component: () => import ('@/views/employees'),
      meta: {
        title: '员工',
        icon: 'people'
      }
    },
    {
      hidden: true,
      path: 'detail/:userId',
      component: () => import('@/views/employees/components/detail'),
      props: true
    },
    {
      path: 'print/:id',
      hidden: true,
      component: () => import('@/views/employees/components/print')
    }
  ]
}
