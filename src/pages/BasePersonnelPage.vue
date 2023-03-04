<template>
  <div>
    <div class="row">
      <q-input
        v-model="filterText"
        type="text"
        label="Filtrer..."
        class="col-md-11 col-xs-12"
        dense
      />
      <q-btn
        color="positive"
        icon="save"
        @click="editMode = false"
        class="col-md-1 col-xs-12"
        dense
        v-if="editMode"
      />
      <q-btn
        color="primary"
        icon="edit"
        class="col-md col-xs-12"
        dense
        @click="editMode = !editMode"
        v-else
      />
    </div>
    <q-markup-table dense>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>NID</th>
          <th>SAP</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="">
          <td>
            <q-input
              v-model="personnelToCreate.nom"
              type="text"
              label="Nom"
              dense
              class="upper"
              :autofocus="true"
              :rules="[
                (val) =>
                  val?.length >= 3 ||
                  'Il faut renseigner au moins 3 caractères',
                (val) => !!val || '* Obligatoire',
              ]"
              lazy-rules
              @keyup.enter="addPersonnel"
            />
          </td>
          <td>
            <q-input
              v-model="personnelToCreate.prenom"
              type="text"
              label="Prenom"
              class="upper"
              dense
              :rules="[
                (val) =>
                  val?.length >= 3 ||
                  'Il faut renseigner au moins 3 caractères',
                (val) => !!val || '* Obligatoire',
              ]"
              lazy-rules
              @keyup.enter="addPersonnel"
            />
          </td>
          <td>
            <q-input
              v-model="personnelToCreate.nid"
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
              @keyup.enter="addPersonnel"
            />
          </td>
          <td>
            <q-input
              v-model="personnelToCreate.sap"
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
              @keyup.enter="addPersonnel"
            />
          </td>
          <td>
            <q-btn color="primary" icon="add" @click="addPersonnel" />
          </td>
        </tr>
        <template v-if="editMode">
          <tr v-for="personnel in personnelsFiltered" :key="personnel.nid">
            <td class="upper">
              <q-input v-model="personnel.nom" type="text" dense />
            </td>
            <td class="capitalize">
              <q-input v-model="personnel.prenom" type="text" dense />
            </td>
            <td><q-input v-model="personnel.nid" type="text" dense /></td>
            <td><q-input v-model="personnel.sap" type="text" dense /></td>
            <td>
              <q-btn
                color="negative"
                icon="delete"
                outline
                @click="removePersonnel(personnel)"
              />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="personnel in personnelsFiltered" :key="personnel.nid">
            <td class="upper">{{ personnel.nom }}</td>
            <td class="capitalize">{{ personnel.prenom }}</td>
            <td>{{ personnel.nid }}</td>
            <td>{{ personnel.sap }}</td>
            <td>
              <q-btn
                color="negative"
                icon="delete"
                outline
                @click="removePersonnel(personnel)"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { basePersonnel } from 'src/models/basePersonnel';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const filterText = ref('');
const personnels = ref<basePersonnel[]>([]);
const personnelToCreate = ref(new basePersonnel({}));
const editMode = ref(false);

const personnelsFiltered = computed<basePersonnel[]>(() => {
  const filterValue = filterText.value;
  if (filterValue === '') return personnels.value;

  return personnels.value.filter(
    (a) => a.fullName.includes(filterValue) || a.sap.includes(filterValue)
  );
});

//TODO :
//Formulaire de saisie pour l'ajout
//La suppression

function addPersonnel() {
  personnels.value.push(
    new basePersonnel(JSON.parse(JSON.stringify(personnelToCreate.value)))
  );
  personnelToCreate.value = new basePersonnel({});
}

function removePersonnel(personnelToRemove: basePersonnel) {
  $q.dialog({
    cancel: true,
    persistent: true,
    title: 'Confirmer la suppression du personnel',
    message: `Confirmer vous la suppression de ce personnel ${personnelToRemove.fullName} ? Cette action est irrèversible et supprimera toutes les données lui étant associèes.`,
  }).onOk(() => {
    console.log(personnelToRemove);
    personnels.value.splice(personnels.value.indexOf(personnelToRemove));
    $q.notify({
      message: 'Personnel supprimée.',
      position: 'bottom-right',
      color: 'positive',
    });
  });
}
</script>

<style scoped></style>
