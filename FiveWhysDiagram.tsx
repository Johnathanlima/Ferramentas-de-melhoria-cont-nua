import React from 'react';
import { FiveWhysData } from '../types';
import { Download, Image, HelpCircle, Target, CheckCircle, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import { downloadDiagramAsPDF, downloadDiagramAsImage } from '../utils/downloadUtils';

interface FiveWhysDiagramProps {
  data: FiveWhysData;
  onDataChange?: (newData: FiveWhysData) => void;
}

export default function FiveWhysDiagram({ data, onDataChange }: FiveWhysDiagramProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState<FiveWhysData>(data);

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

  const updateProblem = (newProblem: string) => {
    setEditData({ ...editData, problem: newProblem });
  };

  const updateWhy = (index: number, field: 'question' | 'answer', value: string) => {
    const newWhys = [...editData.whys];
    newWhys[index] = { ...newWhys[index], [field]: value };
    setEditData({ ...editData, whys: newWhys });
  };

  const updateRootCause = (newRootCause: string) => {
    setEditData({ ...editData, rootCause: newRootCause });
  };

  const updateAction = (index: number, newAction: string) => {
    const newActions = [...editData.actions];
    newActions[index] = newAction;
    setEditData({ ...editData, actions: newActions });
  };

  const addAction = () => {
    setEditData({ ...editData, actions: [...editData.actions, 'Nova ação'] });
  };

  const removeAction = (index: number) => {
    const newActions = editData.actions.filter((_, i) => i !== index);
    setEditData({ ...editData, actions: newActions });
  };

  const currentData = isEditing ? editData : data;

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Análise dos 5 Porquês
              </h2>
              <p className="text-purple-100 text-sm">Investigação da Causa Raiz</p>
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
                  className="flex items-center px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200 text-sm font-medium"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Editar
                </button>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div id="fivewhys-diagram" className="p-8 bg-gradient-to-br from-gray-50 to-white">
        {/* Problema Inicial */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center">
              🎯 Problema Identificado
            </h3>
            {isEditing ? (
              <textarea
                value={editData.problem}
                onChange={(e) => updateProblem(e.target.value)}
                className="w-full text-red-700 leading-relaxed bg-white border border-red-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                rows={3}
              />
            ) : (
              <p className="text-red-700 leading-relaxed">{currentData.problem}</p>
            )}
          </div>
        </div>

        {/* Sequência dos 5 Porquês */}
        <div className="space-y-6 mb-8">
          {currentData.whys.map((why, index) => (
            <div key={index} className="relative">
              {/* Linha conectora */}
              {index < currentData.whys.length - 1 && (
                <div className="absolute left-6 top-full w-0.5 h-6 bg-purple-300 z-10"></div>
              )}
              
              <div className="flex items-start space-x-4">
                {/* Número */}
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {why.level}
                </div>
                
                {/* Conteúdo */}
                <div className="flex-1 bg-white border-2 border-purple-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="mb-4">
                    <h4 className="font-bold text-purple-800 mb-2 flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2" />
                      Pergunta {why.level}
                    </h4>
                    {isEditing ? (
                      <textarea
                        value={why.question}
                        onChange={(e) => updateWhy(index, 'question', e.target.value)}
                        className="w-full text-purple-700 font-medium bg-purple-50 p-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        rows={2}
                      />
                    ) : (
                      <p className="text-purple-700 font-medium bg-purple-50 p-3 rounded-lg border border-purple-200">
                        {why.question}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-gray-800 mb-2 flex items-center">
                      💡 Resposta
                    </h5>
                    {isEditing ? (
                      <textarea
                        value={why.answer}
                        onChange={(e) => updateWhy(index, 'answer', e.target.value)}
                        className="w-full text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        rows={2}
                      />
                    ) : (
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        {why.answer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Causa Raiz */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-100 border-2 border-green-300 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
              <Target className="w-6 h-6 mr-2" />
              🎯 Causa Raiz Identificada
            </h3>
            {isEditing ? (
              <textarea
                value={editData.rootCause}
                onChange={(e) => updateRootCause(e.target.value)}
                className="w-full text-green-700 text-lg leading-relaxed font-medium bg-white border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                rows={3}
              />
            ) : (
              <p className="text-green-700 text-lg leading-relaxed font-medium">
                {currentData.rootCause}
              </p>
            )}
          </div>
        </div>

        {/* Ações Recomendadas */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-2 border-blue-300 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2" />
            🚀 Ações Recomendadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentData.actions.map((action, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-200 group">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 mt-0.5">
                    {index + 1}
                  </div>
                  {isEditing ? (
                    <div className="flex-1 flex items-center">
                      <textarea
                        value={action}
                        onChange={(e) => updateAction(index, e.target.value)}
                        className="flex-1 text-blue-700 font-medium bg-transparent border border-blue-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none overflow-hidden"
                        rows={2}
                        style={{ minHeight: '48px' }}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = 'auto';
                          target.style.height = target.scrollHeight + 'px';
                        }}
                      />
                      <button
                        onClick={() => removeAction(index)}
                        className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-blue-700 font-medium">{action}</p>
                  )}
                </div>
              </div>
            ))}
            
            {isEditing && (
              <button
                onClick={addAction}
                className="flex items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:text-blue-800 hover:border-blue-400 transition-all"
              >
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Ação
              </button>
            )}
          </div>
        </div>

        {/* Metodologia */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
          <h4 className="font-bold text-purple-800 mb-2 text-center">
            📋 Sobre a Metodologia dos 5 Porquês
          </h4>
          <p className="text-purple-700 text-sm text-center leading-relaxed">
            Técnica desenvolvida por Sakichi Toyoda, fundador da Toyota, que utiliza a repetição da pergunta "Por quê?" 
            para investigar as relações de causa e efeito que levam a um problema específico, descobrindo sua causa raiz.
          </p>
        </div>
      </div>
    </div>
  );
}