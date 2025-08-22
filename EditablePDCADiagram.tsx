import React, { useState } from 'react';
import { PDCAData, PDCAStep } from '../types';
import { CheckCircle, Play, Eye, RefreshCw, Download, Image, Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import { downloadDiagramAsPDF, downloadDiagramAsImage } from '../utils/downloadUtils';

interface EditablePDCADiagramProps {
  data: PDCAData;
  onDataChange: (newData: PDCAData) => void;
}

export default function EditablePDCADiagram({ data, onDataChange }: EditablePDCADiagramProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<PDCAData>(data);

  const icons = {
    Plan: CheckCircle,
    Do: Play,
    Check: Eye,
    Act: RefreshCw
  };

  const handleSave = () => {
    onDataChange(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(data);
    setIsEditing(false);
  };

  const updateStepTitle = (stepIndex: number, newTitle: string) => {
    const newSteps = [...editData.steps];
    newSteps[stepIndex] = { ...newSteps[stepIndex], title: newTitle };
    setEditData({ ...editData, steps: newSteps });
  };

  const updateStepDescription = (stepIndex: number, newDescription: string) => {
    const newSteps = [...editData.steps];
    newSteps[stepIndex] = { ...newSteps[stepIndex], description: newDescription };
    setEditData({ ...editData, steps: newSteps });
  };

  const updateAction = (stepIndex: number, actionIndex: number, newAction: string) => {
    const newSteps = [...editData.steps];
    const newActions = [...newSteps[stepIndex].actions];
    newActions[actionIndex] = newAction;
    newSteps[stepIndex] = { ...newSteps[stepIndex], actions: newActions };
    setEditData({ ...editData, steps: newSteps });
  };

  const addAction = (stepIndex: number) => {
    const newSteps = [...editData.steps];
    newSteps[stepIndex] = {
      ...newSteps[stepIndex],
      actions: [...newSteps[stepIndex].actions, 'Nova ação']
    };
    setEditData({ ...editData, steps: newSteps });
  };

  const removeAction = (stepIndex: number, actionIndex: number) => {
    const newSteps = [...editData.steps];
    const newActions = newSteps[stepIndex].actions.filter((_, index) => index !== actionIndex);
    newSteps[stepIndex] = { ...newSteps[stepIndex], actions: newActions };
    setEditData({ ...editData, steps: newSteps });
  };

  const currentData = isEditing ? editData : data;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header com botões de download e edição */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <RefreshCw className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Ciclo PDCA
              </h2>
              <p className="text-green-100 text-sm">Plan-Do-Check-Act - Melhoria Contínua</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 text-sm font-medium backdrop-blur-sm"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 text-sm font-medium shadow-lg"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Salvar
                </button>
              </>
            ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-200 text-sm font-medium backdrop-blur-sm"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Editar
                </button>
            )}
          </div>
        </div>
      </div>

      {/* Diagrama */}
      <div id="pdca-diagram" className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentData.steps.map((step, index) => {
            const Icon = icons[step.phase];
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={step.phase}
                className={`relative p-6 rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${
                  isEven ? 'md:mr-4' : 'md:ml-4'
                }`}
                style={{ borderColor: step.color }}
              >
                {/* Número do passo */}
                <div
                  className="absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: step.color }}
                >
                  {index + 1}
                </div>
                
                {/* Ícone */}
                <div className="flex items-center mb-4">
                  <div
                    className="p-3 rounded-full mr-4"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  <div className="flex-1">
                    {isEditing ? (
                      <>
                        <textarea
                          value={step.title}
                          onChange={(e) => updateStepTitle(index, e.target.value)}
                          className="text-xl font-bold text-gray-800 w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-1 mb-1 resize-none overflow-hidden"
                          rows={1}
                          style={{ minHeight: '32px' }}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = target.scrollHeight + 'px';
                          }}
                        />
                        <textarea
                          value={step.description}
                          onChange={(e) => updateStepDescription(index, e.target.value)}
                          className="text-sm text-gray-600 w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-400 rounded p-1 resize-none overflow-hidden"
                          rows={1}
                          style={{ minHeight: '24px' }}
                          onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'auto';
                            target.style.height = target.scrollHeight + 'px';
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <h3 className="text-xl font-bold text-gray-800 break-words overflow-hidden">{step.title}</h3>
                        <p className="text-sm text-gray-600 break-words overflow-hidden">{step.description}</p>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Ações */}
                <div className="space-y-3">
                  {step.actions.map((action, actionIndex) => (
                    <div
                      key={actionIndex}
                      className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: step.color }}
                      />
                      {isEditing ? (
                        <div className="flex-1 flex items-center">
                          <textarea
                            value={action}
                            onChange={(e) => updateAction(index, actionIndex, e.target.value)}
                            className="text-sm text-gray-700 flex-1 bg-white border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 rounded p-2 resize-none overflow-hidden break-all"
                            rows={1}
                            style={{ minHeight: '32px' }}
                            onInput={(e) => {
                              const target = e.target as HTMLTextAreaElement;
                              target.style.height = 'auto';
                              target.style.height = target.scrollHeight + 'px';
                            }}
                          />
                          <button
                            onClick={() => removeAction(index, actionIndex)}
                            className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-700 break-words overflow-hidden">{action}</span>
                      )}
                    </div>
                  ))}
                  
                  {isEditing && (
                    <button
                      onClick={() => addAction(index)}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800 ml-5"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar ação
                    </button>
                  )}
                </div>
                
                {/* Seta conectora */}
                {index < currentData.steps.length - 1 && (
                  <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2">
                    <div className="w-4 h-4 rotate-45 bg-gray-300"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Seta de fechamento do ciclo */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center text-gray-600">
            <RefreshCw className="w-6 h-6 mr-2" />
            <span className="text-sm font-medium">Ciclo Contínuo de Melhoria</span>
          </div>
        </div>
      </div>
    </div>
  );
}