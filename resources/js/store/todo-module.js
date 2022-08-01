import axios from 'axios'

export default {
    namespaced: true,
    state: {
        todos: [],
        errors : []
    },
    getters: {
        toDoList (state){
            return state.todos;
        },
        getErrors(state){
            return state.errors;
        }
    },
    actions: {
        async fetchToDos({commit}){
            const response = await axios.get("/todo");
            commit("setToDos", response.data.todos)
        },
        async addToDos({commit}, {vm, payload}){
            await axios.post("/todo/create", payload).then((response) => {
                vm.$toast.success('Successfuly added new To Do');
                commit("setErrors", []);
            }).catch(error => {
                commit("setErrors", error.response.data.errors)
            });
            //commit("addNewToDo", response.data)
        },
        async deleteToDo({commit}, {vm, payload}){
            const response = await axios.delete("/todo/delete/" + payload).then((response) => {
                vm.$toast.success('Successfuly deleted To Do');
            });
            //commit("removeToDo", id)
        },
        async updateToDo({commit}, {vm, payload}){
            const response = await axios.put("/todo/update/" + payload.id, payload).then((response) => {
                vm.$toast.success('Successfuly updated To Do');
                commit("setErrors", []);
            }).catch(error => {
                commit("setErrors", error.response.data.errors)
            });
            // commit('updateToDo', response.data);
        }
    },
    mutations:{
        setToDos: (state, todos) => (
            state.todos = todos
        ),
        setErrors: (state, errors) => (
            state.errors = errors
        )
        // addNewToDo: (state, todo) => state.todos.unshift(todo),
        // removeToDo: (state, id) => state.todos = state.todos.filter((todo) => todo.id !== id)
        // updateToDo: (state, updateToDo) => {
        //     const index = state.todos.findIndex(todo => todo.id === updateToDo.id);
        //     if (index !== -1) {
        //         state.todos.splice(index, 1, todo);
        //     }
        // }
    },
}
