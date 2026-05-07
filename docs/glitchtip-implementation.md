# Implementação do GlitchTip no MenHouse

## 📋 Índice
1. [O que é GlitchTip?](#o-que-é-glitchtip)
2. [Como foi implementado](#como-foi-implementado)
3. [Arquivos criados](#arquivos-criados)
4. [Como funciona](#como-funciona)
5. [Configuração de Variáveis de Ambiente](#configuração-de-variáveis-de-ambiente)
6. [Usando o GlitchTip no seu código](#usando-o-glitchtip-no-seu-código)
7. [Testando a Implementação](#testando-a-implementação)
8. [Troubleshooting](#troubleshooting)

## O que é GlitchTip?

**GlitchTip** é uma plataforma de monitoramento de erros e performance open-source. Ele captura automaticamente erros, exceções não tratadas e problemas de performance em sua aplicação, ajudando a identificar e corrigir bugs rapidamente.

### Benefícios:
- ✅ Captura automática de erros não tratados
- ✅ Rastreamento de performance (transações)
- ✅ Gravação de sessões (Replay) para reproduzir erros
- ✅ Rastreamento de breadcrumbs (trilha de navegação)
- ✅ Integração com React para melhor captura de erros
- ✅ Relatórios detalhados de CSP (Content Security Policy)

---

## Como foi implementado

### Passo 1: Instalação de Dependências

```bash
npm install @sentry/browser @sentry/react
```

**Por que `@sentry/browser` e `@sentry/react`?**
- `@sentry/browser`: SDK base do Sentry para navegadores
- `@sentry/react`: Integração específica para React com tratamento de Error Boundaries

### Passo 2: Arquivo de Configuração (.env.local)

Criamos um arquivo `.env.local` com as credenciais e configurações do GlitchTip:

```env
# DSN do projeto GlitchTip
NEXT_PUBLIC_SENTRY_DSN=https://b1a2450875fc4e009581ef8b42008006@app.glitchtip.com/23143

# Taxa de amostragem para performance (1% = 0.01)
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.01

# Versão da aplicação
NEXT_PUBLIC_APP_VERSION=1.0.0
```

**⚠️ Importante:** O arquivo `.env.local` **NÃO deve ser commitado** no git. Adicione-o ao `.gitignore` para não expor suas credenciais.

### Passo 3: Criação da Biblioteca Sentry (`lib/sentry-client.ts`)

Este arquivo centraliza todas as funções relacionadas ao Sentry:

- **`initSentry()`**: Inicializa o SDK com as configurações
- **`captureException()`**: Captura exceções manualmente
- **`captureMessage()`**: Envia mensagens ao GlitchTip
- **`setUserContext()`**: Associa um usuário ao erro
- **`addBreadcrumb()`**: Adiciona rastreamento de navegação
- **`testGlitchTip()`**: Função para testar a integração

### Passo 4: Provider do Sentry (`components/layout/SentryProvider.tsx`)

Criamos um componente cliente que inicializa o Sentry no primeiro render:

```typescript
"use client";

import { useEffect } from "react";
import { initSentry } from "@/lib/sentry-client";

export function SentryProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initSentry();
  }, []);

  return <>{children}</>;
}
```

### Passo 5: Integração no Layout (`app/layout.tsx`)

O layout agora importa e envolve a aplicação com o `SentryProvider`:

```typescript
import { SentryProvider } from "@/components/layout/SentryProvider";

// ...no JSX:
<body className="bg-white text-neutral-900 antialiased">
  <SentryProvider>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
  </SentryProvider>
</body>
```

---

## Arquivos criados

### 1. **`lib/sentry-client.ts`**
Biblioteca com todas as funções utilitárias para usar o Sentry. Contém:
- Inicialização do SDK
- Funções para capturar erros
- Funções para rastreamento de usuários
- Função de teste

### 2. **`components/layout/SentryProvider.tsx`**
Componente client-side que inicializa o Sentry durante o render. Deve envolver toda a aplicação.

### 3. **`.env.local`** (não versionado)
Arquivo com as credenciais e configurações do GlitchTip. **Nunca publique este arquivo!**

### 4. **`docs/`** (esta pasta)
Documentação técnica da implementação do GlitchTip.

---

## Como funciona

### Fluxo de Funcionamento

```
┌─────────────────────────────────────────────────────────────┐
│                     Aplicação carrega                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│           SentryProvider no useEffect                        │
│        (Durante o primeiro render no cliente)                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│      initSentry() lê as variáveis de ambiente               │
│   e configura o SDK do Sentry/GlitchTip                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│   Sentry começa a monitorar:                                 │
│   • Erros não tratados                                       │
│   • Exceções em componentes React                            │
│   • Transações de performance                                │
│   • Sessões (Replay)                                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│   Quando um erro ocorre:                                     │
│   1. Sentry captura o erro automaticamente                   │
│   2. Adiciona contexto (breadcrumbs, usuário, etc)           │
│   3. Envia para GlitchTip via HTTPS                          │
│   4. Você vê o erro no dashboard do GlitchTip               │
└─────────────────────────────────────────────────────────────┘
```

### O que Sentry Captura Automaticamente

1. **Erros não tratados** (uncaught errors)
2. **Promise rejeitadas** sem handler
3. **Exceções em React** (via Error Boundary)
4. **Erros de rede** (failed requests)
5. **Transações de performance** (1% por padrão)
6. **Sessões com reprodução** (Replay)

### DSN (Data Source Name)

O DSN é como um "endereço" que diz ao Sentry para onde enviar os dados:

```
https://b1a2450875fc4e009581ef8b42008006@app.glitchtip.com/23143
│                                        │                    │
│  Token de autenticação                 │                    │
│                                        │                    │
│                                        Host do GlitchTip    │
│                                                              │
│                                                    ID do projeto
```

---

## Configuração de Variáveis de Ambiente

### `.env.local` (Cliente)

```env
# DSN do projeto GlitchTip
NEXT_PUBLIC_SENTRY_DSN=https://b1a2450875fc4e009581ef8b42008006@app.glitchtip.com/23143

# Taxa de amostragem para performance (1% = 0.01)
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.01

# Versão da aplicação
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Por que `NEXT_PUBLIC_`?

Variáveis com prefixo `NEXT_PUBLIC_` são expostas ao cliente (navegador). Isso é necessário porque o Sentry precisa dessas configurações para funcionar no lado do cliente.

### ⚠️ Segurança

- O DSN contém um token de autenticação, mas é uma chave de escrita apenas para captura de erros
- Não permite leitura de dados sensíveis
- Sempre use `.env.local` e **nunca commit** este arquivo
- Configure regras de CSP (Content Security Policy) para bloquear envios não autorizados

---

## Usando o GlitchTip no seu código

### 1. Capturar Exceções Manualmente

```typescript
import { captureException } from "@/lib/sentry-client";

try {
  // Seu código
  riskyOperation();
} catch (error) {
  captureException(error as Error, {
    userAction: "clicked_button",
    context: "homepage_hero",
  });
}
```

### 2. Registrar Mensagens

```typescript
import { captureMessage } from "@/lib/sentry-client";

// Info level
captureMessage("Usuário completou a compra", "info");

// Warning level
captureMessage("Taxa de erro acima de 5%", "warning");

// Error level
captureMessage("Falha na integração com pagamento", "error");
```

### 3. Rastrear Usuários

```typescript
import { setUserContext, clearUserContext } from "@/lib/sentry-client";

// Quando o usuário faz login
setUserContext(userId, "usuario@email.com", "username");

// Quando o usuário faz logout
clearUserContext();
```

### 4. Adicionar Breadcrumbs (Trilha de Navegação)

```typescript
import { addBreadcrumb } from "@/lib/sentry-client";

addBreadcrumb(
  "Navegou para /servicos",
  "navigation",
  "info"
);

addBreadcrumb(
  "Clicou no botão de agendamento",
  "user-interaction",
  "info"
);
```

---

## Testando a Implementação

### Método 1: Usar a Função de Teste

```typescript
import { testGlitchTip } from "@/lib/sentry-client";

// Chame em um botão ou no console
testGlitchTip();
```

### Método 2: Forçar um Erro

No console do navegador:

```javascript
window.undefinedFunction();
```

### Método 3: Usar o DevTools

```typescript
import * as Sentry from "@sentry/browser";

// No console do navegador
Sentry.captureMessage("Teste manual", "info");
```

### Verificar se Funcionou

1. Abra o [Dashboard do GlitchTip](https://app.glitchtip.com)
2. Navegue para seu projeto "Teste"
3. Veja os erros capturados em "Issues"
4. Clique em um erro para ver detalhes:
   - Stack trace completo
   - Breadcrumbs
   - Contexto do navegador
   - Informações da sessão

---

## Configurações Explicadas

### `tracesSampleRate: 0.01`

Captura apenas 1% das transações (requisições, navegação, etc). Isso economiza espaço de armazenamento e reduz custos.

Valores comuns:
- `0.01` = 1% (recomendado para produção)
- `0.1` = 10% (bom para staging)
- `1.0` = 100% (só em desenvolvimento)

### `autoSessionTracking: false`

GlitchTip não suporta rastreamento automático de sessões como Sentry SaaS faz. Isso está desabilitado por padrão.

### `environment: process.env.NODE_ENV`

Indica em qual ambiente o erro ocorreu:
- `development` = Seu computador local
- `production` = Servidor de produção
- `staging` = Servidor de testes

Isso ajuda a diferenciar erros por ambiente no dashboard.

### `release: process.env.NEXT_PUBLIC_APP_VERSION`

Rastreia em qual versão do seu app o erro ocorreu. Útil para saber se um erro foi introduzido em uma versão específica.

### `Replay`

Configura gravação de sessões para reproduzir exatamente o que o usuário fez antes do erro:

```typescript
replaysSessionSampleRate: 0.1,     // 10% de todas as sessões
replaysOnErrorSampleRate: 1.0,     // 100% das sessões com erro
```

---

## Troubleshooting

### Problema: Erros não aparecem no GlitchTip

**Solução:**
1. Verifique se o `SentryProvider` envolve toda a aplicação no `layout.tsx`
2. Confira se as variáveis em `.env.local` estão corretas
3. Reinicie o servidor (`npm run dev`)
4. Abra o console do navegador e veja se há erros de inicialização

### Problema: "DSN inválido"

**Solução:**
- Copie o DSN exato do seu projeto no GlitchTip
- Certifique-se de que a URL começa com `https://`
- Não altere ou corte o token de autenticação

### Problema: Muitos erros no dashboard

**Solução:**
1. Aumente o `tracesSampleRate` (mas veja os custos)
2. Configure filtros no GlitchTip para ignorar certos erros
3. Implemente error boundaries em componentes críticos

### Problema: Aplicação mais lenta

**Solução:**
1. Reduza `replaysSessionSampleRate` de 0.1 para 0.05
2. Reduza `tracesSampleRate` de 0.01 para 0.001
3. Desabilite Replay para usuários em conexão lenta:

```typescript
Sentry.init({
  // ...
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  replaysSessionSampleRate: navigator.connection?.effectiveType === '4g' ? 0.1 : 0.01,
});
```

---

## Próximos Passos Recomendados

1. **Implementar Error Boundaries** em componentes críticos
2. **Configurar Alertas** no GlitchTip para notificar sobre novos erros
3. **Documentar Releases** no GlitchTip ao fazer deploy
4. **Monitorar Performance** regularmente no dashboard
5. **Integrar com Slack** para receber notificações em tempo real

---

## Referências

- [Documentação do GlitchTip](https://glitchtip.com/docs)
- [Documentação do Sentry JavaScript SDK](https://docs.sentry.io/platforms/javascript/)
- [Sentry + Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [CSP e Sentry](https://docs.sentry.io/product/integrations/csp/)

---

**Implementado em:** 7 de Maio de 2026  
**Versão:** 1.0.0  
**Status:** ✅ Ativo
