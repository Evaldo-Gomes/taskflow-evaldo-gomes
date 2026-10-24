import { loadData, saveData } from './storage.js';
import { createTaskService } from './task-service.js';
import { createCategoryService } from './category-service.js';
import { formatDate, isOverdue } from './date-utils.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const statusLabels = { todo: 'A fazer', in_progress: 'Em andamento', completed: 'Concluída' };
const priorityLabels = { low: 'Baixa', medium: 'Média', high: 'Alta' };
let data;
let taskService;
let categoryService;
let editingTaskId = null;
let editingCategoryId = null;
let pendingDelete = null;
let noticeTimer;
let storageProblem = '';

try { data = loadData(); }
catch (error) { data = { schemaVersion: 1, tasks: [], categories: [] }; storageProblem = error.message; }

function commit(nextData) {
  if (storageProblem) throw new Error(`${storageProblem} Corrija ou remova os dados inválidos manualmente antes de salvar alterações.`);
  saveData(nextData); // O estado em memória só muda depois da gravação confirmada.
  data = nextData;
}

taskService = createTaskService(() => data, commit);
categoryService = createCategoryService(() => data, commit);

function showNotice(message, type = 'success') {
  const notice = $('#notice');
  notice.textContent = message;
  notice.className = `notice notice-${type}`;
  notice.hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => { notice.hidden = true; }, 5000);
}

function escapeClass(value) { return value.replace(/[^a-z0-9_-]/gi, ''); }

function renderCategories() {
  const categoryNav = $('#category-nav');
  categoryNav.replaceChildren();
  categoryService.list().forEach(category => {
    const row = document.createElement('div'); row.className = 'category-nav-row';
    const filter = document.createElement('button'); filter.type = 'button'; filter.className = 'nav-item category-filter'; filter.dataset.category = category.id;
    if ($('#filter-category').value === category.id) filter.classList.add('is-active');
    const dot = document.createElement('span'); dot.className = 'category-dot'; dot.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span'); label.className = 'category-name'; label.textContent = category.name;
    filter.append(dot, label); row.append(filter);
    const actions = document.createElement('div'); actions.className = 'category-actions';
    const edit = document.createElement('button'); edit.type = 'button'; edit.className = 'category-action'; edit.textContent = 'Renomear'; edit.setAttribute('aria-label', `Renomear categoria ${category.name}`); edit.addEventListener('click', () => openCategoryDialog(category));
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'category-action category-remove'; remove.textContent = 'Excluir'; remove.setAttribute('aria-label', `Excluir categoria ${category.name}`); remove.addEventListener('click', () => askDelete('category', category.id, category.name));
    actions.append(edit, remove); row.append(actions); categoryNav.append(row);
  });
  const options = categoryService.list();
  for (const select of [$('#filter-category'), $('[name="categoryId"]')]) {
    const selected = select.value;
    select.replaceChildren(new Option(select === $('#filter-category') ? 'Todas as categorias' : 'Sem categoria', ''));
    options.forEach(category => select.add(new Option(category.name, category.id)));
    select.value = options.some(category => category.id === selected) ? selected : '';
  }
  renderCategoryManager();
}

function renderCategoryManager() {
  const list = $('#category-manager-list'); list.replaceChildren();
  if (!data.categories.length) { const empty = document.createElement('p'); empty.className = 'category-manager-empty'; empty.textContent = 'Ainda não há categorias.'; list.append(empty); return; }
  data.categories.forEach(category => {
    const row = document.createElement('div'); row.className = 'category-manager-row';
    const name = document.createElement('span'); name.textContent = category.name;
    const edit = document.createElement('button'); edit.type = 'button'; edit.className = 'text-action'; edit.textContent = 'Renomear'; edit.addEventListener('click', () => { $('#category-manager-dialog').close(); openCategoryDialog(category); });
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'text-action danger-text'; remove.textContent = 'Excluir'; remove.addEventListener('click', () => { $('#category-manager-dialog').close(); askDelete('category', category.id, category.name); });
    row.append(name, edit, remove); list.append(row);
  });
}

function currentFilters() { return { categoryId: $('#filter-category').value, status: $('#filter-status').value, priority: $('#filter-priority').value }; }

