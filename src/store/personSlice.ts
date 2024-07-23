import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CitizenIdParts {
  part1: string;
  part2: string;
  part3: string;
  part4: string;
  part5: string;
}

interface Person {
  id: number;
  title: string;
  firstname: string;
  lastname: string;
  birthday: string;
  nationality: 'American' | 'Canadian' | 'British';
  citizenId: CitizenIdParts;
  gender: 'Male' | 'Female' | 'Unisex';
  mobilePhone: string;
  passportNo: string;
  expectedSalary: number;
}

interface PersonState {
  persons: Person[];
}

const loadPersons = (): Person[] => {
  const storedPersons = localStorage.getItem('persons');
  return storedPersons ? JSON.parse(storedPersons).map((person: any) => ({
    ...person,
    expectedSalary: Number(person.expectedSalary),
    citizenId: person.citizenId,  
  })) : [];
};

const savePersons = (persons: Person[]): void => {
  localStorage.setItem('persons', JSON.stringify(persons));
};

const initialState: PersonState = {
  persons: loadPersons(),
};

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Person>) => {
      state.persons.push({
        ...action.payload,
        expectedSalary: Number(action.payload.expectedSalary),
      });
      savePersons(state.persons);
    },
    updatePerson: (state, action: PayloadAction<Person>) => {
      const index = state.persons.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.persons[index] = action.payload;
        savePersons(state.persons);
      }
    },
    deletePerson: (state, action: PayloadAction<number>) => {
      state.persons = state.persons.filter(p => p.id !== action.payload);
      savePersons(state.persons);
    },
    deleteMultiplePersons: (state, action: PayloadAction<number[]>) => {
      state.persons = state.persons.filter(p => !action.payload.includes(p.id));
      savePersons(state.persons);
    },
  },
});

export const { addPerson, updatePerson, deletePerson, deleteMultiplePersons } = personSlice.actions;

export default personSlice.reducer;
