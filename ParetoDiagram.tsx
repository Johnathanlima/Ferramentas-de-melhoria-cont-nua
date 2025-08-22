import React from 'react';
import { ParetoData } from '../types';
import { Download, Image, BarChart3, TrendingUp, Target, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import { downloadDiagramAsPDF, downloadDiagramAsImage } from '../utils/downloadUtils';

interface ParetoDiagramProps {
  data: ParetoData;
  onDataChange?: (newData: ParetoData) => void;
}

export default function ParetoDiagram({ data, onDataChange }: ParetoDiagramProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState<ParetoData>(data);

  const handleDownloadPDF = () => {
    downloadDiagramAsPDF('pareto-diagram', 'analise-pareto');
  };

  const handleDownloadImage = () => {
    downloadDiagramAsImage('pareto-diagram', 'analise-pareto');
  };

  const handleSave = () => {
    if (onDataChange) {
      onDataChange(editData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(data);
    setIsEditing(false);
  };

  const currentData = isEditing ? editData : data;
  const maxFrequency = Math.max(...currentData.items.map(item => item.frequency));

  // Funções de edição para Pareto
  const updateItem = (index: number, field: keyof typeof currentData.items[0], value: any) => {
    const newItems = [...editData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Recalcular percentuais
    const total = newItems.reduce((sum, item) => sum + item.frequency, 0);
    let cumulative = 0;
    
    newItems.forEach((item, i) => {
      const percentage = (item.frequency / total) * 100;
      cumulative += percentage;
      newItems[i] = {
        ...newItems[i],
        percentage: Math.round(percentage * 10) / 10,
        cumulativePercentage: Math.round(cumulative * 10) / 10
      };
    });
    
    // Atualizar causas vitais (20%)
    const vital20Percent = newItems.filter(item => item.cumulativePercentage <= 80).map(item => item.cause);
    
    setEditData({ ...editData, items: newItems, vital20Percent });
  };

  const addItem = () => {
    const newItem = {
      cause: 'Nova causa',
      frequency: 10,
      percentage: 0,
      cumulativePercentage: 0
    };
    const newItems = [...editData.items, newItem];
    
    // Recalcular percentuais
    const total = newItems.reduce((sum, item) => sum + item.frequency, 0);
    let cumulative = 0;
    
    newItems.forEach((item, i) => {
      const percentage = (item.frequency / total) * 100;
      cumulative += percentage;
      newItems[i] = {
        ...newItems[i],
        percentage: Math.round(percentage * 10) / 10,
        cumulativePercentage: Math.round(cumulative * 10) / 10
      };
    });
    
    const vital20Percent = newItems.filter(item => item.cumulativePercentage <= 80).map(item => item.cause);
    setEditData({ ...editData, items: newItems, vital20Percent });
  };

  const removeItem = (index: number) => {
    const newItems = editData.items.filter((_, i) => i !== index);
    
    // Recalcular percentuais
    const total = newItems.reduce((sum, item) => sum + item.frequency, 0);
    let cumulative = 0;
    
    newItems.forEach((item, i) => {
      const percentage = (item.frequency / total) * 100;
      cumulative += percentage;
      newItems[i] = {
        ...newItems[i],
        percentage: Math.round(percentage * 10) / 10,
        cumulativePercentage: Math.round(cumulative * 10) / 10
      };
    });
    
    const vital20Percent = newItems.filter(item => item.cumulativePercentage <= 80).map(item => item.cause);
    setEditData({ ...editData, items: newItems, vital20Percent });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Análise de Pareto
              </h2>
              <p className="text-orange-100 text-sm">Regra 80/20 - Priorização de Causas</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 text-sm font-medium"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 text-sm font-medium"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Salvar
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-200 text-sm font-medium"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Editar
                </button>
            <button
              onClick={handleDownloadImage}
              className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 text-sm font-medium"
            >
              <Image className="w-4 h-4 mr-1" />
              PNG
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 text-sm font-medium"
            >
              <Download className="w-4 h-4 mr-1" />
              PDF
            </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div id="pareto-diagram" className="p-8 bg-gradient-to-br from-gray-50 to-white">
        {/* Problema */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-2 border-blue-300 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-blue-800 mb-2">🎯 Problema Analisado</h3>
            {isEditing ? (
              <textarea
                value={editData.problem}
                onChange={(e) => setEditData({ ...editData, problem: e.target.value })}
                className="w-full text-blue-700 font-medium bg-white border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={2}
              />
            ) : (
              <p className="text-blue-700 font-medium">{currentData.problem}</p>
            )}
          </div>
        </div>

        {/* Gráfico de Pareto */}
        <div className="mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-6 text-center">📊 Gráfico de Pareto</h3>
            
            {/* Gráfico */}
            <div className="relative h-96 bg-gray-50 rounded-lg p-4 border border-gray-200">
              {/* Eixo Y esquerdo (Frequência) */}
              <div className="absolute left-2 top-4 bottom-12 flex flex-col justify-between text-xs text-gray-600">
                <span>{maxFrequency}</span>
                <span>{Math.round(maxFrequency * 0.75)}</span>
                <span>{Math.round(maxFrequency * 0.5)}</span>
                <span>{Math.round(maxFrequency * 0.25)}</span>
                <span>0</span>
              </div>

              {/* Eixo Y direito (Percentual) */}
              <div className="absolute right-2 top-4 bottom-12 flex flex-col justify-between text-xs text-gray-600">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              {/* Linha 80% */}
              <div className="absolute left-8 right-8 top-[20%] border-t-2 border-red-400 border-dashed">
                <span className="absolute -top-6 right-0 text-xs text-red-600 font-bold bg-white px-2">80%</span>
              </div>

              {/* Barras e linha */}
              <div className="absolute left-8 right-8 top-4 bottom-12 flex items-end justify-between">
                {currentData.items.map((item, index) => {
                  const barHeight = (item.frequency / maxFrequency) * 100;
                  const isVital = currentData.vital20Percent.includes(item.cause);
                  
                  return (
                    <div key={index} className="flex flex-col items-center flex-1 mx-1">
                      {/* Ponto da linha cumulativa */}
                      <div 
                        className="w-2 h-2 bg-red-500 rounded-full mb-1 relative z-10"
                        style={{ 
                          marginBottom: `${100 - item.cumulativePercentage}%`,
                          position: 'absolute',
                          top: `${100 - item.cumulativePercentage}%`
                        }}
                      >
                        <span className="absolute -top-6 -left-4 text-xs text-red-600 font-bold bg-white px-1 rounded">
                          {item.cumulativePercentage}%
                        </span>
                      </div>
                      
                      {/* Barra */}
                      <div 
                        className={`w-full rounded-t-lg ${isVital ? 'bg-orange-500' : 'bg-gray-400'} relative group cursor-pointer hover:opacity-80 transition-opacity`}
                        style={{ height: `${barHeight}%` }}
                      >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                          {item.frequency} ocorrências ({item.percentage}%)
                        </div>
                        
                        {/* Valor da frequência */}
                        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700">
                          {item.frequency}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Eixo X */}
              <div className="absolute left-8 right-8 bottom-0 flex justify-between">
                {currentData.items.map((item, index) => (
                  <div key={index} className="flex-1 mx-1">
                    <div className="text-xs text-gray-600 transform -rotate-45 origin-top-left mt-2 w-20">
                      {item.cause.length > 20 ? `${item.cause.substring(0, 20)}...` : item.cause}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legenda */}
            <div className="mt-6 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                <span className="text-sm text-gray-700">Causas Vitais (20%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-400 rounded mr-2"></div>
                <span className="text-sm text-gray-700">Causas Triviais (80%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-2 bg-red-500 rounded mr-2"></div>
                <span className="text-sm text-gray-700">% Cumulativo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Dados */}
        <div className="mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-4">
              <h3 className="text-lg font-bold text-gray-800">📋 Dados Detalhados</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posição</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Causa</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequência</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentual</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Cumulativo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classificação</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.items.map((item, index) => {
                    const isVital = currentData.vital20Percent.includes(item.cause);
                    return (
                      <tr key={index} className={`${isVital ? 'bg-orange-50' : 'bg-white'} group`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                          {isEditing && (
                            <button
                              onClick={() => removeItem(index)}
                              className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {isEditing ? (
                            <input
                              value={item.cause}
                              onChange={(e) => updateItem(index, 'cause', e.target.value)}
                              className="w-full bg-transparent border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                          ) : (
                            item.cause
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {isEditing ? (
                            <input
                              type="number"
                              min="1"
                              value={item.frequency}
                              onChange={(e) => updateItem(index, 'frequency', parseInt(e.target.value) || 1)}
                              className="w-20 bg-transparent border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            />
                          ) : (
                            item.frequency
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.percentage}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.cumulativePercentage}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            isVital 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {isVital ? 'VITAL' : 'TRIVIAL'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {isEditing && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4">
                        <button
                          onClick={addItem}
                          className="w-full p-2 border-2 border-dashed border-gray-300 rounded text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-all flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar Nova Causa
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Causas Vitais (20%) */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-orange-50 to-amber-100 border-2 border-orange-300 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center">
              <Target className="w-6 h-6 mr-2" />
              🎯 Causas Vitais (20% que geram ~80% dos problemas)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentData.vital20Percent.map((cause, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-orange-200 shadow-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-orange-700 font-medium">{cause}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recomendações */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-100 border-2 border-green-300 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2" />
            🚀 Recomendações Estratégicas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 mb-2">📈 Foco Prioritário:</h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Concentre 80% dos recursos nas causas vitais</li>
                <li>• Implemente ações corretivas imediatas</li>
                <li>• Monitore resultados semanalmente</li>
                <li>• Estabeleça metas específicas para cada causa vital</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">⚡ Próximos Passos:</h4>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• Criar plano de ação para cada causa vital</li>
                <li>• Definir responsáveis e prazos</li>
                <li>• Implementar controles preventivos</li>
                <li>• Reavaliar Pareto após 30 dias</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Metodologia */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-2 text-center">
            📋 Sobre o Princípio de Pareto
          </h4>
          <p className="text-blue-700 text-sm text-center leading-relaxed">
            Também conhecido como Regra 80/20, o Princípio de Pareto estabelece que aproximadamente 80% dos efeitos 
            vêm de 20% das causas. Esta análise ajuda a priorizar esforços onde há maior impacto potencial.
          </p>
        </div>
      </div>
    </div>
  );
}