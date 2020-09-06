import patientData from '../../data/patients';
import { v1 as uuidv1 } from "uuid";
import { PublicPatient, Patient, NewPatientEntry } from '../types';

const getAll = (): PublicPatient[] => {
  return patientData.map(({ id, dateOfBirth, gender, name, occupation }) => ({
    id,
    dateOfBirth,
    gender,
    name,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuidv1(),
    ...entry
  };

  patientData.push(newPatient);
  return newPatient;
};

const getPatient = (id: string): Patient | undefined => {
  return patientData.find(p => p.id === id);
};

export default {
  getAll,
  addPatient,
  getPatient
};