// Sistema de Gestão de Balneário v4.0 - JavaScript

// Navegação entre páginas
document.addEventListener('DOMContentLoaded', function() {
    // 1. Implementar Lógica de Login
    if (!localStorage.getItem('isLoggedIn')) {
        mostrarTelaLogin();
    } else {
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
        
        // 2. Carregar Dados e Inicializar Dashboard
        carregarDadosFinanceiros();
    }
});

// Função para mostrar a tela de login
function mostrarTelaLogin() {
    document.body.innerHTML = `
        <div class="login-container">
            <div class="login-box">
                <h2>Acesso Restrito</h2>
                <p>Insira as credenciais para acessar o Dashboard.</p>
                <input type="text" id="username" placeholder="Usuário">
                <input type="password" id="password" placeholder="Senha">
                <button id="login-button">Entrar</button>
                <p id="login-message" style="color: red; margin-top: 10px;"></p>
            </div>
        </div>
    `;
    
    document.getElementById('login-button').addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const message = document.getElementById('login-message');
        
        // Credenciais Hardcoded para o usuário (Tony/Tony123)
        if (username === 'Tony' && password === 'Tony123') {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.reload(); // Recarrega a página para mostrar o dashboard
        } else {
            message.textContent = 'Usuário ou senha incorretos.';
        }
    });
}

// Função de Logout (adicionada para completar a funcionalidade)
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
}

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
let dadosFinanceiros = {};

