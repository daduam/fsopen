import express from "express";
import patientsService from "../services/patientService";

const router = express.Router();

router.get("/", (_, res) => {
  res.send(patientsService.getAll());
});

export default router;
