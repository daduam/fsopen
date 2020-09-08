import express from 'express';

import patientsService from '../services/patientService';
import toNewPatientEntry from '../utils/toNewPatientEntry';
import patientService from '../services/patientService';
import toNewEntry from '../utils/toNewEntry';

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
    res.status(400).send({ error: e.message as string });
  }
});

router.get("/:id", (req, res) => {
  const patient = patientService.getPatient(req.params.id);

  if (!patient) {
    res.sendStatus(404);
  }

  res.send(patient);
});

router.post("/:id/entries", (req, res) => {
  if (!patientService.getPatient(req.params.id)) {
    return res.status(404).send({ error: "no patient with that id" });
  }

  try {
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(req.params.id, newEntry);
    return res.json(updatedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return res.status(400).send({ error: e.message as string });
  }
});

export default router;
