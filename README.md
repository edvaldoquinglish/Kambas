 
<div align="center">

#  KAMBAS

**O marketplace de freelancers de Angola.**  
Encontre os melhores profissionais locais para os seus projectos — com pagamentos via Unitel Money, Afri Money, Aki e multicaixa express 

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## 📖 Sobre o Projecto

**Kambas** é um marketplace 100% angolano que liga **clientes** a **freelancers locais** para serviços digitais. O nome vem da gíria angolana *kamba* (amigo/companheiro), reflectindo a ideia de ligar pessoas de confiança para trabalho.

A plataforma suporta pagamentos via **Unitel Money**,**Afri Money**, **Aki**, multicaixa express** tornando as transacções acessíveis a qualquer angolano, sem necessidade de cartão de crédito internacional.

### ✨ Funcionalidades Principais

| Funcionalidade | Descrição |
|---|---|
| 🔐 Autenticação Google | Login seguro via Google Sign-In |
| 👤 Perfis com papéis | Escolha entre **Freelancer** ou **Cliente** |
| 📋 Publicação de Gigs | Freelancers criam e gerem os seus serviços |
| 🔍 Explorar & Filtrar | Pesquise por categoria ou palavra-chave |
| 📦 Gestão de Pedidos | Fluxo completo: `pendente → em progresso → concluído` |
| 💰 Pagamentos Locais | Suporte a Unitel Money e Afri Money |
| 🤖 IA Integrada | Powered by Google Gemini API |
| 🛡️ Segurança Firestore | Regras granulares por papel e propriedade |

---

## 🗂️ Estrutura do Projecto

```
kambas_v2/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Barra de navegação (login, links)
│   │   └── Footer.tsx          # Rodapé da aplicação
│   ├── contexts/
│   │   └── AuthContext.tsx     # Contexto global de autenticação
│   ├── lib/
│   │   ├── firebase.ts         # Configuração Firebase + helpers de erro
│   │   └── utils.ts            # Utilitários (cn, etc.)
│   ├── pages/
│   │   ├── LandingPage.tsx     # Página inicial com Hero e categorias
│   │   ├── Explore.tsx         # Listagem e pesquisa de gigs
│   │   ├── GigDetails.tsx      # Detalhes de um gig específico
│   │   ├── Onboarding.tsx      # Configuração inicial do perfil
│   │   └── Dashboard.tsx       # Painel do freelancer/cliente
│   ├── types.ts                # Tipos TypeScript (UserProfile, Gig, Order)
│   ├── App.tsx                 # Rotas e estrutura principal
│   ├── main.tsx                # Ponto de entrada React
│   └── index.css               # Estilos globais (Tailwind)
├── firestore.rules             # Regras de segurança do Firestore
├── firebase-blueprint.json     # Estrutura das colecções Firebase
├── security_spec.md            # Especificação de segurança
├── .env.example                # Variáveis de ambiente necessárias
├── vite.config.ts              # Configuração do Vite
├── tsconfig.json               # Configuração TypeScript
└── package.json                # Dependências e scripts
```

---

## 🛣️ Rotas da Aplicação

| Rota | Página | Acesso |
|---|---|---|
| `/` | Landing Page | Público |
| `/explore` | Explorar Gigs | Público |
| `/gig/:id` | Detalhes do Gig | Público |
| `/onboarding` | Configurar Perfil | Apenas autenticado |
| `/dashboard` | Painel Pessoal | Apenas autenticado + onboarded |

> **Nota:** Utilizadores autenticados que ainda não completaram o onboarding são **redireccionados automaticamente** para `/onboarding`.

---

## 🗃️ Modelo de Dados

### `UserProfile`
```typescript
{
  uid: string;
  fullName: string;
  email: string;
  role: 'freelancer' | 'client';
  province?: string;
  municipality?: string;
  career?: string;
  bio?: string;
  unitelMoney?: string;  // Número de pagamento
  afriMoney?: string;    // Número de pagamento
  multicaixaexpress?: string;   // Número de pagamentos 
  Aki?: string;  // Número de pagamentos 
  nif?: string;          // Informação fiscal (privado)
  rating: number;
  onboarded: boolean;
}
```

