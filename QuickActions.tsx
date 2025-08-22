import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  Clock,
  Users,
  Lightbulb,
  FileText,
  Copy,
  Check,
  Plus,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface KaizenIdea {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  category: string;
  status: 'idea' | 'analyzing' | 'implementing' | 'done';
  createdAt: Date;
}

interface PDCATracker {
  id: string;
  problem: string;
  plan: string;
  do: string;
  check: string;
  act: string;
  currentPhase: 'plan' | 'do' | 'check' | 'act';
  startDate: Date;
  dueDate: Date;
}

export default function QuickActions() {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [kaizenIdeas, setKaizenIdeas] = useState<KaizenIdea[]>([]);
  const [pdcaTrackers, setPdcaTrackers] = useState<PDCATracker[]>([]);
  const [newKaizenTitle, setNewKaizenTitle] = useState('');
  const [showKaizenForm, setShowKaizenForm] = useState(false);

  // Adicionar nova ideia Kaizen
  const addKaizenIdea = () => {
    if (!newKaizenTitle.trim()) return;
    
    const newIdea: KaizenIdea = {
      id: Date.now().toString(),
      title: newKaizenTitle,
      description: '',
      impact: 'medium',
      effort: 'medium',
      category: 'Processo',
      status: 'idea',
      createdAt: new Date()
    };
    
    setKaizenIdeas([...kaizenIdeas, newIdea]);
    setNewKaizenTitle('');
    setShowKaizenForm(false);
  };

  // Remover ideia Kaizen
  const removeKaizenIdea = (id: string) => {
    setKaizenIdeas(kaizenIdeas.filter(idea => idea.id !== id));
  };

  // Atualizar status da ideia
  const updateKaizenStatus = (id: string, status: KaizenIdea['status']) => {
    setKaizenIdeas(kaizenIdeas.map(idea => 
      idea.id === id ? { ...idea, status } : idea
    ));
  };

  // Templates específicos de melhoria contínua
  const improvementTemplates = [
    {
      name: 'Relatório A3',
      template: `📋 RELATÓRIO A3 - RESOLUÇÃO DE PROBLEMAS

🎯 PROBLEMA:
[Descreva o problema de forma clara e específica]

📊 SITUAÇÃO ATUAL:
• Estado atual: [Descrição]
• Dados/Métricas: [Números atuais]
• Impacto: [Consequências do problema]

🔍 ANÁLISE DE CAUSA RAIZ:
• Causa 1: [Descrição]
• Causa 2: [Descrição]
• Causa Raiz Principal: [Identificação]

🎯 ESTADO FUTURO DESEJADO:
• Meta: [Objetivo específico]
• Indicadores: [Como medir sucesso]
• Prazo: [Timeline]

📋 PLANO DE AÇÃO:
1. [Ação 1] - Responsável: [Nome] - Prazo: [Data]
2. [Ação 2] - Responsável: [Nome] - Prazo: [Data]
3. [Ação 3] - Responsável: [Nome] - Prazo: [Data]

✅ ACOMPANHAMENTO:
• Data de revisão: [Data]
• Responsável pelo follow-up: [Nome]
• Próximos passos: [Ações]`
    },
    {
      name: 'Plano Kaizen',
      template: `🚀 PLANO DE MELHORIA KAIZEN

💡 IDEIA DE MELHORIA:
[Título da melhoria proposta]

📝 DESCRIÇÃO:
[Explicação detalhada da melhoria]

🎯 OBJETIVO:
[O que se pretende alcançar]

📊 SITUAÇÃO ATUAL vs FUTURA:
• Antes: [Estado atual]
• Depois: [Estado desejado]
• Benefício esperado: [Ganhos]

⚡ IMPLEMENTAÇÃO:
• Esforço necessário: Alto/Médio/Baixo
• Impacto esperado: Alto/Médio/Baixo
• Recursos necessários: [Lista]
• Prazo estimado: [Timeline]

👥 ENVOLVIDOS:
• Responsável: [Nome]
• Apoio necessário: [Pessoas/Áreas]
• Aprovação: [Quem precisa aprovar]

📈 MÉTRICAS DE SUCESSO:
• Indicador 1: [Métrica]
• Indicador 2: [Métrica]
• Como medir: [Metodologia]

🔄 PRÓXIMOS PASSOS:
1. [Passo 1]
2. [Passo 2]
3. [Passo 3]`
    },
    {
      name: 'Checklist 5S',
      template: `📋 CHECKLIST 5S - AUDITORIA

🗂️ 1. SEIRI (SENSO DE UTILIZAÇÃO):
□ Itens desnecessários foram removidos
□ Apenas itens essenciais estão presentes
□ Área livre de objetos sem uso
□ Classificação clara do que manter/descartar

🏷️ 2. SEITON (SENSO DE ORGANIZAÇÃO):
□ Cada item tem lugar definido
□ Identificação visual clara
□ Fácil acesso aos itens necessários
□ Layout otimizado para fluxo

🧹 3. SEISO (SENSO DE LIMPEZA):
□ Área limpa e organizada
□ Equipamentos limpos
□ Fontes de sujeira identificadas
□ Rotina de limpeza estabelecida

📏 4. SEIKETSU (SENSO DE PADRONIZAÇÃO):
□ Padrões visuais implementados
□ Procedimentos documentados
□ Responsabilidades definidas
□ Controles visuais em uso

🎯 5. SHITSUKE (SENSO DE DISCIPLINA):
□ Rotinas sendo seguidas
□ Auditorias regulares realizadas
□ Melhorias contínuas implementadas
□ Equipe engajada no processo

📊 PONTUAÇÃO:
Total de itens OK: ___/20
Percentual de conformidade: ___%

🚨 AÇÕES NECESSÁRIAS:
1. [Ação prioritária]
2. [Ação secundária]
3. [Ação de melhoria]

📅 PRÓXIMA AUDITORIA: [Data]
👤 RESPONSÁVEL: [Nome]`
    },
    {
      name: 'Análise de Desperdícios',
      template: `🔍 ANÁLISE DOS 8 DESPERDÍCIOS (LEAN)

📦 1. SUPERPRODUÇÃO:
• Observado: Sim/Não
• Descrição: [Detalhes]
• Impacto: [Consequências]
• Ação: [Proposta de melhoria]

⏳ 2. ESPERA:
• Observado: Sim/Não
• Descrição: [Detalhes]
• Impacto: [Consequências]
• Ação: [Proposta de melhoria]

🚚 3. TRANSPORTE:
• Observado: Sim/Não
• Descrição: [Detalhes]
• Impacto: [Consequências]
• Ação: [Proposta de melhoria]

⚙️ 4. PROCESSAMENTO EXCESSIVO:
• Observado: Sim/Não
• Descrição: [Detalhes]
• Impacto: [Consequências]
• Ação: [Proposta de melhoria]

📦 5. ESTOQUE:
• Observado: Sim/Não
• Descrição: [Detalhes]
• Impacto: [Consequências]
• Ação: [Proposta de melhoria]

🚶 6. MOVIMENTAÇÃO:
• Observado: Sim/Não
• Descrição: [Detalhes]
• Impacto: [Consequências]
• Ação: [Proposta de melhoria]

❌ 7. DEFEITOS:
• Observado: Sim/Não
• Descrição: [Detalhes]
• Impacto: [Consequências]
• Ação: [Proposta de melhoria]

🧠 8. TALENTO SUBUTILIZADO:
• Observado: Sim/Não
• Descrição: [Detalhes]
• Impacto: [Consequências]
• Ação: [Proposta de melhoria]

📊 RESUMO:
• Desperdícios identificados: [Número]
• Prioridade 1: [Desperdício mais crítico]
• Ação imediata: [O que fazer primeiro]
• Responsável: [Nome]
• Prazo: [Data]`
    }
  ];

  const copyToClipboard = async (text: string, templateName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(templateName);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-800';
      case 'implementing': return 'bg-blue-100 text-blue-800';
      case 'analyzing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-5">
        <div className="flex items-center">
          <div className="bg-white/20 p-2 rounded-lg mr-3">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Ferramentas de Melhoria Contínua
            </h2>
            <p className="text-emerald-100 text-sm">Kaizen, Lean, 5S e ferramentas práticas</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Rastreador de Ideias Kaizen */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
              💡 Banco de Ideias Kaizen
            </h3>
            <button
              onClick={() => setShowKaizenForm(!showKaizenForm)}
              className="flex items-center px-3 py-1 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Nova Ideia
            </button>
          </div>

          {showKaizenForm && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Digite sua ideia de melhoria..."
                  value={newKaizenTitle}
                  onChange={(e) => setNewKaizenTitle(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  onKeyPress={(e) => e.key === 'Enter' && addKaizenIdea()}
                />
                <button
                  onClick={addKaizenIdea}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {kaizenIdeas.map((idea) => (
              <div key={idea.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 text-sm flex-1">{idea.title}</h4>
                  <button
                    onClick={() => removeKaizenIdea(idea.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(idea.impact)}`}>
                    {idea.impact === 'high' ? 'Alto Impacto' : idea.impact === 'medium' ? 'Médio Impacto' : 'Baixo Impacto'}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(idea.status)}`}>
                    {idea.status === 'done' ? 'Concluído' : 
                     idea.status === 'implementing' ? 'Implementando' :
                     idea.status === 'analyzing' ? 'Analisando' : 'Ideia'}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  {(['idea', 'analyzing', 'implementing', 'done'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateKaizenStatus(idea.id, status)}
                      className={`flex-1 px-2 py-1 text-xs rounded transition-colors ${
                        idea.status === status 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {status === 'idea' ? 'Ideia' :
                       status === 'analyzing' ? 'Análise' :
                       status === 'implementing' ? 'Fazendo' : 'Feito'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            {kaizenIdeas.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>Nenhuma ideia cadastrada ainda.</p>
                <p className="text-sm">Clique em "Nova Ideia" para começar!</p>
              </div>
            )}
          </div>
        </div>

        {/* Métricas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-lg p-4 text-center">
            <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-800 text-sm">Ideias Ativas</h4>
            <p className="text-2xl font-bold text-blue-600">
              {kaizenIdeas.filter(idea => idea.status !== 'done').length}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-lg p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-green-800 text-sm">Implementadas</h4>
            <p className="text-2xl font-bold text-green-600">
              {kaizenIdeas.filter(idea => idea.status === 'done').length}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-amber-100 border border-yellow-200 rounded-lg p-4 text-center">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <h4 className="font-semibold text-yellow-800 text-sm">Em Andamento</h4>
            <p className="text-2xl font-bold text-yellow-600">
              {kaizenIdeas.filter(idea => ['analyzing', 'implementing'].includes(idea.status)).length}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 rounded-lg p-4 text-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-purple-800 text-sm">Taxa de Sucesso</h4>
            <p className="text-2xl font-bold text-purple-600">
              {kaizenIdeas.length > 0 ? Math.round((kaizenIdeas.filter(idea => idea.status === 'done').length / kaizenIdeas.length) * 100) : 0}%
            </p>
          </div>
        </div>

        {/* Templates de Melhoria Contínua */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            📋 Templates de Melhoria Contínua
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {improvementTemplates.map((template, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-800">{template.name}</h4>
                  <button
                    onClick={() => copyToClipboard(template.template, template.name)}
                    className={`p-2 rounded transition-colors ${
                      copiedText === template.name 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {copiedText === template.name ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="bg-white border border-gray-200 rounded p-3 max-h-40 overflow-y-auto">
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono">
                    {template.template.substring(0, 200)}...
                  </pre>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Template completo copiado para área de transferência
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ferramentas Rápidas de Análise */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
          <h3 className="font-bold text-indigo-800 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            🎯 Ferramentas Rápidas de Análise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-700 mb-2">⚡ Matriz de Priorização</h4>
              <div className="text-sm text-indigo-600 space-y-1">
                <div>• <strong>Alto Impacto + Baixo Esforço</strong> = Fazer Agora</div>
                <div>• <strong>Alto Impacto + Alto Esforço</strong> = Planejar</div>
                <div>• <strong>Baixo Impacto + Baixo Esforço</strong> = Talvez</div>
                <div>• <strong>Baixo Impacto + Alto Esforço</strong> = Evitar</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-700 mb-2">🔍 5W2H Rápido</h4>
              <div className="text-sm text-indigo-600 space-y-1">
                <div>• <strong>What</strong> - O que fazer?</div>
                <div>• <strong>Why</strong> - Por que fazer?</div>
                <div>• <strong>Who</strong> - Quem vai fazer?</div>
                <div>• <strong>When</strong> - Quando fazer?</div>
                <div>• <strong>Where</strong> - Onde fazer?</div>
                <div>• <strong>How</strong> - Como fazer?</div>
                <div>• <strong>How Much</strong> - Quanto custa?</div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-700 mb-2">📊 Indicadores Lean</h4>
              <div className="text-sm text-indigo-600 space-y-1">
                <div>• <strong>Lead Time</strong> - Tempo total do processo</div>
                <div>• <strong>Cycle Time</strong> - Tempo de cada etapa</div>
                <div>• <strong>Takt Time</strong> - Ritmo da demanda</div>
                <div>• <strong>First Pass Yield</strong> - % sem retrabalho</div>
                <div>• <strong>OEE</strong> - Eficiência do equipamento</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}