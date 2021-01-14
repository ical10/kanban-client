<template>
    <div class="main-page">
       <!--nav-container-->
        <div class="container-fluid">
            <div class="container-navbar">
                <div class="row align-items-center">

                    <div class="col">
                        <a class="logo" alt="logo"><b>kanbancoder</b></a>
                    </div>
                    <div class="col d-flex justify-content-end">
                        <ul class="nav-links">
                            <li><a href="#">home</a></li>
                            <li><a href="#">projects</a></li>
                            <li><a href="#">about</a></li>
                        </ul>
                        <button class="btn btn-sm btn-outline-info" @click="logout">logout</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-main">
           <div class="container mt-3">
                <div class="row">
                    <AddForm v-if="currentMainPage == 'addForm'" 
                    @addTaskConfirm="addTaskConfirm"
                    ></AddForm>
                    <div class="col-12" 
                        v-else-if="currentMainPage == 'CategoryCards'">
                        <div class="row">
                            <CategoryCard
                                v-for="category in categories" 
                                @addTask="addTask"
                                :key="category.id"
                                :category="category"
                                :tasks="tasks"></CategoryCard>
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

export default {
    name: 'MainPage',
    data () {
        return {
            currentMainPage: 'CategoryCards',
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
        tasks: Array
    },
    components: {
        AddForm,
        CategoryCard
    },
    methods: {
        changeMainPage(payload) {
            this.currentMainPage = payload
        },
        addTaskConfirm(payload) {
            const { title, description } = payload
            console.log(">>>> ini dari MainPage", title, description)
        },
        addTask(payload) {
            this.changeMainPage(payload)
        },
        logout() {
            this.$emit('logout')
        }
    },
}
</script>

<style scoped>

</style>
