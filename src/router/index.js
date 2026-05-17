import { createRouter, createWebHashHistory } from 'vue-router'
import StudentsPage  from '../components/StudentsPage.vue'
import StudentDetail from '../components/StudentDetail.vue'
import CreatePost    from '../components/CreatePost.vue'
import AboutPage     from '../components/AboutPage.vue'

const routes = [
  { path: '/',                    redirect: '/students' },
  { path: '/students',            component: StudentsPage,  name: 'students'        },
  { path: '/students/:id',        component: StudentDetail, name: 'student-detail'  },
  { path: '/create',              component: CreatePost,    name: 'create'           },
  { path: '/about',               component: AboutPage,     name: 'about'            },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
