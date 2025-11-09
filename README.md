# Concierge Toca - Sistema de Gestão de Balneário

Plataforma completa de gestão de concierge com dashboard financeiro, gestão de eventos e análises em tempo real.

## 🚀 Versão 2.0 - Fases 3 e 4 Implementadas

### ✨ Novas Funcionalidades

#### Fase 3: Melhorias de UX/UI
- ✅ **Dark Mode / Light Mode** - Tema escuro e claro com persistência
- ✅ **Animações Suaves** - Transições e efeitos visuais com CSS
- ✅ **Dashboard Responsivo** - Design adaptável para todos os dispositivos
- ✅ **Notificações Toast** - Feedback visual para ações do usuário
- ✅ **WCAG 2.1 Compliance** - Acessibilidade completa

#### Fase 4: Monitoramento e Escalabilidade
- ✅ **Logger Estruturado** - Sistema de logs para debugging
- ✅ **Métricas de Performance** - Monitoramento de uso
- ✅ **Configuração Vercel** - Deploy automático
- ✅ **Otimizações** - Cache e compressão de assets

## 📋 Recursos

### Dashboard
- 📊 Visão geral com KPIs
- 💰 Análise financeira com gráficos
- 📅 Gestão de eventos
- 💵 Controle de adiantamentos e pagamentos
- 🔴 Alertas de urgência

### Páginas
- **Visão Geral** - Dashboard principal com resumo financeiro
- **Gestão de Eventos** - Detalhes e cronograma de eventos
- **Financeiro** - Análise detalhada de despesas e receitas
- **Documentos** - Gestão de arquivos e documentação
- **Cronograma** - Planejamento de atividades

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript
- **Gráficos**: Chart.js
- **Deploy**: Vercel
- **Versionamento**: Git + GitHub

## 🌐 Deploy

### Acessar a Plataforma

**Link Principal:** https://conciergetoca.vercel.app/

### Deploy Automático

O projeto está configurado para deploy automático na Vercel:

1. Qualquer push para a branch `main` dispara um novo build
2. O deploy é feito automaticamente em produção
3. Histórico de deployments disponível no Vercel Dashboard

### Deploy Manual

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy em produção
vercel --prod
```

## 📁 Estrutura do Projeto

```
conciergetoca/
├── index.html          # Página principal
├── css/
│   ├── styles.css      # Estilos principais
│   ├── theme.css       # Tema dark/light
│   └── animations.css  # Animações
├── js/
│   ├── app.js          # Lógica principal
│   ├── theme.js        # Gerenciador de tema
│   └── logger.js       # Sistema de logs
├── assets/
│   └── Dashboard_Financeiro_CORRIGIDO_v4.0.png
├── vercel.json         # Configuração Vercel
└── README.md           # Este arquivo
```

## 🎨 Dark Mode

Para ativar o Dark Mode, clique no botão de tema (🌙) no canto superior direito da página.

A preferência é salva automaticamente no navegador.

## 📊 Dados de Exemplo

O dashboard inclui dados de exemplo para demonstração:

- **Evento**: Toca Concierge — Esta Balneário
- **Data**: 16/11/2025 - 23/11/2025
- **Local**: Balneário Camboriú, SC
- **Orçamento Total**: R$ 99.702,98
- **Adiantamento Cliente**: R$ 50.275,50
- **Total Pago**: R$ 52.928,54

## 🔧 Desenvolvimento Local

```bash
# Clonar repositório
git clone https://github.com/tocaorganic-art/conciergetoca.git
cd conciergetoca

# Abrir em servidor local (Python)
python3 -m http.server 8000

# Ou usar Live Server no VS Code
# Extensão: Live Server
```

Acesse em `http://localhost:8000`

## 📝 Logs

Os logs são armazenados no navegador (localStorage) e podem ser exportados para análise.

Para acessar os logs no console:
```javascript
// Ver todos os logs
logger.getLogs()

// Ver logs de erro
logger.getLogs('error')

// Exportar logs
logger.exportLogs()
```

## 🐛 Troubleshooting

### Dark Mode não funciona
- Limpar cache do navegador (Ctrl+Shift+Delete)
- Verificar localStorage em DevTools

### Gráficos não aparecem
- Verificar se Chart.js está carregado (DevTools > Network)
- Verificar console para erros (DevTools > Console)

### Animações lentas
- Desabilitar em `prefers-reduced-motion`
- Verificar performance do navegador

## 📞 Suporte

Para dúvidas ou problemas:
- 📧 Email: support@conciergetoca.com
- 🐛 Issues: https://github.com/tocaorganic-art/conciergetoca/issues

## 📄 Licença

Todos os direitos reservados © 2025 Toca Organic Art

---

**Última Atualização:** 09 de novembro de 2025  
**Versão:** 2.0 (Fases 3 e 4 Completas)
