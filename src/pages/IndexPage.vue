<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="my-card">
      <img src="10cie.png" />
      <q-separator />
      <q-list>
        <template v-for="link in essentialLinks" :key="link.title">
          <template v-if="link.link">
            <EssentialLink v-bind="link" />
          </template>
          <template v-if="link.sublink">
            <q-separator spaced />
            <q-item-label header>{{ link.title }}</q-item-label>
            <QItemSection>
              <template v-for="sublink in link.sublink" :key="sublink.title">
                <EssentialLink v-bind="sublink" />
              </template>
            </QItemSection>
            <q-separator spaced />
          </template>
        </template>
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
