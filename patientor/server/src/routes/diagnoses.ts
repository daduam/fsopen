import express from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_, res) => {
  res.send(diagnosesService.getAll());
});

export default router;