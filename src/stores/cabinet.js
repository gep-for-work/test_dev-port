import { defineStore } from 'pinia';

import $http from '@/utils/http';

export const useCabinetStore = defineStore('cabinet', {
  state: () => {
    return {
      user: null,
      usersList: [],
      todoList: [],
      favoritesTodoList: [],
    };
  },
  actions: {
    async login(form) {
      if (!form.username) {
        Promise.reject('Missing required field "username"!');
        return;
      }
      if (!form.phone) {
        Promise.reject('Missing required field "phone"!');
        return;
      }

      $http
        .get('/users')
        .then(async (res) => {
          const user = res.find((item) => {
            return item.username === form.username && item.phone === form.phone;
          });

          if (user) {
            this.user = user;
            this.usersList = res;

            await this.loadTodoList();

            Promise.resolve(user);
            return;
          }

          Promise.reject('User not found or invalid "username" or "phone"!');
        })
        .catch((error) => {
          console.log(error);
          Promise.reject('API error, try later!');
        });
    },
    async loadTodoList() {
      $http
        .get('/todos')
        .then((res) => {
          this.todoList = res;
          Promise.resolve(res);
        })
        .catch((error) => {
          console.log(error);
          Promise.reject('API error, try later!');
        });
    },
    async createTodo(form) {
      if (!form.userId) {
        Promise.reject('Missing required field "userId"!');
        return;
      }
      if (!form.title) {
        Promise.reject('Missing required field "title"!');
        return;
      }

      $http
        .post('/todos', form)
        .then(async (res) => {
          this.todoList.push(res);
          Promise.resolve(res);
        })
        .catch((error) => {
          console.log(error);
          Promise.reject('API error, try later!');
        });
    },
  },
});
