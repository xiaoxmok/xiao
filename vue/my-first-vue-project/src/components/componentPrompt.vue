<template>
  <div class="prompt">
    <p>温馨提示：您的list已经超过 <strong>{{msg.length}}</strong> 条了</p>
    <p>是否需要删除最后一条，或者第 <input type="text" v-model="inputVal" class="inputV">条 </p>
    <button v-on:click="deleteLast" class="yes">是</button>
  </div>
</template>

<script>
export default {
// 父级向子组件传消息
  data: function () {
    return {
      inputVal: this.msg.length
    }
  },
  props: ['msg'],
  methods: {
    deleteLast: function () {
      // console.log(this.msg.length-1);
      // 子组件向父组件传消息
      this.$emit('prompt', this.inputVal - 1)
    }
  },
  watch: {
    msg: function () {
      this.inputVal = this.msg.length
    },
    inputVal: function (val) {
      this.inputVal = Number(val.toString().replace(/[^0-9]/g, ''))
      // console.log(this.inputVal,typeof this.inputVal);
      if (this.inputVal > this.msg.length) {
        this.inputVal = this.msg.length
      }
    }
  },
  /* computed:{
    inputVal:function(){
      return this.msg.length
      }
    }, */
  filters: {
    valFilter: function () {

    }
  }
}
</script>
<style scoped>
  .prompt {
    color: #ff9b26;
  }

  .prompt strong {
    color: #ff6815
  }

  .yes {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: none;
    background: #ff706d;
    color: #fff;
    font-size: 18px;
  }

  .inputV {
    width: 20px;
  }
</style>
