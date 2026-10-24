import { validateData } from './validators.js';

export const STORAGE_KEY = 'taskflow.data.v1';
const EMPTY_DATA = () => ({ schemaVersion: 1, tasks: [], categories: [] });

export function loadData() {
  let raw;
  try { raw = localStorage.getItem(STORAGE_KEY); }
  catch { throw new Error('Não foi possível ler os dados deste navegador.'); }
  if (raw === null) return EMPTY_DATA();
  let parsed;
  try { parsed = JSON.parse(raw); }
  catch { throw new Error('Os dados salvos estão corrompidos. Eles foram preservados e não serão sobrescritos.'); }
  return validateData(parsed);
}

export function saveData(data) {
  validateData(data);
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  catch { throw new Error('Não foi possível salvar os dados. Verifique o espaço disponível no navegador e tente novamente.'); }
}
