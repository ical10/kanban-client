<template>
        <div class="login-page text-center">

            <div class="container pl-0 pr-0">
                <div class="d-flex flex-column align-items-center">
                  <img class="mt-2" src="../assets/img/kanban.svg" alt="" width="72" height="72"><br>
                    <span class="mt-2 mb-4"><b>KANBANCoder</b></span>
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
                  <button type="submit" class="btn btn-lg btn-primary btn-block mt-3">Login</button>
                  <hr />
                  <div class="d-flex flex-row justify-content-center align-items-center mb-3">
                    <!--Ada component google-signin button di sini-->
                    <!--<div class="g-signin2" data-onsuccess="onSignIn"></div>-->
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
                  <button type="submit" class="btn btn-lg btn-primary btn-block mt-3">Register</button>
              
              </form>
              
            </div>


        </div>
</template>

<script>

export default {
  name: "LoginForm",
  data() {
    return {
      email: '',
      password: '',
      loginPageForm: 'login-form-page'
    }
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
      this.changeLoginPageForm('login-form-page')
    },
    changeLoginPageForm(page) {
      this.loginPageForm = page
    },
    switchToRegister() {
      this.changeLoginPageForm('register-form-page')
    },
    switchToLogin() {
      this.changeLoginPageForm('login-form-page')
    }
  }
}
</script>
