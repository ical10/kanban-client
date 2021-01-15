<template>
    <div class="card mb-3">
        <div class="container">
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
                <p>Change task to next category</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TaskDetails',
    data () {
        return {
            message: "Hello"
        }
    },
    props: {
        detailedTask: Object,
        changeMainPage: Function
    },
    methods: {
        closeCard() {
            this.changeMainPage('CategoryCards') 
        }
    },
    computed: {
        formattedDateID() {
          const options = { 
              year: "numeric", month: "long", day: "numeric" 
          }
        return new Date(this.detailedTask.createdAt).toLocaleDateString(['id', 'en-US'], options)
        }
    }
}
</script>

<style scoped>

</style>
