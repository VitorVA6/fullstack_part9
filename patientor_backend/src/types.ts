export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export enum Gender {
  FEMALE = 'female',
  MALE = 'male',
  OTHER = 'other'
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export type PatientInfo = Omit<Patient, 'ssn'>;