<template>
  <div class="container">
    <login-page 
      v-if="currentPage == 'login-page'"
      @login="login"
      @changePage="changePage"
      ></login-page>
    <main-page
      v-if="currentPage == 'main-page'"
      :tasks='tasks'
      @logout="logout"
      @addTaskConfirm='addTaskConfirm'
      @deleteTask='deleteTask'
      @getTaskDetails='getTaskDetails'
      ></main-page>
  </div>
</template>

<script>
import axios from "axios"
import LoginPage from "./components/LoginPage.vue"
import MainPage from "./components/MainPage.vue"

export default {
  name: "App",
  data() {
    return {
    currentPage: '',
    tasks: [],
    server: 'http://localhost:5001'
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
        url: this.server + '/login',
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
    logout() {
        localStorage.clear()
        this.checkAuth()
    },
    fetchAllTasks() {
        axios({
            method: 'GET',
            url: this.server + '/tasks',
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
        url: this.server + '/tasks',
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
          url: this.server + `/tasks/${taskId}`,
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
          url: this.server + `/tasks/${taskId}`,
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
            }
  },
  created() {
    this.checkAuth()
  }
};
</script>

<style scoped>
</style>


