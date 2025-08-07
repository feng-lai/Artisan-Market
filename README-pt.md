
# 🚦 Visualização de Riscos de Trânsito

Este projeto é um sistema de visualização de dados de perigos de trânsito desenvolvido com **Vue.js**, **ECharts** e **Amap (Gaode Map)**. Ele permite a visualização interativa de divisões administrativas em múltiplos níveis e apresenta informações de tráfego em várias dimensões por meio de gráficos dinâmicos e mapas interativos.

---

## 🌍 Traduções disponíveis

- [English (README.md)](README.md)
- [日本語 (README‑jp.md)](README‑jp.md)
- [العربية (README‑ar.md)](README‑ar.md)
- [Español (README‑es.md)](README‑es.md)

---

## 📌 Funcionalidades

- 🌐 **Visualização de divisões administrativas multinível**  
  Suporte para visualização geográfica interativa em nível de província, cidade e distrito usando Amap e ECharts.

- 📊 **Vários tipos de gráficos**  
  Visualize dados de trânsito com gráficos de barras, linhas, pizza, mapas de calor e diagramas de dispersão.

- 🧭 **Interação dinâmica com o mapa**  
  Interações como passar o mouse, zoom, clique para explorar e alternar regiões.

- 🧩 **Visualização de dados multidimensional**  
  Apresentação de dados a partir de diferentes perspectivas, como tempo, localização, gravidade e tipo de risco.

- 🔧 **Arquitetura modular e escalável**  
  Baseado em componentes Vue.js para facilitar o desenvolvimento, manutenção e escalabilidade.

---

## 🛠️ Tecnologias Utilizadas

- **Framework Front-end**: [Vue.js](https://vuejs.org/)
- **Visualização de Dados**: [ECharts](https://echarts.apache.org/) + [Amap JS API](https://lbs.amap.com/)
- **Ferramentas de Desenvolvimento**: Vue CLI, Axios, Node.js

---

## 🚀 Primeiros Passos

### Pré-requisitos

- Node.js (>= versão 14)
- npm ou yarn

### Instalar Dependências

```bash
npm install
# ou
yarn install
````

### Iniciar Servidor de Desenvolvimento

```bash
npm run serve
# ou
yarn serve
```

Depois, abra seu navegador e acesse [http://localhost:8080](http://localhost:8080).

---

## 📁 Estrutura do Projeto

```
Visualization-of-Traffic-Hazards/
├── public/
│   └── index.html              # Template HTML
├── src/
│   ├── assets/                 # Recursos estáticos
│   ├── components/             # Componentes Vue (mapas, gráficos, etc.)
│   ├── views/                  # Páginas principais
│   ├── router/                 # Configuração do Vue Router
│   ├── App.vue                 # Componente raiz
│   └── main.js                 # Ponto de entrada
├── .env                        # Variáveis de ambiente
├── package.json
└── README-pt.md
```

---

## 📈 Prévia da Demonstração

> Você pode hospedar o projeto localmente ou implantá-lo online para uma demonstração interativa.
> Adicione capturas de tela ou um link de demonstração se disponível.

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.
Você pode usá-lo, modificá-lo e distribuí-lo livremente com a devida atribuição.

---

## 🙌 Agradecimentos

* [Vue.js](https://vuejs.org/)
* [Apache ECharts](https://echarts.apache.org/)
* [Amap (Gaode Map) JS API](https://lbs.amap.com/)

