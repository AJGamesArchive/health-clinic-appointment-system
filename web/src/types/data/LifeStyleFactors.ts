type LifeStyleFactors = {
  smokingStatus: {
    status: string;
    statusAsOf: Date;
    notes: string;
  }[] | undefined;
  alcoholConsumption: {
    consumption: string;
    consumptionAsOf: Date;
    notes: string;
  }[] | undefined;
  recreationalDrugUse: {
    drug: string;
    usage: string;
    useAsOf: Date;
    notes: string;
  }[] | undefined;
  exerciseFrequency:{
    exercise: string;
    frequency: string;
    frequencyAsOf: Date;
    notes: string;
  }[] | undefined;
  sleepQuality:{
    quality: string;
    qualityAsOf: Date;
    notes: string;
  }[] | undefined;
  stressLevel: {
    level: string;
    levelAsOf: Date;
    notes: string;
  }[] | undefined;
  socialSupport: {
    support: string;
    supportAsOf: Date;
    notes: string;
  }[] | undefined;
  travelHistory: {
    location: string;
    date: Date;
    duration: string;
    notes: string;
  }[] | undefined;
  familyConditionals: {
    condition: string;
    typicalCause: string;
    typicalAgeOfDiagnosis: number;
    notes: string;
  }[] | undefined;
  environmentalFactors: {
    factor: string;
    exposure: string;
    exposureAsOf: Date;
    notes: string;
  }[] | undefined;
};

export default LifeStyleFactors;