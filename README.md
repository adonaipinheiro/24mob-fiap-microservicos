# Desenvolvimento de Microserviços e API´s - FIAP

<b>Prof EDILSON JESUS DA SILVA</b>

Atividade para alunos da Fiap 

O aluno deve desenvolver duas estruturas de backend , sendo a primeira para cadastrar usuários, onde este deva conter os seguintes campos: nomeusuario, email, senha, nomecompleto, telefone, datacadastro. Nesta estrutura deve haver as seguintes ações: 

- cadastrar usuario; 

- criptografar a senha; 

- autenticar usuário; 

- gerar o token com jwt; 

- alterar senha. 

Para a segunda parte da atividade, o aluno deve criar uma estrutura para cadastrar e atualizar informações financeiras dos usuários. Neste projeto o aluno deve construir o código de tal forma que ao tentar cadastrar ou atualizar os dados os usuários, será requisitado o token gerado na autenticação do primeiro serviço. As informações financeiras só poderão ser cadastras e/ou atualizadas se houver um token válido. Os dados financeiros serão: 

- nome_banco, tipo_conta, nome_titular, limite_cartao. 

# Como rodar o projeto

1. Abrir o repositório e instalar as dependências nos respectivos projetos
    - Para o bank-service: <code>cd bank-service && yarn install && yarn dev</code>
    - Para o user-service: <code>cd user-service && yarn install && yarn dev</code>
    - Feito isto os serviços já estarão rodando
2. Importar as collections e environments da pasta `.postman` no Postman
3. Com os passos feitos acima é só navegar no Postman realizando os testes de implementação.
