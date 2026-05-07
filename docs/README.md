# 📚 Documentação do GlitchTip

Bem-vindo à documentação completa da implementação do **GlitchTip** (Sentry) no projeto MenHouse!

## 📖 Arquivos Disponíveis

### 1. **[glitchtip-implementation.md](./glitchtip-implementation.md)** — Implementação Completa
A documentação mais completa. Contém:
- ✅ O que é GlitchTip e seus benefícios
- ✅ Passo a passo da implementação
- ✅ Arquivos criados e sua função
- ✅ Como funciona internamente
- ✅ Configuração de variáveis de ambiente
- ✅ Troubleshooting detalhado

**Leitura recomendada:** 15-20 minutos (primeira vez)

---

### 2. **[glitchtip-examples.md](./glitchtip-examples.md)** — Exemplos Práticos
Exemplos reais de como usar o GlitchTip em diferentes cenários:
- ✅ Em componentes React
- ✅ Em manipuladores de eventos
- ✅ Em requisições HTTP
- ✅ Em operações assíncronas
- ✅ Com rastreamento de usuário
- ✅ Em páginas Next.js

**Leitura recomendada:** Conforme necessário (referência)

---

### 3. **[glitchtip-cheatsheet.md](./glitchtip-cheatsheet.md)** — Referência Rápida
Um guia rápido com todas as operações mais comuns:
- ✅ Importações e funções
- ✅ Operações comuns (copy-paste ready)
- ✅ Padrões comuns
- ✅ Troubleshooting rápido
- ✅ Tabelas de referência

**Leitura recomendada:** Sempre à mão (bookmark!)

---

## 🚀 Quick Start (3 minutos)

### Passo 1: Verificar Instalação

```bash
# Verifique se o Sentry está instalado
npm list @sentry/browser @sentry/react
```

### Passo 2: Configurar Variáveis

Abra `.env.local` e confirme que tem:
```env
NEXT_PUBLIC_SENTRY_DSN=https://b1a2450875fc4e009581ef8b42008006@app.glitchtip.com/23143
```

### Passo 3: Usar no Código

```typescript
import { captureException } from '@/lib/sentry-client';

try {
  // seu código
} catch (error) {
  captureException(error as Error);
}
```

### Passo 4: Testar

```javascript
// No console do navegador
window.undefinedFunction();
```

Depois veja em: https://app.glitchtip.com

---

## 📚 Leitura Recomendada por Perfil

### 👤 Desenvolvedora/Desenvolvedor

1. Leia: [Implementação Completa](./glitchtip-implementation.md) (seções 1-3)
2. Consulte: [Exemplos Práticos](./glitchtip-examples.md) conforme precisa
3. Use: [Cheat Sheet](./glitchtip-cheatsheet.md) como referência

### 👨‍💼 Product Manager / Lead

1. Leia: [O que é GlitchTip](./glitchtip-implementation.md#o-que-é-glitchtip)
2. Entenda: [Como Funciona](./glitchtip-implementation.md#como-funciona)
3. Conheça: [Próximos Passos](./glitchtip-implementation.md#próximos-passos-recomendados)

### 🔧 DevOps / Infra

1. Leia: [Configuração de Variáveis](./glitchtip-implementation.md#configuração-de-variáveis-de-ambiente)
2. Implemente: [Releases e Ambientes](./glitchtip-implementation.md#configurações-explicadas)
3. Monitore: [Performance e Segurança](./glitchtip-implementation.md#como-funciona)

---

## 🎯 Casos de Uso Comuns

### "Quero capturar um erro em uma função"

→ Veja: [Exemplos Práticos - Capturar Exceções](./glitchtip-examples.md#exemplo-3-botão-com-tratamento-de-erro)

### "Quero rastrear um usuário específico"

→ Veja: [Exemplos Práticos - Com Contexto de Usuário](./glitchtip-examples.md#exemplo-6-rastreamento-de-usuário-autenticado)

### "Preciso adicionar breadcrumbs"

→ Veja: [Cheat Sheet - Adicionar Breadcrumb](./glitchtip-cheatsheet.md#adicionar-breadcrumb)

### "Algo não está funcionando"

→ Veja: [Troubleshooting](./glitchtip-implementation.md#troubleshooting)

### "Preciso de uma cópia rápida (copy-paste)"

→ Veja: [Cheat Sheet](./glitchtip-cheatsheet.md)

---

## 📊 Estrutura de Arquivos

```
menhouse/
├── lib/
│   └── sentry-client.ts          ← Funções do GlitchTip
├── components/layout/
│   └── SentryProvider.tsx         ← Provider que inicializa
├── app/
│   └── layout.tsx                 ← Envolve app com SentryProvider
├── .env.local                     ← Credenciais (NÃO COMMITAR)
└── docs/
    ├── glitchtip-implementation.md ← Você está aqui
    ├── glitchtip-examples.md
    ├── glitchtip-cheatsheet.md
    └── README.md                   ← Arquivo de índice
```

---

## ✅ Checklist Pós-Implementação

- [ ] Arquivo `.env.local` criado com DSN correto
- [ ] `@sentry/browser` instalado (`npm list @sentry/browser`)
- [ ] `lib/sentry-client.ts` existe
- [ ] `SentryProvider` está no `app/layout.tsx`
- [ ] Testei um erro no console (viu no dashboard do GlitchTip?)
- [ ] Li a seção [Como funciona](./glitchtip-implementation.md#como-funciona)
- [ ] Entendo o fluxo de captura de erros
- [ ] Salvei um bookmark para o [Cheat Sheet](./glitchtip-cheatsheet.md)

---

## 🆘 Precisa de Ajuda?

### Erro não aparece no GlitchTip?

1. Abra `app/layout.tsx` e confirme que tem `<SentryProvider>`
2. Abra `.env.local` e verifique o DSN
3. Reinicie o servidor: `npm run dev`
4. Abra o console do navegador: vê algum erro?

### Variável de ambiente não funciona?

1. Confirme que começa com `NEXT_PUBLIC_`
2. Reinicie o servidor após alterar `.env.local`
3. Verifique digitação (copie exatamente do GlitchTip)

### Aplicação ficou lenta?

Veja: [Troubleshooting - Aplicação mais lenta](./glitchtip-implementation.md#problema-aplicação-mais-lenta)

### Quero desabilitar temporariamente?

Remove o `<SentryProvider>` do `app/layout.tsx` e reinicia o servidor.

---

## 📞 Recursos Externos

- [Dashboard GlitchTip](https://app.glitchtip.com)
- [Documentação GlitchTip](https://glitchtip.com/docs)
- [Documentação Sentry JavaScript](https://docs.sentry.io/platforms/javascript/)
- [Sentry + Next.js Guia](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

---

## 📝 Informações Técnicas

- **Versão:** 1.0.0
- **Data de Implementação:** 7 de Maio de 2026
- **Status:** ✅ Produção
- **Ambiente:** Next.js 15.5.15 + React 18 + TypeScript 5
- **SDK:** @sentry/browser + @sentry/react

---

## 🎓 Próximas Lições

1. **Error Boundaries** — Capturar erros em nível de componente
2. **Performance Monitoring** — Rastrear operações lentas
3. **Integração com Slack** — Receber notificações em tempo real
4. **Releases** — Rastrear qual versão introduziu um erro
5. **Source Maps** — Ver stack traces legíveis em produção

---

**Mantido por:** Equipe de Desenvolvimento MenHouse  
**Última atualização:** 7 de Maio de 2026  
**Próxima revisão:** Quando tiver grandes mudanças no GlitchTip
