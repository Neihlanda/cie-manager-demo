export class Personnel {
  nid!: string;
  sap!: string;
  nom!: string;
  prenom!: string;
  grade!: string;

  dateFinVMP!: Date | undefined;
  dateFinContrat!: Date | undefined;
  dateRecyclageLegad!: Date | undefined;
  ppaValid: boolean | undefined;
  habilitation!: string | undefined;
  finHabilitation!: Date | undefined;

  constructor(personnel: Partial<Personnel>) {
    Object.assign(this, personnel);

    this.sap = this.sap || '';
    this.nid = this.nid || '';
    this.nom = this.nom || '';
    this.prenom = this.prenom || '';
  }

  get fullName(): string {
    return `${this.nom} ${this.prenom}`;
  }
}
