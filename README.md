# Tasks Tracker VueJs
## Descrição/objetivo do projeto:
* Aplicativo de estudo que registra tarefas realizadas com seus respectivos tempos gastos.
* Há o cadastro básico de projetos para relacionar as tarefas.
* A versão final faz uso de uma API Json Server, cujo deploy encontra-se no Render.
* O CSS do projeto utilizado é o Bulma.
* Mais informações a seguir.
## Instrutor
O estudo e implementações foram realizados com base em conhecimentos adquiridos no treinamento da [**Alura**](https://www.alura.com.br/), cujo instrutor foi o [**Vinicios Neves**](https://cursos.alura.com.br/user/viniciosneves).
## Project setup
### Instalação das dependências
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Dependências utilizadas além do Vue CLI inicialmente:
```
npm i vue-router@4 (instação de recurso de rotas, para Vue 3)
npm i vuex@next (instação de recurso relacionado a estado da app, para Vue 3)
npm i -g http-server
```
### Dependências para rest e interação:
```
npm install -g json-server (consegue emular o funcionamento de APIs REST)
npm i axios (responsável por criar requisições REST)
```

#### Para executar o servidor json-server emulando conexão rest (rodar em outro bash/prompt de comando):
```
json-server --watch db.json
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
