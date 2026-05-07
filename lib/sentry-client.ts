import * as Sentry from "@sentry/browser";

/**
 * Inicializa o GlitchTip (Sentry) para captura de erros no cliente
 * Esta função deve ser chamada o mais cedo possível durante o carregamento da página
 */
export function initSentry() {
  // Verificar se já foi inicializado para evitar duplicação
  if (typeof window !== "undefined" && !(window as any).__SENTRY_INITIALIZED__) {
    Sentry.init({
      // DSN do projeto GlitchTip
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

      // Taxa de amostragem para transações de performance (1% - ajuste conforme necessário)
      tracesSampleRate: parseFloat(
        process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE || "0.01"
      ),

      // Ambiente (production, staging, development, etc)
      environment: process.env.NODE_ENV,

      // Versão do release para rastreamento de qual deploy introduziu o erro
      release: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
    });

    // Marca como inicializado
    (window as any).__SENTRY_INITIALIZED__ = true;
  }
}

/**
 * Captura uma exceção manualmente
 */
export function captureException(error: Error, context?: Record<string, any>) {
  Sentry.withScope((scope) => {
    if (context) {
      Object.entries(context).forEach(([key, value]) => {
        scope.setContext(key, value);
      });
    }
    Sentry.captureException(error);
  });
}

/**
 * Captura uma mensagem manualmente
 */
export function captureMessage(
  message: string,
  level: "fatal" | "error" | "warning" | "info" | "debug" = "info"
) {
  Sentry.captureMessage(message, level);
}

/**
 * Define informações do usuário para rastreamento
 */
export function setUserContext(userId: string, email?: string, username?: string) {
  Sentry.setUser({
    id: userId,
    email,
    username,
  });
}

/**
 * Limpa o contexto do usuário
 */
export function clearUserContext() {
  Sentry.setUser(null);
}

/**
 * Adiciona um breadcrumb (trilha de navegação)
 */
export function addBreadcrumb(
  message: string,
  category: string = "default",
  level: "fatal" | "error" | "warning" | "info" | "debug" = "info"
) {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
  });
}

/**
 * Função para testar a integração do GlitchTip
 */
export function testGlitchTip() {
  try {
    // Chama uma função inexistente para gerar um erro
    (window as any).undefinedFunction();
  } catch (error) {
    captureException(error as Error, {
      test: "GlitchTip test error",
    });
    console.error("Erro de teste do GlitchTip foi capturado e enviado!");
  }
}
