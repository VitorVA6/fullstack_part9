import { Gender, NewPatientEntry } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
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

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if(!isString(gender) || !isGender(gender)){
    throw new Error('Incorrect gender: '+ gender);
  }
  return gender;
};

const toNewPatient = (object: unknown): NewPatientEntry => {
  if(!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing data');
  }
  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
    const newEntry: NewPatientEntry = {
      name: parseStringField(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringField(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation, 'occupation')
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

export default toNewPatient;