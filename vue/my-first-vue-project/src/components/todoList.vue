<template>
  <div class="todoList">
    <input type="text" v-model="newItems" v-on:keyup.enter="addItem" class="inputText">
    <button @click="addItem" class="todo-bnt">add</button>
    <!--<ul class="todo-ul">-->
    <transition-group tag="ul" name="fade" mode="in-out" class="todo-ul">
      <li v-for="(item,index) in items" v-bind:class="{Finished:item.isFinished}" :key="index">
        <input type="checkbox" v-bind:id="item.label" v-model="item.isFinished">
        <label v-bind:for="item.label">{{index + 1}}、{{item.label}}</label>
        <div class="delete" @click.prevent="deleteItem(index)">X</div>
      </li>
    </transition-group>
    <!--</ul>-->
    <component-prompt v-if="items.length > 10" v-bind:msg="items" @prompt="deleteItem"></component-prompt>
  </div>
</template>

<script>
import Store from '../store'
import componentPrompt from './componentPrompt'

export default {
  name: 'todoList',
  data: function () {
    return {
      items: Store.fetch(),
      newItems: ''
    }
  },
  components: {componentPrompt},
  watch: {
    items: {
      handler: function (val, oldVal) {
        Store.save(val)
        // console.log(val,oldVal);
      },
      deep: true
    }
  },
  methods: {
    toggleFinish: function (item) {
      // console.log(item.label, item.isFinished)
      item.isFinished = !item.isFinished
    },
    addItem: function () {
      if (this.newItems !== '') {
        this.items.push({
          label: this.newItems, isFinished: false
        })
        this.newItems = ''
      }
    },
    deleteItem: function (index) {
      // console.log(index)
      this.items.splice(index, 1)
    }
  }
}
</script>
<style scoped>
  .Finished {
    text-decoration: line-through;
    color: #ffae22 !important;
  }

  li, ul {
    list-style: none;
  }

  .todoList .inputText {
    width: 400px;
    height: 30px;
    border: 1px solid #42b983;
    line-height: 30px;
    text-indent: 10px;
    font-size: 18px;
    color: #ff6815;
  }

  .todo-bnt {
    display: inline-block;
    width: 50px;
    height: 34px;
    margin-left: 10px;
    border: none;
    background: #4fb934;
    color: #fff;
    font-size: 18px;
  }

  .todo-ul {
    width: 400px;
    margin: 10px auto;
    text-align: left;
    padding: 0;
  }

  .todo-ul li {
    color: #ff6815;
    font-size: 18px;
    padding: 3px;
  }

  .delete {
    display: inline-block;
    float: right;
    color: #ff313e;
    cursor: pointer;
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

</style>
