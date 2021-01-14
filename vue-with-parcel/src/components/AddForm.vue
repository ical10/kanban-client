<template>
    <div class="col-4">
        <div class="card">
            <div class="container">
                <button type="button" class="close float-right" aria-label="Close"
                    @click="addTaskCancel">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div class="card-body">
                    <form class="add-task-form" @submit.prevent="addTaskConfirm">
                        <h3 class="h3 mb-3 font-weight-normal">Add a new task</h3>
                        <input type="text" class="form-control" required="" autofocus=""
                            placeholder="Give it a meaningful title..." v-model="title">
                        <input type="text" class="form-control" required="" placeholder="Describe it well..."
                            v-model="description">
                        <button type="submit" class="btn btn-lg btn-primary mt-3">Confirm</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddForm',
    data () {
        return {
            title: '',
            description: ''
        }
    },
    methods: {
        addTaskConfirm() {
            this.$emit('addTaskConfirm', {
                title: this.title,
                description: this.description
            })
        },
        addTaskCancel() {
            this.$emit('addTaskCancel', 'CategoryCards')
        }
    }
}
</script>

<style scoped>

</style>
