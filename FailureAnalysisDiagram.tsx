import React from 'react';
import { FailureAnalysisData } from '../types';
import { Download, Image, AlertCircle, Clock, TrendingDown, CheckCircle, Shield, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import { downloadDiagramAsPDF, downloadDiagramAsImage } from '../utils/downloadUtils';

interface FailureAnalysisDiagramProps {
  data: FailureAnalysisData;
  onDataChange?: (newData: FailureAnalysisData) => void;
}

export default function FailureAnalysisDiagram({ data, onDataChange }: FailureAnalysisDiagramProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState<FailureAnalysisData>(data);

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

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🔴';
      case 'warning': return '🟡';
      default: return '🟢';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const currentData = isEditing ? editData : data;

  // Funções de edição
  const updateTimelineEvent = (index: number, field: 'time' | 'event' | 'type', value: string) => {
    const newTimeline = [...editData.timeline];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setEditData({ ...editData, timeline: newTimeline });
  };

  const addTimelineEvent = () => {
    const newEvent = {
      time: '00:00',
      event: 'Novo evento',
      type: 'normal' as const
    };
    setEditData({ ...editData, timeline: [...editData.timeline, newEvent] });
  };

  const removeTimelineEvent = (index: number) => {
    const newTimeline = editData.timeline.filter((_, i) => i !== index);
    setEditData({ ...editData, timeline: newTimeline });
  };

  const updateRootCause = (index: number, field: keyof typeof editData.rootCauses[0], value: string) => {
    const newRootCauses = [...editData.rootCauses];
    newRootCauses[index] = { ...newRootCauses[index], [field]: value };
    setEditData({ ...editData, rootCauses: newRootCauses });
  };

  const addRootCause = () => {
    const newCause = {
      category: 'Nova categoria',
      cause: 'Nova causa',
      evidence: 'Nova evidência',
      impact: 'medium' as const
    };
    setEditData({ ...editData, rootCauses: [...editData.rootCauses, newCause] });
  };

  const removeRootCause = (index: number) => {
    const newRootCauses = editData.rootCauses.filter((_, i) => i !== index);
    setEditData({ ...editData, rootCauses: newRootCauses });
  };

  const updateAction = (type: 'correctiveActions' | 'preventiveActions', index: number, value: string) => {
    const newActions = [...editData[type]];
    newActions[index] = value;
    setEditData({ ...editData, [type]: newActions });
  };

  const addAction = (type: 'correctiveActions' | 'preventiveActions') => {
    const newActions = [...editData[type], 'Nova ação'];
    setEditData({ ...editData, [type]: newActions });
  };

  const removeAction = (type: 'correctiveActions' | 'preventiveActions', index: number) => {
    const newActions = editData[type].filter((_, i) => i !== index);
    setEditData({ ...editData, [type]: newActions });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Análise de Quebra/Falha
              </h2>
              <p className="text-teal-100 text-sm">Root Cause Analysis - Investigação de Incidentes</p>
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
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200 text-sm font-medium"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Editar
                </button>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div id="failure-analysis-diagram" className="p-8 bg-gradient-to-br from-gray-50 to-white">
        {/* Informações do Incidente */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-red-50 to-rose-100 border-2 border-red-300 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2" />
              🚨 Detalhes do Incidente
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-red-700 mb-2">Descrição:</h4>
                {isEditing ? (
                  <textarea
                    value={editData.incident.description}
                    onChange={(e) => setEditData({
                      ...editData,
                      incident: { ...editData.incident, description: e.target.value }
                    })}
                    className="w-full text-red-600 bg-white p-3 rounded-lg border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                    rows={3}
                  />
                ) : (
                  <p className="text-red-600 bg-white p-3 rounded-lg border border-red-200">
                    {currentData.incident.description}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-red-700 mb-1">Data/Hora:</h4>
                  {isEditing ? (
                    <input
                      value={editData.incident.datetime}
                      onChange={(e) => setEditData({
                        ...editData,
                        incident: { ...editData.incident, datetime: e.target.value }
                      })}
                      className="w-full text-red-600 bg-white p-2 rounded border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  ) : (
                    <p className="text-red-600 bg-white p-2 rounded border border-red-200 text-sm">
                      {currentData.incident.datetime}
                    </p>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 mb-1">Duração:</h4>
                  {isEditing ? (
                    <input
                      value={editData.incident.duration}
                      onChange={(e) => setEditData({
                        ...editData,
                        incident: { ...editData.incident, duration: e.target.value }
                      })}
                      className="w-full text-red-600 bg-white p-2 rounded border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  ) : (
                    <p className="text-red-600 bg-white p-2 rounded border border-red-200 text-sm">
                      {currentData.incident.duration}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-red-700 mb-2">Impacto:</h4>
              {isEditing ? (
                <textarea
                  value={editData.incident.impact}
                  onChange={(e) => setEditData({
                    ...editData,
                    incident: { ...editData.incident, impact: e.target.value }
                  })}
                  className="w-full text-red-600 bg-white p-3 rounded-lg border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                  rows={2}
                />
              ) : (
                <p className="text-red-600 bg-white p-3 rounded-lg border border-red-200">
                  {currentData.incident.impact}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Timeline do Incidente */}
        <div className="mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              ⏰ Timeline do Incidente
            </h3>
            <div className="relative">
              {/* Linha vertical */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              
              <div className="space-y-6">
                {currentData.timeline.map((event, index) => (
                  <div key={index} className="relative flex items-start group">
                    {/* Ponto na timeline */}
                    <div className="flex-shrink-0 w-12 h-12 bg-white border-4 border-gray-300 rounded-full flex items-center justify-center text-lg shadow-md z-10">
                      {getTimelineIcon(event.type)}
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="ml-6 flex-1">
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          {isEditing ? (
                            <input
                              value={event.time}
                              onChange={(e) => updateTimelineEvent(index, 'time', e.target.value)}
                              className="font-bold text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                          ) : (
                            <span className="font-bold text-gray-800">{event.time}</span>
                          )}
                          <div className="flex items-center space-x-2">
                            {isEditing && (
                              <>
                                <select
                                  value={event.type}
                                  onChange={(e) => updateTimelineEvent(index, 'type', e.target.value)}
                                  className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                >
                                  <option value="normal">Normal</option>
                                  <option value="warning">Warning</option>
                                  <option value="critical">Critical</option>
                                </select>
                                <button
                                  onClick={() => removeTimelineEvent(index)}
                                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </>
                            )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            event.type === 'critical' ? 'bg-red-100 text-red-800' :
                            event.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {event.type.toUpperCase()}
                          </span>
                          </div>
                        </div>
                        {isEditing ? (
                          <textarea
                            value={event.event}
                            onChange={(e) => updateTimelineEvent(index, 'event', e.target.value)}
                            className="w-full text-gray-700 bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            rows={2}
                          />
                        ) : (
                          <p className="text-gray-700">{event.event}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={addTimelineEvent}
                    className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-all flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Evento
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Causas Raízes */}
        <div className="mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
              <TrendingDown className="w-6 h-6 mr-2" />
              🔍 Causas Raízes Identificadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentData.rootCauses.map((cause, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm group">
                  <div className="flex items-center justify-between mb-3">
                    {isEditing ? (
                      <input
                        value={cause.category}
                        onChange={(e) => updateRootCause(index, 'category', e.target.value)}
                        className="font-bold text-gray-800 bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      />
                    ) : (
                      <h4 className="font-bold text-gray-800">{cause.category}</h4>
                    )}
                    <div className="flex items-center space-x-2">
                      {isEditing && (
                        <>
                          <select
                            value={cause.impact}
                            onChange={(e) => updateRootCause(index, 'impact', e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                          </select>
                          <button
                            onClick={() => removeRootCause(index)}
                            className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactColor(cause.impact)}`}>
                      {cause.impact.toUpperCase()}
                    </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <h5 className="font-semibold text-gray-700 text-sm">Causa:</h5>
                      {isEditing ? (
                        <textarea
                          value={cause.cause}
                          onChange={(e) => updateRootCause(index, 'cause', e.target.value)}
                          className="w-full text-gray-600 text-sm bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          rows={2}
                        />
                      ) : (
                        <p className="text-gray-600 text-sm">{cause.cause}</p>
                      )}
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-700 text-sm">Evidência:</h5>
                      {isEditing ? (
                        <textarea
                          value={cause.evidence}
                          onChange={(e) => updateRootCause(index, 'evidence', e.target.value)}
                          className="w-full text-gray-600 text-sm bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                          rows={2}
                        />
                      ) : (
                        <p className="text-gray-600 text-sm">{cause.evidence}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={addRootCause}
                  className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-all flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Causa
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Ações Corretivas */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-2 border-blue-300 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2" />
              🔧 Ações Corretivas
            </h3>
            <div className="space-y-3">
              {currentData.correctiveActions.map((action, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-blue-200 shadow-sm group">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    {isEditing ? (
                      <div className="flex-1 flex items-center">
                        <textarea
                          value={action}
                          onChange={(e) => updateAction('correctiveActions', index, e.target.value)}
                          className="flex-1 text-blue-700 font-medium text-sm bg-transparent border border-blue-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          rows={2}
                        />
                        <button
                          onClick={() => removeAction('correctiveActions', index)}
                          className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-blue-700 font-medium text-sm">{action}</p>
                    )}
                  </div>
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={() => addAction('correctiveActions')}
                  className="w-full p-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-all flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Ação Corretiva
                </button>
              )}
            </div>
          </div>

          {/* Ações Preventivas */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-100 border-2 border-green-300 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              🛡️ Ações Preventivas
            </h3>
            <div className="space-y-3">
              {currentData.preventiveActions.map((action, index) => (
                <div key={index} className="bg-white p-3 rounded-lg border border-green-200 shadow-sm group">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    {isEditing ? (
                      <div className="flex-1 flex items-center">
                        <textarea
                          value={action}
                          onChange={(e) => updateAction('preventiveActions', index, e.target.value)}
                          className="flex-1 text-green-700 font-medium text-sm bg-transparent border border-green-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none overflow-hidden"
                          rows={2}
                          style={{ minHeight: '48px' }}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = target.scrollHeight + 'px';
                          }}
                        />
                        <button
                          onClick={() => removeAction('preventiveActions', index)}
                          className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-green-700 font-medium text-sm">{action}</p>
                    )}
                  </div>
                </div>
              ))}
              {isEditing && (
                <button
                  onClick={() => addAction('preventiveActions')}
                  className="w-full p-3 border-2 border-dashed border-green-300 rounded-lg text-green-600 hover:text-green-800 hover:border-green-400 transition-all flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Ação Preventiva
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Resumo e Lições Aprendidas */}
        <div className="bg-gradient-to-r from-purple-50 to-violet-100 border-2 border-purple-300 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-purple-800 mb-4">📚 Resumo da Análise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-purple-700 mb-2">🎯 Objetivos Alcançados:</h4>
              <ul className="text-purple-600 text-sm space-y-1">
                <li>• Identificação das causas raízes do incidente</li>
                <li>• Mapeamento completo da sequência de eventos</li>
                <li>• Definição de ações corretivas e preventivas</li>
                <li>• Documentação para referência futura</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-700 mb-2">⚡ Próximos Passos:</h4>
              <ul className="text-purple-600 text-sm space-y-1">
                <li>• Implementar ações corretivas imediatas</li>
                <li>• Estabelecer controles preventivos</li>
                <li>• Treinar equipe nas novas práticas</li>
                <li>• Monitorar eficácia das melhorias</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Metodologia */}
        <div className="mt-8 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-200">
          <h4 className="font-bold text-teal-800 mb-2 text-center">
            📋 Sobre a Análise de Quebra/Falha
          </h4>
          <p className="text-teal-700 text-sm text-center leading-relaxed">
            Metodologia sistemática para investigar incidentes, identificar causas raízes e implementar ações 
            para prevenir recorrências. Combina análise temporal, evidências técnicas e fatores humanos.
          </p>
        </div>
      </div>
    </div>
  );
}