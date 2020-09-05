import diagnosesData from "../../data/diagnoses";
import { Diagnoses } from "../types";

const getAll = (): Array<Diagnoses> => {
  return diagnosesData;
};

export default {
  getAll
};