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
    }
  },
  created() {
    this.checkAuth()
  }
};
</script>

<style scoped>
</style>


