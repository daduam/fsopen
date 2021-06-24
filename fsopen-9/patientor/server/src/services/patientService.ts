import { v1 as uuidv1 } from "uuid";

import patientData from "../../data/patients";
import {
  Entry,
  NewEntry,
  NewPatientEntry,
  Patient,
  PublicPatient,
} from "../types";

const getAll = (): PublicPatient[] => {
  return patientData.map(({ id, dateOfBirth, gender, name, occupation }) => ({
    id,
    dateOfBirth,
    gender,
    name,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuidv1(),
    ...entry,
  };

  patientData.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  return patientData.find((p) => p.id === id);
};

const addEntry = (patientId: Patient["id"], entry: NewEntry): Entry => {
  const newEntry = { id: uuidv1(), ...entry } as Entry;

  const patientIdx = patientData.findIndex((p) => p.id === patientId);
  patientData[patientIdx].entries.push(newEntry);
  return newEntry;
};

export default {
  getAll,
  addPatient,
  getPatient,
  addEntry,
};
