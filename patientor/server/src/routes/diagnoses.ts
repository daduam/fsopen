import express from "express";
import diagnosesService from "../services/diagnosisService";

const router = express.Router();

router.get("/", (_, res) => {
  res.send(diagnosesService.getAll());
});

export default router;