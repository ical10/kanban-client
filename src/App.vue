<template>
  <div class="container">
    <login-page 
      v-if="currentPage == 'login-page'"
      @login="login"
      @register='register'
      @changePage="changePage"
      @loginGoogle='loginGoogle'
      :errorMessages='errorMessages'
      ></login-page>
    <main-page
      v-if="currentPage == 'main-page'"
      :tasks='tasks'
      :errorMessages='errorMessages'
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
import Vue from 'vue'
import VueSwal from 'vue-swal'
import GoogleLogin from 'vue-google-login'
 
Vue.use(VueSwal)

export default {
  name: "App",
  data() {
    return {
    currentPage: '',
    tasks: [],
    errorMessages: []
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
          this.errorMessages = err.response.data.messages
        })
    },
    loginGoogle(payload) {
      const { id_token } = payload

      axios({
        method: "POST",
        url:'/loginGoogle',
        data: {
          id_token
        }
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token)
          this.checkAuth()
        })
        .catch(err => {
          this.errorMessages = err.response.data.messages
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
              //this.checkAuth()
              
            })
            .catch(err => {
              this.errorMessages = err.response.data.messages
            })
    },
    logout() {
        localStorage.clear()
        this.errorMessages = []
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
              this.fetchAllTasks()
              this.checkAuth()
            })
            .catch(err => {
              // catch error message dengan swal di sini
              this.errorMessages = err.response.data.messages
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
            this.errorMessages = err.response.data.messages
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
            this.errorMessages = err.response.data.messages
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


