import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle, Target, Activity } from 'lucide-react';

interface SPCData {
  values: number[];
  sampleSize: number;
  specification: {
    target: number;
    upperLimit: number;
    lowerLimit: number;
  };
}

interface ControlLimits {
  centerLine: number;
  upperControlLimit: number;
  lowerControlLimit: number;
  upperWarningLimit: number;
  lowerWarningLimit: number;
}

interface SPCResult {
  controlLimits: ControlLimits;
  capability: {
    cp: number;
    cpk: number;
    pp: number;
    ppk: number;
  };
  stability: {
    outOfControl: number[];
    trends: string[];
    warnings: string[];
  };
  statistics: {
    mean: number;
    standardDeviation: number;
    range: number;
    count: number;
  };
}

export default function SPCAnalysis() {
  const [spcData, setSpcData] = useState<SPCData>({
    values: [
      10.2, 10.1, 10.3, 10.0, 10.2, 10.4, 10.1, 10.3, 10.2, 10.0,
      10.1, 10.2, 10.3, 10.1, 10.4, 10.2, 10.0, 10.3, 10.1, 10.2,
      10.3, 10.1, 10.2, 10.4, 10.0, 10.2, 10.3, 10.1, 10.2, 10.0
    ],
    sampleSize: 5,
    specification: {
      target: 10.0,
      upperLimit: 10.5,
      lowerLimit: 9.5
    }
  });

  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<SPCResult | null>(null);

  const calculateSPC = () => {
    const values = spcData.values;
    const n = values.length;
    
    // Estatísticas básicas
    const mean = values.reduce((sum, val) => sum + val, 0) / n;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
    const standardDeviation = Math.sqrt(variance);
    const range = Math.max(...values) - Math.min(...values);

    // Limites de controle (usando 3 sigma)
    const upperControlLimit = mean + (3 * standardDeviation);
    const lowerControlLimit = mean - (3 * standardDeviation);
    const upperWarningLimit = mean + (2 * standardDeviation);
    const lowerWarningLimit = mean - (2 * standardDeviation);

    const controlLimits: ControlLimits = {
      centerLine: mean,
      upperControlLimit,
      lowerControlLimit,
      upperWarningLimit,
      lowerWarningLimit
    };

    // Análise de estabilidade
    const outOfControl: number[] = [];
    const trends: string[] = [];
    const warnings: string[] = [];

    values.forEach((value, index) => {
      if (value > upperControlLimit || value < lowerControlLimit) {
        outOfControl.push(index);
      }
      if (value > upperWarningLimit || value < lowerWarningLimit) {
        warnings.push(`Ponto ${index + 1} próximo ao limite de controle`);
      }
    });

    // Verificar tendências (7 pontos consecutivos do mesmo lado da média)
    let consecutiveAbove = 0;
    let consecutiveBelow = 0;
    
    values.forEach((value, index) => {
      if (value > mean) {
        consecutiveAbove++;
        consecutiveBelow = 0;
      } else {
        consecutiveBelow++;
        consecutiveAbove = 0;
      }
      
      if (consecutiveAbove >= 7) {
        trends.push(`Tendência ascendente detectada no ponto ${index + 1}`);
      }
      if (consecutiveBelow >= 7) {
        trends.push(`Tendência descendente detectada no ponto ${index + 1}`);
      }
    });

    // Capacidade do processo
    const cp = (spcData.specification.upperLimit - spcData.specification.lowerLimit) / (6 * standardDeviation);
    const cpk = Math.min(
      (spcData.specification.upperLimit - mean) / (3 * standardDeviation),
      (mean - spcData.specification.lowerLimit) / (3 * standardDeviation)
    );

    // Performance do processo (usando toda a variação)
    const overallStdDev = Math.sqrt(values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n);
    const pp = (spcData.specification.upperLimit - spcData.specification.lowerLimit) / (6 * overallStdDev);
    const ppk = Math.min(
      (spcData.specification.upperLimit - mean) / (3 * overallStdDev),
      (mean - spcData.specification.lowerLimit) / (3 * overallStdDev)
    );

    const calculatedResult: SPCResult = {
      controlLimits,
      capability: { cp, cpk, pp, ppk },
      stability: { outOfControl, trends, warnings },
      statistics: { mean, standardDeviation, range, count: n }
    };

    setResult(calculatedResult);
  };

  const addValue = () => {
    const newValue = parseFloat(inputValue);
    if (!isNaN(newValue)) {
      setSpcData({
        ...spcData,
        values: [...spcData.values, newValue]
      });
      setInputValue('');
    }
  };

  const clearData = () => {
    setSpcData({
      ...spcData,
      values: []
    });
    setResult(null);
  };

  const getCapabilityStatus = (value: number) => {
    if (value >= 1.67) return { level: 'Excelente', color: 'text-green-600', bg: 'bg-green-100' };
    if (value >= 1.33) return { level: 'Adequado', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (value >= 1.0) return { level: 'Marginal', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Inadequado', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const generateChart = () => {
    if (!result) return null;

    const values = spcData.values;
    const maxValue = Math.max(...values, result.controlLimits.upperControlLimit);
    const minValue = Math.min(...values, result.controlLimits.lowerControlLimit);
    const range = maxValue - minValue;
    const padding = range * 0.1;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-4">📈 Carta de Controle</h4>
        <div className="relative h-64 bg-gray-50 rounded border">
          <svg width="100%" height="100%" className="absolute inset-0">
            {/* Linhas de controle */}
            <line
              x1="5%"
              y1={`${((result.controlLimits.upperControlLimit - minValue - padding) / (range + 2 * padding)) * 100}%`}
              x2="95%"
              y2={`${((result.controlLimits.upperControlLimit - minValue - padding) / (range + 2 * padding)) * 100}%`}
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <line
              x1="5%"
              y1={`${((result.controlLimits.centerLine - minValue - padding) / (range + 2 * padding)) * 100}%`}
              x2="95%"
              y2={`${((result.controlLimits.centerLine - minValue - padding) / (range + 2 * padding)) * 100}%`}
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <line
              x1="5%"
              y1={`${((result.controlLimits.lowerControlLimit - minValue - padding) / (range + 2 * padding)) * 100}%`}
              x2="95%"
              y2={`${((result.controlLimits.lowerControlLimit - minValue - padding) / (range + 2 * padding)) * 100}%`}
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="5,5"
            />

            {/* Pontos de dados */}
            {values.map((value, index) => {
              const x = 5 + (index / (values.length - 1)) * 90;
              const y = ((value - minValue - padding) / (range + 2 * padding)) * 100;
              const isOutOfControl = result.stability.outOfControl.includes(index);
              
              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="3"
                  fill={isOutOfControl ? "#ef4444" : "#3b82f6"}
                  stroke="white"
                  strokeWidth="1"
                />
              );
            })}

            {/* Linha conectando os pontos */}
            <polyline
              points={values.map((value, index) => {
                const x = 5 + (index / (values.length - 1)) * 90;
                const y = ((value - minValue - padding) / (range + 2 * padding)) * 100;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="1"
              opacity="0.7"
            />
          </svg>

          {/* Legendas */}
          <div className="absolute top-2 right-2 text-xs space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-0.5 bg-red-500 mr-2"></div>
              <span>LSC/LIC</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-0.5 bg-blue-500 mr-2"></div>
              <span>Média</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Controle Estatístico de Processo (CEP)
              </h2>
              <p className="text-blue-100 text-sm">Statistical Process Control - Cartas de Controle</p>
            </div>
          </div>
        </div>
      </div>

      {/* Entrada de Dados */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Meta/Alvo</label>
            <input
              type="number"
              step="0.1"
              value={spcData.specification.target}
              onChange={(e) => setSpcData({
                ...spcData,
                specification: { ...spcData.specification, target: parseFloat(e.target.value) || 0 }
              })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Limite Superior</label>
            <input
              type="number"
              step="0.1"
              value={spcData.specification.upperLimit}
              onChange={(e) => setSpcData({
                ...spcData,
                specification: { ...spcData.specification, upperLimit: parseFloat(e.target.value) || 0 }
              })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Limite Inferior</label>
            <input
              type="number"
              step="0.1"
              value={spcData.specification.lowerLimit}
              onChange={(e) => setSpcData({
                ...spcData,
                specification: { ...spcData.specification, lowerLimit: parseFloat(e.target.value) || 0 }
              })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tamanho Amostra</label>
            <input
              type="number"
              value={spcData.sampleSize}
              onChange={(e) => setSpcData({...spcData, sampleSize: parseInt(e.target.value) || 1})}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Adicionar Valor</label>
            <input
              type="number"
              step="0.01"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addValue()}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite um valor e pressione Enter"
            />
          </div>
          <button
            onClick={addValue}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Adicionar
          </button>
          <button
            onClick={calculateSPC}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Analisar
          </button>
          <button
            onClick={clearData}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Limpar
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Dados atuais: {spcData.values.length} valores
            {spcData.values.length > 0 && (
              <span className="ml-2">
                (Últimos 5: {spcData.values.slice(-5).map(v => v.toFixed(2)).join(', ')})
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Resultados */}
      {result && (
        <div className="p-6">
          {/* Estatísticas Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <h4 className="font-semibold text-blue-800">Média</h4>
              <p className="text-2xl font-bold text-blue-600">{result.statistics.mean.toFixed(3)}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <h4 className="font-semibold text-green-800">Desvio Padrão</h4>
              <p className="text-2xl font-bold text-green-600">{result.statistics.standardDeviation.toFixed(3)}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <h4 className="font-semibold text-purple-800">Amplitude</h4>
              <p className="text-2xl font-bold text-purple-600">{result.statistics.range.toFixed(3)}</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <h4 className="font-semibold text-orange-800">Amostras</h4>
              <p className="text-2xl font-bold text-orange-600">{result.statistics.count}</p>
            </div>
          </div>

          {/* Carta de Controle */}
          <div className="mb-8">
            {generateChart()}
          </div>

          {/* Limites de Controle */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4">🎯 Limites de Controle</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Limites Calculados</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>LSC (Limite Superior):</span>
                    <span className="font-bold text-red-600">{result.controlLimits.upperControlLimit.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Linha Central (Média):</span>
                    <span className="font-bold text-blue-600">{result.controlLimits.centerLine.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LIC (Limite Inferior):</span>
                    <span className="font-bold text-red-600">{result.controlLimits.lowerControlLimit.toFixed(3)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Limites de Especificação</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>LSE (Limite Superior):</span>
                    <span className="font-bold text-green-600">{spcData.specification.upperLimit.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Alvo:</span>
                    <span className="font-bold text-blue-600">{spcData.specification.target.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>LIE (Limite Inferior):</span>
                    <span className="font-bold text-green-600">{spcData.specification.lowerLimit.toFixed(3)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Capacidade do Processo */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4">⚙️ Capacidade do Processo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(result.capability).map(([key, value]) => {
                const status = getCapabilityStatus(value);
                return (
                  <div key={key} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-gray-800 mb-2">{key.toUpperCase()}</h4>
                    <p className="text-2xl font-bold text-gray-800 mb-2">{value.toFixed(3)}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                      {status.level}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">📚 Interpretação dos Índices</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div>
                  <p><strong>Cp:</strong> Capacidade potencial (processo centrado)</p>
                  <p><strong>Cpk:</strong> Capacidade real (considera descentragem)</p>
                </div>
                <div>
                  <p><strong>Pp:</strong> Performance potencial (variação total)</p>
                  <p><strong>Ppk:</strong> Performance real (variação total + descentragem)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Análise de Estabilidade */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4">📊 Análise de Estabilidade</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                  <h4 className="font-semibold text-red-800">Pontos Fora de Controle</h4>
                </div>
                <p className="text-2xl font-bold text-red-600 mb-2">{result.stability.outOfControl.length}</p>
                {result.stability.outOfControl.length > 0 && (
                  <p className="text-sm text-red-700">
                    Pontos: {result.stability.outOfControl.map(i => i + 1).join(', ')}
                  </p>
                )}
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-yellow-500 mr-2" />
                  <h4 className="font-semibold text-yellow-800">Tendências</h4>
                </div>
                <p className="text-2xl font-bold text-yellow-600 mb-2">{result.stability.trends.length}</p>
                {result.stability.trends.length > 0 && (
                  <div className="text-sm text-yellow-700 space-y-1">
                    {result.stability.trends.map((trend, i) => (
                      <p key={i}>{trend}</p>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                  <h4 className="font-semibold text-orange-800">Avisos</h4>
                </div>
                <p className="text-2xl font-bold text-orange-600 mb-2">{result.stability.warnings.length}</p>
                {result.stability.warnings.length > 0 && (
                  <div className="text-sm text-orange-700 space-y-1">
                    {result.stability.warnings.slice(0, 3).map((warning, i) => (
                      <p key={i}>{warning}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recomendações */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-bold text-green-800 mb-4">💡 Recomendações</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Ações Imediatas:</h4>
                <ul className="text-sm text-green-600 space-y-1">
                  {result.stability.outOfControl.length > 0 && (
                    <li>• Investigar causas especiais nos pontos fora de controle</li>
                  )}
                  {result.capability.cpk < 1.33 && (
                    <li>• Melhorar capacidade do processo (Cpk baixo)</li>
                  )}
                  {result.stability.trends.length > 0 && (
                    <li>• Investigar tendências sistemáticas</li>
                  )}
                  {Math.abs(result.statistics.mean - spcData.specification.target) > result.statistics.standardDeviation && (
                    <li>• Centralizar processo no alvo</li>
                  )}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Melhorias de Longo Prazo:</h4>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• Implementar controle estatístico contínuo</li>
                  <li>• Treinar operadores em interpretação de cartas</li>
                  <li>• Estabelecer planos de reação para situações fora de controle</li>
                  <li>• Revisar especificações se necessário</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}