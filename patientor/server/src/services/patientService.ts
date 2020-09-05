import patientData from '../../data/patients';
import { v1 as uuidv1 } from "uuid";
import { PatientNoSsn, Patient } from '../types';

const getAll = (): PatientNoSsn[] => {
  return patientData.map(({ id, dateOfBirth, gender, name, occupation }) => ({
    id,
    dateOfBirth,
    gender,
    name,
    occupation
  }));
};

const addPatient = (
  name: string,
  ssn: string,
  dateOfBirth: string,
  occupation: string,
  gender: string
): Patient => {

  const newPatient: Patient = {
    id: uuidv1(),
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  addPatient
};