<template>
  <q-dialog>
    <q-card class="q-px-sm q-pb-md">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ title }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section> </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-xs">
          <q-input
            v-model="model.nom"
            type="text"
            label="Nom"
            dense
            class="text-uppercase col-6"
            bottom-slots
            :autofocus="true"
            :rules="[
              (val) =>
                val?.length >= 3 || 'Il faut renseigner au moins 3 caractères',
              (val) => !!val || '* Obligatoire',
            ]"
            lazy-rules
          />

          <q-input
            v-model="model.prenom"
            type="text"
            label="Prenom"
            class="text-uppercase col-6"
            dense
            :rules="[
              (val) =>
                val?.length >= 3 || 'Il faut renseigner au moins 3 caractères',
              (val) => !!val || '* Obligatoire',
            ]"
            lazy-rules
          />
          <q-input
            v-model="model.nid"
            type="text"
            label="NID"
            dense
            class="col-6"
            mask="##.##.#####"
            :rules="[
              (val) =>
                val?.length == 11 || //car le masque ajoute les '.'
                'Le NID n`est pas valide, il doit être composé de 9 chiffres.',
              (val) => !!val || '* Obligatoire',
            ]"
            lazy-rules
          />
          <q-input
            v-model="model.sap"
            type="text"
            label="SAP"
            dense
            class="col-6"
            mask="########"
            :rules="[
              (val) =>
                val?.length == 8 ||
                'Le SAP n`est pas valide, il doit être composé de 8 chiffres.',
              (val) => !!val || '* Obligatoire',
            ]"
            lazy-rules
          />

          <InputDate
            v-model="model.dateFinVMP"
            class="col-6"
            label="Date fin VMP"
          />

          <InputDate
            v-model="model.dateFinContrat"
            class="col-6"
            label="Date fin contrat"
          />
          <InputDate
            v-model="model.dateRecyclageLegad"
            class="col-6"
            label="Date recyclage LEGAD"
          />

          <q-checkbox
            v-model="model.ppaValid"
            hint="PPA Valide"
            class="col-6"
            label="PPA Valide"
            left-label
          />

          <q-select
            v-model="model.habilitation"
            :options="HabilitationOptions"
            filled
            dense
            class="col-6"
            label="Habilitation"
          />

          <InputDate
            v-model="model.finHabilitation"
            class="col-6"
            label="Fin d'habilitation"
          />
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat label="Annuler" />
        <q-btn flat label="Valider" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
//TODO Emit le valid
import { Personnel } from 'src/models/personnel';
import { HabilitationOptions } from 'src/models/habilitation';
import { computed } from 'vue';
import InputDate from './InputDate.vue';

interface Props {
  personnel: Personnel;
  title: string;
}

const props = withDefaults(defineProps<Props>(), {});

const model = computed({
  get() {
    return props.personnel;
  },
  set(newValue: Personnel) {
    return;
  },
});
</script>
<style scoped></style>
