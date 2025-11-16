// src/api/leiding.js

// src/api/leiding.js
import { seedLeiding } from '../../../api/src/drizzle/seed';

export async function getAll() {

  return seedLeiding;
}
// axios back end gebruiken