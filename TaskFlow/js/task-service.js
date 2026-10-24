import { validateTask } from './validators.js';
import { isOverdue } from './date-utils.js';

export function createTaskService(getData, commit) {
  function prepare(input, existingId = null) {
    const current = getData();
    const result = validateTask(input, current.categories.map(category => category.id));
    if (Object.keys(result.errors).length) { const error = new Error(Object.values(result.errors)[0]); error.fields = result.errors; throw error; }
    const oldTask = existingId ? current.tasks.find(task => task.id === existingId) : null;
    if (existingId && !oldTask) throw new Error('A tarefa não foi encontrada.');
    const task = { id: oldTask?.id || makeId(), ...result.value };
    const tasks = oldTask ? current.tasks.map(item => item.id === existingId ? task : item) : [...current.tasks, task];
    commit({ ...current, tasks });
    return task;
  }
  return {
    create(input) { return prepare(input); },
    update(id, input) { return prepare(input, id); },
    remove(id) { const current = getData(); if (!current.tasks.some(task => task.id === id)) throw new Error('A tarefa não foi encontrada.'); commit({ ...current, tasks: current.tasks.filter(task => task.id !== id) }); },
    getById(id) { return getData().tasks.find(task => task.id === id) || null; },
    list(filters = {}) {
      return getData().tasks.filter(task => (!filters.categoryId || task.categoryId === filters.categoryId) && (!filters.status || task.status === filters.status) && (!filters.priority || task.priority === filters.priority))
        .map((task, index) => ({ ...task, overdue: isOverdue(task), originalIndex: index }))
        .sort((a, b) => { if (!a.dueDate && !b.dueDate) return a.originalIndex - b.originalIndex; if (!a.dueDate) return 1; if (!b.dueDate) return -1; return a.dueDate.localeCompare(b.dueDate) || a.originalIndex - b.originalIndex; })
        .map(({ overdue, ...task }) => ({ ...task, overdue: isOverdue(task) }));
    },
    toggleStatus(id) { const task = this.getById(id); if (!task) throw new Error('A tarefa não foi encontrada.'); const next = task.status === 'todo' ? 'in_progress' : task.status === 'in_progress' ? 'completed' : 'todo'; return prepare({ ...task, status: next }, id); }
  };
}

function makeId() { return globalThis.crypto?.randomUUID?.() || `tf-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`; }
