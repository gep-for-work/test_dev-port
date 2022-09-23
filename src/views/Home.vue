<script setup>
import { reactive, ref } from 'vue';
import { useCabinetStore } from '@/stores/cabinet';
import alphaValidation from '@/utils/validations/alpha';
import phoneValidation from '@/utils/validations/phone';
import { useRouter } from 'vue-router';

import Btn from '@/components/btn.vue';
import Form from '@/components/Form.vue';
import InputText from '@/components/inputs/Text.vue';

const cabinetStore = useCabinetStore();
const router = useRouter();
const form = reactive({
  username: '',
  phone: '',
});
const isShowLoader = ref(false);
const hasPhoneError = ref(false);
const hasUserNameError = ref(false);

async function onSubmit() {
  if (!form.username || !alphaValidation(form.username)) {
    hasUserNameError.value = true;
    return;
  }
  if (!phoneValidation(form.phone)) {
    hasPhoneError.value = true;
    return;
  }

  isShowLoader.value = true;

  await cabinetStore
    .login(form)
    .then((res) => {
      router.push({
        name: 'cabinet',
      });
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
  <main class="home">
    <Form :is-show-loader="isShowLoader" @submit.prevent="onSubmit">
      <template #title>description</template>

      <template #inputs>
        <InputText
          v-model="form.username"
          name="name"
          :placeholder="'Username'"
          label="description"
          @input="hasUserNameError = false"
        >
          <template v-if="hasUserNameError"> Only A-Z symbols </template>
        </InputText>

        <InputText
          v-model="form.phone"
          name="phone"
          :placeholder="'Phone Number'"
          @input="hasPhoneError = false"
        >
          <template v-if="hasPhoneError">
            Only allow symbols: 0-9, '-' and whitespaces
          </template>
        </InputText>
      </template>

      <template #actions>
        <Btn type="submit">Register</Btn>
      </template>
    </Form>
  </main>
</template>
