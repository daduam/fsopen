import diagnosesData from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getAll = (): Array<Diagnosis> => {
  return diagnosesData;
};

export default {
  getAll
};