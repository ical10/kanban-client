<template>
    <div class="card mb-3">
        <div class="container">
            <button type="button" class="close" @click='deleteTask'>
                <span aria-hidden="true">&times;</span>
            </button>
            <div class="card-body">
                <h5 class="card-title">
                    {{ task.title }}
                </h5>
                <p class="card-text"> {{ task.description }} </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TaskCard",
    props: {
        task: Object
    },
    methods: {
        deleteTask() {
            this.$emit('deleteTask', this.task.id)
        }
    }
}
</script>

<style scoped>

</style>
