<template>
  <tr>
    <!--<template v-if="editMode">
      <td>
        <q-input
          v-model="model.nom"
          type="text"
          label="Nom"
          dense
          class="text-uppercase"
          bottom-slots
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

      <td>
        <InputDate v-model="model.dateFinVMP" />
      </td>

      <td>
        <InputDate v-model="model.dateFinContrat" />
      </td>
      <td>
        <InputDate v-model="model.dateRecyclageLegad" />
      </td>

      <td><q-checkbox v-model="model.ppaValid" hint="PPA Valide" /></td>
      <td>
        <q-select
          v-model="model.habilitation"
          :options="HabilitationOptions"
          filled
          dense
        />
      </td>
      <td>
        <InputDate v-model="model.finHabilitation" />
      </td>
    </template>
-->
    <template> </template>
    <td class="upper">{{ model.nom }}</td>
    <td class="capitalize">{{ model.prenom }}</td>
    <td>{{ model.nid }}</td>
    <td>{{ model.sap }}</td>
    <td>{{ model.dateFinVMP }}</td>
    <td>{{ model.dateRecyclageLegad }}</td>
    <td>{{ model.dateFinContrat }}</td>
    <td><q-checkbox v-model="model.ppaValid" disable /></td>
    <td>{{ model.habilitation }}</td>
    <td>{{ model.finHabilitation }}</td>
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
import { HabilitationOptions } from 'src/models/habilitation';
import { computed } from 'vue';
import InputDate from './inputDate.vue';

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
