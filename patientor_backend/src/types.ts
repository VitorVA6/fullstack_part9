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

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  HEALTHY = 0,
  LOWRISK = 1,
  HIGHRISK = 2,
  CRITICALRISK = 3
}

export type SickLeave = {
  startDate: string,
  endDate: string
};

interface OccupationalHealthcareEntry extends BaseEntry {
  sickLeave?: SickLeave,
  type: "OccupationalHealthcare"
}

export type Discharge = {
  date: string,
  criteria: string
};

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[]
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export type PatientInfo = Omit<Patient, 'ssn' | 'entries'>;