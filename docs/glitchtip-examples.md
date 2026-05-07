# Exemplos Práticos do GlitchTip

Neste documento você encontra exemplos práticos de como usar o GlitchTip em diferentes cenários da aplicação.

## 📚 Tabela de Conteúdos

1. [Em Componentes React](#em-componentes-react)
2. [Em Manipuladores de Eventos](#em-manipuladores-de-eventos)
3. [Em Requisições HTTP](#em-requisições-http)
4. [Em Operações Assíncronas](#em-operações-assíncronas)
5. [Com Contexto de Usuário](#com-contexto-de-usuário)
6. [Em Páginas Next.js](#em-páginas-nextjs)

---

## Em Componentes React

### Exemplo 1: Error Boundary com Sentry

```typescript
// components/ErrorBoundary.tsx
'use client';

import React from 'react';
import * as Sentry from '@sentry/browser';
import { captureException } from '@/lib/sentry-client';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Captura o erro no GlitchTip
    captureException(error, {
      componentStack: errorInfo.componentStack,
    });
    
    console.error('Erro capturado:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-100 border border-red-400 rounded">
          <h1 className="text-red-800 font-bold">Algo deu errado</h1>
          <p className="text-red-700">Nossa equipe foi notificada sobre este erro.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default Sentry.withErrorBoundary(ErrorBoundary, {
  fallback: <div>Um erro inesperado ocorreu</div>,
});
```

### Exemplo 2: Usar em um Componente Funcional

```typescript
// components/home/Services.tsx
'use client';

import { useEffect, useState } from 'react';
import { captureException, captureMessage, addBreadcrumb } from '@/lib/sentry-client';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    addBreadcrumb('Iniciando carregamento de serviços', 'page-init', 'info');

    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      setLoading(true);
      addBreadcrumb('Fetching services da API', 'network', 'info');

      const response = await fetch('/api/servicos');
      
      if (!response.ok) {
        throw new Error(`API retornou status ${response.status}`);
      }

      const data = await response.json();
      setServices(data);
      addBreadcrumb('Serviços carregados com sucesso', 'network', 'info');

    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      
      // Captura o erro no GlitchTip
      captureException(error, {
        section: 'Services',
        action: 'fetchServices',
        data: JSON.stringify({ servicesCount: services.length }),
      });

      setError('Erro ao carregar serviços');
      captureMessage('Erro ao carregar serviços na página', 'error');
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      {services.map((service) => (
        <div key={service.id}>{service.name}</div>
      ))}
    </div>
  );
}
```

---

## Em Manipuladores de Eventos

### Exemplo 3: Botão com Tratamento de Erro

```typescript
// components/home/Hero.tsx
'use client';

import { captureException, addBreadcrumb } from '@/lib/sentry-client';

export default function Hero() {
  async function handleAgendamento() {
    try {
      addBreadcrumb('Usuário clicou em "Agendar"', 'user-interaction', 'info');

      // Validar dados
      if (!email) {
        throw new Error('Email é obrigatório para agendamento');
      }

      // Fazer requisição
      const response = await fetch('/api/agendamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, data: selectedDate }),
      });

      if (!response.ok) {
        throw new Error(`Falha ao agendar: ${response.statusText}`);
      }

      addBreadcrumb('Agendamento criado com sucesso', 'user-interaction', 'info');
      alert('Agendamento realizado!');

    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      captureException(err, {
        action: 'handleAgendamento',
        userEmail: email,
      });
      alert('Erro ao agendar. Tente novamente.');
    }
  }

  return (
    <button 
      onClick={handleAgendamento}
      className="px-6 py-3 bg-blue-600 text-white rounded"
    >
      Agendar Agora
    </button>
  );
}
```

---

## Em Requisições HTTP

### Exemplo 4: Wrapper para Requisições com Tratamento de Erros

```typescript
// lib/api-client.ts
import { captureException, addBreadcrumb } from '@/lib/sentry-client';

type RequestOptions = RequestInit & {
  endpoint: string;
  timeout?: number;
};

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<T> {
  const { timeout = 5000, ...fetchOptions } = options;
  
  addBreadcrumb(`Iniciando requisição: ${endpoint}`, 'network', 'info');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(endpoint, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}: ${response.statusText} para ${endpoint}`
      );
    }

    const data = await response.json();
    addBreadcrumb(`Requisição bem-sucedida: ${endpoint}`, 'network', 'info');

    return data as T;

  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      captureException(
        new Error(`Timeout em requisição: ${endpoint}`),
        { endpoint }
      );
    } else {
      captureException(error as Error, { endpoint });
    }
    throw error;
  }
}

// Uso:
async function loadBarbeiros() {
  try {
    const data = await apiRequest('/api/barbeiros');
    return data;
  } catch (error) {
    console.error('Falha ao carregar barbeiros');
  }
}
```

---

## Em Operações Assíncronas

### Exemplo 5: Promise com Tratamento de Erro

```typescript
// lib/image-uploader.ts
import { captureException, addBreadcrumb } from '@/lib/sentry-client';

export async function uploadImage(file: File): Promise<string> {
  addBreadcrumb(`Upload iniciado: ${file.name} (${file.size} bytes)`, 'upload', 'info');

  try {
    // Validar arquivo
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Arquivo maior que 5MB não é permitido');
    }

    if (!file.type.startsWith('image/')) {
      throw new Error('Apenas imagens são permitidas');
    }

    // Fazer upload
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload falhou: ${response.statusText}`);
    }

    const { url } = await response.json();
    addBreadcrumb(`Upload concluído: ${url}`, 'upload', 'info');

    return url;

  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    captureException(err, {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });
    throw err;
  }
}
```

---

## Com Contexto de Usuário

### Exemplo 6: Rastreamento de Usuário Autenticado

```typescript
// app/layout.tsx ou um hook personalizado
'use client';

import { useEffect } from 'react';
import { setUserContext, clearUserContext } from '@/lib/sentry-client';
import { useSession } from 'next-auth/react';

export function UserTracker() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // Registrar usuário no GlitchTip
      setUserContext(
        session.user.id || 'unknown',
        session.user.email || undefined,
        session.user.name || undefined
      );
    } else if (status === 'unauthenticated') {
      clearUserContext();
    }
  }, [session, status]);

  return null;
}
```

### Uso no Layout:

```typescript
import { SentryProvider } from '@/components/layout/SentryProvider';
import { UserTracker } from '@/components/UserTracker';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <SentryProvider>
          <UserTracker />
          {children}
        </SentryProvider>
      </body>
    </html>
  );
}
```

---

## Em Páginas Next.js

### Exemplo 7: Tratamento de Erro em Route Handler

```typescript
// app/api/agendamentos/route.ts
import { captureException, addBreadcrumb } from '@/lib/sentry-client';

export async function POST(request: Request) {
  try {
    addBreadcrumb('POST /api/agendamentos iniciado', 'api', 'info');

    const body = await request.json();

    // Validação
    if (!body.email || !body.data) {
      throw new Error('Email e data são obrigatórios');
    }

    // Processar agendamento
    // ...

    addBreadcrumb('Agendamento criado com sucesso', 'api', 'info');

    return Response.json({ success: true });

  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    
    // Capturar no GlitchTip
    captureException(err, {
      endpoint: '/api/agendamentos',
      method: 'POST',
    });

    return Response.json(
      { error: 'Erro ao criar agendamento' },
      { status: 500 }
    );
  }
}
```

### Exemplo 8: Página com Try-Catch

```typescript
// app/barbeiros/page.tsx
import { Metadata } from 'next';
import BarberGallery from '@/components/barbeiros/BarberGallery';

// Fetch feito no servidor (não captura erros do Sentry automaticamente)
async function getBarbeiros() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/barbeiros`,
      { 
        cache: 'revalidate',
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error('Falha ao buscar barbeiros');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar barbeiros:', error);
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Nossos Barbeiros',
    description: 'Conheça nossa equipe de barbeiros profissionais',
  };
}

export default async function BarbeirosPage() {
  const barbeiros = await getBarbeiros();

  return (
    <div>
      <h1>Nossos Barbeiros</h1>
      <BarberGallery barbeiros={barbeiros} />
    </div>
  );
}
```

---

## Dicas Importantes

### ✅ Boas Práticas

1. **Sempre envolva código assíncrono em try-catch**
   ```typescript
   try {
     await riskyOperation();
   } catch (error) {
     captureException(error as Error);
   }
   ```

2. **Adicione breadcrumbs antes de operações críticas**
   ```typescript
   addBreadcrumb('Iniciando operação crítica', 'critical', 'info');
   ```

3. **Inclua contexto relevante ao capturar erros**
   ```typescript
   captureException(error, {
     userId: user.id,
     action: 'checkout',
     cartTotal: total,
   });
   ```

4. **Use níveis de severidade apropriados**
   ```typescript
   captureMessage('Cache limpo', 'info');      // Informativo
   captureMessage('Uso de memória alto', 'warning'); // Aviso
   captureMessage('Banco de dados offline', 'error'); // Crítico
   ```

### ❌ Evite

1. ❌ Capturar erros esperados e tratáveis
   ```typescript
   // Não faça isso para erros previsíveis
   try {
     const data = JSON.parse(input);
   } catch {
     captureException(error); // Evite para input inválido esperado
   }
   ```

2. ❌ Vazar dados sensíveis
   ```typescript
   // ❌ NUNCA
   captureException(error, {
     password: user.password,
     creditCard: payment.cardNumber,
   });

   // ✅ SEMPRE
   captureException(error, {
     userId: user.id,
     paymentMethod: 'credit_card',
   });
   ```

3. ❌ Ignorar completamente os erros
   ```typescript
   // ❌ Não faça isso
   try {
     await riskyOperation();
   } catch (error) {
     // Silenciosa - ninguém sabe que falhou!
   }

   // ✅ Faça isso
   try {
     await riskyOperation();
   } catch (error) {
     console.error(error);
     captureException(error as Error);
   }
   ```

---

## Testando seus Exemplos

### Teste em Desenvolvimento

```bash
npm run dev
```

Abra o console do navegador e execute:

```javascript
// Forçar um erro
window.undefinedFunction();

// Ou dispare uma mensagem
import { captureMessage } from '@/lib/sentry-client';
captureMessage('Teste manual', 'info');
```

### Verifique no Dashboard

1. Acesse https://app.glitchtip.com
2. Clique no projeto "Teste"
3. Veja seus erros em "Issues"

---

**Última atualização:** 7 de Maio de 2026
