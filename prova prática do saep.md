prova prática do saep:

estrutura detalhada da avaliação - saber o que tem que fazer exatamente

maior desafio é o tempo

ia: não é possível porque o computador não pode ter acesso a internet

pode usar projeto que já tem

não pode enrolar muito, inclusive nem avaliam a parte estética do site



funcionamento:

3 horas de duração, com 30 minutos de ambientação

terá uma auditoria que monitora o tempo de criação de arquivos

27 de novembro - última sexta-feira do mês

não pode subir nada relacionado à prova para o GitHub



precise ter:

login e autenticação

uma tela principal que identifique o usuário e da acesso às outras funcionalidades

cadastro, atualização, listagem e exclusão

associação entre entidades

documentação de requisitos funcionais, não funcionais, requisitos de infraestrutura e diagrama DER

banco de dados populado

pelo menos 4 requisitos - seguindo o modelo





regras:

o banco precisa ter pelo menos 3 registros por tabela

validação de autenticação

dados sensíveis devem ser criptografados

tela principal deve mostrar nome do usuário logado e acesso as demais funcionalidades

busca, atualização de resultados

ordem de dados

não existe registro sem dono



entrega:

1. documentação de software (requisitos) - pdf
2. diagrama de entidade-relacionamento - imagem
3. script de criação e população do banco -sql
4. código-fonte de login
5. código-fonte da tela principal
6. código-fonte dp gerenciamento de entidades (cada uma - serão 2 entidades)



o que é esperado:

documentação - 4 requisitos funcionais e preencher a lista de requisitos de infraestrutura.

diagrama - exportar como pdf ou imagem.

script - criar o banco e as tabelas e inserir pelo menos 3 registros em cada uma.

login - a estética não é avaliada, comparação com as credenciais com o banco de dados, se estiverem certas, abre a tela principal, se não, mostra uma validação até o usuário acertar.

tela principal - mostra nome do usuário logado, um meio de sair do sistema e acesso às outras funcionalidades.

gerenciamento 1 - ao abria a tela, lista 3 registros pelo script, ao cadastra um novo, a lista atualiza sozinha, deve ter busca para localizar algo específico, no cadastro todos os campos ficam disponíveis, menos a chave primária, dados sensíveis criptografados.

gerenciamento 2  -ao cadastrar o registro deve estar associado a um registro da 1 entidade.

gerenciamento  de agendamento - agendamento entra automático na lista, com todas as informações. a lista segue o critério de ordenação do caderno de prova e traz os dados das entidades ligadas a ele.

