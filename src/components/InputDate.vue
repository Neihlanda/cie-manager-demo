<template>
  <q-input
    filled
    v-bind:model-value="modelValue"
    mask="DD/MM/YYYY"
    dense
    :label="label"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-bind:model-value="modelValue">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: string;
    label: string;
  }>(),
  {
    modelValue: '',
    label: '',
  }
);
</script>

<style scoped></style>
