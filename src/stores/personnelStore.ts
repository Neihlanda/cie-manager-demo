import { defineStore } from 'pinia';
import { off } from 'process';
import { api } from 'src/boot/axios';
import { Personnel } from 'src/models/personnel';
import { PrerequisSecourisme } from 'src/models/prerequis';

export const usePersonnelsStore = defineStore('counter', {
  state: () => ({
    personnels: Array<Personnel>(),
  }),
  actions: {
    async loadPersonnels() {
      this.personnels = this.personnels || [];
      if (this.personnels.length === 0)
        return api.get('/fakedata.json').then((resp) => {
          console.log(resp.data);
          this.personnels = resp.data.users.map((a: any) => {
            const personnel = new Personnel({
              nid: (
                Math.floor(Math.random() * 100).toString() +
                Math.floor(Math.random() * 100).toString() +
                Math.floor(Math.random() * 100000).toString()
              ).padEnd(9, '0'),
              nom: a.firstName,
              prenom: a.lastName,
              sap: Math.floor(Math.random() * 1000000000).toString(),
              prerequisSecourisme: new PrerequisSecourisme(),
            });
            if (a.prerequisSecourisme) {
              personnel.prerequisSecourisme.psc1.dateInitial = new Date(
                a.prerequisSecourisme.psc1.dateInitial
              );
              personnel.prerequisSecourisme.psc1.dateRecyclage = new Date(
                a.prerequisSecourisme.psc1.dateRecyclage
              );
              personnel.prerequisSecourisme.sc1.dateInitial = new Date(
                a.prerequisSecourisme.sc1.dateInitial
              );
              personnel.prerequisSecourisme.sc1.dateRecyclage = new Date(
                a.prerequisSecourisme.sc1.dateRecyclage
              );
            }
            return personnel;
          });
        });
    },
  },
});
