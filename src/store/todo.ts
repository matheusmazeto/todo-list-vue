import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { nanoid } from 'nanoid'

interface Todo {
  id: string
  text: string
  isCompleted: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])

  const completedTodos = computed(() => todos.value.filter(todo => todo.isCompleted === true))
  const incompletedTodos = computed(() => todos.value.filter(todo => todo.isCompleted !== true))

  function addTodo({ text }: { text: string }) {
    todos.value = [
      ...todos.value,
      {
        id: nanoid(),
        isCompleted: false,
        text,
      },
    ]
  }

  function removeTodo({ id }: { id: string }) {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  function toggleTodo({ id }: { id: string }) {
    todos.value.forEach((todo) => {
      if (todo.id === id)
        todo.isCompleted = !todo.isCompleted
    })
  }

  function clearCompletedTodos() {
    todos.value = todos.value.filter(todo => todo.isCompleted === false)
  }

  return {
    todos, completedTodos, incompletedTodos, addTodo, removeTodo, toggleTodo, clearCompletedTodos,
  }
})
