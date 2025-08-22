import React from 'react';
import { PDCAData } from '../types';
import { CheckCircle, Play, Eye, RefreshCw, Download, Image } from 'lucide-react';
import { downloadDiagramAsPDF, downloadDiagramAsImage } from '../utils/downloadUtils';

interface PDCADiagramProps {
  data: PDCAData;
}

export default function PDCADiagram({ data }: PDCADiagramProps) {
  const icons = {
    Plan: CheckCircle,
    Do: Play,
    Check: Eye,
    Act: RefreshCw
  };

  const handleDownloadPDF = () => {
    downloadDiagramAsPDF('pdca-diagram', 'diagrama-pdca');
  };

  const handleDownloadImage = () => {
    downloadDiagramAsImage('pdca-diagram', 'diagrama-pdca');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header com botões de download */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Ciclo PDCA
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadImage}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
            >
              <Image className="w-4 h-4 mr-2" />
              PNG
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Diagrama */}
      <div id="pdca-diagram" className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.steps.map((step, index) => {
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
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
                
                {/* Ações */}
                <div className="space-y-3">
                  {step.actions.map((action, actionIndex) => (
                    <div
                      key={actionIndex}
                      className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"
                        style={{ backgroundColor: step.color }}
                      />
                      <span className="text-sm text-gray-700">{action}</span>
                    </div>
                  ))}
                </div>
                
                {/* Seta conectora */}
                {index < data.steps.length - 1 && (
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