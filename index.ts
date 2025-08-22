export interface Problem {
  description: string;
  category: string;
}

export interface IshikawaCategory {
  name: string;
  causes: string[];
  color: string;
}

export interface IshikawaData {
  problem: string;
  categories: IshikawaCategory[];
}

export interface PDCAStep {
  phase: 'Plan' | 'Do' | 'Check' | 'Act';
  title: string;
  description: string;
  actions: string[];
  color: string;
}

export interface PDCAData {
  problem: string;
  steps: PDCAStep[];
}

export interface FiveWhysData {
  problem: string;
  whys: {
    question: string;
    answer: string;
    level: number;
  }[];
  rootCause: string;
  actions: string[];
}

export interface FiveW2HQuestion {
  question: string;
  answer: string;
  type: 'what' | 'why' | 'who' | 'when' | 'where' | 'how' | 'howmuch';
}

export interface FiveW2HData {
  problem: string;
  objective: string;
  questions: FiveW2HQuestion[];
  actionPlan: FiveW2HActionPlan;
}

export interface FiveW2HActionItem {
  id: string;
  responsible: string;
  action: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface FiveW2HActionPlan {
  what: string;
  why: string;
  who: string;
  when: string;
  where: string;
  how: string;
  howMuch: string;
  detailedActions: FiveW2HActionItem[];
}

export interface ParetoItem {
  cause: string;
  frequency: number;
  percentage: number;
  cumulativePercentage: number;
}

export interface ParetoData {
  problem: string;
  items: ParetoItem[];
  vital20Percent: string[];
}

export interface FailureAnalysisData {
  problem: string;
  incident: {
    description: string;
    datetime: string;
    impact: string;
    duration: string;
  };
  timeline: {
    time: string;
    event: string;
    type: 'normal' | 'warning' | 'critical';
  }[];
  rootCauses: {
    category: string;
    cause: string;
    evidence: string;
    impact: 'low' | 'medium' | 'high' | 'critical';
  }[];
  preventiveActions: string[];
  correctiveActions: string[];
}

export interface AnalysisResult {
  ishikawa: IshikawaData;
  pdca: PDCAData;
  fiveWhys: FiveWhysData;
  fiveW2H: FiveW2HData;
  pareto: ParetoData;
  failureAnalysis: FailureAnalysisData;
}