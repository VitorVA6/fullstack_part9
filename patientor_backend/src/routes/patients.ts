import Router from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = Router();

router.get('/', (_req, res) => {
  const patients = patientsService
    .getPatients()
    .map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    }));
  res.status(200).json(patients);
});

router.post('/', (req, res) => {
  try{
    const patientData = toNewPatient(req.body);
    const patientAdded = patientsService.addPatient(patientData);
    return res.json(patientAdded);
  }catch(error){
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default router;