import patientData from '../../data/patients';
import { v1 as uuidv1 } from "uuid";
import { PatientNoSsn, Patient, NewPatientEntry } from '../types';

const getAll = (): PatientNoSsn[] => {
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

export default {
  getAll,
  addPatient
};