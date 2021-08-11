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
