# api-nest

## Principais Tecnologias utilizadas.

    - Nest.js
    - Node.js
    - typescript
    - typeORM Integration
    - Postegresql
    - graphql

## Instalando o postgressql

    - execute: npm install --save typeorm pg
    - npm install --save @nestjs/graphql graphql-tools graphql

## App.Module

    - import { TypeOrmModule } from '@nestjs/typeorm';

## Criar uma um arquivo na raiz do projeto

    - ormconfig.json

## Instalando o graphql, com apollo-server

    documentação: https://docs.nestjs.com/graphql/quick-start

    - npm i @nestjs/graphql graphql apollo-server-express@2.x.x

## Importar o Graphql para o module

    documentação: https://docs.nestjs.com/graphql/quick-start

    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    })

## Instalar o module de user no nestjs

    Para criar um modulo de usuario execute o comando a baixo, ele criara o modulo de user.

    src > user.module.ts

        - execute: nest g module user

    src > user.service.ts

        - execute: nest g service user

    src > user.resolver.ts

        - execute: nest g resolver user

    src > user.entity.ts

        * Criar a classe de entity.ts para o module de user

    para mais comandos pode se utilizar

        - execute: nest --help

## Instalar plugin CLI

    documentação: https://docs.nestjs.com/graphql/cli-plugin

    adicionar esse campos no arquivo: nest-cli.json

        "compilerOptions": {
            "plugins": ["@nestjs/graphql/plugin"]
        }

## Criar a pasta DTO com arquivo de validação

    (data transfers object)
    - Os DTO são arquivos serão revertidos para criação de usuario, se espera que dado convertido seja especificado no DTO.

    src > user > dto > create-user.input.ts

       - Criar as validações dentro dos dto

## Instalar class transform

    execute: npm i class-transformer

## Na classe de user.service

    O service deve solicitar a instacia de user um repository para aplicar os dados.

    Criar o metodo de createUserInput que está na entity.

## Na classe de user.resolver

    Ele faz o papel do controller, ponto de entrada e saida de dados da aplicação

    Criar o metodo para criação de usuario.

    - @Args é uma propriedade de arqumento do graphql

## Criar o imports de TypesOrmModules para classe User.module

    - imports: [TypeOrmModule.forFeature([User])],

## Comando para rodar aplicação

    - npm run start:dev

## Na classe user.service

    - criar um metodo de consulta de usuario findAllUsers
    - criar um metodo de consulta de usuario por findById

## Na classe user.resolver

    @Mutation(() => User)
    - criar uma query em graphql para criar os usuarios.

    @Query(() => User)
    - criar uma query em graphql para retornar todos os usuarios.

## Os dados de criação não está passando pela validação.

    - src > main

    add o app.useGlobalPipes(new ValidationPipe());

## criado mais um DTO para update

    -  src > user > dto > update-user.input.ts

    add @IsOptional() no campo que deseja que seja opção de alteração

## Na classe user.service update

    - criar um metodo de alterar usuario updateUsers pelo id

    O metodo updateUser ele reaproveita o metodo de consulta por id.

    apos a validação do id user exitente.

    ele puxa todos os dados do objeto {...data}

    em seguida é feito um merge dos dados existente do objeto {...user, ...data} e intrgrando ao data

## Na classe user.resolver update

    @Mutation(() => User)
    - criar uma query em graphql para alterar o usuario por id.

## Na classe user.service delete

    - criado o metodo deleteUser para remover usuario pelo id.

## Na classe user.resolver delete

     @Mutation(() => Boolean)
    - criar uma query em graphql para delete no usuario por id.

## Criando o Doker no projeto

    - Cada linha dentro do arquivo é considerado um stap, são salvos em cache.

    - criado o arquivo na raiz do projeto: Dockerfile.

        FROM node:12-alpine = imagem do projeto criada dentro dockerhub

        WORKDIR /home/api = local onde o projeto será alocado no container

        * Truque para melhorar o desempenho de alteração dos arquivos
            Em cada alteração no projeto não será necessario a instalação dos pacotes a baixo ao menos que eles tenha cido afetados.

            - COPY package.json .
            - COPY package-lock.json .

        COPY . . = Ele herda o caminho definido no workdir

        RUN npm install = comando para instalar o node dentro do container.

        CMD npm run start:dev = comando para executar o projeto dentro do docker.

    . Após a criação do arquivo podemos executar o docker utilizando o comando.

        Comando docker build -t [nome do projeto] . = O ponto no final do comando é o diretorio
        execute: docker build -t api-nest .

        execute: docker images = Lista o container com as imagens criadas.

        Para rodar o projeto pode executart: docker run e o [nome do projeto] que é listado no container

            execute: docker run api-nest

## Criando o banco de dados no docker

    - criado o arquivo na raiz do projeto: docker-compose.yml

    - Este arquivo terá as imagens e configuração do banco de dados

        documentação para configurar docker compose: https://docs.docker.com/compose/

    comando para iniciar o banco
        execute: docker-compose up

    No arquivo ormconfig.json

        O campo de 'host' deve ser definida pelo nome da base de dados que foi definida para o docker no arquivo: docker-compose.yml

    Em seguida deve executar um novo comando para rebuid no arquivo docker-compose.yml.

        execute: docker-compose up --build

    O service > api

        container_name: nest_api = Imagem da nossa api que foi criada para o docker hub
        build: . = O build '.' é o diretorio principal para aplicação ser executada
        ports:
        - '3000:3000' = Porta de execução da API
        volumes:
        - .:/home/api = O volume é um espelhamento do diretorio local, para que as alterações realizada seja atualizadas em tempo real.

        - /home/api/node_modules = É um espelhamento do diretorio do container para a maquina local

    O arquivo dockerfile foi editado para fazer rodar o npm install.

        CMD npm run start:docker:dev

    O arquivo package.json foi acrecentado um comando para executar o comando adicionado no aquivo Dockerfile.

         "start:docker:dev": "npm install && nest start --watch",

    Para executar o projeto sem build rodar o comando.

        execute: docker-compose up

    Em caso de problema com o Mapeamento de Volumes no docker-compose.yml

        Podemos rodar um comando para que o docker faça uma copia do 'node-modules'

        execute: docker cp nest_api:/home/api/node_modules/. ./node_modules

## Instalação de dependecias dentro do container docker

    exemplo: docker-compose exec api npm install [nome da dependencia]

    execute: docker-compose exec api npm install nodemon

    Observação: Todos os comandos não serão mais executados local do computador, sim dentro do container docker.

        dependecias nestjs criando modulo dentro do container.

        execute: docker-compose exec api nest g service [nome do modulo]

## Start projeto

    execute: docker compose up

## Configurar as Variaveis de Ambiente

    Podemos renomear o arquivo [ormconfig.json para ormconfig.js]

    assim iremos passar as variaveis de ambiente para um arquivo javascript.
