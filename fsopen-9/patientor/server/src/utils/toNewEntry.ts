/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BaseEntry,
  Diagnosis,
  Discharge,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  NewEntry,
  OccupationalHealthCareEntry,
  SickLeave,
} from '../types';
import assertNever from './assertNever';
import { isDate, isDiagnosisCode, isDischarge, isHealthCheckRating, isSickLeave, isString } from './typeGuards';

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("malformatted or missing date");
  }

  return date;
};

const parseSpecialist = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("incorrect or missing specialist name");
  }

  return name;
};

const parseDescription = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error("incorrect or missing description");
  }

  return text;
};

const parseDiagnoses = (param: any[]): Array<Diagnosis["code"]> | undefined => {
  if (!param || param.length === 0) {
    return undefined;
  }

  const codes = param.map(p => {
    if (!p || !isString(p) || !isDiagnosisCode(p)) {
      throw new Error("missing or incorrect diagnosis code");
    }
    return p;
  });

  return codes;
};

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error("incorrect or missing health check rating");
  }

  return rating;
};

const parseDischarge = (param: any): Discharge => {
  if (!param || !isDischarge(param)) {
    throw new Error("missing or incorrect discharge");
  }

  return param;
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("incorrect or missing employer name");
  }

  return name;
};

const parseSickLeave = (param: any): SickLeave | undefined => {
  if (!param || Object.keys(param).length === 0) {
    return undefined;
  } else if (!isSickLeave(param)) {
    throw new Error("some fields are incorrect or missing");
  }

  return param;
};

const toBaseEntry = (object: any): Omit<BaseEntry, "id"> => {
  const baseEntry: Omit<BaseEntry, "id"> = {
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    description: parseDescription(object.description),
    diagnosisCodes: parseDiagnoses(object.diagnosisCodes)
  };

  return baseEntry;
};

const asHealthCheckEntry = (object: any): Omit<HealthCheckEntry, "id"> => {
  const newEntry: Omit<HealthCheckEntry, "id"> = {
    ...toBaseEntry(object),
    type: "HealthCheck",
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
  };

  return newEntry;
};

const asHospital = (object: any): Omit<HospitalEntry, "id"> => {
  const newEntry: Omit<HospitalEntry, "id"> = {
    ...toBaseEntry(object),
    type: "Hospital",
    discharge: parseDischarge(object.discharge)
  };

  return newEntry;
};

const asOccupationalHealthCare = (object: any): Omit<OccupationalHealthCareEntry, "id"> => {
  const newEntry: Omit<OccupationalHealthCareEntry, "id"> = {
    ...toBaseEntry(object),
    type: "OccupationalHealthcare",
    employerName: parseEmployerName(object.employerName),
    sickLeave: parseSickLeave(object.sickLeave)
  };

  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewEntry = (object: any): NewEntry => {
  switch (object.type as NewEntry["type"]) {
    case "HealthCheck":
      return asHealthCheckEntry(object);
    case "Hospital":
      return asHospital(object);
    case "OccupationalHealthcare":
      return asOccupationalHealthCare(object);
    default:
      return assertNever(object);
  }
};

export default toNewEntry;