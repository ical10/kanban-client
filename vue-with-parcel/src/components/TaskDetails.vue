<template>
    <div class="card mb-3" style="width: 18rem;">
        <div class="container" v-if="taskDetailPage == 'edit-task-form'">
            <button type="button" class="close" @click='closeCard'>
                <span aria-hidden="true">&times;</span>
            </button>
            <div class="card-body">
                <form class="edit-task-form" @submit.prevent='editTaskConfirm'>
                    <h3 class="h3 mb-3 font-weight-normal">Edit Task</h3>
                    <input type="text" class="form-control" required="" autofocus=""
                        placeholder="So what's the new title?" v-model="title">
                    <input type="text" class="form-control" required="" placeholder="Give it a better description!"
                        v-model="description">
                    <button type="submit" class="btn btn-sm btn-primary mt-3">Confirm</button>
                </form>
            </div>
        </div>
        <div class="container" v-if="taskDetailPage == 'task-detail'">
            <button type="button" class="close" @click='closeCard'>
                <span aria-hidden="true">&times;</span>
            </button>
            <div class="card-body">
                <h5 class="card-title">
                    Title : {{ detailedTask.title }}
                </h5>
                <p class="card-text"> Description: {{ detailedTask.description }} </p>
                <p class="card-text"> Created on: {{ formattedDateID }} </p>
            </div>
            <div class="card-footer">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <button class="btn btn-sm btn-outline-secondary" @click='editTask'>Edit</button>
                        </div>
                        <div class="col">
                        <form @submit.prevent='changeCategory'>
                            <select name="categorySelect" v-model="categoryTitle">
                                <option value="">Move to...</option>
                                <option v-for="(category, categoryIdx) in filteredCategories" :key="categoryIdx" :value="category.title">
                                {{ category.title }}</option>
                            </select>
                            <button type="submit" class="btn btn-sm btn-outline-info">Confirm</button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskDetails',
    data () {
        return {
            taskDetailPage: 'task-detail',
            title: '',
            description: '',
            categoryTitle: '',
            id: '',
            error: ''
        }
    },
    props: {
        detailedTask: Object,
        changeMainPage: Function,
        categories: Array,
        errorMessages: Array
    },
    methods: {
        closeCard() {
            this.changeMainPage('CategoryCards') 
        },
        changeTaskDetailPage(payload) {
            this.taskDetailPage = payload
        },
        editTask() {
            this.changeTaskDetailPage('edit-task-form')
        },
        editTaskConfirm() {
            const payload = {
                title: this.title,
                description: this.description,
                taskId: this.detailedTask.id
            }
            this.$emit('editTaskConfirm', payload)
            if(this.errorMessages.length) {
                this.alert() 
            }
        },
        alert() {
            this.error = this.errorMessages[0]
            this.$swal(this.errorMessages[0])
            this.$swal(this.error)
            this.error = ''
        },
        changeCategory() {
            this.id = this.detailedTask.id
            const payload = {
                category: this.categoryTitle,
                taskId: this.id
            }
            this.$emit('changeCategory', payload)
            if(this.errorMessages.length) {
                this.alert() 
            }
            else {
                this.closeCard()
            }
        }
    },
    computed: {
        formattedDateID() {
          const options = { 
              year: "numeric", month: "long", day: "numeric" 
          }
        return new Date(this.detailedTask.createdAt).toLocaleDateString(['id', 'en-US'], options)
        },
        filteredCategories() {
            return this.categories.filter(category => category.title !== this.detailedTask.category)
        }
    }
}
</script>

<style scoped>

</style>
