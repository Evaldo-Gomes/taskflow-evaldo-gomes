import { validateCategoryName } from './validators.js';

export function createCategoryService(getData, commit) {
  function save(name, id = null) {
    const checked = validateCategoryName(name);
    if (checked.error) throw new Error(checked.error);
    const current = getData();
    const duplicate = current.categories.some(category => category.id !== id && category.name.trim().toLocaleLowerCase('pt-BR') === checked.value.toLocaleLowerCase('pt-BR'));
    if (duplicate) throw new Error('Já existe uma categoria com esse nome.');
    const old = id ? current.categories.find(category => category.id === id) : null;
    if (id && !old) throw new Error('A categoria não foi encontrada.');
    const category = { id: old?.id || makeId(), name: checked.value };
    const categories = old ? current.categories.map(item => item.id === id ? category : item) : [...current.categories, category];
    commit({ ...current, categories });
    return category;
  }
  return {
    create(name) { return save(name); },
    rename(id, name) { return save(name, id); },
    remove(id) { const current = getData(); if (!current.categories.some(category => category.id === id)) throw new Error('A categoria não foi encontrada.'); const categories = current.categories.filter(category => category.id !== id); const tasks = current.tasks.map(task => task.categoryId === id ? { ...task, categoryId: null } : task); commit({ ...current, categories, tasks }); },
    list() { return getData().categories; },
    getById(id) { return getData().categories.find(category => category.id === id) || null; }
  };
}

function makeId() { return globalThis.crypto?.randomUUID?.() || `tf-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`; }
