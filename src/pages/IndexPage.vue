<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="my-card">
      <img src="10cie.png" />
      <q-separator />
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import EssentialLink from 'src/components/EssentialLink.vue';
import essentialLinks from 'src/models/menu_link';
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
