<div align="center">
    <img width="1000" alt="Mocci & Co. Handwork banner: a fictional handmade plush toy store" src="https://github.com/user-attachments/assets/b2c0d955-027e-4c21-98e6-c13e2ff4034d" />
  <br><br>

![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript 5.8](https://img.shields.io/badge/TypeScript_5.8-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite 6.3](https://img.shields.io/badge/Vite_6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS 3.4](https://img.shields.io/badge/Tailwind_CSS_3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion 12](https://img.shields.io/badge/Framer_Motion_12-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Router 7.6](https://img.shields.io/badge/React_Router_7.6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

  # Mocci & Co. Handwork E-commerce

  Uma loja fictícia de pelúcias artesanais, construída como projeto de portfólio para demonstrar engenharia frontend voltada para produção.

  <strong><a href="https://mocci-and-co-handwork.vercel.app/">Ver a demo ao vivo</a></strong>

</div>

<br>

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológica](#stack-tecnológica)
- [Arquitetura e Decisões de Design](#arquitetura-e-decisões-de-design)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Começar](#como-começar)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Testes](#testes)
- [Acessibilidade](#acessibilidade)
- [Performance](#performance)
- [Vitrine Visual](#vitrine-visual)
- [Roadmap](#roadmap)
- [Limitações Conhecidas](#limitações-conhecidas)
- [Convenções](#convenções)
- [Licença e Direitos Autorais](#licença-e-direitos-autorais)

<br>

## Visão Geral

**Mocci & Co. Handwork** é um e-commerce fictício especializado em pelúcias artesanais. Foi desenvolvido como projeto de portfólio para demonstrar engenharia frontend com ênfase em:

- Arquitetura de software escalável e orientada a features
- Componentização e reuso de código por meio de custom hooks
- Experiência de usuário moderna e acessível
- Design responsivo mobile-first
- Otimização de performance e bundle

O projeto cobre um fluxo realista de e-commerce, do início ao fim, no client: navegação, filtros, busca, gerenciamento de carrinho e um checkout completo em múltiplas etapas com pagamentos simulados.

> Este é um projeto frontend. Ele roda inteiramente no navegador, usando dados mockados. Uma API de backend está em desenvolvimento (veja [Roadmap](#roadmap)); propositalmente ela não é documentada como funcionalidade aqui até ser lançada.

<br>

## Funcionalidades

### Catálogo de Produtos
- **Filtragem multi-critério**: filtre por categoria, cor e faixa de preço
- **Busca por texto com debounce**: busca responsiva que evita refazer a filtragem a cada tecla digitada (`useDebouncedValue`)
- **Ordenação dinâmica**: por preço (crescente/decrescente), nome (A-Z / Z-A) e mais vendidos
- **Filtragem e ordenação memoizadas**: calculadas com `useMemo` para que os resultados sejam atualizados instantaneamente, sem trabalho desnecessário
- **UI de filtros responsiva**: sidebar e controles adaptados para mobile e desktop

### Experiência do Produto
- **Galeria de imagens interativa** com transições suaves
- **Carrossel otimizado para mobile** para navegação por toque
- **Lightbox em tela cheia** via `yet-another-react-lightbox`
- **Seção de produtos recomendados** ("Você também pode gostar")
- **Avaliações e notas** com um componente de rating reutilizável
- **Compartilhamento** usando a Web Share API, com fallback de cópia para a área de transferência

### Carrinho e Checkout
- **Carrinho com controle de estoque**: as quantidades são limitadas ao estoque disponível tanto ao adicionar quanto ao atualizar itens
- **Carrinho persistente**: o conteúdo do carrinho é salvo no `localStorage` e restaurado entre sessões
- **Checkout em múltiplas etapas**: etapas guiadas de entrega e pagamento
- **Métodos de pagamento simulados**: cartão de crédito (com parcelamento), Pix (QR code mockado) e boleto bancário
- **Cupons de desconto**: um mecanismo de desconto construído com o padrão Strategy, estruturado para que novos tipos de cupom possam ser adicionados sem alterar os pontos de chamada
- **Opções de presente** no checkout
- **Validação de formulários**: validação em tempo real e type-safe, orientada por um hook de validação reutilizável

### Experiência do Usuário
- **Notificações toast** usando `react-hot-toast`
- **Microinterações** com Framer Motion
- **Lista de desejos persistente**: favoritos salvos no `localStorage`
- **Error boundary** com uma página de erro personalizada, além de uma página 404 dedicada
- **Estados de carregamento**: uma tela de loading personalizada usada como fallback do Suspense em nível de rota

### Engajamento e Comunicação
- **Cadastro na newsletter**: um formulário de captura de e-mail com seu próprio hook de validação
- **Formulário de contato**: um formulário de contato dedicado, com validação por campo
- **Páginas de conteúdo**: FAQ, Política de Privacidade e Envio & Devoluções

### SEO
- **Metadata nativa do React 19**: `<title>`, meta description e link canônico por página, renderizados sem nenhuma biblioteca de terceiros (sem `react-helmet`)
- **Open Graph e Twitter Card**: tags completas de preview social (title, description, type, url, image) para compartilhamento de links enriquecido
- **Dados estruturados (JSON-LD)**: blocos de schema injetados por página, com serialização segura contra XSS
- **Controle de indexação**: `noindex` / `nofollow` opcionais por página
- Tudo isso entregue por meio de um único componente `Seo` reutilizável, aplicado em todas as páginas

<br>

## Stack Tecnológica

| Categoria         | Tecnologia                                                    |
| ---------------- | ------------------------------------------------------------- |
| **Framework**    | React 19                                                      |
| **Linguagem**     | TypeScript 5.8                                                |
| **Build tool**   | Vite 6.3 (com o plugin SWC para React)                          |
| **Estilização**      | Tailwind CSS 3.4                                              |
| **Animação**    | Framer Motion 12                                              |
| **Roteamento**      | React Router DOM 7.6                                          |
| **Notificações**| React Hot Toast                                               |
| **Ícones**        | React Icons, Heroicons                                        |
| **Mídia**        | Yet Another React Lightbox, qrcode-svg                        |
| **Testes**      | Vitest, React Testing Library, jsdom                          |
| **Qualidade de código** | ESLint 9 (flat config) com typescript-eslint                |
| **Deploy**   | Vercel                                                        |

<br>

## Arquitetura e Decisões de Design

O projeto segue uma **arquitetura orientada a features e baseada em componentes**. O estado e as regras de negócio ficam em **custom hooks** e **context providers**, mantendo os componentes de UI focados na renderização.

- **Custom hooks (26)**: carrinho, favoritos, estado do checkout, validação de formulários, filtros, input com debounce, descontos, entre outros. A lógica de negócio é extraída dos componentes para permanecer testável e reutilizável.
- **Context, separado por responsabilidade**: cada store global separa a definição do context do seu provider (por exemplo, `CartContext.ts` + `CartProvider.tsx`, `DiscountContext.ts` + `DiscountProvider.tsx`). Isso mantém limites amigáveis ao fast refresh e evita surpresas com re-renderizações.
- **Padrão Strategy para descontos** (`utils/discountStrategies.utils.ts`): uma interface `DiscountStrategy` mais um resolver, de forma que adicionar um novo tipo de cupom seja apenas uma questão de adicionar uma strategy, em vez de editar condicionais espalhadas pela aplicação.
- **Code splitting em nível de rota**: cada página é carregada com `React.lazy` e renderizada dentro de um único boundary `Suspense` com um fallback de loading personalizado, mantendo o bundle inicial enxuto.
- **Error boundary**: a aplicação é envolvida por um error boundary que renderiza uma página de erro amigável, compartilhando o mesmo componente com a rota 404.
- **Helpers de precificação com controle de estoque**: os cálculos do carrinho (subtotal, contagem de itens, limitação de estoque) são implementados como pequenos helpers puros, o que torna a lógica previsível e fácil de cobrir com testes.

<br>

## Estrutura do Projeto

```
src/
├── assets/        # Fontes, imagens, favicon
├── components/
│   ├── common/    # UI genérica (buttons, display, feedback, form, icons)
│   ├── features/  # Componentes de feature (cart, checkout, payment, product, filter, contact)
│   ├── layout/    # Header e footer
│   └── sections/  # Seções de página (home, product, policy, common)
├── constants/     # Constantes globais
├── context/       # Estado global (arquivos de context + provider)
├── data/          # Dados mockados (products, filters)
├── hooks/         # Custom hooks
├── models/        # Modelos de domínio
├── pages/         # Páginas de rota
├── styles/        # Estilos globais
├── types/         # Definições de tipos compartilhadas
└── utils/         # Helpers puros (currency, discounts, filters, order, payment, qrcode)
```

**Páginas / rotas**: Home (`/`), Produtos (`/products`), Detalhe do Produto (`/products/:id`), Sobre (`/about`), Contato (`/contact`), Carrinho (`/cart`), Lista de Desejos (`/wishlist`), Checkout (`/checkout`), FAQ (`/faq`), Política de Privacidade (`/privacy-policy`), Envio & Devoluções (`/shipping-returns`) e um fallback 404.

<br>

## Como Começar

### Pré-requisitos
- **Node.js 18 ou superior** (recomenda-se Node 20 LTS; exigido pelo Vite 6)
- **npm** (o repositório inclui um `package-lock.json`)

Nenhuma variável de ambiente é necessária para rodar o projeto. Ele usa dados mockados e não faz chamadas a uma API externa.

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/isabellimocci/handwork-ecommerce.git
cd handwork-ecommerce

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação ficará disponível na URL exibida pelo Vite no terminal (por padrão, `http://localhost:5173`).

### Build de produção

```bash
npm run build     # verifica os tipos com tsc e depois builda com Vite
npm run preview   # serve o build de produção localmente
```

<br>

## Scripts Disponíveis

| Script            | Descrição                                             |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento do Vite                       |
| `npm run build`   | Verifica os tipos (`tsc -b`) e gera um build de produção    |
| `npm run preview` | Faz o preview do build de produção localmente                    |
| `npm run lint`    | Executa o ESLint em todo o projeto                           |
| `npm run test`    | Executa a suíte de testes com Vitest                          |

<br>

## Testes

Os testes rodam com **Vitest**, **React Testing Library** e **jsdom**.

```bash
npm run test
```

A cobertura atual está focada no fluxo de checkout (renderização dos campos de entrega e das opções de envio). A cobertura está sendo expandida para a lógica de negócio pura mais importante de proteger: validação de desconto (`validateDiscount`), subtotal do carrinho e limitação de estoque, e formatação de moeda. Contribuições em testes seguem o padrão existente de arquivos `*.test.tsx` colocalizados.

<br>

## Acessibilidade

Acessibilidade é uma preocupação de primeira classe neste projeto. A interface é construída com HTML semântico, controles operáveis via teclado e labels significativos, e a camada visual busca contraste de cor suficiente.

> Para manter esta seção honesta e atualizada, rode uma auditoria (Lighthouse e/ou axe DevTools) contra o build publicado e registre os resultados abaixo.

| Auditoria             | Nota |
| ----------------- | ----- |
| Lighthouse (a11y) | _rodar e preencher_ |

<br>

## Performance

A performance é sustentada por:
- **Code splitting em nível de rota** com `React.lazy` e `Suspense`
- **Compilação baseada em SWC** via `@vitejs/plugin-react-swc`
- **Filtragem e ordenação memoizadas** para evitar computação redundante
- **Assets de imagem otimizados** para a vitrine e a mídia dos produtos

> Os números do Lighthouse mudam a cada alteração relevante na UI. Rode novamente contra o deploy atual e atualize a tabela abaixo em vez de confiar em resultados antigos.

| Métrica          | Nota |
| --------------- | ----- |
| Performance     | _rodar e preencher_ |
| Best Practices  | _rodar e preencher_ |
| SEO             | _rodar e preencher_ |

<br>

## Vitrine Visual

Os clipes abaixo são animações em loop. Para uma versão não animada e totalmente interativa, visite a [demo ao vivo](https://mocci-and-co-handwork.vercel.app/).

### Desktop

<div align="center">
  <img src="./public/desktop-demo.gif" alt="Animated walkthrough of the desktop store: browsing the plush toy catalog, filtering products, opening a product page, and adding an item to the cart">
</div>

Tour pelo desktop: navegando pelo catálogo, filtrando produtos, abrindo uma página de produto e adicionando um item ao carrinho.

### Mobile

<div align="center">
  <img src="./public/mobile-demo.gif" alt="Animated walkthrough of the mobile store: the responsive layout, mobile navigation, and adding a product to the cart" width="200px">
</div>

Tour pelo mobile: o layout responsivo, a navegação mobile e a adição de um produto ao carrinho.

<br>

## Roadmap

- [ ] **API de backend** (em andamento): mover produtos, carrinho e pedidos para trás de um serviço real
- [ ] **Autenticação de usuário**: contas, sessões e checkout protegido
- [ ] **Estoque real**: estoque controlado pelo servidor, com disponibilidade ao vivo
- [ ] **Persistência e histórico de pedidos**
- [ ] **Cobertura de testes automatizados mais ampla** em hooks e lógica de negócio

<br>

## Limitações Conhecidas

- **Dados mockados**: produtos e filtros vêm de dados estáticos, não de uma API real
- **Pagamentos simulados**: o checkout completa um fluxo de pagamento falso, sem transações reais
- **Ainda sem autenticação**: não há contas de usuário nesta versão
- **Estoque apenas no client**: os níveis de estoque são estáticos e aplicados no navegador; não há inventário em tempo real
- **Formulários apenas no client**: os formulários de contato e newsletter validam a entrada, mas ainda não a persistem nem a enviam, aguardando o backend

<br>

## Convenções

- **Commits** seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/) (`feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `test`)
- **Componentes** usam nomes de arquivo em PascalCase; **hooks** seguem a convenção `useX`; **helpers puros** usam o sufixo `*.utils.ts` e **modelos de domínio** usam `*.model.ts`
- **Path aliases** estão configurados no TypeScript e no Vite para imports mais limpos
- **Sugestão de adição**: declarar uma versão suportada do Node no `package.json` por meio do campo `engines` (por exemplo, `"engines": { "node": ">=18" }`), para que contribuidores e CI usem um runtime compatível

<br>

---

<div align="center">

## Licença e Direitos Autorais

© 2025-2026 Isabelli Mocci. Todos os direitos reservados.

Este é um projeto pessoal de portfólio. O design, o código e o conceito não podem ser copiados, modificados ou distribuídos sem permissão.

<br>

Feito com 🩷 por <a href="https://www.isabellimocci.com/">Isabelli Mocci</a>

[🌐 Portfólio](https://www.isabellimocci.com/)
| [💼 LinkedIn](https://www.linkedin.com/in/isabellimocci/)
| [🐱 GitHub](https://github.com/isabellimocci)
| [📬 E-mail](mailto:isabellimocci.tech@gmail.com)

</div>
