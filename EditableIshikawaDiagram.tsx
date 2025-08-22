import React, { useState } from 'react';
import { IshikawaData, IshikawaCategory } from '../types';
import { Edit3, Save, X, Plus, Trash2 } from 'lucide-react';

interface EditableIshikawaDiagramProps {
  data: IshikawaData;
  onDataChange: (newData: IshikawaData) => void;
}

export default function EditableIshikawaDiagram({ data, onDataChange }: EditableIshikawaDiagramProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<IshikawaData>(data);

  const handleSave = () => {
    onDataChange(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(data);
    setIsEditing(false);
  };

  const updateProblem = (newProblem: string) => {
    setEditData({ ...editData, problem: newProblem });
  };

  const updateCategoryName = (categoryIndex: number, newName: string) => {
    const newCategories = [...editData.categories];
    newCategories[categoryIndex] = { ...newCategories[categoryIndex], name: newName };
    setEditData({ ...editData, categories: newCategories });
  };

  const updateCause = (categoryIndex: number, causeIndex: number, newCause: string) => {
    const newCategories = [...editData.categories];
    const newCauses = [...newCategories[categoryIndex].causes];
    newCauses[causeIndex] = newCause;
    newCategories[categoryIndex] = { ...newCategories[categoryIndex], causes: newCauses };
    setEditData({ ...editData, categories: newCategories });
  };

  const addCause = (categoryIndex: number) => {
    const newCategories = [...editData.categories];
    newCategories[categoryIndex] = {
      ...newCategories[categoryIndex],
      causes: [...newCategories[categoryIndex].causes, 'Nova causa']
    };
    setEditData({ ...editData, categories: newCategories });
  };

  const removeCause = (categoryIndex: number, causeIndex: number) => {
    const newCategories = [...editData.categories];
    const newCauses = newCategories[categoryIndex].causes.filter((_, index) => index !== causeIndex);
    newCategories[categoryIndex] = { ...newCategories[categoryIndex], causes: newCauses };
    setEditData({ ...editData, categories: newCategories });
  };

  const currentData = isEditing ? editData : data;

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <span className="text-2xl">🐟</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Diagrama de Ishikawa
              </h2>
              <p className="text-blue-100 text-sm">Análise de Causas Raízes - Espinha de Peixe</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
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

      {/* Conteúdo */}
      <div id="ishikawa-diagram" className="p-8 bg-gradient-to-br from-gray-50 to-white">
        {/* Problema */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-red-800 mb-2">🎯 Problema a ser Analisado</h3>
            {isEditing ? (
              <textarea
                value={editData.problem}
                onChange={(e) => updateProblem(e.target.value)}
                className="w-full text-red-800 font-medium bg-white border border-red-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                rows={3}
                placeholder="Descreva o problema a ser analisado..."
              />
            ) : (
              <p className="text-red-800 font-medium leading-relaxed">{currentData.problem}</p>
            )}
          </div>
        </div>

        {/* Grid das Categorias (6M's) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentData.categories.map((category, index) => (
            <div key={index} className="bg-white border-2 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200" style={{ borderColor: category.color }}>
              {/* Nome da categoria */}
              <div className="mb-4">
                {isEditing ? (
                  <input
                    value={category.name}
                    onChange={(e) => updateCategoryName(index, e.target.value)}
                    className="w-full font-bold text-gray-800 text-lg bg-transparent border-b-2 focus:outline-none focus:border-blue-500 p-2"
                    style={{ borderBottomColor: category.color }}
                  />
                ) : (
                  <h4 
                    className="font-bold text-gray-800 text-lg border-b-2 pb-2"
                    style={{ borderBottomColor: category.color }}
                  >
                    {category.name}
                  </h4>
                )}
              </div>

              {/* Causas */}
              <div className="space-y-3">
                {category.causes.map((cause, causeIndex) => (
                  <div key={causeIndex} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200 group">
                    <div className="flex items-start">
                      <div 
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: category.color }}
                      />
                      {isEditing ? (
                        <div className="flex-1 flex items-center">
                          <textarea
                            value={cause}
                            onChange={(e) => updateCause(index, causeIndex, e.target.value)}
                            className="flex-1 text-sm text-gray-800 bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                            rows={2}
                          />
                          <button
                            onClick={() => removeCause(index, causeIndex)}
                            className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-800 leading-relaxed">{cause}</span>
                      )}
                    </div>
                  </div>
                ))}
                
                {isEditing && (
                  <button
                    onClick={() => addCause(index)}
                    className="w-full flex items-center justify-center text-sm text-blue-600 hover:text-blue-800 py-2 border border-dashed border-blue-300 rounded-lg hover:border-blue-400 transition-all"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar causa
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Legenda */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-100 border-2 border-blue-300 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">📋 Metodologia dos 6M's</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {currentData.categories.map((category, index) => (
              <div key={index} className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                <div 
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-gray-700 font-semibold">{category.name}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            O Diagrama de Ishikawa organiza as possíveis causas de um problema em 6 categorias principais (6M's), 
            facilitando a identificação sistemática das causas raízes através de uma análise estruturada e visual.
          </p>
        </div>
      </div>
    </div>
  );
}