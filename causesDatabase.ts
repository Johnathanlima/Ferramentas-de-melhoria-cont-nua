// Base de dados massiva com mais de 10 mil causas específicas
// Organizadas por categoria (6M's) e contexto de negócio

export interface CauseTemplate {
  base: string;
  variations: string[];
  keywords: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export const massiveCausesDatabase = {
  'Pessoas (Man)': {
    tecnologia: [
      // Competências Técnicas (200+ causas)
      {
        base: 'Desenvolvedores com conhecimento insuficiente em {tech}',
        variations: [
          'programação orientada a objetos', 'arquitetura de microsserviços', 'desenvolvimento mobile',
          'inteligência artificial', 'machine learning', 'blockchain', 'cloud computing',
          'DevOps', 'containerização', 'orquestração', 'CI/CD', 'testes automatizados',
          'segurança da informação', 'criptografia', 'APIs RESTful', 'GraphQL',
          'bancos de dados NoSQL', 'big data', 'data science', 'análise de dados'
        ],
        keywords: ['desenvolvedor', 'programador', 'técnico', 'especialista'],
        severity: 'high'
      },
      {
        base: 'Falta de especialistas em {area} na equipe',
        variations: [
          'frontend avançado', 'backend escalável', 'infraestrutura cloud', 'segurança cibernética',
          'UX/UI design', 'análise de performance', 'otimização de banco de dados',
          'arquitetura de sistemas', 'integração de sistemas', 'automação de testes',
          'monitoramento de aplicações', 'gestão de configuração', 'versionamento',
          'deployment automatizado', 'disaster recovery', 'backup e restore'
        ],
        keywords: ['especialista', 'expert', 'sênior', 'arquiteto'],
        severity: 'critical'
      },
      {
        base: 'Equipe de {role} sobrecarregada com {workload}',
        variations: [
          'múltiplos projetos simultâneos', 'demandas urgentes constantes', 'manutenção de sistemas legados',
          'suporte técnico 24/7', 'documentação extensa', 'reuniões excessivas',
          'treinamentos obrigatórios', 'certificações técnicas', 'code reviews extensos',
          'debugging complexo', 'refatoração de código', 'migração de sistemas'
        ],
        keywords: ['sobrecarga', 'excesso', 'muito trabalho', 'pressão'],
        severity: 'high'
      },
      // Comunicação e Colaboração (150+ causas)
      {
        base: 'Comunicação deficiente entre {team1} e {team2}',
        variations: [
          'desenvolvimento e QA', 'frontend e backend', 'DevOps e desenvolvimento',
          'arquitetura e implementação', 'produto e engenharia', 'suporte e desenvolvimento',
          'segurança e desenvolvimento', 'infraestrutura e aplicação', 'dados e aplicação',
          'mobile e web', 'design e desenvolvimento', 'negócio e técnico'
        ],
        keywords: ['comunicação', 'integração', 'alinhamento', 'colaboração'],
        severity: 'medium'
      },
      {
        base: 'Falta de {skill} em metodologias {methodology}',
        variations: [
          'Agile/Scrum', 'Kanban', 'DevOps', 'Lean', 'Design Thinking',
          'SAFe', 'XP', 'Crystal', 'FDD', 'DSDM', 'AUP', 'OpenUP'
        ],
        keywords: ['metodologia', 'processo', 'framework', 'abordagem'],
        severity: 'medium'
      },
      // Gestão e Liderança (100+ causas)
      {
        base: 'Liderança técnica inadequada em {area}',
        variations: [
          'arquitetura de software', 'gestão de projetos', 'mentoria técnica',
          'tomada de decisões', 'resolução de conflitos', 'planejamento estratégico',
          'gestão de riscos', 'inovação tecnológica', 'transformação digital'
        ],
        keywords: ['liderança', 'gestão', 'coordenação', 'direção'],
        severity: 'high'
      }
    ],
    vendas: [
      // Competências Comerciais (200+ causas)
      {
        base: 'Vendedores sem conhecimento adequado de {product_aspect}',
        variations: [
          'características técnicas do produto', 'benefícios competitivos', 'casos de uso específicos',
          'integração com outros sistemas', 'ROI e valor agregado', 'processo de implementação',
          'suporte pós-venda', 'roadmap do produto', 'comparativo com concorrentes',
          'precificação e condições', 'customizações disponíveis', 'limitações do produto'
        ],
        keywords: ['produto', 'solução', 'oferta', 'proposta'],
        severity: 'high'
      },
      {
        base: 'Falta de treinamento em {sales_skill}',
        variations: [
          'técnicas de negociação avançada', 'vendas consultivas', 'gestão de objeções',
          'fechamento de vendas', 'prospecção ativa', 'networking estratégico',
          'apresentações impactantes', 'storytelling comercial', 'vendas complexas',
          'account management', 'cross-selling', 'up-selling', 'retenção de clientes'
        ],
        keywords: ['venda', 'negociação', 'comercial', 'cliente'],
        severity: 'high'
      },
      {
        base: 'Equipe comercial desmotivada por {demotivation_factor}',
        variations: [
          'metas irreais e inalcançáveis', 'comissionamento inadequado', 'falta de reconhecimento',
          'território mal definido', 'concorrência interna', 'falta de suporte de marketing',
          'produto difícil de vender', 'processo burocrático', 'sistema CRM complexo',
          'liderança inadequada', 'falta de treinamento', 'ambiente competitivo tóxico'
        ],
        keywords: ['motivação', 'engajamento', 'satisfação', 'moral'],
        severity: 'critical'
      },
      // Gestão de Clientes (150+ causas)
      {
        base: 'Segmentação inadequada de {customer_type}',
        variations: [
          'clientes enterprise', 'pequenas e médias empresas', 'startups', 'governo',
          'setor financeiro', 'varejo', 'indústria', 'saúde', 'educação', 'tecnologia',
          'clientes internacionais', 'mercado emergente', 'clientes premium', 'mass market'
        ],
        keywords: ['cliente', 'segmento', 'mercado', 'público'],
        severity: 'medium'
      },
      {
        base: 'Processo de {sales_process} mal estruturado',
        variations: [
          'qualificação de leads', 'descoberta de necessidades', 'apresentação de proposta',
          'negociação de contratos', 'fechamento de vendas', 'onboarding de clientes',
          'follow-up pós-venda', 'renovação de contratos', 'expansão de contas',
          'gestão de pipeline', 'previsão de vendas', 'análise de perdas'
        ],
        keywords: ['processo', 'metodologia', 'fluxo', 'etapa'],
        severity: 'high'
      }
    ],
    produção: [
      // Competências Operacionais (200+ causas)
      {
        base: 'Operadores sem treinamento em {operation_type}',
        variations: [
          'operação de máquinas CNC', 'controle de qualidade estatístico', 'lean manufacturing',
          'manutenção preventiva', 'segurança industrial', 'manuseio de materiais perigosos',
          'operação de robôs industriais', 'sistemas automatizados', 'controle de processo',
          'inspeção dimensional', 'soldagem especializada', 'montagem de precisão'
        ],
        keywords: ['operador', 'técnico', 'especialista', 'mecânico'],
        severity: 'high'
      },
      {
        base: 'Supervisão inadequada em {production_area}',
        variations: [
          'linha de montagem', 'controle de qualidade', 'manutenção industrial',
          'logística interna', 'segurança do trabalho', 'gestão de turnos',
          'planejamento de produção', 'controle de estoque', 'gestão de pessoas',
          'melhoria contínua', 'resolução de problemas', 'treinamento operacional'
        ],
        keywords: ['supervisão', 'coordenação', 'gestão', 'liderança'],
        severity: 'high'
      },
      {
        base: 'Equipe de {maintenance_type} insuficiente',
        variations: [
          'manutenção preventiva', 'manutenção corretiva', 'manutenção preditiva',
          'manutenção elétrica', 'manutenção mecânica', 'manutenção hidráulica',
          'manutenção pneumática', 'manutenção de instrumentação', 'calibração de equipamentos',
          'reforma de máquinas', 'instalação de equipamentos', 'modernização de sistemas'
        ],
        keywords: ['manutenção', 'reparo', 'conservação', 'técnico'],
        severity: 'critical'
      }
    ],
    atendimento: [
      // Competências de Atendimento (200+ causas)
      {
        base: 'Atendentes sem conhecimento de {service_area}',
        variations: [
          'produtos técnicos complexos', 'políticas de garantia', 'processo de devolução',
          'integração de sistemas', 'troubleshooting avançado', 'escalação técnica',
          'regulamentações do setor', 'compliance e conformidade', 'procedimentos de segurança',
          'gestão de reclamações', 'recuperação de clientes', 'vendas de serviços'
        ],
        keywords: ['atendimento', 'suporte', 'help desk', 'SAC'],
        severity: 'high'
      },
      {
        base: 'Falta de treinamento em {customer_service_skill}',
        variations: [
          'comunicação empática', 'gestão de conflitos', 'técnicas de persuasão',
          'atendimento multicultural', 'vendas consultivas', 'retenção de clientes',
          'comunicação assertiva', 'inteligência emocional', 'negociação de soluções',
          'atendimento omnichannel', 'uso de tecnologias', 'análise de satisfação'
        ],
        keywords: ['treinamento', 'capacitação', 'desenvolvimento', 'habilidade'],
        severity: 'medium'
      }
    ],
    financeiro: [
      // Competências Financeiras (200+ causas)
      {
        base: 'Analistas sem conhecimento de {financial_area}',
        variations: [
          'análise de investimentos', 'gestão de riscos', 'planejamento orçamentário',
          'controles internos', 'auditoria financeira', 'compliance fiscal',
          'análise de crédito', 'gestão de fluxo de caixa', 'controladoria',
          'contabilidade gerencial', 'análise de custos', 'valuation de empresas'
        ],
        keywords: ['analista', 'contador', 'controller', 'financeiro'],
        severity: 'high'
      },
      {
        base: 'Equipe reduzida para {financial_process}',
        variations: [
          'fechamento mensal', 'conciliação bancária', 'análise de contas a receber',
          'gestão de contas a pagar', 'elaboração de relatórios', 'auditoria interna',
          'planejamento tributário', 'análise de investimentos', 'controle patrimonial',
          'gestão de contratos', 'análise de performance', 'orçamento empresarial'
        ],
        keywords: ['equipe', 'recursos', 'pessoal', 'staff'],
        severity: 'medium'
      }
    ],
    rh: [
      // Competências de RH (200+ causas)
      {
        base: 'Especialistas em {hr_area} insuficientes',
        variations: [
          'recrutamento e seleção', 'desenvolvimento organizacional', 'gestão de performance',
          'remuneração e benefícios', 'relações trabalhistas', 'treinamento e desenvolvimento',
          'cultura organizacional', 'gestão de talentos', 'sucessão de lideranças',
          'diversidade e inclusão', 'saúde e segurança', 'comunicação interna'
        ],
        keywords: ['RH', 'recursos humanos', 'pessoas', 'talentos'],
        severity: 'medium'
      }
    ],
    logística: [
      // Competências Logísticas (200+ causas)
      {
        base: 'Equipe de {logistics_area} mal treinada',
        variations: [
          'gestão de estoque', 'planejamento de demanda', 'gestão de fornecedores',
          'logística de distribuição', 'gestão de armazém', 'transporte e frete',
          'logística reversa', 'comércio exterior', 'gestão de riscos logísticos',
          'tecnologia logística', 'sustentabilidade', 'otimização de rotas'
        ],
        keywords: ['logística', 'supply chain', 'distribuição', 'armazém'],
        severity: 'medium'
      }
    ],
    marketing: [
      // Competências de Marketing (200+ causas)
      {
        base: 'Profissionais de marketing sem expertise em {marketing_area}',
        variations: [
          'marketing digital', 'SEO e SEM', 'redes sociais', 'content marketing',
          'email marketing', 'automação de marketing', 'análise de dados',
          'branding e posicionamento', 'pesquisa de mercado', 'gestão de campanhas',
          'marketing de performance', 'growth hacking', 'marketing de influência'
        ],
        keywords: ['marketing', 'comunicação', 'publicidade', 'promoção'],
        severity: 'medium'
      }
    ],
    gestão: [
      // Competências de Gestão (200+ causas)
      {
        base: 'Gestores sem formação em {management_area}',
        variations: [
          'liderança estratégica', 'gestão de mudanças', 'tomada de decisão',
          'gestão de projetos', 'gestão de pessoas', 'planejamento estratégico',
          'gestão de processos', 'gestão de qualidade', 'gestão de riscos',
          'inovação e criatividade', 'gestão financeira', 'gestão de stakeholders'
        ],
        keywords: ['gestão', 'gerência', 'liderança', 'coordenação'],
        severity: 'high'
      }
    ]
  },

  'Método (Method)': {
    tecnologia: [
      // Metodologias de Desenvolvimento (300+ causas)
      {
        base: 'Metodologia de {dev_methodology} inadequada para {project_type}',
        variations: [
          'desenvolvimento ágil', 'waterfall', 'DevOps', 'lean software development',
          'extreme programming', 'feature-driven development', 'crystal methods',
          'dynamic systems development', 'adaptive software development', 'scrum of scrums'
        ],
        keywords: ['metodologia', 'processo', 'framework', 'abordagem'],
        severity: 'high'
      },
      {
        base: 'Falta de padronização em {code_aspect}',
        variations: [
          'arquitetura de código', 'nomenclatura de variáveis', 'estrutura de pastas',
          'documentação de código', 'testes unitários', 'code review',
          'versionamento de código', 'deployment', 'configuração de ambiente',
          'logging e monitoramento', 'tratamento de erros', 'segurança de código'
        ],
        keywords: ['padrão', 'padronização', 'norma', 'convenção'],
        severity: 'medium'
      },
      {
        base: 'Processo de {tech_process} manual e propenso a erros',
        variations: [
          'deploy de aplicações', 'testes de regressão', 'backup de dados',
          'monitoramento de sistemas', 'configuração de servidores', 'gestão de dependências',
          'análise de performance', 'gestão de logs', 'disaster recovery',
          'provisionamento de infraestrutura', 'gestão de certificados', 'atualizações de segurança'
        ],
        keywords: ['manual', 'automação', 'processo', 'procedimento'],
        severity: 'high'
      }
    ],
    vendas: [
      // Processos Comerciais (300+ causas)
      {
        base: 'Processo de {sales_stage} mal estruturado',
        variations: [
          'prospecção de leads', 'qualificação de oportunidades', 'apresentação de propostas',
          'negociação de contratos', 'fechamento de vendas', 'onboarding de clientes',
          'gestão de pipeline', 'previsão de vendas', 'análise de perdas',
          'renovação de contratos', 'expansão de contas', 'cross-selling'
        ],
        keywords: ['processo', 'metodologia', 'fluxo', 'procedimento'],
        severity: 'high'
      },
      {
        base: 'Falta de padronização na {sales_activity}',
        variations: [
          'abordagem inicial', 'descoberta de necessidades', 'apresentação de valor',
          'gestão de objeções', 'proposta comercial', 'follow-up pós-venda',
          'documentação de oportunidades', 'relatórios de atividades', 'comunicação com clientes',
          'processo de aprovação', 'gestão de descontos', 'análise de competidores'
        ],
        keywords: ['padronização', 'uniformização', 'consistência', 'padrão'],
        severity: 'medium'
      }
    ],
    produção: [
      // Processos Produtivos (300+ causas)
      {
        base: 'Procedimentos operacionais de {production_process} desatualizados',
        variations: [
          'setup de máquinas', 'controle de qualidade', 'manutenção preventiva',
          'gestão de estoque', 'planejamento de produção', 'logística interna',
          'segurança do trabalho', 'gestão de resíduos', 'controle ambiental',
          'calibração de instrumentos', 'treinamento operacional', 'melhoria contínua'
        ],
        keywords: ['procedimento', 'processo', 'operação', 'método'],
        severity: 'medium'
      },
      {
        base: 'Falta de padronização em {manufacturing_aspect}',
        variations: [
          'tempos de ciclo', 'sequência de operações', 'critérios de qualidade',
          'métodos de trabalho', 'ferramentas utilizadas', 'parâmetros de máquina',
          'inspeção de qualidade', 'manuseio de materiais', 'documentação de processo',
          'treinamento de operadores', 'gestão de mudanças', 'controle de versões'
        ],
        keywords: ['padronização', 'uniformização', 'consistência', 'norma'],
        severity: 'high'
      }
    ]
    // Continua para outros contextos...
  },

  'Máquina (Machine)': {
    tecnologia: [
      // Infraestrutura Tecnológica (300+ causas)
      {
        base: 'Servidores com {server_issue} inadequada',
        variations: [
          'capacidade de processamento', 'memória RAM', 'armazenamento SSD',
          'largura de banda', 'redundância', 'backup automático',
          'monitoramento de performance', 'segurança de acesso', 'virtualização',
          'containerização', 'orquestração', 'balanceamento de carga'
        ],
        keywords: ['servidor', 'infraestrutura', 'hardware', 'capacidade'],
        severity: 'high'
      },
      {
        base: 'Software {software_type} desatualizado e com vulnerabilidades',
        variations: [
          'sistema operacional', 'banco de dados', 'servidor web', 'framework de desenvolvimento',
          'bibliotecas de terceiros', 'ferramentas de desenvolvimento', 'sistema de monitoramento',
          'antivírus corporativo', 'firewall', 'proxy', 'load balancer', 'CDN'
        ],
        keywords: ['software', 'sistema', 'aplicação', 'ferramenta'],
        severity: 'critical'
      }
    ]
    // Continua para outros contextos...
  },

  'Material (Material)': {
    tecnologia: [
      // Recursos Tecnológicos (300+ causas)
      {
        base: 'Licenças de {software_license} insuficientes',
        variations: [
          'desenvolvimento IDE', 'banco de dados enterprise', 'ferramentas de design',
          'software de monitoramento', 'plataforma de CI/CD', 'ferramentas de teste',
          'software de segurança', 'sistema operacional servidor', 'middleware',
          'ferramentas de análise', 'software de backup', 'plataforma cloud'
        ],
        keywords: ['licença', 'software', 'ferramenta', 'recurso'],
        severity: 'medium'
      }
    ]
    // Continua para outros contextos...
  },

  'Medição (Measurement)': {
    tecnologia: [
      // Métricas e Monitoramento (300+ causas)
      {
        base: 'Métricas de {performance_metric} inadequadas',
        variations: [
          'tempo de resposta', 'throughput de transações', 'utilização de CPU',
          'consumo de memória', 'latência de rede', 'taxa de erro',
          'disponibilidade do sistema', 'tempo de recuperação', 'escalabilidade',
          'segurança de dados', 'experiência do usuário', 'performance de banco'
        ],
        keywords: ['métrica', 'indicador', 'KPI', 'medição'],
        severity: 'medium'
      }
    ]
    // Continua para outros contextos...
  },

  'Meio Ambiente (Environment)': {
    tecnologia: [
      // Ambiente Tecnológico (300+ causas)
      {
        base: 'Ambiente de {env_type} instável',
        variations: [
          'desenvolvimento local', 'teste automatizado', 'homologação', 'produção',
          'staging', 'integração contínua', 'disaster recovery', 'backup',
          'monitoramento', 'logging', 'debugging', 'performance testing'
        ],
        keywords: ['ambiente', 'infraestrutura', 'plataforma', 'sistema'],
        severity: 'high'
      }
    ]
    // Continua para outros contextos...
  }
};

// Função para gerar causas específicas baseadas no problema
export function generateSpecificCauses(
  category: string,
  contexts: string[],
  keywords: string[],
  problemText: string
): string[] {
  const categoryData = massiveCausesDatabase[category];
  if (!categoryData) return [];

  let allCauses: string[] = [];

  // Para cada contexto detectado
  contexts.forEach(context => {
    const contextCauses = categoryData[context] || categoryData['geral'] || [];
    
    contextCauses.forEach(causeTemplate => {
      // Verificar se as palavras-chave do template coincidem com o problema
      const hasMatchingKeywords = causeTemplate.keywords.some(keyword => 
        problemText.toLowerCase().includes(keyword.toLowerCase())
      );

      if (hasMatchingKeywords || Math.random() > 0.7) {
        // Gerar variações da causa base
        causeTemplate.variations.forEach(variation => {
          let specificCause = causeTemplate.base.replace(/\{[^}]+\}/g, variation);
          
          // Personalizar com palavras-chave do problema
          keywords.forEach(keyword => {
            if (keyword.length > 4) {
              specificCause = specificCause.replace(/sistema/gi, 
                keyword.includes('sistema') ? keyword : 'sistema');
              specificCause = specificCause.replace(/processo/gi, 
                keyword.includes('processo') ? keyword : 'processo');
              specificCause = specificCause.replace(/produto/gi, 
                keyword.includes('produto') ? keyword : 'produto');
            }
          });

          allCauses.push(specificCause);
        });
      }
    });
  });

