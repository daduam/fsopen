/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, Diagnosis, HealthCheckRating, Discharge, SickLeave } from '../types';
import diagnosisService from "../services/diagnosisService";

export const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const isDiagnosisCode = (param: any): param is Diagnosis["code"] => {
  return diagnosisService.getDiagnosis(param) !== undefined;
};

export const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

export const isDischarge = (param: any): param is Discharge => {
  return isDate(param.date) && isString(param.criteria);
};

export const isSickLeave = (param: any): param is SickLeave => {
  return isDate(param.startDate) && isDate(param.endDate);
};