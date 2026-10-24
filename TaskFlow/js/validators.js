export const PRIORITIES = Object.freeze(['low', 'medium', 'high']);
export const STATUSES = Object.freeze(['todo', 'in_progress', 'completed']);

export function validateTask(input, categoryIds = []) {
  const errors = {};
  const title = typeof input.title === 'string' ? input.title.trim() : '';
  if (!title) errors.title = 'Informe o título da tarefa.';
  if (input.description != null && typeof input.description !== 'string') errors.description = 'A descrição informada é inválida.';
  const categoryId = input.categoryId === '' || input.categoryId == null ? null : input.categoryId;
  if (categoryId !== null && (typeof categoryId !== 'string' || !categoryIds.includes(categoryId))) errors.categoryId = 'Selecione uma categoria válida.';
  const priority = input.priority || 'medium';
  if (!PRIORITIES.includes(priority)) errors.priority = 'Selecione uma prioridade válida.';
  const status = input.status || 'todo';
  if (!STATUSES.includes(status)) errors.status = 'Selecione uma situação válida.';
  const dueDate = input.dueDate || null;
  if (dueDate !== null && (typeof dueDate !== 'string' || !isValidDateString(dueDate))) errors.dueDate = 'A data informada é inválida.';
  return { errors, value: { title, description: input.description || '', categoryId, dueDate, priority, status } };
}

export function validateCategoryName(name) {
  if (typeof name !== 'string' || !name.trim()) return { value: '', error: 'Informe o nome da categoria.' };
  return { value: name.trim(), error: null };
}

export function isValidDateString(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(0);
  date.setFullYear(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export function validateData(data) {
  if (!data || data.schemaVersion !== 1 || !Array.isArray(data.tasks) || !Array.isArray(data.categories)) throw new Error('A estrutura dos dados salvos é inválida. Os dados não foram alterados.');
  const categoryIds = new Set();
  const categoryNames = new Set();
  for (const category of data.categories) {
    if (!category || typeof category.id !== 'string' || !category.id || typeof category.name !== 'string' || !category.name.trim() || categoryIds.has(category.id)) throw new Error('Há uma categoria inválida nos dados salvos. Os dados não foram alterados.');
    const normalizedName = category.name.trim().toLocaleLowerCase('pt-BR');
    if (categoryNames.has(normalizedName)) throw new Error('Há nomes de categoria duplicados nos dados salvos. Os dados não foram alterados.');
    categoryNames.add(normalizedName);
    categoryIds.add(category.id);
  }
  const taskIds = new Set();
  for (const task of data.tasks) {
    if (!task || typeof task.id !== 'string' || !task.id || taskIds.has(task.id)) throw new Error('Há uma tarefa inválida nos dados salvos. Os dados não foram alterados.');
    taskIds.add(task.id);
    if (typeof task.title !== 'string' || typeof task.description !== 'string' || !(task.categoryId === null || typeof task.categoryId === 'string') || !(task.dueDate === null || typeof task.dueDate === 'string') || !PRIORITIES.includes(task.priority) || !STATUSES.includes(task.status)) throw new Error('Há campos ausentes ou tipos inválidos em uma tarefa salva. Os dados não foram alterados.');
    const checked = validateTask(task, [...categoryIds]);
    if (Object.keys(checked.errors).length || task.title !== checked.value.title) throw new Error('Há dados de tarefa inválidos ou referências quebradas. Os dados não foram alterados.');
  }
  return data;
}
