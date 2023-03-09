<template>
  <div>
    <q-select
      filled
      v-model="moduleToDisplay"
      multiple
      :options="displayModulesOptions"
      use-chips
      stack-label
      dense
      label="Consulter "
    />
    <v-grid
      theme="compact"
      style="height: 90vh"
      :source="personnels"
      :columns="columns"
    />
  </div>
</template>

<script setup lang="ts">
//TODO faire un tableau, afficher GRADE NOM PRENOM NID, puis faire un groupe de colonne par type
//-> ITSC ()
//Permettre de filtrer sur les valeurs disponibles dans les colonnes

//TODO Faire une selection multiple, lorsque plusieurs rows selectionnéer, ajouter un boutton pour "Action mutliple"
//Faire un récap des personnels selectionnées, puis séléctionner une colonne de prérequis
//faire la saisie d'une valeur -> btn mettre à jour
import VGrid from '@revolist/vue3-datagrid';
import { ref, computed, onMounted } from 'vue';
import { Personnel } from 'src/models/personnel';
import { useQuasar } from 'quasar';
import { usePersonnelsStore } from 'stores/personnelStore';
import { objectPath } from 'object-path';

const displayModulesOptions = ['Secourisme', 'IEC', 'TIOR', 'ISTC'];
const moduleToDisplay = ref<string[]>(displayModulesOptions);
const personnels = ref<Personnel[]>([]);
const personnelsSelected = ref<Personnel[]>([]);
const store = usePersonnelsStore();

const showIEC = computed(() => moduleToDisplay.value.includes('IEC'));
const showSecoursime = computed(() =>
  moduleToDisplay.value.includes('Secourisme')
);
const showTIOR = computed(() => moduleToDisplay.value.includes('TIOR'));
const showITSC = computed(() => moduleToDisplay.value.includes('ISTC'));

function getValue(propertyPath, obj) => objectPath.get(obj, propertyPath, null);

//TODO reussir à choper la value du subproperty
//ou flattener l'objet
const columns = computed(() => {
  const cellTemplate: unknown = (createElement, props) => {
    return createElement(
      'span',
      {
        style: {
          color: 'red',
        },
      },
      getValue(props.prop, props.model)
    );
  };

  const columnsToShow = [
    {
      prop: 'grade',
      name: 'Grade',
      pin: 'colPinStart',
    },
    {
      prop: 'nom',
      name: 'Nom',
      pin: 'colPinStart',
      cellTemplate,
    },
    { prop: 'prenom', name: 'Prenom', pin: 'colPinStart' },
    { prop: 'nid', name: 'NID', pin: 'colPinStart' },
  ];

  if (showSecoursime.value) {
    columnsToShow.push(
      {
        prop: 'prerequisSecourisme.psc1.dateInitial',
        name: 'Initial PSC1',
      },
      {
        prop: 'prerequisSecourisme.psc1.dateRecyclage',
        name: 'Recyclage PSC1',
      },
      {
        prop: 'prerequisSecourisme.sc1.dateInitial',
        name: 'Initial SC1',
      },
      {
        prop: 'prerequisSecourisme.sc1.dateRecyclage',
        name: 'Recyclage SC1',
      }
    );
  }
  if (showIEC.value) {
    columnsToShow.push(
      {
        prop: 'prerequisIec.permisB',
        name: 'Permis B',
        pin: undefined,
      },
      {
        prop: 'prerequisIec.permisBValidBMC',
        name: 'Validé BMC',
      },
      {
        prop: 'prerequisIec.permisA',
        name: 'Permis A',
      },
      {
        prop: 'prerequisIec.permisABValidBMC',
        name: 'Validé BMC',
      },
      {
        prop: 'prerequisIec.permisPL',
        name: 'Permis PL',
      },
      {
        prop: 'prerequisIec.permisPLValidBMC',
        name: 'Validé BMC',
      },
      {
        prop: 'prerequisIec.permisSPL',
        name: 'Permis SPL',
      },
      {
        prop: 'prerequisIec.permisSPLValidBMC',
        name: 'Validé BMC',
      }
    );
  }
  if (showTIOR.value) {
    columnsToShow.push(
      {
        prop: 'prerequisTior.fte',
        name: 'FTE',
        pin: undefined,
      },
      {
        prop: 'prerequisTior.tsa1',
        name: 'TSA 1',
      },
      {
        prop: 'prerequisTior.tsa2',
        name: 'TSA 2',
      },
      {
        prop: 'prerequisTior.tsa3',
        name: 'TSA 3',
      },
      {
        prop: 'prerequisTior.tsa4',
        name: 'TSA 4',
      },
      {
        prop: 'prerequisTior.tsa5',
        name: 'TSA 5',
      },
      {
        prop: 'prerequisTior.tsa6',
        name: 'TSA 6',
      },
      {
        prop: 'prerequisTior.stic1',
        name: 'STIC 1',
      },
      {
        prop: 'prerequisTior.stic2',
        name: 'STIC 2',
      },
      {
        prop: 'prerequisTior.stic3',
        name: 'STIC 3',
      },
      {
        prop: 'prerequisTior.tos1',
        name: 'TOS 1',
      },
      {
        prop: 'prerequisTior.tos2',
        name: 'TOS 2',
      },
      {
        prop: 'prerequisTior.tos3',
        name: 'TOS 3',
      }
    );
  }
  return columnsToShow;
});

onMounted(() => {
  store.loadPersonnels().then(() => (personnels.value = store.personnels));
});
</script>

<style scoped></style>
