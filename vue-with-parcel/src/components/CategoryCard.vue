<template>
        <div class="col-3 pl-2 pr-2">
            <div class="category p-3 bg-warning">
                <div class="cardboard-header"><span>
                        <h4>{{ category.title }}</h4>
                    </span>
                </div>
                <div class="cardboard-content overflow-auto mb-3">
                    <TaskCard
                        v-for="task in tasks"
                        :key="task.id"
                        :task="task"
                        ></TaskCard>
                </div>

                <div class="cardboard-footer mb-3 d-flex flex-row justify-content-end">
                    <button class="btn btn-primary btn-sm" @click="addTask">+</button>
                </div>
            </div>
        </div>
</template>

<script>
import TaskCard from './TaskCard.vue'

export default {
    name: 'CategoryCard',
    props: {
        category: Object,
        tasks: Array
    },
    components: {
        TaskCard
    },
    methods: {
        addTask() {
            this.$emit('addTask', "addForm")
        }
    }
}
</script>


<style scoped>

</style>
