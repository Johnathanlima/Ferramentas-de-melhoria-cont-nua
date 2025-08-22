import { AnalysisResult, IshikawaCategory, PDCAStep, FiveWhysData, FMEAData, FMEAItem, ParetoData, ParetoItem, FailureAnalysisData } from '../types';
import { FiveW2HData, FiveW2HItem } from '../types';

const ishikawaCategories = [
  { name: 'Pessoas (Man)', color: '#FF6B6B' },
  { name: 'Método (Method)', color: '#4ECDC4' },
  { name: 'Máquina (Machine)', color: '#45B7D1' },
  { name: 'Material (Material)', color: '#FFA07A' },
  { name: 'Medição (Measurement)', color: '#98D8C8' },
  { name: 'Meio Ambiente (Environment)', color: '#F7DC6F' }
];

const pdcaColors = {
  Plan: '#FF6B6B',
  Do: '#4ECDC4', 
  Check: '#45B7D1',
  Act: '#FFA07A'
};

export function generateIshikawaAnalysis(problem: string): AnalysisResult['ishikawa'] {
  const categories: IshikawaCategory[] = ishikawaCategories.map(cat => ({
    name: cat.name,
    color: cat.color,
    causes: [
      `Falta de treinamento adequado`,
      `Procedimentos mal definidos`,
      `Comunicação ineficaz`,
      `Recursos insuficientes`,
      `Controle inadequado`
    ]
  }));

  return {
    problem,
    categories
  };
}

export function generatePDCAAnalysis(problem: string): AnalysisResult['pdca'] {
  const steps: PDCAStep[] = [
    {
      phase: 'Plan',
      title: 'Planejar (Plan)',
      description: 'Identificar problema, definir objetivos e criar plano de ação',
      color: pdcaColors.Plan,
      actions: [
        'Definir objetivos SMART específicos',
        'Mapear estado atual detalhado',
        'Identificar stakeholders e responsáveis',
        'Estabelecer métricas de sucesso',
        'Criar cronograma realista'
      ]
    },
    {
      phase: 'Do',
      title: 'Executar (Do)',
      description: 'Implementar as ações planejadas em pequena escala',
      color: pdcaColors.Do,
      actions: [
        'Executar piloto controlado',
        'Implementar monitoramento em tempo real',
        'Treinar equipe responsável',
        'Documentar todos os passos',
        'Comunicar progresso para stakeholders'
      ]
    },
    {
      phase: 'Check',
      title: 'Verificar (Check)',
      description: 'Monitorar resultados e comparar com objetivos',
      color: pdcaColors.Check,
      actions: [
        'Monitorar KPIs específicos',
        'Coletar feedback de usuários',
        'Analisar dados vs. expectativas',
        'Identificar desvios nas métricas',
        'Preparar relatórios de progresso'
      ]
    },
    {
      phase: 'Act',
      title: 'Agir (Act)',
      description: 'Padronizar melhorias ou corrigir desvios',
      color: pdcaColors.Act,
      actions: [
        'Padronizar melhorias validadas',
        'Atualizar documentação',
        'Treinar toda organização',
        'Implementar controles permanentes',
        'Planejar próximos ciclos de melhoria'
      ]
    }
  ];

  return {
    problem,
    steps
  };
}

export function generateFiveWhysAnalysis(problem: string): FiveWhysData {
  const whys = [
    {
      question: `Por que ${problem.toLowerCase()}?`,
      answer: `Porque há deficiências em processos que afetam resultados`,
      level: 1
    },
    {
      question: `Por que há deficiências em processos?`,
      answer: `Porque falta padronização e controle adequado em atividades críticas`,
      level: 2
    },
    {
      question: `Por que falta padronização e controle?`,
      answer: `Porque não há procedimentos claros e treinamento adequado para equipe`,
      level: 3
    },
    {
      question: `Por que não há procedimentos claros?`,
      answer: `Porque a gestão não priorizou a documentação e estruturação de processos`,
      level: 4
    },
    {
      question: `Por que a gestão não priorizou isso?`,
      answer: `Porque falta visão estratégica sobre a importância da qualidade e eficiência operacional`,
      level: 5
    }
  ];

  return {
    problem,
    whys,
    rootCause: `Falta de visão estratégica sobre a importância da qualidade e eficiência operacional`,
    actions: [
      `Desenvolver plano estratégico focado em qualidade`,
      `Implementar sistema de gestão de processos`,
      `Criar programa de treinamento para equipe`,
      `Estabelecer métricas de controle para atividades`,
      `Definir responsabilidades claras para gestão`
    ]
  };
}

