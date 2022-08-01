<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2 class="title">To Do List</h2>

                <button type="button" class="btn btn-outline-primary add-button"
                    @click="showAddModal"
                    ref="addModal"
                >Add</button>
                <table class="table">
                    <thead>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Date Added</th>
                        <th scope="col">Actions</th>
                    </thead>
                    <tbody>
                        <tr v-for="(todo, key, index) in todos" :key="key">
                            <td>{{++key}}</td>
                            <td>{{ todo.title }}</td>
                            <td>{{ todo.description }}</td>
                            <td>{{ formatDate(todo.created_at) }}</td>
                            <td>
                                <button type="button" class="btn btn-outline-info" @click="editToDo(todo)">Edit</button>
                                <button type="button" class="btn btn-outline-warning" @click="deleteToDo(todo.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <addToDoModal v-show="isAddModalVisible" @close="closeAddModal" @refresh="refreshList" :todo="selectedToDo"></addToDoModal>
    </div>
</template>
<script>
    import moment from 'moment';
    import addToDoModal from "../../components/AddToDoModal.vue";
    import { mapState } from "vuex";

    export default {
        components: {
            addToDoModal
        },
        data() {
            return {
                isAddModalVisible: false,
                todos: this.$store.getters['ToDosModule/toDoList'],
                selectedToDo : null
            };
        },
        created() {
            this.refreshList();
        },
        computed: {
            ...mapState(["ToDosModule"]),
        },
        
        methods: {
            showAddModal() {
                this.isAddModalVisible = true;
            },
            closeAddModal() {
                this.isAddModalVisible = false;
                this.selectedToDo = null;
            },
            async refreshList(){
                await this.$store.dispatch("ToDosModule/fetchToDos")
                    .then(() => {
                        this.todos = this.$store.getters['ToDosModule/toDoList'];
                    })

            },
            async deleteToDo(id){
                await this.$store.dispatch("ToDosModule/deleteToDo", {vm: this, payload: id})
                .then(()=>{
                    this.refreshList();
                })
            },
            formatDate(date){
                if (date) {
                    return moment(String(date)).format('YYYY-MM-DD')
                }
            },
            editToDo(todo){
                this.selectedToDo = todo
                this.showAddModal();
            }
        }, 
    }
</script>

<style lang="scss" scoped>
.title {
    float:left;
}

.add-button{
    float:right;
}

</style>
