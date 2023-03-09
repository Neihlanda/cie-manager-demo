export {
  PrerequisIec,
  PrerequisSecourisme,
  PrerequisRecyclable,
  PrerequisTior,
};

class PrerequisSecourisme {
  psc1: PrerequisRecyclable = new PrerequisRecyclable();
  sc1: PrerequisRecyclable = new PrerequisRecyclable();
}

class PrerequisRecyclable {
  dateInitial: Date | undefined;
  dateRecyclage: Date | undefined;
}

class PrerequisTior {
  fte: Date | undefined;
  tsa1: Date | undefined;
  tsa2: Date | undefined;
  tsa3: Date | undefined;
  tsa4: Date | undefined;
  tsa5: Date | undefined;
  tsa6: Date | undefined;
  stic1: Date | undefined;
  stic2: Date | undefined;
  stic3: Date | undefined;
  tos1: Date | undefined;
  tos3: Date | undefined;
  tos5: Date | undefined;
  tos9: Date | undefined;
}

class PrerequisIec {
  permisB = false;
  permisBValidBMC = false;
  permisA = false;
  permisAValidBMC = false;
  permisPL = false;
  permisPLValidBMC = false;
  permisSPL = false;
  permisSPLValidBMC = false;
  //todo ajouter Valid ford&VT4
}