export function generateFiveW2HAnalysis(problem: string): FiveW2HData {
  const questions = [
    { question: 'O que deve ser feito?', answer: 'Implementar melhorias no processo identificado', type: 'what' as const },
    { question: 'Por que deve ser feito?', answer: 'Para resolver o problema e prevenir recorrências', type: 'why' as const },
    { question: 'Quem deve fazer?', answer: 'Equipe responsável pelo processo com apoio da gestão', type: 'who' as const },
    { question: 'Quando deve ser feito?', answer: 'Início imediato com conclusão em 30 dias', type: 'when' as const },
    { question: 'Onde deve ser feito?', answer: 'No local onde o problema foi identificado', type: 'where' as const },
    { question: 'Como deve ser feito?', answer: 'Seguindo metodologia estruturada com monitoramento', type: 'how' as const },
    { question: 'Quanto vai custar?', answer: 'Investimento estimado conforme recursos necessários', type: 'howmuch' as const }
  ];

  return {
    problem,
    objective: 'Resolver o problema de forma estruturada e eficaz',
    questions,
    actionPlan: {
      what: 'Implementar plano de melhoria estruturado',
      why: 'Para eliminar causas raízes e prevenir recorrências',
      who: 'Equipe multidisciplinar com liderança definida',
      when: 'Início imediato com marcos de 7, 15 e 30 dias',
      where: 'Área afetada e locais de apoio necessários',
      how: 'Metodologia PDCA com controles e indicadores',
      howMuch: 'Orçamento a ser definido conforme escopo',
      detailedActions: [
        {
          id: '1',
          responsible: 'João Silva',
          action: 'Mapear processo atual e identificar gargalos',
          dueDate: '2025-02-15',
          status: 'pending',
          priority: 'high'
        },
        {
          id: '2',
          responsible: 'Maria Santos',
          action: 'Treinar equipe nos novos procedimentos',
          dueDate: '2025-02-20',
          status: 'pending',
          priority: 'medium'
        },
        {
          id: '3',
          responsible: 'Carlos Oliveira',
          action: 'Implementar sistema de monitoramento',
          dueDate: '2025-02-25',
          status: 'pending',
          priority: 'high'
        }
      ]
    }
  };
}

export function generateParetoAnalysis(problem: string): ParetoData {
  const causes = [
    `Falta de treinamento`,
    `Procedimentos inadequados`,
    `Equipamentos deficientes`,
    `Comunicação ineficaz`,
    `Falta de recursos`,
    `Planejamento inadequado`,
    `Controle insuficiente`,
    `Gestão deficiente`
  ];

  const frequencies = [45, 32, 28, 18, 15, 12, 8, 5];
  const total = frequencies.reduce((sum, freq) => sum + freq, 0);
  
  let cumulative = 0;
  const items: ParetoItem[] = causes.map((cause, index) => {
    const frequency = frequencies[index];
    const percentage = (frequency / total) * 100;
    cumulative += percentage;
    
    return {
      cause,
      frequency,
      percentage: Math.round(percentage * 10) / 10,
      cumulativePercentage: Math.round(cumulative * 10) / 10
    };
  });

  const vital20Percent = items.filter(item => item.cumulativePercentage <= 80).map(item => item.cause);

  return {
    problem,
    items,
    vital20Percent
  };
}

export function generateFailureAnalysis(problem: string): FailureAnalysisData {
  return {
    problem,
    incident: {
      description: `Falha identificada em sistema afetando operações`,
      datetime: new Date().toLocaleString('pt-BR'),
      impact: `Impacto significativo em produtividade e qualidade`,
      duration: 'Duração estimada: 2-4 horas para resolução completa'
    },
    timeline: [
      {
        time: '09:00',
        event: `Início dos sintomas em sistema`,
        type: 'warning'
      },
      {
        time: '09:15',
        event: `Primeira notificação de problema em processo`,
        type: 'warning'
      },
      {
        time: '09:30',
        event: `Escalação do problema - impacto crítico identificado`,
        type: 'critical'
      },
      {
        time: '09:45',
        event: `Início das ações de contenção`,
        type: 'normal'
      },
      {
        time: '10:30',
        event: `Implementação de solução temporária`,
        type: 'normal'
      }
    ],
    rootCauses: [
      {
        category: 'Técnica',
        cause: `Falha em componente crítico de sistema`,
        evidence: `Logs mostram erro recorrente em módulo`,
        impact: 'high'
      },
      {
        category: 'Processual',
        cause: `Procedimento de manutenção inadequado`,
        evidence: `Última verificação realizada há mais de 30 dias`,
        impact: 'medium'
      },
      {
        category: 'Humana',
        cause: `Falta de treinamento em procedimentos de emergência`,
        evidence: `Tempo de resposta acima do padrão estabelecido`,
        impact: 'medium'
      }
    ],
    preventiveActions: [
      `Implementar monitoramento proativo de componentes críticos`,
      `Estabelecer rotina de manutenção preventiva para sistemas`,
      `Criar programa de treinamento em procedimentos de emergência`,
      `Desenvolver plano de contingência para falhas similares`
    ],
    correctiveActions: [
      `Substituir componente defeituoso em sistema`,
      `Atualizar procedimentos de manutenção`,
      `Revisar e testar planos de backup`,
      `Documentar lições aprendidas para equipe`
    ]
  };
}

export function generateAnalysis(problem: string): AnalysisResult {
  return {
    ishikawa: generateIshikawaAnalysis(problem),
    pdca: generatePDCAAnalysis(problem),
    fiveWhys: generateFiveWhysAnalysis(problem),
    fiveW2H: generateFiveW2HAnalysis(problem),
    pareto: generateParetoAnalysis(problem),
    failureAnalysis: generateFailureAnalysis(problem)
  };
}