// Função para carregar dados do JSON
async function carregarDadosFinanceiros() {
    try {
        const response = await fetch('/src/data/financial_data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        dadosFinanceiros = await response.json();
        console.log('Dados financeiros carregados do JSON:', dadosFinanceiros);
        // Atualizar os dados hardcoded no HTML e nos gráficos
        atualizarDashboardComDados();
    } catch (error) {
        console.error('Erro ao carregar dados financeiros:', error);
        // Usar dados de fallback ou mostrar erro no dashboard
    }
}

// Função para atualizar o dashboard com os dados carregados
function atualizarDashboardComDados() {
    // 1. Atualizar Cards de Resumo (Visão Geral)
    const resumo = dadosFinanceiros.resumo_geral;
    
    // Card 1: Total Pago Antecipado
    document.querySelector('.card.highlight-green .card-value').textContent = formatCurrency(resumo.total_pago_antecipado);
    document.querySelector('.card.highlight-green .card-title').textContent = 'Total Pago Antecipado';
    document.querySelector('.card.highlight-green .card-footer').textContent = 'Valor recebido do cliente';
    
    // Card 2: Total Geral (Serviços + Hospedagem)
    document.querySelector('.card.highlight-blue .card-value').textContent = formatCurrency(resumo.total_geral_servicos_hospedagem);
    document.querySelector('.card.highlight-blue .card-title').textContent = 'Valor Total Geral';
    document.querySelector('.card.highlight-blue .card-footer').textContent = 'Soma de todas as despesas';
    
    // Card 3: Diferença Tony (Bolso) - Calculado com base na explicação do usuário
    // O usuário explicou que a diferença de R$6.277,48 se deve ao valor que excedeu o montante enviado pelo cliente.
    // O JSON do PDF tem: Total Pago (Antecipado): 52.775,50 e Total Geral (Serviços + Hospedagem): 104.702,98.
    // Vou usar o valor da diferença do HTML original, pois o JSON do PDF não tem esse campo.
    // O HTML original tinha: R$ 6.277,48
    document.querySelector('.card.highlight-red .card-value').textContent = formatCurrency(6277.48);
    document.querySelector('.card.highlight-red .card-title').textContent = 'Diferença Tony (Bolso)';
    document.querySelector('.card.highlight-red .card-footer').textContent = 'Valor pago por Tony';
    
    // Card 4: Saldo Pendente (A Pagar à Chegada)
    document.querySelector('.card.highlight-orange .card-value').textContent = formatCurrency(resumo.total_a_pagar_chegada);
    document.querySelector('.card.highlight-orange .card-title').textContent = 'Saldo Pendente (13/11)';
    document.querySelector('.card.highlight-orange .card-footer').textContent = 'Contas a pagar';
    
    // Card 5: Total a Pagar 13/11
    // O usuário mencionou: R$48.427,48 (Saldo Pendente) + R$5.727,48 (Diferença Tony a Receber) = R$54.154,96
    const totalPagar13Nov = resumo.total_a_pagar_chegada + 5727.48; // Usando o valor da diferença Tony a Receber do HTML original
    document.querySelector('.card.highlight-urgent .card-value').textContent = formatCurrency(totalPagar13Nov);
    document.querySelector('.card.highlight-urgent .card-title').textContent = 'TOTAL A PAGAR 13/11';
    document.querySelector('.card.highlight-urgent .card-footer').textContent = `⚠️ URGENTE - ${calcularDiasRestantes()} dias restantes`;
    
    // 2. Atualizar Gráficos
    initializeCharts();
    
    // 3. Atualizar Tabela Financeira
    renderizarTabelaFinanceira();
}

// Função para renderizar a tabela financeira
function renderizarTabelaFinanceira() {
    const registros = [
        ...dadosFinanceiros.servicos_gerais,
        ...dadosFinanceiros.hospedagens_alugueis
    ];
    const tbody = document.querySelector('#financeiro .financial-table tbody');
    const tfoot = document.querySelector('#financeiro .financial-table tfoot');
    
    if (!tbody) return;
    
    tbody.innerHTML = ''; // Limpa o conteúdo existente
    
    registros.forEach(registro => {
        const row = document.createElement('tr');
        const aPagar = registro.valor_total_rs - registro.valor_pago_rs;
        const percentual = ((registro.valor_pago_rs / registro.valor_total_rs) * 100).toFixed(1);
        
        // Adicionar classe de destaque para Massoterapeuta (adiantamento 0)
        if (registro.descricao === 'Massoterapeuta') {
            row.classList.add('highlight-row');
        }
        
        row.innerHTML = `
            <td>${registro.data}</td>
            <td>${registro.descricao}</td>
            <td><span class="category-badge">${registro.categoria}</span></td>
            <td class="value-green">${formatCurrency(registro.valor_pago_rs)}</td>
            <td class="value-blue">${formatCurrency(registro.valor_total_rs)}</td>
            <td class="value-orange">${formatCurrency(aPagar)}</td>
            <td>${percentual}%</td>
        `;
        tbody.appendChild(row);
    });
    
    // Atualizar o rodapé (tfoot)
    if (tfoot) {
        const resumo = dadosFinanceiros.resumo_geral;
        tfoot.innerHTML = `
            <tr class="total-row">
                <td colspan="3"><strong>TOTAL GERAL</strong></td>
                <td class="value-green"><strong>${formatCurrency(resumo.total_pago_antecipado)}</strong></td>
                <td class="value-blue"><strong>${formatCurrency(resumo.total_geral_servicos_hospedagem)}</strong></td>
                <td class="value-orange"><strong>${formatCurrency(resumo.total_a_pagar_chegada)}</strong></td>
                <td><strong>${resumo.percentual_pago}%</strong></td>
            </tr>
        `;
    }
}

// Função para inicializar os gráficos
function initializeCharts() {
    // 1. Atualizar Cards de Resumo (Visão Geral)
    const resumo = dadosFinanceiros.resumo_geral;
    
    // Card 1: Total Pago Antecipado
    document.querySelector('.card.highlight-green .card-value').textContent = formatCurrency(resumo.total_pago_antecipado);
    document.querySelector('.card.highlight-green .card-title').textContent = 'Total Pago Antecipado';
    document.querySelector('.card.highlight-green .card-footer').textContent = 'Valor recebido do cliente';
    
    // Card 2: Total Geral (Serviços + Hospedagem)
    document.querySelector('.card.highlight-blue .card-value').textContent = formatCurrency(resumo.total_geral_servicos_hospedagem);
    document.querySelector('.card.highlight-blue .card-title').textContent = 'Valor Total Geral';
    document.querySelector('.card.highlight-blue .card-footer').textContent = 'Soma de todas as despesas';
    
    // Card 3: Diferença Tony (Bolso) - Calculado com base na explicação do usuário
    // O usuário explicou que a diferença de R$6.277,48 se deve ao valor que excedeu o montante enviado pelo cliente.
    // O JSON do PDF tem: Total Pago (Antecipado): 52.775,50 e Total Geral (Serviços + Hospedagem): 104.702,98.
    // Vou usar o valor da diferença do HTML original, pois o JSON do PDF não tem esse campo.
    // O HTML original tinha: R$ 6.277,48
    document.querySelector('.card.highlight-red .card-value').textContent = formatCurrency(6277.48);
    document.querySelector('.card.highlight-red .card-title').textContent = 'Diferença Tony (Bolso)';
    document.querySelector('.card.highlight-red .card-footer').textContent = 'Valor pago por Tony';
    
    // Card 4: Saldo Pendente (A Pagar à Chegada)
    document.querySelector('.card.highlight-orange .card-value').textContent = formatCurrency(resumo.total_a_pagar_chegada);
    document.querySelector('.card.highlight-orange .card-title').textContent = 'Saldo Pendente (13/11)';
    document.querySelector('.card.highlight-orange .card-footer').textContent = 'Contas a pagar';
    
    // Card 5: Total a Pagar 13/11
    // O usuário mencionou: R$48.427,48 (Saldo Pendente) + R$5.727,48 (Diferença Tony a Receber) = R$54.154,96
    const totalPagar13Nov = resumo.total_a_pagar_chegada + 5727.48; // Usando o valor da diferença Tony a Receber do HTML original
    document.querySelector('.card.highlight-urgent .card-value').textContent = formatCurrency(totalPagar13Nov);
    document.querySelector('.card.highlight-urgent .card-title').textContent = 'TOTAL A PAGAR 13/11';
    document.querySelector('.card.highlight-urgent .card-footer').textContent = `⚠️ URGENTE - ${calcularDiasRestantes()} dias restantes`;
    
    // 2. Atualizar Gráficos
    initializeCharts();
    
    // 3. Atualizar Tabela Financeira (será feito na fase 4)
}

// Inicializar gráficos
function initializeCharts() {
    const resumo = dadosFinanceiros.resumo_geral;
    
    // Gráfico de Barras - Análise Financeira
    const ctxFinanceiro = document.getElementById('chartFinanceiro');
    if (ctxFinanceiro) {
        new Chart(ctxFinanceiro, {
            type: 'bar',
            data: {
                labels: ['Pago Antecipado', 'Total Geral', 'A Pagar'],
                datasets: [{
                    label: 'Valores (R$)',
                    data: [resumo.total_pago_antecipado, resumo.total_geral_servicos_hospedagem, resumo.total_a_pagar_chegada],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',  // Verde
                        'rgba(148, 163, 184, 0.8)', // Cinza
                        'rgba(245, 158, 11, 0.8)'   // Laranja
                    ],
                    borderColor: [
                        'rgb(16, 185, 129)',
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
                    'Pago Antecipado',
                    'A Pagar'
                ],
                datasets: [{
                    data: [resumo.total_pago_antecipado, resumo.total_a_pagar_chegada],
                    backgroundColor: [
                        'rgba(16, 185, 129, 0.8)',  // Verde
                        'rgba(245, 158, 11, 0.8)'   // Laranja
                    ],
                    borderColor: [
                        'rgb(16, 185, 129)',
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
console.log('Dashboard inicializado com sucesso!');