### `Gig`
```typescript
{
  id: string;
  freelancerId: string;
  title: string;
  description: string;
  price: number;         // Em Kwanzas (AOA)
  category: string;      // Design | Tech | Escrita | Marketing | Vídeo
  images: string[];
  createdAt: Timestamp;
}
```

### `Order`
```typescript
{
  id: string;
  clientId: string;
  freelancerId: string;
  gigId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  paymentMethod: string; // 'unitel_money' | 'afri_money'
  amount: number;
  createdAt: Timestamp;
}
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- Uma conta no [Firebase](https://firebase.google.com/)
- Uma chave da [Gemini API](https://aistudio.google.com/)

### Passo 1 — Clonar o repositório

```bash
git clone https://github.com/seu-usuario/kambas.git
cd kambas
```

### Passo 2 — Instalar as dependências

```bash
npm install
```

### Passo 3 — Configurar as variáveis de ambiente

Copie o ficheiro de exemplo e preencha com os seus valores:

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```env
APP_URL="http://localhost:3000"
```

### Passo 4 — Configurar o Firebase

1. Aceda ao [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projecto
3. Active o **Authentication** com o método **Google**
4. Active o **Firestore Database**
5. Copie as credenciais do projecto para `firebase-applet-config.json`:

```json
{
  "apiKey": "...",
  "authDomain": "...",
  "projectId": "...",
  "storageBucket": "...",
  "messagingSenderId": "...",
  "appId": "...",
  "firestoreDatabaseId": "(default)"
}
```

6. Publique as regras de segurança:

```bash
firebase deploy --only firestore:rules
```

### Passo 5 — Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: **http://localhost:3000**

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila a aplicação para produção |
| `npm run preview` | Pré-visualiza o build de produção |
| `npm run lint` | Verifica erros de TypeScript |
| `npm run clean` | Remove a pasta `dist` |

---

## 🛡️ Segurança

O projecto implementa regras de segurança detalhadas no Firestore para garantir que:

- ✅ Um utilizador só pode **criar e editar o próprio perfil**
- ✅ Gigs são **visíveis a todos**, mas só editáveis pelo dono
- ✅ Pedidos só são visíveis ao **cliente e ao freelancer** envolvidos
- ✅ O campo `rating` **não pode ser modificado** directamente pelo utilizador
- ✅ Dados sensíveis como NIF são **restritos ao próprio utilizador**
- ✅ O `freelancerId` de um gig tem de corresponder ao UID do criador

Consulte [`security_spec.md`](./security_spec.md) para a especificação completa e os 12 cenários de ataque testados.

---

## 🧰 Stack Tecnológico

| Tecnologia | Versão | Finalidade |
|---|---|---|
| React | 19 | Interface de utilizador |
| TypeScript | 5.8 | Tipagem estática |
| Vite | 6 | Bundler e dev server |
| Tailwind CSS | 4 | Estilização |
| Firebase Auth | 12 | Autenticação com Google |
| Cloud Firestore | 12 | Base de dados em tempo real |
| React Router | 7 | Navegação SPA |
| Motion | 12 | Animações |
| Lucide React | 0.546 | Ícones |
---

## 🤝 Contribuir

Contribuições são bem-vindas! Para contribuir:

1. Faça um **fork** do repositório
2. Crie uma branch: `git checkout -b feature/minha-funcionalidade`
3. Faça commit das suas alterações: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Faça push: `git push origin feature/minha-funcionalidade`
5. Abra um **Pull Request**

---

## 📄 Licença

Este projecto está sob a licença **MIT**. Consulte o ficheiro `LICENSE` para mais detalhes.

---

<div align="center">

Feito com 🧡 em Angola &nbsp;|&nbsp; **Kambas** — *Juntos Fazemos Mais*

</div>
