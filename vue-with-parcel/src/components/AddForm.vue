<template>
    <div class="col-12">
        <div class="card">
            <form class="add-task-form" v-on:submit.prevent="addTaskConfirm">
                <h3 class="h3 mb-3 font-weight-normal">Add a new task</h3>
                <input type="text" class="form-control" required="" autofocus=""
                    placeholder="Give it a meaningful title..." v-model="title">
                <input type="text" class="form-control" required="" placeholder="Describe it well..."
                    v-model="description">
                <button type="submit" class="btn btn-lg btn-primary btn-block mt-3">Confirm</button>
            </form>
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
        }
    }
}
</script>

<style scoped>

</style>
