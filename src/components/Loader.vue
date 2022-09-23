<script setup>
const props = defineProps({
  isShow: Boolean,
});
</script>
<template>
  <div class="loader">
    <transition>
      <div v-show="props.isShow" class="loader__blackout">
        <div class="loader__animation"></div>
      </div>
    </transition>

    <slot />
  </div>
</template>
