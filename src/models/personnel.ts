import { Habilitation } from './habilitation';
import { PrerequisIec, PrerequisSecourisme, PrerequisTior } from './prerequis';

export class Personnel {
  nid!: string;
  sap!: string;
  nom!: string;
  prenom!: string;
  grade!: string;

  dateFinVMP!: string | undefined;
  dateFinContrat!: string | undefined;
  dateRecyclageLegad!: string | undefined;
  ppaValid = false;
  habilitation!: Habilitation | string | undefined;
  finHabilitation!: string | undefined;

  prerequisSecourisme: PrerequisSecourisme = new PrerequisSecourisme();
  prerequisTior: PrerequisTior = new PrerequisTior();
  prerequisIec: PrerequisIec = new PrerequisIec();

  constructor(personnel: Partial<Personnel>) {
    Object.assign(this, personnel);

    this.sap = this.sap || '';
    this.nid = this.nid || '';
    this.nom = this.nom || '';
    this.prenom = this.prenom || '';
    this.ppaValid = this.ppaValid || false;
  }

  get fullName(): string {
    return `${this.nom} ${this.prenom}`;
  }
}
