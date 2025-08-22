import React from 'react';
import { IshikawaData } from '../types';
import { Download, Image } from 'lucide-react';
import { downloadDiagramAsPDF, downloadDiagramAsImage } from '../utils/downloadUtils';

interface IshikawaDiagramProps {
  data: IshikawaData;
}

export default function IshikawaDiagram({ data }: IshikawaDiagramProps) {
  const handleDownloadPDF = () => {
    downloadDiagramAsPDF('ishikawa-diagram', 'diagrama-ishikawa');
  };

  const handleDownloadImage = () => {
    downloadDiagramAsImage('ishikawa-diagram', 'diagrama-ishikawa');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header com botões de download */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Diagrama de Ishikawa (Espinha de Peixe)
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
      <div id="ishikawa-diagram" className="p-8">
        <div className="relative overflow-x-auto">
          <div className="min-w-[800px] h-96 relative">
            {/* Linha principal (espinha) */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-gray-800 transform -translate-y-1/2">
              <div className="absolute -right-2 -top-2 w-0 h-0 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </div>
            
            {/* Cabeça do peixe (problema) */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-100 border-2 border-red-300 rounded-lg p-4 max-w-xs">
              <div className="text-sm font-semibold text-red-800 text-center">
                {data.problem}
              </div>
            </div>
            
            {/* Categorias */}
            {data.categories.map((category, index) => {
              const isTop = index % 2 === 0;
              const categoryIndex = Math.floor(index / 2);
              const xPosition = 15 + categoryIndex * 25;
              
              return (
                <div key={category.name} className="absolute">
                  {/* Linha da categoria */}
                  <div
                    className={`absolute w-24 h-0.5 ${isTop ? 'bottom-0' : 'top-0'}`}
                    style={{ 
                      left: `${xPosition}%`, 
                      top: isTop ? '48%' : '52%',
                      backgroundColor: category.color,
                      transform: `rotate(${isTop ? '45deg' : '-45deg'})`,
                      transformOrigin: 'left center'
                    }}
                  />
                  
                  {/* Cartão da categoria */}
                  <div
                    className={`absolute w-48 p-3 rounded-lg shadow-md ${isTop ? 'bottom-12' : 'top-12'}`}
                    style={{ 
                      left: `${xPosition}%`,
                      top: isTop ? '20%' : '70%',
                      backgroundColor: `${category.color}20`,
                      borderLeft: `4px solid ${category.color}`
                    }}
                  >
                    <h3 className="font-bold text-gray-800 mb-2">{category.name}</h3>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {category.causes.slice(0, 3).map((cause, causeIndex) => (
                        <li key={causeIndex} className="flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}