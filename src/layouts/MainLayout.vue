<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <img style="height: 5vh" src="10cie.png" />
        <q-toolbar-title>1Oe Compagnie manager</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      persistent
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="250"
      :breakpoint="500"
      bordered
      side="left"
    >
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
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import essentialLinks from 'src/models/menu_link';
import EssentialLink from 'src/components/EssentialLink.vue';

const leftDrawerOpen = ref(false);
const miniState = ref(true);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
