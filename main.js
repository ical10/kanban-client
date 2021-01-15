const app = new Vue({
    el: '#app',
    data: {
        tasks: [],
        page: '',
        search: '',
        inputTask: {
            title: '',
            description: ''
        },
        user: {
            email: '',
            password: ''
        },
        server: 'http://localhost:5001'
    },
    methods: {
        //methods related with HTML page lifecycle
        checkAuth() {
            if (localStorage.getItem('access_token')) {
                this.changePage("main-page")
                this.fetchAllTasks()
            }
            else {
                this.changePage("login-page")
            }
        },
        login() {
            localStorage.setItem('access_token', 'access token sembarang')
            this.checkAuth()
        },
        onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token

            axios({
                method: 'POST',
                url: server + '/loginGoogle',
                data: {
                    id_token
                }
            })
                .then(response => {
                    console.log(response)
                    localStorage.setItem('access_token', response.access_token)
                    this.checkAuth()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        signOut() {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            })
        },
        logout() {
            localStorage.clear()
            this.signOut()
            this.checkAuth()
        },
        changePage(page) {
            this.page = page
        },
        // methods interacting with db
        deleteTask(taskId) {
            axios({
                method: 'DELETE',
                url: this.server + `/tasks/${taskId}`,
            })
                .then(response => {
                    this.fetchAllTasks()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addTask() {
            this.changePage("add-task-form")
        },
        addTaskConfirm() {
            axios({
                method: 'POST',
                url: this.server + '/tasks',
                data: {
                    title: this.inputTask.title,
                    description: this.inputTask.description
                }
            })
                .then(response => {
                    console.log(response)
                    this.fetchAllTasks()
                    this.changePage("main-page")
                })
                .catch(err => {
                    res.send(err)
                })
        },
        fetchAllTasks() {
            axios({
                method: 'GET',
                url: this.server + '/tasks'
            })
                .then(response => {
                    this.tasks = response.data
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    computed: {
        listDoneTasks() {
            return this.tasks.filter(task => task.done === true)
        },
        listTasksByCategory() {

        },
        changeCategory() {
            // change category of a card on drag
        }
    },
    beforeCreate() {
        console.log(`beforeCreate`)
    },
    created() {
        console.log(">>> dari created")
        this.checkAuth()
    },
    watch: {
        search: (keyword) => {
            this.fetchAllTasks()
        }
    }
})
