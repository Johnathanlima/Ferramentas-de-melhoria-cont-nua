import React, { useState } from 'react';
import { Gauge, Clock, Target, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface OEEData {
  plannedProductionTime: number;
  downtime: number;
  idealCycleTime: number;
  totalCount: number;
  defectCount: number;
}

interface OEEResult {
  availability: number;
  performance: number;
  quality: number;
  oee: number;
  operatingTime: number;
  idealRunRate: number;
  actualRunRate: number;
  goodCount: number;
}

export default function OEECalculator() {
  const [oeeData, setOeeData] = useState<OEEData>({
    plannedProductionTime: 480, // 8 horas em minutos
    downtime: 47,
    idealCycleTime: 1.0,
    totalCount: 440,
    defectCount: 18
  });

  const [result, setResult] = useState<OEEResult | null>(null);

  const calculateOEE = () => {
    const operatingTime = oeeData.plannedProductionTime - oeeData.downtime;
    const availability = (operatingTime / oeeData.plannedProductionTime) * 100;
    
    const idealRunRate = 1 / oeeData.idealCycleTime; // peças por minuto
    const actualRunRate = oeeData.totalCount / operatingTime;
    const performance = (actualRunRate / idealRunRate) * 100;
    
    const goodCount = oeeData.totalCount - oeeData.defectCount;
    const quality = (goodCount / oeeData.totalCount) * 100;
    
    const oee = (availability * performance * quality) / 10000;

    const calculatedResult: OEEResult = {
      availability,
      performance,
      quality,
      oee,
      operatingTime,
      idealRunRate,
      actualRunRate,
      goodCount
    };

    setResult(calculatedResult);
  };

  const getOEEClassification = (oee: number) => {
    if (oee >= 85) return { level: 'Classe Mundial', color: 'text-green-600', bg: 'bg-green-100' };
    if (oee >= 60) return { level: 'Aceitável', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Baixo', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getComponentStatus = (value: number, type: 'availability' | 'performance' | 'quality') => {
    let threshold = 90;
    if (type === 'availability') threshold = 90;
    if (type === 'performance') threshold = 95;
    if (type === 'quality') threshold = 99;

    if (value >= threshold) return { icon: CheckCircle, color: 'text-green-500' };
    if (value >= threshold * 0.8) return { icon: AlertTriangle, color: 'text-yellow-500' };
    return { icon: AlertTriangle, color: 'text-red-500' };
  };

  const getLossAnalysis = () => {
    if (!result) return [];

    const losses = [];
    
    // Perdas de Disponibilidade
    const availabilityLoss = 100 - result.availability;
    if (availabilityLoss > 0) {
      losses.push({
        category: 'Disponibilidade',
        loss: availabilityLoss,
        impact: (availabilityLoss * result.performance * result.quality) / 10000,
        causes: ['Quebras de equipamento', 'Setup e ajustes', 'Paradas planejadas'],
        color: 'bg-red-500'
      });
    }

    // Perdas de Performance
    const performanceLoss = 100 - result.performance;
    if (performanceLoss > 0) {
      losses.push({
        category: 'Performance',
        loss: performanceLoss,
        impact: (result.availability * performanceLoss * result.quality) / 10000,
        causes: ['Pequenas paradas', 'Velocidade reduzida', 'Falta de material'],
        color: 'bg-yellow-500'
      });
    }

    // Perdas de Qualidade
    const qualityLoss = 100 - result.quality;
    if (qualityLoss > 0) {
      losses.push({
        category: 'Qualidade',
        loss: qualityLoss,
        impact: (result.availability * result.performance * qualityLoss) / 10000,
        causes: ['Defeitos de processo', 'Retrabalho', 'Startup losses'],
        color: 'bg-blue-500'
      });
    }

    return losses.sort((a, b) => b.impact - a.impact);
  };

  const classification = result ? getOEEClassification(result.oee) : null;
  const losses = getLossAnalysis();

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Calculadora OEE
              </h2>
              <p className="text-indigo-100 text-sm">Overall Equipment Effectiveness</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4">📊 Dados de Entrada</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tempo Planejado de Produção (min)
            </label>
            <input
              type="number"
              value={oeeData.plannedProductionTime}
              onChange={(e) => setOeeData({...oeeData, plannedProductionTime: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tempo de Parada (min)
            </label>
            <input
              type="number"
              value={oeeData.downtime}
              onChange={(e) => setOeeData({...oeeData, downtime: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tempo de Ciclo Ideal (min)
            </label>
            <input
              type="number"
              step="0.1"
              value={oeeData.idealCycleTime}
              onChange={(e) => setOeeData({...oeeData, idealCycleTime: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total de Peças Produzidas
            </label>
            <input
              type="number"
              value={oeeData.totalCount}
              onChange={(e) => setOeeData({...oeeData, totalCount: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Peças Defeituosas
            </label>
            <input
              type="number"
              value={oeeData.defectCount}
              onChange={(e) => setOeeData({...oeeData, defectCount: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={calculateOEE}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
            >
              <Gauge className="w-4 h-4 inline mr-2" />
              Calcular OEE
            </button>
          </div>
        </div>
      </div>

      {/* Resultados */}
      {result && (
        <div className="p-6">
          {/* OEE Principal */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-xl p-6">
              <h3 className="text-lg font-bold text-indigo-800 mb-2">🎯 OEE Global</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="text-6xl font-bold text-indigo-600">
                  {result.oee.toFixed(1)}%
                </div>
              </div>
              {classification && (
                <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${classification.bg} ${classification.color}`}>
                  {classification.level}
                </div>
              )}
            </div>
          </div>

          {/* Componentes do OEE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Disponibilidade */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-red-800">Disponibilidade</h4>
                {(() => {
                  const status = getComponentStatus(result.availability, 'availability');
                  const Icon = status.icon;
                  return <Icon className={`w-5 h-5 ${status.color}`} />;
                })()}
              </div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {result.availability.toFixed(1)}%
              </div>
              <div className="text-sm text-red-700 space-y-1">
                <p>Tempo Operacional: {result.operatingTime} min</p>
                <p>Tempo de Parada: {oeeData.downtime} min</p>
                <p>Meta: ≥ 90%</p>
              </div>
              <div className="mt-3 bg-red-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(result.availability, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-yellow-800">Performance</h4>
                {(() => {
                  const status = getComponentStatus(result.performance, 'performance');
                  const Icon = status.icon;
                  return <Icon className={`w-5 h-5 ${status.color}`} />;
                })()}
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">
                {result.performance.toFixed(1)}%
              </div>
              <div className="text-sm text-yellow-700 space-y-1">
                <p>Taxa Real: {result.actualRunRate.toFixed(2)} pç/min</p>
                <p>Taxa Ideal: {result.idealRunRate.toFixed(2)} pç/min</p>
                <p>Meta: ≥ 95%</p>
              </div>
              <div className="mt-3 bg-yellow-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(result.performance, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Qualidade */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-blue-800">Qualidade</h4>
                {(() => {
                  const status = getComponentStatus(result.quality, 'quality');
                  const Icon = status.icon;
                  return <Icon className={`w-5 h-5 ${status.color}`} />;
                })()}
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {result.quality.toFixed(1)}%
              </div>
              <div className="text-sm text-blue-700 space-y-1">
                <p>Peças Boas: {result.goodCount}</p>
                <p>Peças Defeituosas: {oeeData.defectCount}</p>
                <p>Meta: ≥ 99%</p>
              </div>
              <div className="mt-3 bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(result.quality, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Análise de Perdas */}
          {losses.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-gray-800 mb-4">📉 Análise de Perdas (Priorização)</h3>
              <div className="space-y-4">
                {losses.map((loss, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full ${loss.color} mr-3`}></div>
                        <h4 className="font-semibold text-gray-800">
                          {loss.category} - {loss.loss.toFixed(1)}% de perda
                        </h4>
                      </div>
                      <span className="text-sm font-medium text-red-600">
                        Impacto no OEE: -{loss.impact.toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Principais Causas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {loss.causes.map((cause, i) => (
                            <li key={i}>• {cause}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Ações Recomendadas:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {loss.category === 'Disponibilidade' && (
                            <>
                              <li>• Implementar manutenção preventiva</li>
                              <li>• Reduzir tempo de setup (SMED)</li>
                              <li>• Melhorar planejamento de paradas</li>
                            </>
                          )}
                          {loss.category === 'Performance' && (
                            <>
                              <li>• Eliminar pequenas paradas</li>
                              <li>• Otimizar velocidade de operação</li>
                              <li>• Melhorar fluxo de materiais</li>
                            </>
                          )}
                          {loss.category === 'Qualidade' && (
                            <>
                              <li>• Implementar controle estatístico</li>
                              <li>• Treinar operadores</li>
                              <li>• Melhorar processo de startup</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benchmarks e Metas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-green-800 mb-4">🎯 Benchmarks Industriais</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Classe Mundial:</span>
                  <span className="font-bold text-green-800">≥ 85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Aceitável:</span>
                  <span className="font-bold text-green-800">60-84%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Baixo:</span>
                  <span className="font-bold text-green-800">{"< 60%"}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Metas por Componente:</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <div>• Disponibilidade: ≥ 90%</div>
                  <div>• Performance: ≥ 95%</div>
                  <div>• Qualidade: ≥ 99%</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-800 mb-4">💡 Dicas de Melhoria</h3>
              <div className="space-y-3 text-sm text-blue-700">
                <div>
                  <strong>TPM (Total Productive Maintenance):</strong>
                  <p>Implementar manutenção autônoma e preventiva</p>
                </div>
                <div>
                  <strong>SMED (Single Minute Exchange):</strong>
                  <p>Reduzir tempo de setup para menos de 10 minutos</p>
                </div>
                <div>
                  <strong>Poka-Yoke:</strong>
                  <p>Implementar dispositivos à prova de erro</p>
                </div>
                <div>
                  <strong>Kaizen:</strong>
                  <p>Melhoria contínua focada nas maiores perdas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fórmulas */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4">📚 Fórmulas do OEE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Cálculos Principais:</h4>
                <div className="space-y-2 text-gray-600">
                  <div>• <strong>Disponibilidade</strong> = (Tempo Operacional / Tempo Planejado) × 100</div>
                  <div>• <strong>Performance</strong> = (Taxa Real / Taxa Ideal) × 100</div>
                  <div>• <strong>Qualidade</strong> = (Peças Boas / Total Produzido) × 100</div>
                  <div>• <strong>OEE</strong> = Disponibilidade × Performance × Qualidade</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Cálculos Auxiliares:</h4>
                <div className="space-y-2 text-gray-600">
                  <div>• <strong>Tempo Operacional</strong> = Tempo Planejado - Tempo Parada</div>
                  <div>• <strong>Taxa Ideal</strong> = 1 / Tempo Ciclo Ideal</div>
                  <div>• <strong>Taxa Real</strong> = Total Produzido / Tempo Operacional</div>
                  <div>• <strong>Peças Boas</strong> = Total Produzido - Defeituosas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}