<template>
  <div class="q-pa-md">
    <q-table
      title="Suivis secourisme"
      :rows="personnels"
      :columns="columns"
      class="my-sticky-header-table"
      row-key="nid"
      selection="multiple"
      dense
      separator="cell"
      :pagination="{ rowsPerPage: 0 }"
      v-model:selected="personnelsSelected"
    />
    <div class="row">
      <q-input
        class="col-2"
        v-model="intialPsc1"
        type="date"
        hint="Intial PSC1"
      />
      <q-input
        class="col-2"
        v-model="recyclagePsc1"
        type="date"
        hint="Recyclage PSC1"
      />
      <q-input
        class="col-2"
        v-model="intialSc1"
        type="date"
        hint="Initial PSC1"
      />
      <q-input
        class="col-2"
        v-model="recyclageSc1"
        type="date"
        hint="Recyclage SC1"
      />

      <q-btn
        class="col-2"
        color="primary"
        icon="save"
        label="Appliquer les valeurs à la selection"
        dense
        :onClick="SetDateToSelectedPersonnels"
        :loading="isUpdating"
      >
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
          Loading...
        </template>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
//TODO faire un tableau, afficher GRADE NOM PRENOM NID, puis faire un groupe de colonne par type
//-> ITSC ()
//Permettre de filtrer sur les valeurs disponibles dans les colonnes

//TODO Faire une selection multiple, lorsque plusieurs rows selectionnéer, ajouter un boutton pour "Action mutliple"
//Faire un récap des personnels selectionnées, puis séléctionner une colonne de prérequis
//faire la saisie d'une valeur -> btn mettre à jour
import { ref, onMounted, watch } from 'vue';
import { Personnel } from 'src/models/personnel';
import { usePersonnelsStore } from 'stores/personnelStore';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const personnels = ref<Personnel[]>([]);
const personnelsSelected = ref<Personnel[]>([]);
const store = usePersonnelsStore();
const isUpdating = ref(false);

//TODO : Rendre la row selectable -> Onclick
//Faire une définition de colone commune (grade / nom / prénom /nid) -> voir faire un composant réutilisable et injecter seulement les colonnes spécifiques

const columns = [
  {
    name: 'grade',
    label: 'Grade',
    field: (row: Personnel) => row.grade,
    sortable: true,
    headerStyle: 'width: 50px',
    align: 'center',
  },
  {
    name: 'nom',
    label: 'Nom',
    field: (row: Personnel) => row.nom,
    sortable: true,
    align: 'left',
  },
  {
    name: 'prenom',
    label: 'Prénom',
    field: (row: Personnel) => row.prenom,
    sortable: true,
    align: 'left',
  },
  {
    name: 'nid',
    label: 'NID',
    field: (row: Personnel) => row.nid,
    sortable: true,
    align: 'left',
  },
  {
    name: 'psc1Init',
    label: 'PSC1 Initial',
    field: (row: Personnel) =>
      row.prerequisSecourisme?.psc1?.dateInitial?.toLocaleDateString(),
    sortable: true,
    align: 'left',
  },
  {
    name: 'psc1Recyclage',
    label: 'Recyclage',
    field: (row: Personnel) =>
      row.prerequisSecourisme?.psc1?.dateRecyclage?.toLocaleDateString(),
    sortable: true,
    align: 'left',
  },
  {
    name: 'sc1Init',
    label: 'SC1 Initial',
    field: (row: Personnel) =>
      row.prerequisSecourisme?.sc1?.dateInitial?.toLocaleDateString(),
    sortable: true,
    align: 'left',
  },
  {
    name: 'sc1Recyclage',
    label: 'Recyclage',
    field: (row: Personnel) =>
      row.prerequisSecourisme?.sc1?.dateRecyclage?.toLocaleDateString(),
    sortable: true,
    align: 'left',
  },
];

const intialSc1 = ref<string>('');
const recyclageSc1 = ref<string>('');
const intialPsc1 = ref<string>('');
const recyclagePsc1 = ref<string>('');
onMounted(() => {
  store.loadPersonnels().then(() => (personnels.value = store.personnels));
});

watch(personnelsSelected, (newValues) => {
  if (
    newValues.length === 1 &&
    personnelsSelected.value[0].prerequisSecourisme.psc1?.dateInitial
  ) {
    intialSc1.value = dateToYYYYMMDD(
      personnelsSelected.value[0].prerequisSecourisme.sc1.dateInitial
    );
    recyclageSc1.value = dateToYYYYMMDD(
      personnelsSelected.value[0].prerequisSecourisme.sc1.dateRecyclage
    );
    intialPsc1.value = dateToYYYYMMDD(
      personnelsSelected.value[0].prerequisSecourisme.psc1.dateInitial
    );
    recyclagePsc1.value = dateToYYYYMMDD(
      personnelsSelected.value[0].prerequisSecourisme.psc1.dateRecyclage
    );
  }
});

function dateToYYYYMMDD(d) {
  if (!d || d == 'Invalid Date') return '';
  return (
    d &&
    new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000)
      .toISOString()
      .split('T')[0]
  );
}

function SetDateToSelectedPersonnels() {
  try {
    isUpdating.value = true;
    const personnels = personnelsSelected.value;
    console.log(intialPsc1.value);
    personnels.forEach((pax) => {
      pax.prerequisSecourisme.sc1.dateInitial =
        intialSc1.value?.length === 0 ? undefined : new Date(intialSc1.value);
      pax.prerequisSecourisme.sc1.dateRecyclage =
        recyclageSc1.value?.length === 0
          ? undefined
          : new Date(recyclageSc1.value);
      pax.prerequisSecourisme.psc1.dateInitial =
        intialPsc1.value?.length === 0 ? undefined : new Date(intialPsc1.value);
      pax.prerequisSecourisme.psc1.dateRecyclage =
        recyclagePsc1.value?.length === 0
          ? undefined
          : new Date(recyclagePsc1.value);
    });
    $q.notify({
      message: `La sélection a été mis à jour (${personnels.length} élément(s))`,
      position: 'bottom-right',
      color: 'positive',
    });
  } catch (error) {
  } finally {
    isUpdating.value = false;
  }
}
</script>

<style lang="scss">
.my-sticky-header-table {
  /* height or max-height is important */
  height: 85vh;

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: #ffffff;
  }
  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th {
    top: 0;
  }
  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
  }
}
</style>
