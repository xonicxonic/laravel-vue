<template>
    <transition name="modal-fade">
        <div class="modal-backdrop">
            <div class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-if="id !== null" class="modal-title">Update To Do</h5>
                        <h5 v-else class="modal-title">New To Do</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group" v-bind:class="{ 'has-error': hasErrors && errors.title }">
                                <label for="toDoTitle">Title</label>
                                <input type="text" class="form-control" id="toDoTitle" placeholder="Enter title" v-model="title" >
                                <span class="help-block alert-danger" v-if="hasErrors && errors.title">{{ errors.title[0] }}</span>
                            </div>

                            <div class="form-group" v-bind:class="{ 'has-error': hasErrors && errors.description }">
                                <label for="toDoDescription">Description</label>
                                <textarea class="form-control" id="Description" rows="3" v-model="description"></textarea>
                                <span class="help-block alert-danger" v-if="hasErrors && errors.description">{{ errors.description[0] }}</span>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="submit">Save changes</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name:"addToDoModal",
        props: ['todo'],
        data(){
            return {
                title: '',
                description: '',
                id: null,
                errors: {},
                hasErrors : false
            }
        },
        methods: {
            close() {
                this.id = null;
                this.title = '';
                this.description = '';
                this.$emit("close");
            },
            async submit() {
                
                var payload = {
                    id : this.todo ? this.id : null,
                    title : this.title,
                    description : this.description,
                }
                if (this.id){
                    await this.$store.dispatch("ToDosModule/updateToDo",{vm: this, payload: payload})
                    .then(() => {
                        this.errors = this.$store.getters['ToDosModule/getErrors'];    
                    });
                }else{
                    await this.$store.dispatch("ToDosModule/addToDos",{vm: this, payload: payload})
                    .then(() => {
                        this.errors = this.$store.getters['ToDosModule/getErrors'];
                    });
                }

                this.hasErrors = false;
                if (Object.keys(this.errors).length){
                    this.hasErrors = true;
                }

                if (!this.hasErrors){
                    this.$emit("close");
                    this.$emit("refresh");
                }
                
            }
        },
        watch: {
            todo(){
                if (this.todo){
                    this.hasErrors = false;
                    this.id = this.todo.id;
                    this.title = this.todo.title;
                    this.description = this.todo.description;
                }
            }
        }
    }
</script>
<style>
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

/* .modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
} */

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color:transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}

.modal {
  background: transparent;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-dialog{
  width: 500px;
}

</style>