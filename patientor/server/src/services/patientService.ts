import patientData from '../../data/patients';
import { PatientNoSsn } from '../types';

const getAll = (): PatientNoSsn[] => {
  return patientData.map(({ id, dateOfBirth, gender, name, occupation }) => ({
    id,
    dateOfBirth,
    gender,
    name,
    occupation
  }));
};

export default {
  getAll
};