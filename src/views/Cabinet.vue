<script setup>
import { reactive, computed, ref } from 'vue';

import { useCabinetStore } from '@/stores/cabinet';
import TODO_STATUSES from '@/constants/todoStatuses';

import Btn from '@/components/Btn.vue';
import Form from '@/components/Form.vue';
import Profile from '@/components/cabinet/Profile.vue';
import TodoList from '@/components/cabinet/TodoList.vue';
import InputText from '@/components/inputs/Text.vue';

const cabinetStore = useCabinetStore();

const selectedFilters = reactive({
  status: TODO_STATUSES.default,
  userID: '',
  search: '',
});
const filteredTodoList = computed(() => {
  let result = cabinetStore.todoList.slice(0);

  if (selectedFilters.status) {
    result = result.filter((item) => {
      switch (selectedFilters.status) {
        case TODO_STATUSES.completed: {
          return item.completed;
        }
        case TODO_STATUSES.uncompleted: {
          return !item.completed;
        }
        case TODO_STATUSES.favorites: {
          return cabinetStore.favoritesTodoList.includes(item.id);
        }
      }
    });
  }

  if (selectedFilters.userID) {
    result = result.filter((item) => {
      return item.userId === selectedFilters.userID;
    });
  }

  if (selectedFilters.search) {
    result = result.filter((item) => {
      return ~item.title.indexOf(selectedFilters.search);
    });
  }

  return result;
});

const form = reactive({
  userId: '',
  title: '',
});
const isShowLoader = ref(false);
const hasUserIdError = ref(false);
const hasFormTitleError = ref(false);

async function onSubmit() {
  if (!+form.userId || +form.userId < 0) {
    hasUserIdError.value = true;
    return;
  }
  if (!form.title) {
    hasFormTitleError.value = true;
    return;
  }

  isShowLoader.value = true;

  await cabinetStore
    .createTodo(form)
    .then((res) => {
      alert('Todo created!');
    })
    .catch((error) => {
      alert(error);
    });

  setTimeout(() => {
    isShowLoader.value = false;
  }, 500);
}
</script>

<template>
  <main class="cabinet">
    <Profile />

    <Form :is-show-loader="isShowLoader" @submit.prevent="onSubmit">
      <template #title>Create todo</template>

      <template #inputs>
        <InputText
          v-model="form.userId"
          type="number"
          name="userId"
          :placeholder="'User ID'"
          @input="hasUserIdError = false"
        >
          <template v-if="hasUserIdError"
            >Required field, only numbers</template
          >
        </InputText>

        <InputText
          v-model="form.title"
          name="title"
          :placeholder="'Todo title'"
          @input="hasFormTitleError = false"
        >
          <template v-if="hasFormTitleError">Required field</template>
        </InputText>
      </template>

      <template #actions>
        <Btn type="submit">Create</Btn>
      </template>
    </Form>

    <div class="cabinet__filters">
      <div class="form-item cabinet__filters__item">
        <select
          v-model="selectedFilters.status"
          class="form-input"
          name="filter-todo-statuses"
        >
          <option :value="TODO_STATUSES.default">All</option>
          <option
            v-for="(todo, index) in TODO_STATUSES"
            :key="index"
            :value="todo"
          >
            {{ todo }}
          </option>
        </select>
      </div>

      <div class="form-item cabinet__filters__item">
        <select
          v-model="selectedFilters.userID"
          class="form-input"
          name="filter-user-id"
        >
          <option value="">All Users</option>
          <option
            v-for="user in cabinetStore.usersList"
            :key="user.id"
            :value="user.id"
          >
            {{ `${user.name} (id ${user.id})` }}
          </option>
        </select>
      </div>

      <div class="cabinet__filters__item">
        <InputText
          v-model="selectedFilters.search"
          name="filter-search-by-title"
          :placeholder="`Search by todo 'title'`"
        />
      </div>
    </div>

    <TodoList :list="filteredTodoList" />
  </main>
</template>
