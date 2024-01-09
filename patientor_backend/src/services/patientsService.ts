import { Patient } from '../types';
import patientsData from '../../data/patients';
import { NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientsData;
};

const addPatient = (newPatient: NewPatientEntry): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id = uuid();
  const newPatientEntry: Patient = {
    id,
    ...newPatient
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient
};