function renderTasks() {
  const list = $('#task-list'); const tasks = taskService.list(currentFilters());
  list.replaceChildren();
  $('#task-count').textContent = `${tasks.length} ${tasks.length === 1 ? 'tarefa' : 'tarefas'}`;
  tasks.forEach(task => {
    const card = document.createElement('article'); card.className = `task-card${task.status === 'completed' ? ' task-completed' : ''}${isOverdue(task) ? ' task-overdue' : ''}`;
    const complete = document.createElement('button'); complete.type = 'button'; complete.className = `complete-button${task.status === 'completed' ? ' is-complete' : ''}`; complete.textContent = task.status === 'completed' ? '✓' : '○'; complete.setAttribute('aria-label', task.status === 'completed' ? `Reabrir tarefa ${task.title}` : `Avançar situação da tarefa ${task.title}`); complete.title = `Situação: ${statusLabels[task.status]}`; complete.addEventListener('click', () => runOperation(() => taskService.toggleStatus(task.id), 'Situação da tarefa atualizada.'));
    const body = document.createElement('div'); body.className = 'task-body';
    const top = document.createElement('div'); top.className = 'task-topline';
    const title = document.createElement('h3'); title.className = 'task-title'; title.textContent = task.title;
    const status = document.createElement('span'); status.className = `badge status-${escapeClass(task.status)}`; status.textContent = statusLabels[task.status];
    top.append(title, status); body.append(top);
    if (task.description) { const description = document.createElement('p'); description.className = 'task-description'; description.textContent = task.description; body.append(description); }
    const metadata = document.createElement('div'); metadata.className = 'task-metadata';
    const priority = document.createElement('span'); priority.className = `badge priority-${escapeClass(task.priority)}`; priority.textContent = `Prioridade ${priorityLabels[task.priority].toLowerCase()}`; metadata.append(priority);
    const category = categoryService.getById(task.categoryId);
    if (category) { const cat = document.createElement('span'); cat.className = 'meta-chip'; cat.textContent = category.name; metadata.append(cat); }
    const date = document.createElement('span'); date.className = `due-date${isOverdue(task) ? ' overdue-label' : ''}`; date.textContent = `${isOverdue(task) ? '⚠ Atrasada · ' : '◷ '}${formatDate(task.dueDate)}`; metadata.append(date);
    body.append(metadata);
    const actions = document.createElement('div'); actions.className = 'task-actions';
    const edit = document.createElement('button'); edit.type = 'button'; edit.className = 'text-action'; edit.textContent = 'Editar'; edit.setAttribute('aria-label', `Editar tarefa ${task.title}`); edit.addEventListener('click', () => openTaskDialog(task));
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'text-action danger-text'; remove.textContent = 'Excluir'; remove.setAttribute('aria-label', `Excluir tarefa ${task.title}`); remove.addEventListener('click', () => askDelete('task', task.id, task.title));
    actions.append(edit, remove); card.append(complete, body, actions); list.append(card);
  });
  const empty = $('#empty-state'); const hasTasks = data.tasks.length > 0;
  empty.hidden = tasks.length > 0;
  if (!hasTasks) { $('#empty-title').textContent = 'Tudo começa com uma tarefa'; $('#empty-copy').textContent = 'Adicione sua primeira tarefa para organizar seu dia.'; $('#empty-action').hidden = false; }
  else if (!tasks.length) { $('#empty-title').textContent = 'Nenhuma tarefa encontrada'; $('#empty-copy').textContent = 'Ajuste ou limpe os filtros para ver outras tarefas.'; $('#empty-action').hidden = true; }
  else empty.hidden = true;
}

function render() { renderCategories(); renderTasks(); }

function openTaskDialog(task = null) {
  editingTaskId = task?.id || null;
  const form = $('#task-form'); form.reset(); clearFieldErrors(form);
  $('#task-dialog-title').textContent = task ? 'Editar tarefa' : 'Nova tarefa';
  form.elements.title.value = task?.title || '';
  form.elements.description.value = task?.description || '';
  form.elements.categoryId.value = task?.categoryId || '';
  form.elements.dueDate.value = task?.dueDate || '';
  form.elements.priority.value = task?.priority || 'medium';
  form.elements.status.value = task?.status || 'todo';
  $('#task-dialog').showModal();
  form.elements.title.focus();
}

function openCategoryDialog(category = null) {
  editingCategoryId = category?.id || null;
  const form = $('#category-form'); form.reset(); clearFieldErrors(form);
  $('#category-dialog-title').textContent = category ? 'Renomear categoria' : 'Nova categoria';
  form.elements.name.value = category?.name || '';
  $('#category-dialog').showModal(); form.elements.name.focus();
}

