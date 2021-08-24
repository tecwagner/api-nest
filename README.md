# api-nest

## Principais Tecnologias utilizadas.

    - Nest.js
    - Node.js
    - typescript
    - typeORM Integration
    - Postegresql
    - graphql
    - Docker

## Instalar dependencias local

    - npm install

## Executar projeto local

    - npm run start:dev

## Executar test local

    - npm run test:cov

## Executart o projeto no docker

    - docker compose up

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

    exemplo: docker exec [api_nest ou id container] npm install [nome da dependencia]

    execute: docker  exec f34ca92b0d86  yarn add nodemon

    Observação: Todos os comandos não serão mais executados local do computador, sim dentro do container docker.

        dependecias nestjs criando modulo dentro do container.

        execute: docker-compose exec api nest g service [nome do modulo]

## Start projeto

    execute: docker compose up

## Configurar as Variaveis de Ambiente

    Podemos renomear o arquivo [ormconfig.json para ormconfig.js]

    assim iremos passar as variaveis de ambiente para um arquivo javascript.

## Principio de test FIRST

    - F = Fast (Rapido)
    - I = Independent = (Teste tem ser independente)
    - R = Repeatable = (Tem que repetir e toda repetição tem que retorna o mesmo resultado)
    - S = Self Validation (Trataiva de validação)
    - T = Timely (Feito a tempop)

## Aplicando Test Unit User.Service.Spec

    . Criando uma describe para cada funcionalidade

        - Identificar o use Repository

        - Criando uma variavel com as funções mockRepository de User

            A cada metodo de chamada utilizando o respository

## Criar um arquivo TestUtil

    - Desntro de src > common > test.

        - Dentro deste arquivo será criado um mock de dados de usuário.

## Primeiro teste escrito será listar todos usuários.

    - describe (É o corpo do teste) = findAllUsers

    - it (Ele informa o que deve e oque não deve ser feito) = sholud be list all users

        - pegar um usuário valido! =  const user = TestUtil.giveAmeAvalid

        - é preciso buscar o resultado que está no banco. Neste momento podemos usar o mockRepository. = mockRepository.find.mockReturnValue([user, user]);

        - é passado uma chamada assincrona na service para chamar a função  = const users = await service.findAllUsers();

        - Dentro de it() teste pode existir diversos expect.
            - expect ( é o resultado esperado do teste executado que será a quantidade de usuário)
            - expect (chama o mockRespository, na função find, para saber a quantidade de chamada que foi realizada.)

    - describe ( corpo do teste ) = findUserById

    - it (Ele informa o que deve e oque não deve ser feito) =

        - pega um usuário válido = const user = await TestUtil.giveAmeAvalidUser();

        - é preciso buscar o resultado que está no banco. Neste momento podemos usar o mockRepository = mockRepository.findOne.mockReturnValue(user);

        - O service guarda o metodo findUserById, será testado esse metodo da service que deve retorna um usuário existente passando o paramentro 'id'

        - O expect usuário existente = expect(userFound).toMatchObject({ name: user.name });

        - O expect mockRepository.findOne determina a quantidade vez que ele foi chamada = expect(mockRepository.findOne).toHaveBeenCalledTimes(1)

    Para fazer o tratamento do if dentro da função findUserById()

    - Será criado um novo describe( aguardando um return de exception de usuário inválido)

    - it (Ele informa o que deve e oque não deve ser feito) =

        - é preciso buscar o resultado que está no banco. Neste momento podemos usar o mockRepository = mockRepository.findOne.mockReturnValue(user);

        - O expect dentro função vai receber a chamada do metodo de service dentro =  expect(await service.findUserById('3'))

        - passando o reject exception instaciando o metodo para validar a exeção = .rejects.toBeInstanceOf(
        NotFoundException,
      );

       - O expect mockRepository.findOne determina a quantidade vez que ele foi chamada = expect(mockRepository.findOne).toHaveBeenCalledTimes(1)

## Criar um reset para os metodos de teste

    - utilizando da função beforeEach() passando o reset para limpar todos o metodos do service.

        . exemplo:

        beforeEach(() => {
            mockRepository.find.mockReset();
            mockRepository.findOne.mockReset();
            mockRepository.create.mockReset();
            mockRepository.save.mockReset();
            mockRepository.update.mockReset();
            mockRepository.delete.mockReset();
        });

