<template>
    <div class="main-page">
       <!--nav-container-->
        <div class="container-fluid">
            <div class="container-navbar">
                <div class="row d-flex align-items-center">
                    <div class="col">
                        <a class="navbar-brand" alt="logo"><b>KanBanCoder</b></a>
                    </div>
                    <div class="col d-flex justify-content-end">
                        <ul class="nav-links">
                            <li><a id="github-link" href="https://github.com/ical10" target="_blank">My Github page</a></li>
                        </ul>
                        <button class="btn btn-sm btn-outline-danger mt-2 float-right" type="button" @click="logout">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
  <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        Logout</button>
                        <!--<button class="btn btn-sm btn-outline-danger" @click="logout">logout</button>-->
                    </div>
                </div>
            </div>
        </div>
        <div class="container-main">
           <div class="container mt-3">
                <div class="row d-flex justify-content-center">

                    <AddForm v-if="currentMainPage == 'addForm'" 
                    @addTaskConfirm="addTaskConfirm"
                    @addTaskCancel="addTaskCancel"
                    ></AddForm>

                    <TaskDetails v-if="currentMainPage == 'task-details'"
                    :detailedTask='detailedTask'
                    :changeMainPage='changeMainPage'
                    :categories='categories'
                    :errorMessages='errorMessages'
                    @editTaskConfirm='editTaskConfirm'
                    @changeCategory='changeCategory'
                    ></TaskDetails>


                    <div class="col-12" 
                        v-if="currentMainPage == 'CategoryCards'">
                        <div class="row">
                            <CategoryCard
                                v-for="category in categories" 
                                @addTask="addTask"
                                @deleteTask="deleteTask"
                                @getTaskDetails='getTaskDetails'
                                :key="category.id"
                                :category="category"
                                :tasks="tasks"
                                :errorMessages='errorMessages'
                                ></CategoryCard>
                        </div>
                    </div>
                </div>
                <!--end of div row-->
           </div>
            <!--end of div container-->
        </div>
        <!--end of div container-main-->
    </div>
</template>

<script>
import AddForm from './AddForm.vue'
import CategoryCard from './CategoryCard.vue'
import TaskDetails from './TaskDetails.vue'

export default {
    name: 'MainPage',
    data () {
        return {
            currentCategory: '',
            currentMainPage: 'CategoryCards',
            detailedTask: '',
            categories: [
            {
                id: 1,
                title: 'Backlog'
            },
            {
                id: 2,
                title: 'Todo'
            },
            {
                id: 3,
                title: 'Doing'
            },
            {
                id: 4,
                title: 'Completed'
            }
            ]
        }
    },
    props: {
        tasks: Array,
        errorMessages: Array
    },
    components: {
        AddForm,
        CategoryCard,
        TaskDetails
    },
    methods: {
        changeMainPage(payload) {
            this.currentMainPage = payload
        },
        addTaskConfirm(payload) {
            payload.category = this.currentCategory
            this.$emit('addTaskConfirm', payload)
            this.changeMainPage('CategoryCards')
        },
        addTask(payload) {
            const { page, categoryTitle } = payload
            this.currentCategory = categoryTitle
            this.changeMainPage(page)
        },
        addTaskCancel(payload) {
            this.changeMainPage(payload)
        },
        deleteTask(taskId) {
            this.$emit('deleteTask', taskId)
        },
        getTaskDetails(payload) {
            const { page, taskId } = payload
            const selectedTask = this.tasks.filter(task => task.id === taskId)
            this.detailedTask = selectedTask[0]
            console.log(this.detailedTask)
            this.changeMainPage(page)
        },
        editTaskConfirm(payload) {
            this.$emit('editTaskConfirm', payload)
        },
        changeCategory(payload) {
            this.$emit('changeCategory', payload)
        },
        googleSignOut() {
            const auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
        },
        logout() {
            this.$emit('logout')
            this.googleSignOut()
        }
    },
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=fira+code:wght@700&display=swap');
  .navbar-brand {
    font-family: 'fira code', monospace;
  }
</style>
