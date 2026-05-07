# GlitchTip - Referência Rápida (Cheat Sheet)

## 🚀 Importações

```typescript
import {
  initSentry,           // Inicializa o SDK
  captureException,     // Captura exceções
  captureMessage,       // Envia mensagens
  setUserContext,       // Define usuário
  clearUserContext,     // Limpa usuário
  addBreadcrumb,        // Adiciona trilha de navegação
  testGlitchTip,        // Testa a integração
} from '@/lib/sentry-client';
```

---

## 📝 Operações Comuns

### Capturar um Erro

```typescript
try {
  // código aqui
} catch (error) {
  captureException(error as Error, {
    context: 'seu_contexto',
    userId: 'user123',
  });
}
```

### Enviar uma Mensagem

```typescript
// Informativo
captureMessage('Usuário fez login', 'info');

// Aviso
captureMessage('Cache cheio', 'warning');

// Erro
captureMessage('Falha na integração', 'error');
```

### Rastrear Usuário

```typescript
// Login
setUserContext('user_123', 'user@email.com', 'username');

// Logout
clearUserContext();
```

### Adicionar Breadcrumb

```typescript
addBreadcrumb('Clicou em botão X', 'user-interaction', 'info');
addBreadcrumb('Iniciou carregamento', 'page-init', 'info');
addBreadcrumb('Erro de rede', 'network', 'error');
```

---

## 🔧 Configuração

### `.env.local`

```env
NEXT_PUBLIC_SENTRY_DSN=sua_dsn_aqui
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.01
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Colocar no `app/layout.tsx`

```typescript
import { SentryProvider } from '@/components/layout/SentryProvider';

// ...

<body>
  <SentryProvider>
    {children}
  </SentryProvider>
</body>
```

---

## 🧪 Testes

### Forçar um Erro

```javascript
// No console do navegador
window.undefinedFunction();
```

### Usar Função de Teste

```javascript
import { testGlitchTip } from '@/lib/sentry-client';
testGlitchTip();
```

### Enviar Mensagem de Teste

```javascript
import { captureMessage } from '@/lib/sentry-client';
captureMessage('Teste manual do GlitchTip', 'info');
```

---

## 📊 Níveis de Severidade

| Nível | Uso | Cor |
|-------|-----|-----|
| `fatal` | Erro crítico que derrubou a app | 🔴 Vermelho |
| `error` | Erro grave que afeta o usuário | 🔴 Vermelho |
| `warning` | Algo suspeito aconteceu | 🟠 Laranja |
| `info` | Informação útil | 🔵 Azul |
| `debug` | Dados de debug (só em dev) | ⚪ Cinza |

---

## 🎯 Padrões Comuns

### Fetch com Tratamento

```typescript
async function fetchData(url: string) {
  try {
    addBreadcrumb(`Fetch: ${url}`, 'network', 'info');
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    captureException(error as Error, { url });
    throw error;
  }
}
```

### Form Submission

```typescript
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  
  try {
    addBreadcrumb('Form submit iniciado', 'user-interaction', 'info');
    // enviar dados
    addBreadcrumb('Form enviado com sucesso', 'user-interaction', 'info');
  } catch (error) {
    captureException(error as Error, { form: 'contactForm' });
  }
}
```

### Component Lifecycle

```typescript
useEffect(() => {
  addBreadcrumb('Componente montado', 'lifecycle', 'info');
  
  return () => {
    addBreadcrumb('Componente desmontado', 'lifecycle', 'info');
  };
}, []);
```

---

## ⚠️ Segurança

### ❌ NÃO CAPTURE

- Senhas ou tokens
- Números de cartão de crédito
- Dados pessoais sensíveis
- API keys ou secrets

### ✅ CAPTURE

- IDs de usuário (anônimos)
- Ações do usuário
- Estados da aplicação
- URLs e endpoints
- Versão do app
- Ambiente (prod/staging/dev)

---

## 📱 Categoria de Breadcrumbs

```typescript
addBreadcrumb('msg', 'ui.click', 'info');           // Click em UI
addBreadcrumb('msg', 'ui.scroll', 'info');          // Scroll
addBreadcrumb('msg', 'navigation', 'info');         // Mudança de rota
addBreadcrumb('msg', 'network', 'info');            // Requisição HTTP
addBreadcrumb('msg', 'console', 'error');           // Erro no console
addBreadcrumb('msg', 'user-interaction', 'info');   // Interação com usuário
addBreadcrumb('msg', 'page-init', 'info');          // Inicialização
addBreadcrumb('msg', 'database', 'error');          // Banco de dados
```

---

## 🔗 Links Úteis

- **Dashboard:** https://app.glitchtip.com
- **Docs GlitchTip:** https://glitchtip.com/docs
- **Docs Sentry JS:** https://docs.sentry.io/platforms/javascript/
- **Repositório:** [Seu projeto no git]

---

## 📋 Checklist de Implementação

- [ ] `@sentry/browser` instalado
- [ ] `.env.local` criado com DSN
- [ ] `lib/sentry-client.ts` criado
- [ ] `SentryProvider` no layout
- [ ] Variáveis de ambiente configuradas
- [ ] Testei um erro no dashboard
- [ ] Breadcrumbs adicionados em páginas críticas
- [ ] Error Boundary implementado
- [ ] Documentação lida

---

## 🆘 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Erros não aparecem | Verifique DSN em `.env.local`, reinicie `npm run dev` |
| "DSN inválido" | Copie o DSN exato do GlitchTip, sem modificações |
| Aplicação lenta | Reduza `tracesSampleRate` ou `replaysSessionSampleRate` |
| Muitos erros | Configure filtros no GlitchTip para ignorar certos tipos |
| Variáveis não leem | Confirme que começam com `NEXT_PUBLIC_` |

---

**Versão:** 1.0.0 | **Atualizado:** 7 de Maio de 2026
