import { isValidDateString } from './validators.js';

export function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isOverdue(task, today = localDateString()) {
  return task.status !== 'completed' && Boolean(task.dueDate) && isValidDateString(task.dueDate) && task.dueDate < today;
}

export function formatDate(value) {
  if (!value || !isValidDateString(value)) return 'Sem vencimento';
  const [year, month, day] = value.split('-');
  return `${day}/${month}/${year}`;
}
