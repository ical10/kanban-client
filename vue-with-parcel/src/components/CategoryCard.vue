<template>
        <div class="col-3 pl-2 pr-2">
            <div class="category p-3">
                <div class="cardboard-header"><span>
                        <h4>{{ category.title }}</h4>
                    </span>
                </div>
                <div class="cardboard-content overflow-auto mb-3">
                    <TaskCard
                        v-for="task in filterTasks"
                        :key="task.id"
                        :task="task"
                        @deleteTask='deleteTask'
                        @getTaskDetails='getTaskDetails'
                        ></TaskCard>
                </div>

                <div class="cardboard-footer d-flex flex-row justify-content-end">
                    <button class="btn btn-sm btn-outline-info" @click="addTask">+</button>
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
            this.$emit('addTask', {
                page: "addForm",
                categoryTitle: this.category.title
            })
        },
        deleteTask(taskId) {
            this.$emit('deleteTask', taskId)
        },
        getTaskDetails(payload) {
            this.$emit('getTaskDetails', payload)
        }
    },
    computed: {
        filterTasks() {
            return this.tasks.filter(task => task.category == this.category.title)
        }
    }
}
</script>


<style scoped>
h4 {
    color: #FBEEC1;
}
</style>