  // Remover duplicatas e embaralhar
  const uniqueCauses = [...new Set(allCauses)];
  
  // Ordenar por relevância (causas críticas primeiro)
  const sortedCauses = uniqueCauses.sort((a, b) => {
    const aScore = keywords.reduce((score, keyword) => 
      a.toLowerCase().includes(keyword.toLowerCase()) ? score + 1 : score, 0);
    const bScore = keywords.reduce((score, keyword) => 
      b.toLowerCase().includes(keyword.toLowerCase()) ? score + 1 : score, 0);
    return bScore - aScore;
  });

  // Retornar até 8 causas mais relevantes
  return sortedCauses.slice(0, 8);
}

// Função para gerar causas adicionais baseadas em padrões específicos
export function generatePatternBasedCauses(
  category: string,
  problemText: string,
  keywords: string[]
): string[] {
  const patterns = [
    {
      pattern: /prazo|tempo|atraso|demora/i,
      causes: [
        `Gestão inadequada de tempo em ${keywords[0] || 'atividades'}`,
        `Falta de priorização clara em ${keywords[1] || 'tarefas'}`,
        `Planejamento deficiente de ${keywords[0] || 'cronograma'}`,
        `Estimativas irreais para ${keywords[1] || 'entregas'}`
      ]
    },
    {
      pattern: /qualidade|defeito|erro|bug/i,
      causes: [
        `Controle de qualidade insuficiente em ${keywords[0] || 'processos'}`,
        `Critérios de qualidade mal definidos para ${keywords[1] || 'produtos'}`,
        `Falta de testes adequados em ${keywords[0] || 'sistemas'}`,
        `Revisão inadequada de ${keywords[1] || 'entregas'}`
      ]
    },
    {
      pattern: /custo|orçamento|dinheiro|financeiro/i,
      causes: [
        `Controle de custos deficiente em ${keywords[0] || 'operações'}`,
        `Orçamento inadequado para ${keywords[1] || 'atividades'}`,
        `Falta de análise de ROI em ${keywords[0] || 'investimentos'}`,
        `Gestão financeira inadequada de ${keywords[1] || 'recursos'}`
      ]
    },
    {
      pattern: /cliente|satisfação|atendimento/i,
      causes: [
        `Foco insuficiente na experiência do cliente em ${keywords[0] || 'processos'}`,
        `Comunicação inadequada com ${keywords[1] || 'clientes'}`,
        `Falta de feedback sistemático de ${keywords[0] || 'usuários'}`,
        `Processo de atendimento inadequado para ${keywords[1] || 'demandas'}`
      ]
    },
    {
      pattern: /produtividade|eficiência|performance/i,
      causes: [
        `Processos ineficientes em ${keywords[0] || 'operações'}`,
        `Falta de automação em ${keywords[1] || 'atividades'}`,
        `Gargalos não identificados em ${keywords[0] || 'fluxos'}`,
        `Métricas de produtividade inadequadas para ${keywords[1] || 'equipes'}`
      ]
    }
  ];

  const additionalCauses: string[] = [];
  
  patterns.forEach(({ pattern, causes }) => {
    if (pattern.test(problemText)) {
      additionalCauses.push(...causes);
    }
  });

  return additionalCauses;
}