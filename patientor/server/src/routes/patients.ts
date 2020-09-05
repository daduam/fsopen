import express from 'express';

import patientsService from '../services/patientService';
import toNewPatientEntry from '../utils';
import patientService from '../services/patientService';

const router = express.Router();

router.get("/", (_, res) => {
  res.send(patientsService.getAll());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;
