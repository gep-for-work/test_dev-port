<script setup>
import { onBeforeMount } from 'vue';
import { useCabinetStore } from '@/stores/cabinet';
import { storageRead, storageWrite } from '@/utils/storage';

const _storageKey = 'todoList';
const cabinetStore = useCabinetStore();

const props = defineProps({
  list: Array,
});

function onClickFavoriteBtn(todoID) {
  const includeFavoriteIndex = cabinetStore.favoritesTodoList.indexOf(todoID);

  if (includeFavoriteIndex < 0) {
    const todoListWithNewNewItem = cabinetStore.favoritesTodoList.concat([
      todoID,
    ]);

    cabinetStore.favoritesTodoList = todoListWithNewNewItem;
    storageWrite(_storageKey, todoListWithNewNewItem);
  } else {
    const copyFavoritesTodoList = cabinetStore.favoritesTodoList.slice(0);

    copyFavoritesTodoList.splice(includeFavoriteIndex, 1);

    cabinetStore.favoritesTodoList = copyFavoritesTodoList;
    storageWrite(_storageKey, copyFavoritesTodoList);
  }
}

onBeforeMount(() => {
  const savedFavoriteTodoList = storageRead(_storageKey);
  if (savedFavoriteTodoList) {
    cabinetStore.favoritesTodoList = savedFavoriteTodoList;
  }
});
</script>

<template>
  <TransitionGroup tag="ul" class="todo-list">
    <li
      v-for="item in props.list"
      :key="item.id"
      class="todo-list__item"
      :class="{
        'todo-list__item--favorite': cabinetStore.favoritesTodoList.includes(
          item.id
        ),
        'todo-list__item--completed': item.completed,
      }"
    >
      <div v-if="item.hasOwnProperty('title')" class="todo-list__field">
        <i>Title: </i>
        {{ item.title }}
      </div>
      <div v-if="item.hasOwnProperty('completed')" class="todo-list__field">
        <i>Status: </i>
        {{ item.completed ? 'completed' : 'uncompleted' }}
      </div>
      <div class="todo-list__field">
        <i>User ID: </i>
        {{ item.userId }}
      </div>
      <div class="todo-list__field">
        <i>Todo ID: </i>
        {{ item.id }}
      </div>

      <button
        class="todo-list__favorite-btn"
        type="button"
        @click="onClickFavoriteBtn(item.id)"
      >
        ★
      </button>
    </li>
  </TransitionGroup>
</template>
