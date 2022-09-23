<script setup>
import Loader from '@/components/Loader.vue';

defineProps({
  isShowLoader: {
    type: Boolean,
  },
});
</script>

<template>
  <div class="form">
    <Loader :is-show="isShowLoader">
      <div v-if="$slots.title" class="form__title">
        <slot name="title" />
      </div>

      <form class="form__inputs" @submit.prevent="onSubmit">
        <slot name="inputs" />

        <div v-if="$slots.actions" class="form__actions">
          <slot name="actions" />
        </div>
      </form>
    </Loader>
  </div>
</template>
