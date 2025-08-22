import React from 'react';
import { FiveW2HData, FiveW2HItem } from '../types';
import { AlertTriangle, TrendingUp, Eye, Zap, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';

interface FiveW2HDiagramProps {
  data: FiveW2HData;
  onDataChange?: (newData: FiveW2HData) => void;
}

export default function FiveW2HDiagram({ data, onDataChange }: FiveW2HDiagramProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState<FiveW2HData>(data);

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

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Análise 5W2H
              </h2>
              <p className="text-purple-100 text-sm">5W2H Analysis - What, Why, Who, When, Where, How, How Much</p>
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
                  className="flex items-center px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200 text-sm font-medium"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Editar
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div id="fiveW2H-diagram" className="p-8 bg-gradient-to-br from-gray-50 to-white">
        {/* Problema e Objetivo */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-100 border-2 border-purple-300 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-purple-800 mb-2">🎯 Problema e Objetivo</h3>
            {isEditing ? (
              <>
                <textarea
                  value={editData.problem}
                  onChange={(e) => setEditData({ ...editData, problem: e.target.value })}
                  className="w-full text-purple-700 font-medium bg-white border border-purple-300 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  placeholder="Problema a ser analisado"
                  rows={2}
                  style={{ minHeight: '60px' }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
                <textarea
                  value={editData.objective}
                  onChange={(e) => setEditData({ ...editData, objective: e.target.value })}
                  className="w-full text-purple-600 text-sm bg-white border border-purple-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  placeholder="Objetivo da análise"
                  rows={2}
                  style={{ minHeight: '60px' }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
              </>
            ) : (
              <>
                <p className="text-purple-700 font-medium">{currentData.problem}</p>
                <p className="text-purple-600 text-sm mt-2">Objetivo: {currentData.objective}</p>
              </>
            )}
          </div>
        </div>

        {/* 7 Perguntas 5W2H */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">❓ As 7 Perguntas Fundamentais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentData.questions.map((q, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    {index + 1}
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm">{q.question}</h4>
                </div>
                {isEditing ? (
                  <textarea
                    value={q.answer}
                    onChange={(e) => {
                      const newQuestions = [...editData.questions];
                      newQuestions[index] = { ...newQuestions[index], answer: e.target.value };
                      setEditData({ ...editData, questions: newQuestions });
                    }}
                    className="w-full text-gray-700 text-sm bg-gray-50 border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                    rows={3}
                    style={{ minHeight: '80px' }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = target.scrollHeight + 'px';
                    }}
                  />
                ) : (
                  <p className="text-gray-700 text-sm leading-relaxed">{q.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ações Detalhadas */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">📋 Ações Detalhadas</h3>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Responsável</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Ação</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Prazo</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Prioridade</th>
                    {isEditing && <th className="px-4 py-3 text-left text-sm font-semibold">Ações</th>}
                  </tr>
                </thead>
                <tbody>
                  {currentData.actionPlan.detailedActions.map((action, index) => (
                    <tr key={action.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <input
                            type="text"
                            value={action.responsible}
                            onChange={(e) => {
                              const newActions = [...editData.actionPlan.detailedActions];
                              newActions[index] = { ...newActions[index], responsible: e.target.value };
                              setEditData({
                                ...editData,
                                actionPlan: { ...editData.actionPlan, detailedActions: newActions }
                              });
                            }}
                            className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                          />
                        ) : (
                          <span className="font-medium text-gray-800">{action.responsible}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <textarea
                            value={action.action}
                            onChange={(e) => {
                              const newActions = [...editData.actionPlan.detailedActions];
                              newActions[index] = { ...newActions[index], action: e.target.value };
                              setEditData({
                                ...editData,
                                actionPlan: { ...editData.actionPlan, detailedActions: newActions }
                              });
                            }}
                            className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 resize-none"
                            rows={2}
                            style={{ minHeight: '40px' }}
                            onInput={(e) => {
                              const target = e.target as HTMLTextAreaElement;
                              target.style.height = 'auto';
                              target.style.height = target.scrollHeight + 'px';
                            }}
                          />
                        ) : (
                          <span className="text-gray-700">{action.action}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <input
                            type="date"
                            value={action.dueDate}
                            onChange={(e) => {
                              const newActions = [...editData.actionPlan.detailedActions];
                              newActions[index] = { ...newActions[index], dueDate: e.target.value };
                              setEditData({
                                ...editData,
                                actionPlan: { ...editData.actionPlan, detailedActions: newActions }
                              });
                            }}
                            className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                          />
                        ) : (
                          <span className="text-gray-700">{new Date(action.dueDate).toLocaleDateString('pt-BR')}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={action.status}
                            onChange={(e) => {
                              const newActions = [...editData.actionPlan.detailedActions];
                              newActions[index] = { ...newActions[index], status: e.target.value as any };
                              setEditData({
                                ...editData,
                                actionPlan: { ...editData.actionPlan, detailedActions: newActions }
                              });
                            }}
                            className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                          >
                            <option value="pending">Pendente</option>
                            <option value="in-progress">Em Andamento</option>
                            <option value="completed">Concluída</option>
                          </select>
                        ) : (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            action.status === 'completed' ? 'bg-green-100 text-green-800' :
                            action.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {action.status === 'completed' ? 'Concluída' :
                             action.status === 'in-progress' ? 'Em Andamento' : 'Pendente'}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {isEditing ? (
                          <select
                            value={action.priority}
                            onChange={(e) => {
                              const newActions = [...editData.actionPlan.detailedActions];
                              newActions[index] = { ...newActions[index], priority: e.target.value as any };
                              setEditData({
                                ...editData,
                                actionPlan: { ...editData.actionPlan, detailedActions: newActions }
                              });
                            }}
                            className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-400"
                          >
                            <option value="low">Baixa</option>
                            <option value="medium">Média</option>
                            <option value="high">Alta</option>
                          </select>
                        ) : (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            action.priority === 'high' ? 'bg-red-100 text-red-800' :
                            action.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {action.priority === 'high' ? 'Alta' :
                             action.priority === 'medium' ? 'Média' : 'Baixa'}
                          </span>
                        )}
                      </td>
                      {isEditing && (
                        <td className="px-4 py-3 text-sm">
                          <button
                            onClick={() => {
                              const newActions = editData.actionPlan.detailedActions.filter((_, i) => i !== index);
                              setEditData({
                                ...editData,
                                actionPlan: { ...editData.actionPlan, detailedActions: newActions }
                              });
                            }}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Remover ação"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {isEditing && (
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    const newAction = {
                      id: Date.now().toString(),
                      responsible: 'Novo Responsável',
                      action: 'Nova ação',
                      dueDate: new Date().toISOString().split('T')[0],
                      status: 'pending' as const,
                      priority: 'medium' as const
                    };
                    setEditData({
                      ...editData,
                      actionPlan: {
                        ...editData.actionPlan,
                        detailedActions: [...editData.actionPlan.detailedActions, newAction]
                      }
                    });
                  }}
                  className="flex items-center text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Nova Ação
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Resumo do Plano */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
          <h3 className="font-bold text-indigo-800 mb-3">📋 Resumo do Plano 5W2H</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">🎯 Benefícios da Metodologia:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Clareza na definição de objetivos</li>
                <li>• Responsabilidades bem definidas</li>
                <li>• Prazos e recursos estabelecidos</li>
                <li>• Metodologia estruturada</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">⚡ Próximos Passos:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Comunicar plano para stakeholders</li>
                <li>• Iniciar execução das ações</li>
                <li>• Monitorar progresso regularmente</li>
                <li>• Ajustar plano conforme necessário</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}