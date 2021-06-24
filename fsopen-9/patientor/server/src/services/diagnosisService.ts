import diagnosesData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getAll = (): Array<Diagnosis> => {
  return diagnosesData;
};

const getDiagnosis = (code: Diagnosis["code"]): Diagnosis | undefined => {
  return diagnosesData.find(d => d.code === code);
};

export default {
  getAll,
  getDiagnosis
};