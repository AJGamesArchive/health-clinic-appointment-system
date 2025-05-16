type LifeStyleFactors = {
  smokingStatus: {
    status: string;
    statusAsOf: Date;
    notes: string;
  }[] | null;
  alcoholConsumption: {
    consumption: string;
    consumptionAsOf: Date;
    notes: string;
  }[] | null;
  recreationalDrugUse: {
    drug: string;
    usage: string;
    useAsOf: Date;
    notes: string;
  }[] | null;
  exerciseFrequency:{
    exercise: string;
    frequency: string;
    frequencyAsOf: Date;
    notes: string;
  }[] | null;
  sleepQuality:{
    quality: string;
    qualityAsOf: Date;
    notes: string;
  }[] | null;
  stressLevel: {
    level: string;
    levelAsOf: Date;
    notes: string;
  }[] | null;
  socialSupport: {
    support: string;
    supportAsOf: Date;
    notes: string;
  }[] | null;
  travelHistory: {
    location: string;
    date: Date;
    duration: string;
    notes: string;
  }[] | null;
  familyConditionals: {
    condition: string;
    typicalCause: string;
    typicalAgeOfDiagnosis: number;
    notes: string;
  }[] | null;
  environmentalFactors: {
    factor: string;
    exposure: string;
    exposureAsOf: Date;
    notes: string;
  }[] | null;
};

export default LifeStyleFactors;