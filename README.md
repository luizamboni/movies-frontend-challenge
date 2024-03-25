Movies Frontend Challenge
===

Desafio Frontend - React

# Visão Geral
Este projeto foi desenvolvido usando node `20.11.1` com seu
esqueleto criado através do comando `npx create-react-app`.

Foi usado `typescript` para dar maior segurança através checagem de tipos em tempo de desenvolvimento e build.

Foi optado por usar o eslint com algumas regras personalizadas, que podem ser checadas e alteradas através do arquivo `package.json`.

# How to ?

### Como rodar o projeto.
Na raiz do projeto

Para instalar todas as dependências:
```shell
npm install
```

Para rodar os testes de software:
```shell
npm run test
```

Para ajustar automaticamente o código de acordo com o estilo do linter:
```shell
npm run lint
```

Para rodar a aplicação como modo development:
```shell
npm start
```

Para rodar em produção (ou próximo a isso) há um `Dockerfile` na raiz do projeto onde um build multi-step é feito, ao final rodando a aplicação como seu build sendo servido pelo Nginx.

Para contruir a imagem:
```shell
docker build -t movies .
```

Para executar:
```shell
docker run -p 8080:80 dashboard 
```



# A fazer:
- usar useCallback
- usar constantes ou enumeradores ao invés de comparar strings
