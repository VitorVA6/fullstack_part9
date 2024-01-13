import { Patient } from '../types';
import patientsData from '../../data/patients';
import { NewPatientEntry } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientById = (id: string): Patient => {
  const patient = patientsData.find(el => el.id === id);
  if(!patient) throw new Error('Patient not found');
  return patient;
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
  addPatient,
  getPatientById
};