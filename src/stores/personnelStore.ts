import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { Personnel } from 'src/models/personnel';

export const usePersonnelsStore = defineStore('counter', {
  state: () => ({
    personnels: Array<Personnel>(),
  }),
  actions: {
    async loadPersonnels() {
      this.personnels = this.personnels || [];

      return api.get('/fakedata.json').then((resp) => {
        console.log(resp.data);
        this.personnels = resp.data.users.map(
          (a: any) =>
            new Personnel({
              nid: (
                Math.floor(Math.random() * 100).toString() +
                Math.floor(Math.random() * 100).toString() +
                Math.floor(Math.random() * 100000).toString()
              ).padEnd(9, '0'),
              nom: a.firstName,
              prenom: a.lastName,
              sap: Math.floor(Math.random() * 1000000000).toString(),
              prerequisSecourisme: a.prerequisSecourisme
            })
        );
      });
    },
  },
});
