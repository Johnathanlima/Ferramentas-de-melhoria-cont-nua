import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import EditableIshikawaDiagram from './EditableIshikawaDiagram';
import EditablePDCADiagram from './EditablePDCADiagram';
import FiveWhysDiagram from './FiveWhysDiagram';
import FiveW2HDiagram from './FiveW2HDiagram';
import FailureAnalysisDiagram from './FailureAnalysisDiagram';
import { ArrowLeft, FileText, Target, TrendingUp } from 'lucide-react';
import { downloadCompleteReport } from '../utils/downloadUtils';

interface DashboardProps {
  result: AnalysisResult;
  onBack: () => void;
}

export default function Dashboard({ result, onBack }: DashboardProps) {
  const [currentResult, setCurrentResult] = useState<AnalysisResult>(result);
  const [activeTab, setActiveTab] = useState('ishikawa');

  const handleShare = () => {
  };

  const handleIshikawaChange = (newIshikawaData: typeof currentResult.ishikawa) => {
    setCurrentResult({
      ...currentResult,
      ishikawa: newIshikawaData
    });
  };

  const handlePDCAChange = (newPDCAData: typeof currentResult.pdca) => {
    setCurrentResult({
      ...currentResult,
      pdca: newPDCAData
    });
  };

  const handleFiveWhysChange = (newFiveWhysData: typeof currentResult.fiveWhys) => {
    setCurrentResult({
      ...currentResult,
      fiveWhys: newFiveWhysData
    });
  };

  const handleFMEAChange = (newFMEAData: typeof currentResult.fmea) => {
    setCurrentResult({
      ...currentResult,
      fiveW2H: newFMEAData
    });
  };

  const handleFiveW2HChange = (newFiveW2HData: typeof currentResult.fiveW2H) => {
    setCurrentResult({
      ...currentResult,
      fiveW2H: newFiveW2HData
    });
  };

  const handleFailureAnalysisChange = (newFailureAnalysisData: typeof currentResult.failureAnalysis) => {
    setCurrentResult({
      ...currentResult,
      failureAnalysis: newFailureAnalysisData
    });
  };

  const handleParetoChange = (newParetoData: typeof currentResult.pareto) => {
    setCurrentResult({
      ...currentResult,
      pareto: newParetoData
    });
  };


  const tabs = [
    { id: 'ishikawa', name: 'Ishikawa', icon: '🐟', description: 'Espinha de Peixe' },
    { id: 'pdca', name: 'PDCA', icon: '🔄', description: 'Ciclo de Melhoria' },
    { id: 'fivewhys', name: '5 Porquês', icon: '❓', description: 'Investigação Profunda' },
    { id: 'fiveW2H', name: '5W2H', icon: '📋', description: 'Plano de Ação' },
    { id: 'failure', name: 'RCA', icon: '🔍', description: 'Análise de Quebra' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mr-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar
              </button>
              <div className="flex items-center">
                <Target className="w-6 h-6 text-indigo-600 mr-2" />
                <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Análise de Problemas
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎯 Análise Completa Gerada
          </h1>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4 max-w-4xl mx-auto">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-800">Problema analisado:</span> 
              <span className="italic">{currentResult.ishikawa.problem}</span>
            </p>
          </div>
        </div>

        {/* Tabs de Navegação */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{tab.icon}</span>
                    <div className="text-left">
                      <div className="font-semibold">{tab.name}</div>
                      <div className="text-xs text-gray-500">{tab.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="space-y-8 min-h-screen">
          {activeTab === 'ishikawa' && (
            <div className="w-full">
              <EditableIshikawaDiagram 
                data={currentResult.ishikawa} 
                onDataChange={handleIshikawaChange}
              />
            </div>
          )}
          
          {activeTab === 'pdca' && (
            <div className="w-full">
              <EditablePDCADiagram 
                data={currentResult.pdca} 
                onDataChange={handlePDCAChange}
              />
            </div>
          )}

          {activeTab === 'fivewhys' && (
            <div className="w-full">
              <FiveWhysDiagram 
                data={currentResult.fiveWhys} 
                onDataChange={handleFiveWhysChange}
              />
            </div>
          )}

          {activeTab === 'fiveW2H' && (
            <div className="w-full">
              <FiveW2HDiagram 
                data={currentResult.fiveW2H} 
                onDataChange={handleFiveW2HChange}
              />
            </div>
          )}

          {activeTab === 'failure' && (
            <div className="w-full">
              <FailureAnalysisDiagram 
                data={currentResult.failureAnalysis} 
                onDataChange={handleFailureAnalysisChange}
              />
            </div>
          )}

        </div>
        
        <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-bold text-green-800 mb-3 flex items-center">
            🚀 Próximos Passos Recomendados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-green-600 mr-2">1️⃣</span>
                <span className="text-green-700">Priorize as causas raízes mais críticas identificadas no diagrama de Ishikawa</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">2️⃣</span>
                <span className="text-green-700">Execute as ações do PDCA de forma sequencial e documentada</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">3️⃣</span>
                <span className="text-green-700">Utilize a análise dos 5 Porquês para investigação mais profunda</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <span className="text-green-600 mr-2">4️⃣</span>
                <span className="text-green-700">Implemente ações preventivas do 5W2H</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">5️⃣</span>
                <span className="text-green-700">Execute análise de quebra/falha para incidentes específicos</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-600 mr-2">6️⃣</span>
                <span className="text-green-700">Monitore resultados continuamente</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-blue-800 mb-3 flex items-center">
            📊 Sobre as Metodologias Utilizadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2">🐟 Ishikawa (6M's)</h4>
              <p className="text-gray-700 text-xs">Organiza causas em 6 categorias: Pessoas, Método, Máquina, Material, Medição e Meio Ambiente.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
              <h4 className="font-semibold text-purple-800 mb-2">🔄 PDCA</h4>
              <p className="text-gray-700 text-xs">Ciclo de melhoria contínua: Planejar, Fazer, Verificar e Agir.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
              <h4 className="font-semibold text-green-800 mb-2">❓ 5 Porquês</h4>
              <p className="text-gray-700 text-xs">Investigação da causa raiz através de perguntas sucessivas "Por quê?".</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
              <h4 className="font-semibold text-red-800 mb-2">📋 5W2H</h4>
              <p className="text-gray-700 text-xs">Metodologia de planejamento com 7 perguntas fundamentais.</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-teal-100">
              <h4 className="font-semibold text-teal-800 mb-2">🔍 RCA</h4>
              <p className="text-gray-700 text-xs">Análise detalhada de incidentes com timeline e ações corretivas/preventivas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}