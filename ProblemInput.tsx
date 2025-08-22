import React from 'react';
import { Target, ArrowRight, CheckCircle, BarChart3, RefreshCw, HelpCircle } from 'lucide-react';

interface ProblemInputProps {
  onStartAnalysis: () => void;
  isLoading?: boolean;
}

export default function ProblemInput({ onStartAnalysis, isLoading = false }: ProblemInputProps) {
  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-full shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 bg-yellow-400 p-1 rounded-full animate-pulse">
              <CheckCircle className="w-4 h-4 text-yellow-800" />
            </div>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Análise de Problemas
          </span>
        </h1>
        <p className="text-xl text-gray-700 mb-3 font-medium">
          Ferramentas de Análise: Ishikawa, PDCA, 5 Porquês, 5W2H, Análise de Quebra/Falha, Timeline
        </p>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Crie análises estruturadas usando as <span className="font-semibold text-indigo-600">6 principais metodologias</span> de 
          resolução de problemas e melhoria contínua
        </p>
      </div>

      {/* Metodologias Disponíveis */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          🔬 6 Metodologias de Análise Disponíveis
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Primeira coluna - 3 blocos */}
          <div className="space-y-6">
          {/* Diagrama de Ishikawa */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 p-3 rounded-lg mr-4">
                <span className="text-2xl text-white">🐟</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-800">Diagrama de Ishikawa</h3>
                <p className="text-sm text-blue-600">Espinha de Peixe (6M's)</p>
              </div>
            </div>
            <p className="text-blue-700 text-sm leading-relaxed mb-4">
              Identifica e organiza as causas raízes em 6 categorias fundamentais: 
              <strong> Pessoas, Método, Máquina, Material, Medição e Meio Ambiente</strong>.
            </p>
            <div className="bg-blue-100 p-3 rounded-lg">
              <p className="text-xs text-blue-800">
                <strong>Ideal para:</strong> Análise estruturada de problemas complexos com múltiplas causas potenciais.
              </p>
            </div>
          </div>

          {/* 5 Porquês */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-100 border-2 border-purple-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-purple-500 p-3 rounded-lg mr-4">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-purple-800">5 Porquês</h3>
                <p className="text-sm text-purple-600">5 Whys Analysis</p>
              </div>
            </div>
            <p className="text-purple-700 text-sm leading-relaxed mb-4">
              Técnica de investigação que utiliza a repetição da pergunta 
              <strong> "Por quê?"</strong> para descobrir a causa raiz real do problema.
            </p>
            <div className="bg-purple-100 p-3 rounded-lg">
              <p className="text-xs text-purple-800">
                <strong>Ideal para:</strong> Investigação rápida e direta de problemas com causa raiz específica.
              </p>
            </div>
          </div>

          {/* Timeline de Incidentes */}
          <div className="bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-amber-500 p-3 rounded-lg mr-4">
                <span className="text-2xl text-white">⏰</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-800">Timeline de Incidentes</h3>
                <p className="text-sm text-amber-600">Cronologia Detalhada</p>
              </div>
            </div>
            <p className="text-amber-700 text-sm leading-relaxed mb-4">
              Mapeamento cronológico de <strong>eventos e incidentes</strong>, 
              permitindo análise temporal precisa e identificação de padrões.
            </p>
            <div className="bg-amber-100 p-3 rounded-lg">
              <p className="text-xs text-amber-800">
                <strong>Ideal para:</strong> Análise temporal de eventos, identificação de padrões e sequências críticas.
              </p>
            </div>
          </div>
          </div>

          {/* Segunda coluna - 3 blocos */}
          <div className="space-y-6">
          {/* PDCA */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-green-500 p-3 rounded-lg mr-4">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-800">Ciclo PDCA</h3>
                <p className="text-sm text-green-600">Plan-Do-Check-Act</p>
              </div>
            </div>
            <p className="text-green-700 text-sm leading-relaxed mb-4">
              Metodologia de melhoria contínua em 4 fases: 
              <strong> Planejar, Fazer, Verificar e Agir</strong>, 
              garantindo implementação efetiva de soluções.
            </p>
            <div className="bg-green-100 p-3 rounded-lg">
              <p className="text-xs text-green-800">
                <strong>Ideal para:</strong> Implementação sistemática de melhorias e controle de resultados.
              </p>
            </div>
          </div>

          {/* FMEA */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-500 p-3 rounded-lg mr-4">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-indigo-800">5W2H</h3>
                <p className="text-sm text-indigo-600">What, Why, Who, When, Where, How, How Much</p>
              </div>
            </div>
            <p className="text-indigo-700 text-sm leading-relaxed mb-4">
              Metodologia de planejamento que utiliza <strong>7 perguntas fundamentais</strong> 
              para estruturar planos de ação de forma clara e objetiva.
            </p>
            <div className="bg-indigo-100 p-3 rounded-lg">
              <p className="text-xs text-indigo-800">
                <strong>Ideal para:</strong> Planejamento detalhado de ações com responsáveis e prazos definidos.
              </p>
            </div>
          </div>

          {/* Análise de Quebra/Falha */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-100 border-2 border-teal-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="bg-teal-500 p-3 rounded-lg mr-4">
                <span className="text-2xl text-white">🔍</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-teal-800">Análise de Quebra/Falha</h3>
                <p className="text-sm text-teal-600">Root Cause Analysis (RCA)</p>
              </div>
            </div>
            <p className="text-teal-700 text-sm leading-relaxed mb-4">
              Investigação sistemática de <strong>incidentes e falhas</strong>, 
              com timeline detalhado, causas raízes e ações corretivas/preventivas.
            </p>
            <div className="bg-teal-100 p-3 rounded-lg">
              <p className="text-xs text-teal-800">
                <strong>Ideal para:</strong> Análise pós-incidente, investigação de quebras e prevenção de recorrências.
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* Botão de Iniciar */}
      <div className="flex justify-center mb-12">
        <button
          onClick={onStartAnalysis}
          disabled={isLoading}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-12 py-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {isLoading ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
              <span className="text-lg">Preparando Análises...</span>
            </>
          ) : (
            <>
              <Target className="w-5 h-5" />
              <span className="text-lg">Iniciar Análise</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* Benefícios do Sistema */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <h3 className="font-bold text-green-800 mb-3 flex items-center justify-center">
          ⚡ O que você receberá:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              🎯 Análise Completa
            </h4>
            <p className="text-gray-600 text-sm">Aplicação das 6 metodologias complementares para visão 360° do problema.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              📊 Diagramas Visuais
            </h4>
            <p className="text-gray-600 text-sm">Representações gráficas profissionais editáveis e exportáveis.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              📋 Plano de Ação
            </h4>
            <p className="text-gray-600 text-sm">Roteiro estruturado com ações específicas e priorizadas.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              📄 Relatório Executivo
            </h4>
            <p className="text-gray-600 text-sm">Documento profissional pronto para apresentações.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              ✏️ Edição Completa
            </h4>
            <p className="text-gray-600 text-sm">Personalize todas as análises conforme sua realidade.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              🔄 Melhoria Contínua
            </h4>
            <p className="text-gray-600 text-sm">Ciclo estruturado para sustentabilidade das soluções.</p>
          </div>
        </div>
      </div>

      {/* Informações sobre Metodologias */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-blue-800 mb-4 text-center">
          📚 Sobre as Metodologias
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">🔍 Análise de Causas:</h4>
            <ul className="text-blue-600 space-y-1">
              <li>• <strong>Ishikawa:</strong> Categorização sistemática das causas</li>
              <li>• <strong>5 Porquês:</strong> Investigação profunda da causa raiz</li>
              <li>• <strong>Análise de Quebra/Falha:</strong> Investigação detalhada de incidentes</li>
              <li>• <strong>Timeline:</strong> Mapeamento cronológico de eventos</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-700 mb-2">🛠️ Implementação:</h4>
            <ul className="text-blue-600 space-y-1">
              <li>• <strong>PDCA:</strong> Ciclo estruturado de melhoria</li>
              <li>• <strong>5W2H:</strong> Planejamento estruturado de ações</li>
              <li>• <strong>Timeline de Incidentes:</strong> Análise cronológica de eventos</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}