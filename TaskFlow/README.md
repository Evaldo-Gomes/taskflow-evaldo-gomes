# TaskFlow

Aplicativo local para organizar tarefas pessoais por categoria, prioridade, situação e vencimento. A aplicação segue a especificação funcional do MVP e os materiais visuais do Google Stitch. A interface está em português brasileiro; não usa serviços externos nem dependências para instalar.

## Requisitos

- Python 3 instalado (comando `python` ou `py`).
- Navegador moderno com suporte a módulos JavaScript, `<dialog>` e `localStorage`.

## Executar

Abra o terminal nesta pasta e inicie o servidor estático padrão do Python:

```powershell
python -m http.server 8000
```

No Windows, se `python` não estiver disponível:

```powershell
py -m http.server 8000
```

Abra <http://localhost:8000>. Para encerrar, volte ao terminal e pressione `Ctrl+C`.

## Organização do código

- `index.html`: estrutura semântica, formulários, filtros e diálogos.
- `css/styles.css`: identidade visual inspirada no Stitch, componentes e adaptação responsiva.
- `js/app.js`: eventos, atualização da interface e mensagens.
- `js/task-service.js`: operações e regras das tarefas, filtros e ordenação.
- `js/category-service.js`: operações de categoria e desvinculação atômica.
- `js/storage.js`: único módulo que lê e grava `localStorage`.
- `js/validators.js`: validação dos campos e da estrutura persistida.
- `js/date-utils.js`: datas locais e cálculo dinâmico de atraso.
- `tests/`: casos de aceitação e roteiro de verificação manual.

Os dados ficam na chave `taskflow.data.v1` do navegador e da origem local utilizada. Eles não são compartilhados entre origens ou perfis e podem ser removidos ao limpar os dados do navegador. Se o JSON existente estiver inválido, a aplicação informa o erro e evita sobrescrevê-lo automaticamente.

## Testes

Consulte `tests/test-cases.md` e `tests/manual-checklist.md`. O roteiro manual cobre CRUD, validações, falhas de persistência, teclado e janela estreita. Não são necessárias ferramentas de teste adicionais.
