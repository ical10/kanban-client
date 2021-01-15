<template>
  <div class="container">
    <login-page 
      v-if="currentPage == 'login-page'"
      @login="login"
      @register='register'
      @changePage="changePage"
      ></login-page>
    <main-page
      v-if="currentPage == 'main-page'"
      :tasks='tasks'
      @logout="logout"
      @addTaskConfirm='addTaskConfirm'
      @deleteTask='deleteTask'
      @getTaskDetails='getTaskDetails'
      @editTaskConfirm='editTaskConfirm'
      @changeCategory='changeCategory'
      ></main-page>
  </div>
</template>

<script>
import axios from './config/axiosInstance'
import LoginPage from "./components/LoginPage.vue"
import MainPage from "./components/MainPage.vue"

export default {
  name: "App",
  data() {
    return {
    currentPage: '',
    tasks: []
    // server: 'http://localhost:5001'
    } 
  },
  components: {
    LoginPage,
    MainPage
  },
  methods: {
    checkAuth() {
      if (localStorage.getItem('access_token')) {
          this.changePage('main-page')
          this.fetchAllTasks()
      }
      else {
          this.changePage('login-page')
      }
    },
    changePage(payload) {
      this.currentPage = payload
    },
    login(payload) {
      const { email, password } = payload

      axios({
        method: "POST",
        url:'/login',
        data: {
          email,
          password
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token)
          this.checkAuth()
        })
        .catch(err => {
          console.log(err)
        })
    },
    register(payload) {
          const { email, password } = payload

          axios({
            method: "POST",
            url:'/register',
            data: {
              email,
              password
            }
          })
            .then(({ data }) => {
              this.checkAuth()
            })
            .catch(err => {
              console.log(err)
            })
    },
    logout() {
        localStorage.clear()
        this.checkAuth()
    },
    fetchAllTasks() {
        axios({
            method: 'GET',
            url: '/tasks',
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
            .then(response => {
                this.tasks = response.data
            })
            .catch(err => {
                console.log(err)
            })
    },
    addTaskConfirm(payload) {
      const { title, description, category } = payload
      axios({
        method: 'POST',
        url: '/tasks',
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          title,
          description,
          category
        }
      })
        .then(({ data }) => {
          this.fetchAllTasks()
          this.checkAuth()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteTask(taskId) {
        axios({
          method: 'DELETE',
          url: `/tasks/${taskId}`,
          headers: {
            access_token: localStorage.getItem("access_token")   
          }
        })
        .then(({ response }) => {
              console.log(response)
              this.fetchAllTasks()
              this.checkAuth()
            })
            .catch(err => {
                console.log(err)
            })
    },
    getTaskDetails(payload) {
        const { page, taskId } = payload
        axios({
          method: 'GET',
          url: `/tasks/${taskId}`,
          headers: {
            access_token: localStorage.getItem("access_token")   
          }
        })
        .then(({ response }) => {
              console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    },
    editTaskConfirm(payload) {
        const { title, description, taskId } = payload
        
        axios({
          method: 'PUT',
          url: `/tasks/${taskId}`,
          data: {
            title,
            description
          },
          headers: {
            access_token: localStorage.getItem("access_token")   
          }
        })
        .then(({ response }) => {
            this.fetchAllTasks()
            this.checkAuth()
        })
        .catch(err => {
            console.log(err)
        })
    },
    changeCategory(payload) {
        const { category, taskId } = payload
        axios({
          method: 'PATCH',
          url: `/tasks/${taskId}`,
          data: {
            category
          },
          headers: {
            access_token: localStorage.getItem("access_token")   
          }
        })
        .then(({ response }) => {
            this.fetchAllTasks()
            this.checkAuth()
        })
        .catch(err => {
            console.log(err)
        })
    }
  },
  created() {
    this.checkAuth()
  }
};
</script>

<style scoped>
</style>


