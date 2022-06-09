"use strict";

var likeComponent = Vue.extend({
  props: {
    message: {
      type: String,
      default: 'very good',
    }
  },
  template: '<button @click="countUp">{{ message }} {{ count }}</button>',
  watch: {
    count: {
      handler: function(){
        localStorage.setItem('count',JSON.stringify(this.count));
      },
    }
  },
  mounted: function(){
    this.count = JSON.parse(localStorage.getItem("count")) || 0;
  },
  data: function(){
    return{
      count: 0
    }
  },
  methods: {
    countUp: function(){
      this.count++,
      this.$emit('increment')
    }
  }
  
})

const vm = new Vue({
  el: "#app",
  data: {
    names: [],
  },
  watch: {
    names: {
      handler: function () {
        localStorage.setItem("names", JSON.stringify(this.names));
      },
      deep: "true",
    },
  },
  mounted: function () {
    this.names = JSON.parse(localStorage.getItem("names")) || [];
  },
  methods: {
    addItem: function () {
      var item = {
        title: this.newName,
        isDone: false,
      }
      this.names.push(item)
      this.newName= '';
    },
    deleteItem: function (index) {
      if (confirm("本当に消去しますか?")) {
        this.names.splice(index, 1);
      }
    },
    allDelete: function(index) {
      if(!confirm('本当に消去しますか？')){
        return;
      }
        this.names  = this.listfalse ;
    },
  },
  computed: {
    listfalse: function(){
      return this.names.filter(function (name) {
        return !name.isDone;
      });
    },
  },
});

const app = new Vue ({
  el: '#app2',
  components:{
    'like-component':likeComponent
  },
  data: {
    total:0
  },
  watch: {
    total: {
      handler: function(){
        localStorage.setItem('total',JSON.parse(this.total));
      },
      deep:true
    }
  },
  mounted: function(){
    this.total = JSON.parse(localStorage.getItem('total')) || 0;
  },
  methods: {
    conect: function(){
      this.total++;
    }
  }

  
});