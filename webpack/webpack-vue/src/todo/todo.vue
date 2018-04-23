<template>
    <section class="real-app">
        <input
                type="text"
                class="add-input"
                autofocus="autofocus"
                :placeholder="$t('global.todo')"
                @keyup.enter="addTodo"
        >
        <item
           :todo="todo"
           v-for="todo in filteredTodos"
           :key="todo.id"
           @del="deleteTodo"
        />
        <tabs
           :filter="filter"
           :todos="todos"
           @toggle="toggleFilter"
           @clearAllCompleted="clearAllCompleted"
        />
    </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
import Storage from '../storage/storage'
let id = 0
const STORAGE_KEY = 'todos'

export default {
    //name: "todo.vue",
    data() {
        return {
            todos: Storage.fetch(STORAGE_KEY),
            filter: 'All'
        }
    },
    computed: {
        filteredTodos() {
            if(this.filter === 'All'){
                return this.todos
            }
            const completed = this.filter === 'Completed'
            return this.todos.filter(todo => completed === todo.completed)
            /*return this.todos.filter(function(todo){
                return completed === todo.completed
            })*/
        }
    },
    watch: {
        todos: {
            handler: function(val){
                Storage.save(STORAGE_KEY, val)
            },
            deep: true
        }
    },
    methods: {
        addTodo(e) {
            if(e.target.value.trim() !== ''){
                console.log(e.target.value.trim() !== '')
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                })
                e.target.value = ''
            }
        },
        deleteTodo(id) {
            this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
        },
        toggleFilter(state) {
            this.filter = state
        },
        clearAllCompleted() {
            this.todos = this.todos.filter(todo => !todo.completed)
        }
    },
    components: {
        Item,
        Tabs
    }
}
</script>

<style lang="stylus" scoped>
.real-app{
    width 600px
    margin: 0 auto
    box-shadow 0px 0px 5px #666
}
.add-input{
    position relative
    margin 0
    width 100%
    font-size 20px
    line-height 1.4rem
    outline none
    color inherit
    box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
    box-sizing border-box
    font-smoothing:antialiased;
    padding 16px 16px 16px 60px
    border none
}
</style>