## Teste de criação de usuario

    - describe (É o corpo do teste) = createUser

    - it (Ele informa o que deve e oque não deve ser feito) = should create a user

        - pegar um usuário valido! =  const user = TestUtil.giveAmeAvalid

        - é preciso buscar o resultado que está no banco. Neste momento podemos usar o mockRepository. =
        mockRepository.save.mockReturnValue(user);
        mockRepository.create.mockReturnValue(user);

        - O create user faz uma chamada asincrona no service de create por usuario.

        - O expect(saveUser).toMatchObject(user) = Ele recebe um objeto user e faz comparação utilizando '.toMatchObject(user)' para ter certeza se os valores são iguais

    - it (validar a exception de criação de usuario, não existente)

            - ele recebe o mockRepository de usuarios do TestUtil

            - Para validar a exception é preciso passar pela criação e save os metodos createUser.

            - Para validar o metodo service.createUser(user)

                - será adicionado .cath(e =>) essa função faz o tratamento de validação da exception.

                    . testado a instacia do evento de erro que está dentro do if.

                    . testando a mensagem de objeto enviada pelo exception.

## Criação de teste update

    - describe (É o corpo do teste) = update

        - it (Ele informa o que deve e oque não deve ser feito) = should update a user

        - pegar um usuário valido! =  const user = TestUtil.giveAmeAvalid

        - criar uma variavel de usuário para o update

        - Os mockRepository estão acesando os metodos do updateUser

            . findOne = recebe um usuario que está mocado

            . update = recebe um objeto de dados uma copia 'updatedUser' de usuário que está mocado

            . em seguida faz a update do user

        - Os mockRepository estão acesando os metodos do create

            . findOne = recebe um usuario que está mocado

            . update = recebe um objeto de dados uma copia 'updatedUser' de usuário que está mocado

            . em seguida faz a criação de um novo user

            - É criado o resultUser para acessar o metodo service.update( que recebe o 'id' do usuário mocado.)

                . recebe ...user, que é os dados mocado do usuário

                . recebe ...updateUser, que é um objeto dos dados a ser alterado.

            - Expect retorna o resultado do 'resultUser' que o objeto 'updatedUser' mocado.

            - Cada expect create, fidOne e update. Deve ser executado somente uma vez.

## Criação de teste de delete.

     - describe (É o corpo do teste) = deleteUser

        - it (Ele informa o que deve e oque não deve ser feito) = should delete a existing user

        - pegar um usuário valido! =  const user = TestUtil.giveAmeAvalid

        - criar uma variavel de deleteUser para acessar o metodo service.deleteUser =  const deletedUser = service.deleteUser('1'); passnado o id que será deletado

        - Os mockRepository estão acesando os metodos do deleteUser

            . findOne = recebe um usuario que está mocado

            . delete = recebe um usuário está mocado e será deletado.

        - O expect recebe o resultado do deletedUser e deve retorna 'true'

        - Cada expect fidOne e delete. Deve ser executado somente uma vez.

        - É preciso validar o usuário inexistente

            it (Should not delete a inexisting user)

                - o recebe o resultado do metodo 'null' = mockRepository.delete.mockReturnValue(null);

                - A variavel deletedUser recebe um 'id' inválido = const deletedUser = service.deleteUser('5');

                - o expect deve receber 'false' = expect(deletedUser).toBe(false);

## Refatorando o codigo

    - No arquivo package.json

        - Adicione outro metodo de teste = "test:vew": "jest --verbose",

            . execute o comando: npm run test:vew

## Criando Authenticação de usuário validando com jwt

    . Para realizar essa authenticação de usário será utilizado o a lib https://www.passportjs.org/packages/.

    . Documentação que indica o nestjs: https://docs.nestjs.com/security/authentication.

## Na pasta User iremos acessar a entidade.

    - src > user >  user.entity.ts.

        - Será adicionado mais um campo para o password com tipo string.

             - adicione a propriedade @HideField() no password, pra não ser retornado, no filtro de users

        - Nesse campo será aplicado o tratamento de transformes, para reber e enviar dados do banco de dados.

    - Crie uma pasta helpers > crypto.ts

        - instalar a lib bcrypt.

            execute: docker  exec [nome api ou id container] yarn add bcrypt

        - instalat o tipo da lib em modo de desenvolvimento para ter acesso aos auto import.


            execute: docker exec [nome api ou id container] yarn add @types/bcrypt -D.

    - Return na função hashSync() que você pretende cripto grafar.

        - No to() recebe o password para ser cripottafada

            . E retorna ela criptografada.

        - O from() traz a senha criptografada do to().

        - O nome do meu metodo: hashPasswordTransform.

            . Será adicionado na entity.ts, no objeto do password{transformer: hashPasswordTransform}

    Nossos Dtos

        - Na classe Create User Input, adicione o campo de password

            @IsString()
            @IsNotEmpty({ message: 'Este campo senha não pode estar vazio' })
            password: string;

        - Na classe Update User Input, adicione o campo de password, será um campo opcional

            @IsString()
            @IsOptional()
            @IsNotEmpty({ message: 'Este campo senha não pode estar vazio' })
            password: string;

