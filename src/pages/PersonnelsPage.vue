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
      >
        <q-tooltip> Enregistrer les modifications </q-tooltip>
      </q-btn>
      <q-btn
        color="primary"
        icon="edit"
        class="col-md col-xs-12"
        dense
        @click="editMode = !editMode"
        v-else
      >
        <q-tooltip> Modifier les lignes </q-tooltip>
      </q-btn>
    </div>
    {{ personnelsFiltered.length }} personnel(s) affiché(s)
    <q-separator spaced inset vertical dark />
    <q-virtual-scroll
      type="table"
      dense
      style="max-height: 80vh"
      :items="personnelsFiltered"
    >
      <template #before>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>NID</th>
            <th>SAP</th>
            <th></th>
          </tr>
        </thead>
        <TrPersonnel
          v-bind:personnel="personnelToCreate"
          edit-mode
          :input-on-key-up-enter-fn="addPersonnel"
          :actions-config="[
            {
              icon: 'add',
              tooltip: 'Ajouter le personnel dans la base',
              color: 'primary',
              onClick: () => addPersonnel,
            },
          ]"
        />
      </template>

      <template v-slot="{ item }">
        <TrPersonnel
          :key="item.nid"
          v-bind:personnel="item"
          :edit-mode="editMode"
          :input-on-key-up-enter-fn="addPersonnel"
          :actions-config="[
            {
              icon: 'delete',
              tooltip: 'Supprimer le personnel',
              color: 'negative',
              onClick: () => removePersonnel(item),
            },
          ]"
        />
      </template>
    </q-virtual-scroll>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Personnel } from 'src/models/personnel';
import TrPersonnel from 'components/TrPersonnel.vue';
import { useQuasar } from 'quasar';
import { usePersonnelsStore } from 'stores/personnelStore';

const $q = useQuasar();
const filterText = ref('');
const personnels = ref<Personnel[]>([]);
const personnelToCreate = ref(new Personnel({}));
const editMode = ref(false);
const store = usePersonnelsStore();

onMounted(() => {
  store.loadPersonnels().then(() => (personnels.value = store.personnels));
});

const personnelsFiltered = computed<Personnel[]>(() => {
  const filterValue = filterText.value;
  if (filterValue === '') return personnels.value;

  return personnels.value.filter(
    (a) => a.fullName.includes(filterValue) || a.sap.includes(filterValue)
  );
});

function addPersonnel() {
  personnels.value.push(
    new Personnel(JSON.parse(JSON.stringify(personnelToCreate.value)))
  );
  personnelToCreate.value = new Personnel({});
}

function removePersonnel(personnelToRemove: Personnel) {
  $q.dialog({
    cancel: true,
    persistent: true,
    title: 'Confirmer la suppression du personnel',
    message: `Confirmer vous la suppression de ce personnel ${personnelToRemove.fullName} ? Cette action est irrèversible et supprimera toutes les données lui étant associèes.`,
  }).onOk(() => {
    console.log(personnelToRemove);
    personnels.value.splice(personnels.value.indexOf(personnelToRemove), 1);
    $q.notify({
      message: 'Personnel supprimée.',
      position: 'bottom-right',
      color: 'positive',
    });
  });
}
</script>

<style scoped></style>
