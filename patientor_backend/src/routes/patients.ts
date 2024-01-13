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
  return res.status(200).json(patients);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  try{
    const patient = patientsService.getPatientById(id);
    return res.json(patient);
  }catch(error){
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    return res.status(400).send(errorMessage);
  }
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