import { Discharge, Entry, Gender, HealthCheckRating, NewPatientEntry, SickLeave } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if(!isString(date) || !isDate(date)){
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseStringField = (data: unknown, field: string): string => {
  if(!isString(data)){
    throw new Error(`Incorrect or missing ${field}`);
  }
  return data;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => Number(v)).includes(param);
};

const parseHealthCheckRating = (param: unknown): HealthCheckRating => {
  if(!isNumber(param) || !isHealthCheckRating(param)){
    throw new Error('Incorrect or missing health check rating');
  }
  return param;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if(!isString(gender) || !isGender(gender)){
    throw new Error('Incorrect gender: '+ gender);
  }
  return gender;
};

const parseDischarge = (param: unknown): Discharge => {
  if(!param || typeof param !== 'object') throw new Error('invalid discharge');
  if('criteria' in param && 'date' in param){
    const discharge: Discharge = {
      date: parseDate(param.date),
      criteria: parseStringField(param.criteria, 'criteria')
    };
    return discharge;
  }
  throw new Error('invalid discharge');
};
const parseSickLeave = (param: unknown): SickLeave => {
  if(!param || typeof param !== 'object') throw new Error('invalid sick leave');
  if('startDate' in param && 'endDate' in param){
    const sickLeave: SickLeave = {
      startDate: parseDate(param.startDate),
      endDate: parseDate(param.endDate)
    };
    return sickLeave;
  }
  throw new Error('invalid sick leave');
};

const parseDiagnosisCodes = (param: unknown): string[] => {
  if(!Array.isArray(param)) throw new Error('invalid diagnoses codes');
  const diagnosesCodes: string[] = param.map(el => parseStringField(el, 'diagnoses code'));
  return diagnosesCodes;
};

const parseEntry = (entry: unknown): Entry => {
  if(!entry || typeof entry !== 'object'){
    throw new Error('Invalid entries');
  }
  if(
    'id' in entry &&
    'description' in entry &&
    'date' in entry &&
    'specialist' in entry &&
    'type' in entry
  ){
    switch (entry.type){
      case 'HealthCheck':
        if('healthCheckRating' in entry){
          const newEntry: Entry = {
            id: parseStringField(entry.id, 'id'),
            description: parseStringField(entry.description, 'description'),
            date: parseDate(entry.date),
            specialist: parseStringField(entry.specialist, 'specialist'),
            type: entry.type,
            healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
          };
          return newEntry;
        }
        else throw new Error('invalid health check rating');
      case 'Hospital':
        if('discharge' in entry && 'diagnosisCodes' in entry){
          const newEntry: Entry = {
            id: parseStringField(entry.id, 'id'),
            description: parseStringField(entry.description, 'description'),
            date: parseDate(entry.date),
            specialist: parseStringField(entry.specialist, 'specialist'),
            type: entry.type,
            discharge: parseDischarge(entry.discharge)
          };
          if('diagnosisCodes' in entry) newEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);
          return newEntry;
        }
        else throw new Error('missing field in entry');
      case 'OccupationalHealthcare':
        const newEntry: Entry = {
          id: parseStringField(entry.id, 'id'),
          description: parseStringField(entry.description, 'description'),
          date: parseDate(entry.date),
          specialist: parseStringField(entry.specialist, 'specialist'),
          type: entry.type
        };
        if('sickLeave' in entry) newEntry.sickLeave = parseSickLeave(entry.sickLeave);
        if('diagnosisCodes' in entry) newEntry.diagnosisCodes = parseDiagnosisCodes(entry.diagnosisCodes);

        return newEntry;
        
      default: throw new Error('invalid type');
    }
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseEntries = (param: unknown): Entry[] => {
  if(!Array.isArray(param)) throw new Error('Invalid entries');
  const entries: Entry[] = param.map(el => parseEntry(el));
  return entries;
};

const toNewPatient = (object: unknown): NewPatientEntry => {
  if(!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing data');
  }
  if(
    'name' in object && 
    'dateOfBirth' in object && 
    'ssn' in object && 
    'gender' in object && 
    'occupation' in object && 
    'entries' in object)
  {
    const newEntry: NewPatientEntry = {
      name: parseStringField(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringField(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation, 'occupation'),
      entries: parseEntries(object.entries)
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;