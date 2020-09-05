import express from "express";
import patientsService from "../services/patientService";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_, res) => {
  res.send(patientsService.getAll());
});

router.post("/", (req, res) => {
  console.log(req.body);
  const { name, ssn, dateOfBirth, occupation, gender } = req.body;

  // try {
  //   const newPatient = patientsService.addPatient(req.body);

  //   res.send(newPatient);
  // } catch (e) {
  //   console.log(e.message);
  // }
  const newPatient = patientService.addPatient(
    name,
    ssn,
    dateOfBirth,
    occupation,
    gender
  );

  res.json(newPatient);
});

export default router;
