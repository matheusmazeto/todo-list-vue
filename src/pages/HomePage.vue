<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '@/store/todo'

const todoStore = useTodoStore()

const inputValue = ref('')

function addTodo() {
  const text = inputValue.value
  inputValue.value = ''

  if (text.trim() !== '')
    todoStore.addTodo({ text })
}
</script>

<template>
  <div id="app">
    <h1>Todos</h1>

    <form @submit.prevent="addTodo">
      <label for="add">Add Todo</label>
      <input id="add" v-model="inputValue" type="text" name="add">
      <button type="submit">
        Add
      </button>
    </form>

    <ul v-for="todo in todoStore.todos" :key="todo.id">
      <li>
        <input :id="todo.id" :checked="todo.isCompleted" type="checkbox" name="isCompleted" @change="todoStore.toggleTodo({ id: todo.id })">
        <label :for="todo.id" :class="todo.isCompleted ? 'completed' : 'incompleted'">{{ todo.text }}</label>
      </li>
    </ul>
  </div>
</template>
