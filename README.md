# Desafio MB Psicologia


## Instruções
O projeto utiliza SQLite através da ORM do Prisma, para inicializá-lo localmente é necessário iniciar rodar o comando `yarn prisma migrate dev` (caso esteja utilizando o yarn como gerenciador de pacotes) para criar o banco de dados. 

Após isso, é necessário criar um arquivo .env na raiz da pasta server, contendo a linha `DATABASE_URL="file:./dev.db"`, que é onde é criado por padrão o database.

Após os dois passos anteriores, basta rodar o servidor com o script `yarn start:dev` na pasta server e o script `yarn dev` na pasta web, onde fica o projeto front-end.