## Pesquisar usuário pelo e-mail

    - Na classe UserService

        - Será adicionado um metodo de busca por email findUserByEmail().

            . Passando um objeto where: {email}


    - Na classe UserResolver

        - Será adicionado um metodo de busca por email findUserByEmail().

        - userByEmail()

# Criar modulo Auth

    - Para criar o module de Authentication

        - Execute o comando: nest g mo auth

    - Criar a classe AuthService

        - Execute o comando: nest g s auth

    - Criar a classe AuthResolve

        - Execute o comando: nest g r auth

## Criar uma pasta de DTO para o auth

    - src > auth > dto

## Criando os metodos de validação na classe AuthService

    - Criar o metodo para validar o usuário, verificando se senha é valida.

        - A função validateUser(data: AuthInput) = Recebe as tipagens que foram declaradas no dto.

        - Tipar o return do validateUser.

            - Será criado a tipagem dentro da pasta DTO

                . auth.type.ts.

                - O que será retornado? O usuario e o token.

                    . async validateUser(data: AuthInput): Promise<AuthType> = Importado a tipagem.

## Criando os metodos de validação na classe AuthResolver

    - Criando a Mutation de login.

    - Esquecer de passar o retorno da tipagem na @Mutation

        . @Mutation(() => AuthType)

## Criando os metodos de validação na classe AuthModule

    - importando o UserService para o providers:

    - Fazer o imports: [TypeOrmModule.forFeature([User])],

## Instalar o JWT para criptografar a senha

    * Documentação: https://docs.nestjs.com/security/authentication#jwt-functionality

    - Intall passport

        - npm install --save @nestjs/passport passport passport-local

        - npm install --save-dev @types/passport-local

    - Install jwt passport

        - npm install --save @nestjs/jwt passport-jwt

        - npm install --save-dev @types/passport-jwt

## Criar uma metodo privado na classe auth.service.ts

     - Adicione a classe como private do jwtService no constructor() e faça o import.

     - Criando uma classe privada para criação do token. Recebendo o usuário como parametro.

        - Passando o retorno do this.jwtService.signAsync(payload)

     - Faça a chamada token atraves do metdodo jwtToken que foi criado.

            . const token = await this.jwtToken(user);

            . Recebendo o usuário.

## Na classe auth.module.ts

    * Documentação: https://docs.nestjs.com/security/authentication#jwt-functionality

    - É preciso importar o JwtModule.

    - Para definição da chave secreta para geração do token, é necessario criar no .env.

        - JWT_SECRET=*******

    - Para referenciar a chave secreta dentro do auth.module.

        - Utilizamos a função register

             JwtModule.registerAsync({
                useFactory: () => ({
                    secret: process.env.JWT_SECRET,
                    signOptions: {
                    expiresIn: '30s',
                    },
                }),
             }),

## Criar classe jwt.strategy.ts

    - src > auth > jwt.strategy.ts

    A validação será feito pelo payload do id do usuario que está no banco de dados

    Agora podemos atender ao nosso requisito final: proteger os terminais, exigindo que um JWT válido esteja presente na solicitação. O Passport também pode nos ajudar aqui. Ele fornece a estratégia passport-jwt para proteger endpoints RESTful com JSON Web Tokens. Comece criando um arquivo chamado jwt.strategy.ts na auth pasta e adicione o seguinte código:

    - Importar pra dentro do providers: [JwtStrategy] na classe auth.module.ts

## Criar class auth.guard.ts

    - src > auth > auth.guard.ts

## Criar um guard das rotas

    Para usar um AuthGuard com GraphQL , estenda a classe AuthGuard integrada e substitua o método getRequest ().

## Adicionar context para fazer a request da requisição utilizando Graphql

    - src > app.module

        - GraphQLModule.forRoot({ context: ({ req }) => ({ req }), })

## Adicionar o Guard dentro da rota

    - Na classe user.resolver.ts

        - Adicione acima da notation @Query a Notation @UseGuards(GqlAuthGuard)

          - Passando o nome da classe auth.guard.ts = GqlAuthGuard