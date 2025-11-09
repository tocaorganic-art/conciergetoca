// Logger Estruturado para Frontend

class Logger {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000;
  }

  log(level, message, meta = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...meta,
    };

    this.logs.push(entry);
    
    // Manter apenas últimos 1000 logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Log no console em desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](
        `[${level.toUpperCase()}] ${message}`,
        meta
      );
    }

    // Enviar para servidor em produção
    if (process.env.NODE_ENV === 'production' && level === 'error') {
      this.sendToServer(entry);
    }
  }

  info(message, meta = {}) {
    this.log('info', message, meta);
  }

  warn(message, meta = {}) {
    this.log('warn', message, meta);
  }

  error(message, error = null, meta = {}) {
    const errorMeta = error instanceof Error ? {
      errorMessage: error.message,
      errorStack: error.stack,
    } : {};

    this.log('error', message, { ...errorMeta, ...meta });
  }

  debug(message, meta = {}) {
    if (process.env.NODE_ENV !== 'production') {
      this.log('debug', message, meta);
    }
  }

  getLogs(level = null) {
    if (level) {
      return this.logs.filter(log => log.level === level);
    }
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }

  async sendToServer(entry) {
    try {
      await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      console.error('Erro ao enviar log para servidor:', error);
    }
  }

  exportLogs() {
    const dataStr = JSON.stringify(this.logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `logs-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}

// Instância global
const logger = new Logger();

// Exportar para uso global
window.logger = logger;
