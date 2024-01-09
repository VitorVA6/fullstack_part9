import { Router } from "express";
import diagnosesService from '../services/diagnosesService';

const router = Router();

router.get('/', (_req, res) => {
  const diagnoses = diagnosesService.getDiagnoses();
  return res.status(200).json(diagnoses);
});

export default router;