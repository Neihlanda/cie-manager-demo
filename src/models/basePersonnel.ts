export class basePersonnel {
  nid!: string;
  sap!: string;
  nom!: string;
  prenom!: string;

  constructor(personnel: Partial<basePersonnel>) {
    Object.assign(this, personnel);
  }

  get fullName(): string {
    return `${this.nom} ${this.prenom}`;
  }
}
