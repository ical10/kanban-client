<template>
        <div class="login-page text-center">

            <div class="container pl-0 pr-0">
                <div class="d-flex flex-column align-items-center">
                  <img class="mt-2" src="../assets/img/kanban.svg" alt="" width="72" height="72"><br>
                    <span class="navbar-brand mt-2 mb-4"><b>KANBANCoder</b></span>
                </div>
                <div class="d-flex flex-row justify-content-center mb-3">
                    <button class="btn btn-primary btn-sm" @click='switchToLogin'>Login</button>
                    <button class="btn btn-primary btn-sm" @click='switchToRegister'>Register</button>
                </div>
            </div>
            <div class="container" v-if="loginPageForm == 'login-form-page'">
            
              <form class="form-login" @submit.prevent="login">

                  <h3 class="h3 mb-3 font-weight-normal">Please login</h3>
                  <label for="input-email-login" class="sr-only">Email address</label>
                  <input type="email" class="form-control" id="input-email-login" required="" autofocus=""
                      placeholder="Email address" v-model="email">
                  <label for="input-password-login" class="sr-only">Password</label>
                  <input type="password" class="form-control" id="input-password-login" required="" placeholder="Password"
                      v-model="password">
                  <div class="alert alert-danger mt-3" role="alert" 
                    v-for="(errorMessage, idx) in errorMessages" :key="idx">
                      {{ errorMessage }}
                  </div>
                  <button type="submit" class="btn btn-lg btn-primary btn-block mt-3">Login</button>
                  <hr />
                  <div class="d-flex flex-row justify-content-center align-items-center mb-3">
                    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" @click='loginGoogle'>Login</GoogleLogin>
                  </div>
                  <div class="d-flex flex-row justify-content-center align-items-center mb-3">
                    <div class="card" style="width: 18rem;">
                      <div class="card-body">
                        <h5 class="card-title">Hi!</h5>
                        <h6 class="card-subtitle mb-2 text-muted">To log yourself in quickly and see full demo of this app, use the credential below</h6>
                        <h6 class="card-subtitle mb-2 text-muted">email: user@mail.com</h6>
                        <h6 class="card-subtitle mb-2 text-muted">pass: thisisnotapassword</h6>
                        <p class="card-text">Please use it wisely, have fun!</p>
                      </div>
                      <div class='card-footer'>
                        <p>made with ❤️ <br> by @ical10</p>
                      </div>
                    </div>
                  </div>
              
              </form>
            </div>

            <div class="container" v-if="loginPageForm == 'register-form-page'">
            
              <form class="form-register" @submit.prevent="register">

                  <h3 class="h3 mb-3 font-weight-normal">Please register</h3>
                  <label for="input-email-register" class="sr-only">Email address</label>
                  <input type="email" class="form-control" id="input-email-register" required="" autofocus=""
                      placeholder="Email address" v-model='email'>
                  <label for="input-password-register" class="sr-only">Password</label>
                  <input type="password" class="form-control" id="input-password-register" required=""
                      placeholder="Password" v-model='password'>
                  
                  <div class="alert alert-danger mt-3" role="alert" 
                    v-for="(errorMessage, idx) in errorMessages" :key="idx">
                      {{ errorMessage }}
                  </div>

                  <button type="submit" class="btn btn-lg btn-primary btn-block mt-3">Register</button>
              
              </form>
              
            </div>


        </div>
</template>

<script>
import GoogleLogin from 'vue-google-login'

export default {
  name: "LoginForm",
  data() {
    return {
      email: '',
      password: '',
      loginPageForm: 'login-form-page',
      id_token: '',
      params: {
        client_id: '507628413455-3g3s4fbeb1791vtf4ujd9j18pn0kqvms.apps.googleusercontent.com'
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  components: {
    GoogleLogin
  },
  props: {
    errorMessages: Array
  },
  methods: {
    login() {
      this.$emit('login', {
        email: this.email, 
        password: this.password
      })
      this.email = ''
      this.password = ''
    },
    register() {
      this.$emit('register', {
        email: this.email,
        password: this.password
      })
      this.email = ''
      this.password = ''
      // this.changeLoginPageForm('login-form-page') --> ini dipindah ke app.vue
    },
    changeLoginPageForm(page) {
      this.loginPageForm = page
    },
    switchToRegister() {
      this.changeLoginPageForm('register-form-page')
    },
    switchToLogin() {
      this.changeLoginPageForm('login-form-page')
    },
    onSuccess(googleUser) {
      this.id_token = googleUser.getAuthResponse().id_token
      this.loginGoogle()
    },
    loginGoogle() {
      this.$emit('loginGoogle', {
        id_token: this.id_token
      })
    }

  }
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=fira+code:wght@700&display=swap');
  .navbar-brand {
    font-family: 'fira code', monospace;
  }
</style>

