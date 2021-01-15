<template>
    <div class="card mb-3">
        <div class="container">
            <button id="delete-btn" class="btn btn-sm btn-outline-danger mt-2 float-right" data-toggle="confirmation" type="button" @click='deleteTask'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
            </button>
            <div class="card-body">
                <h5 class="card-title">
                    {{ task.title }}
                </h5>
                <p class="card-text"> {{ task.description }} </p>
            </div>
            <div class="card-footer">
                <a class="btn" href="#" @click='getTaskDetails'>
                    <span class="mdc-icon-button material-icons">
                        info
                    </span>
                </a>
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
        },
        getTaskDetails() {
            this.$emit('getTaskDetails', {
                taskId: this.task.id,
                page: 'task-details'
            })
        }
    }
}
</script>

<style scoped>

.card {
    background-color: #FBEEC1; 
}

.card-footer {
    padding: 0 0;
}

.h5, h5 {
    font-size: 1.1 rem;
}

p {
    font-size: 12px;
}

</style>
