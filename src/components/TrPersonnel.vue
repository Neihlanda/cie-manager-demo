<template>
  <tr>
    <template v-if="editMode">
      <td>
        <q-input
          v-model="model.nom"
          type="text"
          label="Nom"
          dense
          class="text-uppercase"
          :autofocus="true"
          :rules="[
            (val) =>
              val?.length >= 3 || 'Il faut renseigner au moins 3 caractères',
            (val) => !!val || '* Obligatoire',
          ]"
          lazy-rules
          @keyup.enter="inputOnKeyUpEnterFn"
        />
      </td>
      <td>
        <q-input
          v-model="model.prenom"
          type="text"
          label="Prenom"
          class="text-uppercase"
          dense
          :rules="[
            (val) =>
              val?.length >= 3 || 'Il faut renseigner au moins 3 caractères',
            (val) => !!val || '* Obligatoire',
          ]"
          lazy-rules
          @keyup.enter="inputOnKeyUpEnterFn"
        />
      </td>
      <td>
        <q-input
          v-model="model.nid"
          type="text"
          label="NID"
          dense
          mask="##.##.#####"
          :rules="[
            (val) =>
              val?.length == 11 || //car le masque ajoute les '.'
              'Le NID n`est pas valide, il doit être composé de 9 chiffres.',
            (val) => !!val || '* Obligatoire',
          ]"
          lazy-rules
          @keyup.enter="inputOnKeyUpEnterFn"
        />
      </td>
      <td>
        <q-input
          v-model="model.sap"
          type="text"
          label="SAP"
          dense
          mask="########"
          :rules="[
            (val) =>
              val?.length == 8 ||
              'Le SAP n`est pas valide, il doit être composé de 8 chiffres.',
            (val) => !!val || '* Obligatoire',
          ]"
          lazy-rules
          @keyup.enter="inputOnKeyUpEnterFn"
        />
      </td>
    </template>
    <template v-else>
      <td class="upper">{{ personnel.nom }}</td>
      <td class="capitalize">{{ personnel.prenom }}</td>
      <td>{{ personnel.nid }}</td>
      <td>{{ personnel.sap }}</td>
    </template>
    <td>
      <q-btn
        v-for="(action, index) in actionsConfig"
        :key="index"
        :icon="action.icon"
        :color="action.color"
        @click="action.onClick"
      >
        <q-tooltip>{{ action.tooltip }}</q-tooltip>
      </q-btn>
    </td>
  </tr>
</template>

<script setup lang="ts">
//TODO : Ajouter les inputs pour les données manquantes
//TODO : Méthode de validation
import { Personnel } from 'src/models/personnel';
import { computed } from 'vue';

interface Props {
  personnel: Personnel;
  editMode: boolean;
  inputOnKeyUpEnterFn: () => void | undefined;
  actionsConfig:
    | Array<{
        icon: string;
        tooltip: string;
        color: string;
        onClick: () => void;
      }>
    | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  editMode: () => false,
  inputOnKeyUpEnterFn: () => {
    return;
  },
  actionsConfig: () => [],
});

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
