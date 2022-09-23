<!--suppress HtmlUnknownAttribute -->
<script setup>
import { computed } from 'vue';
import { useCabinetStore } from '@/stores/cabinet';

const cabinetStore = useCabinetStore();

const user = computed(() => {
  return cabinetStore.user;
});
</script>

<template>
  <div v-if="user" class="profile">
    <h4 class="profile__name">
      {{ user.name }}
    </h4>

    <div class="profile__info">
      <div class="profile__group">
        <h6 class="profile__group__title">Personal</h6>
        <div class="profile__item">Username: {{ user.username }}</div>
        <div class="profile__item">Email: {{ user.email }}</div>
        <div class="profile__item">Phone: {{ user.phone }}</div>
        <div class="profile__item">Website: {{ user.website }}</div>
      </div>

      <div class="profile__group">
        <h6 class="profile__group__title">Address</h6>
        <div class="profile__item">Street: {{ user.address.street }}</div>
        <div class="profile__item">Suite: {{ user.address.suite }}</div>
        <div class="profile__item">City: {{ user.address.city }}</div>
        <div class="profile__item">ZIP code: {{ user.address.zipcode }}</div>
        <div class="profile__item">GEO lat: {{ user.address.geo.lat }}</div>
        <div class="profile__item">GEO lng: {{ user.address.geo.lng }}</div>
      </div>

      <div class="profile__group">
        <h6 class="profile__group__title">Company</h6>
        <div class="profile__item">Name: {{ user.company.name }}</div>
        <div class="profile__item">
          Catch phrase: {{ user.company.catchPhrase }}
        </div>
        <div class="profile__item">bs: {{ user.company.bs }}</div>
      </div>
    </div>
  </div>
</template>
