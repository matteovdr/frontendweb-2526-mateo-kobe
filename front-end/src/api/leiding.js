// src/api/leiding.js
/* export async function getAll() {
  const response = await fetch(''); 

  if (!response.ok) {
    throw new Error('Fout bij het ophalen van leiding');
  }

  return await response.json();
} */
// src/api/leiding.js
import { leidingMockData } from './mock-data-leiding.json';

export async function getAll() {

  return leidingMockData;
}