function clearFieldErrors(form) { $$('.field-error', form).forEach(field => { field.textContent = ''; }); $$('.field-invalid', form).forEach(field => field.classList.remove('field-invalid')); }
function showFieldErrors(form, errors) { clearFieldErrors(form); Object.entries(errors || {}).forEach(([name, message]) => { const input = form.elements[name]; const target = $(`[data-error="${name}"]`, form); if (input) input.classList.add('field-invalid'); if (target) target.textContent = message; }); }
function runOperation(operation, success) { try { operation(); render(); showNotice(success); } catch (error) { if (error.fields) { showFieldErrors($('#task-form'), error.fields); showNotice(error.message, 'error'); } else showNotice(error.message || 'Não foi possível salvar os dados. Tente novamente.', 'error'); } }

function askDelete(type, id, label) {
  pendingDelete = { type, id };
  $('#confirm-title').textContent = type === 'task' ? 'Excluir tarefa?' : 'Excluir categoria?';
  $('#confirm-copy').textContent = type === 'task' ? `A tarefa “${label}” será removida permanentemente.` : `A categoria “${label}” será removida. As tarefas associadas serão mantidas sem categoria.`;
  $('#confirm-delete').textContent = type === 'task' ? 'Excluir tarefa' : 'Excluir categoria';
  $('#confirm-dialog').showModal(); $('#confirm-delete').focus();
}

$('#task-form').addEventListener('submit', event => {
  event.preventDefault(); const form = event.currentTarget;
  const input = Object.fromEntries(new FormData(form).entries());
  try { if (editingTaskId) taskService.update(editingTaskId, input); else taskService.create(input); $('#task-dialog').close(); render(); showNotice(editingTaskId ? 'Tarefa atualizada com sucesso.' : 'Tarefa criada com sucesso.'); }
  catch (error) { showFieldErrors(form, error.fields || {}); showNotice(error.message || 'Não foi possível salvar os dados. Tente novamente.', 'error'); }
});

$('#category-form').addEventListener('submit', event => {
  event.preventDefault(); const form = event.currentTarget;
  try { if (editingCategoryId) categoryService.rename(editingCategoryId, form.elements.name.value); else categoryService.create(form.elements.name.value); $('#category-dialog').close(); render(); showNotice(editingCategoryId ? 'Categoria renomeada com sucesso.' : 'Categoria criada com sucesso.'); }
  catch (error) { showFieldErrors(form, { name: error.message }); showNotice(error.message, 'error'); }
});

$('#confirm-delete').addEventListener('click', () => {
  if (!pendingDelete) return;
  const target = pendingDelete;
  try { target.type === 'task' ? taskService.remove(target.id) : categoryService.remove(target.id); $('#confirm-dialog').close(); pendingDelete = null; render(); showNotice(target.type === 'task' ? 'Tarefa excluída com sucesso.' : 'Categoria excluída. As tarefas vinculadas foram preservadas.'); }
  catch (error) { $('#confirm-dialog').close(); showNotice(error.message || 'Não foi possível salvar os dados. Tente novamente.', 'error'); }
});

$('#new-task').addEventListener('click', () => openTaskDialog());
$('#empty-action').addEventListener('click', () => openTaskDialog());
$('#add-category-shortcut').addEventListener('click', () => openCategoryDialog());
$('#add-category-inline').addEventListener('click', () => $('#category-manager-dialog').showModal());
$('#manager-add-category').addEventListener('click', () => { $('#category-manager-dialog').close(); openCategoryDialog(); });
$('#clear-date').addEventListener('click', () => { $('#task-form').elements.dueDate.value = ''; $('#task-form').elements.dueDate.focus(); });
$('#filter-category').addEventListener('change', renderTasks);
$('#filter-status').addEventListener('change', () => { $('#status-nav .nav-item').forEach(item => item.classList.toggle('is-active', item.dataset.status === $('#filter-status').value)); renderTasks(); });
$('#filter-priority').addEventListener('change', renderTasks);
$('#clear-filters').addEventListener('click', () => { $('#filter-category').value = ''; $('#filter-status').value = ''; $('#filter-priority').value = ''; $('#status-nav .nav-item').forEach(item => item.classList.toggle('is-active', !item.dataset.status)); render(); });
$('#status-nav').addEventListener('click', event => { const button = event.target.closest('[data-status]'); if (!button) return; $('#filter-status').value = button.dataset.status; $('#status-nav .nav-item').forEach(item => item.classList.toggle('is-active', item === button)); renderTasks(); });
$('#category-nav').addEventListener('click', event => { const button = event.target.closest('[data-category]'); if (!button) return; $('#filter-category').value = $('#filter-category').value === button.dataset.category ? '' : button.dataset.category; render(); });
$$('[data-close]').forEach(button => button.addEventListener('click', () => { const dialog = $(`#${button.dataset.close}`); dialog.close(); }));
$$('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); }));

render();
if (storageProblem) showNotice(storageProblem, 'error');
