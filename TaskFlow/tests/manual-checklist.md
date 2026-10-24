# Checklist manual

As verificações de navegador abaixo permanecem pendentes: o servidor iniciou, mas o ambiente de execução não permitiu a conexão do navegador à porta local 8000.

## Inicialização e arquitetura

- [ ] Iniciar com `python -m http.server 8000` (ou `py -m http.server 8000`) e abrir `http://localhost:8000`.
- [ ] Confirmar que não há chamadas de rede externas nem erros no console.
- [ ] Confirmar que a única chave de persistência é `taskflow.data.v1`.

## Tarefas

- [ ] Criar tarefa apenas com título; verificar prioridade média, situação a fazer, descrição vazia e categoria/data vazias.
- [ ] Tentar salvar título vazio e confirmar mensagem e dados digitados preservados.
- [ ] Criar com título com espaços externos e confirmar trim.
- [ ] Editar todos os campos, cancelar e salvar em tentativas separadas; verificar ID estável.
- [ ] Avançar situação, confirmar exclusão e cancelar exclusão.
- [ ] Inserir texto `<img src=x onerror=alert(1)>`; confirmar exibição literal.

## Categorias, filtros e datas

- [ ] Criar, renomear, duplicar (incluindo variações de caixa/espaços) e excluir categoria associada a tarefas.
- [ ] Confirmar que excluir categoria preserva todos os campos das tarefas e as desvincula.
- [ ] Testar cada filtro, filtros combinados e limpeza.
- [ ] Criar datas distintas, iguais e ausentes; conferir ordem estável e datas sem vencimento ao final.
- [ ] Verificar vencimento ontem, hoje, amanhã, tarefa concluída e tarefa sem data.
- [ ] Recarregar e confirmar recuperação dos dados.

## Persistência, acessibilidade e responsividade

- [ ] Substituir temporariamente o JSON por texto inválido no DevTools; recarregar e confirmar aviso sem sobrescrita.
- [ ] Simular falha de gravação (por exemplo, bloqueando `localStorage.setItem` no DevTools) e confirmar ausência de falso sucesso.
- [ ] Percorrer a interface com Tab/Shift+Tab e confirmar foco visível e diálogos operáveis por teclado.
- [ ] Usar a largura móvel do DevTools e conferir ausência de rolagem horizontal, campos e botões utilizáveis.
