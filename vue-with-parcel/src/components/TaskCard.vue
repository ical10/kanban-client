<template>
        <div class="card mb-3">
            <div class="card-header">
                <button type="button" class="close">
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
    }
}
</script>

<style scoped>

</style>
