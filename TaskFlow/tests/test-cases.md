# Casos de teste do TaskFlow

Os casos derivam dos critérios de aceitação da especificação v1.0. A suíte de regras foi executada com Node.js e um `localStorage` simulado; isso verifica serviços e validações, mas não substitui o teste ponta a ponta no navegador.

| ID | Cenário | Resultado esperado | Resultado |
|---|---|---|---|
| TA01–TA08 | Criar tarefa, título obrigatório/trim e valores padrão | Serviço cria tarefa válida, rejeita título vazio e usa os valores padrão; exibição na lista segue pendente | Lógica aprovada; UI pendente |
| TA09 | Editar tarefa | Serviço preserva ID; falha de gravação mantém estado anterior | Lógica aprovada; UI pendente |
| TA10–TA11 | Confirmar e cancelar exclusão | Confirma remove; cancelar preserva | Pendente de verificação no navegador |
| TA12–TA15 | Criar categoria, rejeitar duplicada, renomear | Serviço rejeita duplicada e preserva ID na renomeação | Lógica aprovada; UI pendente |
| TA16 | Excluir categoria associada | Serviço preserva tarefa e campos e define `categoryId: null` | Lógica aprovada; UI pendente |
| TA17–TA19 | Situação e prioridade válidas | Valida prioridade; cálculo exclui tarefa concluída | Parcialmente aprovada na lógica; UI pendente |
| TA20–TA21 | Data de vencimento | Valida formato/data e rejeita data impossível | Lógica aprovada; UI pendente |
| TA22–TA25 | Cálculo de atraso | Ontem atrasa; hoje, concluída e sem vencimento não atrasam | Lógica aprovada; UI pendente |
| TA26–TA29 | Filtros individuais/combinados e limpeza | Filtros de serviço combinam com AND | Lógica aprovada; limpar e UI pendentes |
| TA30–TA31 | Ordenar datas e tarefas sem data | Ordem crescente e sem data ao final | Lógica aprovada; estabilidade em datas iguais não exercitada |
| TA32–TA33 | Recarregar e reabrir mesma origem | Persistência verificada via módulo com armazenamento simulado; navegador pendente | Parcialmente aprovada |
| TA34–TA35 | JSON inválido e falha de gravação | Módulo preserva JSON inválido; commit mantém estado em memória na falha simulada | Lógica aprovada; mensagens/UI pendentes |
| TA36 | Texto contendo HTML | A renderização usa `textContent` para dados do usuário | Verificação estática aprovada; teste no DOM pendente |
| TA37–TA38 | Teclado e viewport estreita | Controles focáveis e leiaute responsivo | CSS/HTML inspecionados; verificação no navegador pendente |

## Verificações executadas

- `node --check` nos seis módulos JavaScript: aprovado.
- Suíte Node com 18 verificações de serviços, validadores, datas, filtros, ordenação, integridade e persistência simulada: aprovada.
- Análise do HTML com `HTMLParser`: 33 IDs únicos e referências `label`/ARIA resolvidas.
- Inicialização de `python -m http.server 8000`: iniciada, mas a política do ambiente impediu abrir a porta local no navegador (`ERR_CONNECTION_TIMED_OUT`/permissão de socket). Portanto, nenhum teste visual ou de fluxo ponta a ponta no navegador foi declarado aprovado.
