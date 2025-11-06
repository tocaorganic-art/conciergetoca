// Sistema de Gestão de Balneário v4.0 - JavaScript

// Navegação entre páginas
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            
            // Show selected page
            const pageName = this.getAttribute('data-page');
            document.getElementById(pageName).classList.add('active');
        });
    });

    // Initialize Charts
    initializeCharts();
});

// Inicializar gráficos
function initializeCharts() {
    // Gráfico de Barras - Análise Financeira
    const ctxFinanceiro = document.getElementById('chartFinanceiro');
    if (ctxFinanceiro) {
        new Chart(ctxFinanceiro, {
            type: 'bar',
            data: {
                labels: ['Adiantamento Cliente', 'Total Pago', 'Diferença Tony', 'Valor Total', 'Saldo Pendente'],
                datasets: [{
                    label: 'Valores (R$)',
                    data: [50275.50, 52928.54, 6277.48, 99702.98, 48427.48],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',  // Verde
                        'rgba(59, 130, 246, 0.8)',  // Azul
                        'rgba(239, 68, 68, 0.8)',   // Vermelho
                        'rgba(148, 163, 184, 0.8)', // Cinza
                        'rgba(245, 158, 11, 0.8)'   // Laranja
                    ],
                    borderColor: [
                        'rgb(16, 185, 129)',
                        'rgb(59, 130, 246)',
                        'rgb(239, 68, 68)',
                        'rgb(148, 163, 184)',
                        'rgb(245, 158, 11)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += 'R$ ' + context.parsed.y.toLocaleString('pt-BR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    });
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        }
                    }
                }
            }
        });
    }

    // Gráfico de Pizza - Proporção Financeira
    const ctxProporcao = document.getElementById('chartProporcao');
    if (ctxProporcao) {
        new Chart(ctxProporcao, {
            type: 'doughnut',
            data: {
                labels: [
                    'Adiantamento Cliente',
                    'Diferença Tony',
                    'Saldo Pendente'
                ],
                datasets: [{
                    data: [50275.50, 6277.48, 48427.48],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',  // Verde
                        'rgba(239, 68, 68, 0.8)',   // Vermelho
                        'rgba(245, 158, 11, 0.8)'   // Laranja
                    ],
                    borderColor: [
                        'rgb(16, 185, 129)',
                        'rgb(239, 68, 68)',
                        'rgb(245, 158, 11)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += 'R$ ' + context.parsed.toLocaleString('pt-BR', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    });
                                    
                                    // Calculate percentage
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((context.parsed / total) * 100).toFixed(1);
                                    label += ' (' + percentage + '%)';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }
}

// Dados financeiros
const dadosFinanceiros = {
    evento: {
        nome: "Toca Concierge — Esta Balneário",
        local: "Balneário Camboriú, SC",
        dataInicio: "16/11/2025",
        dataTermino: "23/11/2025",
        participantes: 15,
        status: "Planned"
    },
    financeiro: {
        adiantamentoCliente: 50275.50,
        totalPago: 52928.54,
        diferencaTony: 6277.48,
        valorTotal: 99702.98,
        saldoPendente: 48427.48,
        diferencaTonyReceber: 5727.48,
        totalPagar13Nov: 54154.96,
        percentualAntecipacao: 50.4
    },
    registros: [
        {
            data: "22/09/2025",
            descricao: "Latam Aéreo",
            categoria: "Transportando CDJ",
            adiantamento: 2175.50,
            total: 2523.44,
            aPagar: 347.94,
            percentual: 86
        },
        {
            data: "22/09/2025",
            descricao: "Movida",
            categoria: "Aluguel de Carro",
            adiantamento: 2900.00,
            total: 3211.00,
            aPagar: 311.00,
            percentual: 90
        },
        {
            data: "22/09/2025",
            descricao: "Empresa Sublime",
            categoria: "Equipe Serviços Casa",
            adiantamento: 2125.00,
            total: 6640.00,
            aPagar: 4515.00,
            percentual: 32
        },
        {
            data: "22/09/2025",
            descricao: "AA Music",
            categoria: "Som e Iluminação",
            adiantamento: 2750.00,
            total: 5500.00,
            aPagar: 2750.00,
            percentual: 50
        },
        {
            data: "22/09/2025",
            descricao: "Reserva financeira p/ compras",
            categoria: "Serviços Gerais",
            adiantamento: 5000.00,
            total: 10000.00,
            aPagar: 5000.00,
            percentual: 50
        },
        {
            data: "22/09/2025",
            descricao: "Concierge Tony",
            categoria: "Organizador",
            adiantamento: 7500.00,
            total: 15000.00,
            aPagar: 7500.00,
            percentual: 50
        },
        {
            data: "22/09/2025",
            descricao: "Van p/ 15 pessoas",
            categoria: "8h de disponibilidade",
            adiantamento: 950.00,
            total: 1900.00,
            aPagar: 950.00,
            percentual: 50
        },
        {
            data: "04/11/2025",
            descricao: "Massoterapeuta",
            categoria: "Serviços Pessoais",
            adiantamento: 0.00,
            total: 2000.00,
            aPagar: 1000.00,
            percentual: 50,
            destaque: true
        },
        {
            data: "22/09/2025",
            descricao: "Aluguel da Casa Principal",
            categoria: "Casa",
            adiantamento: 21875.00,
            total: 43750.00,
            aPagar: 21875.00,
            percentual: 50
        },
        {
            data: "22/09/2025",
            descricao: "Caução Casa Principal",
            categoria: "Casa",
            adiantamento: 2500.00,
            total: 5000.00,
            aPagar: 2500.00,
            percentual: 50
        },
        {
            data: "22/09/2025",
            descricao: "Airbnb Staff 16 a 24 de nov",
            categoria: "Casa",
            adiantamento: 2500.00,
            total: 4178.54,
            aPagar: 1678.54,
            percentual: 60
        }
    ]
};

// Exportar dados para uso global
window.balnearioData = dadosFinanceiros;

// Função para formatar moeda
function formatCurrency(value) {
    return 'R$ ' + value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Função para calcular dias restantes
function calcularDiasRestantes() {
    const dataVencimento = new Date('2025-11-13');
    const hoje = new Date();
    const diffTime = dataVencimento - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Atualizar contagem de dias
const diasRestantes = calcularDiasRestantes();
console.log(`Dias restantes até o vencimento: ${diasRestantes}`);

// Log de inicialização
console.log('Sistema de Gestão de Balneário v4.0 CORRIGIDO');
console.log('Dados carregados:', dadosFinanceiros);
console.log('Dashboard inicializado com sucesso!');
