import React, { useState } from 'react';
import { Clock, Target, TrendingUp, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';

interface TaktTimeData {
  availableTime: number; // minutos por turno
  customerDemand: number; // unidades por turno
  cycleTime: number; // minutos por unidade
  numberOfStations: number;
  efficiency: number; // %
  setupTime: number; // minutos
  breakTime: number; // minutos
}

interface TaktTimeResult {
  taktTime: number;
  cycleTimeEfficiency: number;
  requiredStations: number;
  lineBalance: number;
  throughput: number;
  bottleneckAnalysis: {
    isBottleneck: boolean;
    utilizationRate: number;
    recommendations: string[];
  };
  productionCapacity: number;
  demandVsCapacity: {
    status: 'over' | 'under' | 'balanced';
    difference: number;
    percentage: number;
  };
}

export default function TaktTimeCalculator() {
  const [taktData, setTaktData] = useState<TaktTimeData>({
    availableTime: 480, // 8 horas
    customerDemand: 240,
    cycleTime: 1.8,
    numberOfStations: 3,
    efficiency: 85,
    setupTime: 30,
    breakTime: 60
  });

  const [result, setResult] = useState<TaktTimeResult | null>(null);

  const calculateTaktTime = () => {
    // Tempo efetivo disponível
    const effectiveTime = taktData.availableTime - taktData.setupTime - taktData.breakTime;
    
    // Takt Time = Tempo Disponível / Demanda do Cliente
    const taktTime = effectiveTime / taktData.customerDemand;
    
    // Eficiência do Tempo de Ciclo
    const cycleTimeEfficiency = (taktTime / taktData.cycleTime) * 100;
    
    // Número de estações necessárias
    const requiredStations = Math.ceil(taktData.cycleTime / taktTime);
    
    // Balanceamento da linha
    const lineBalance = (taktData.cycleTime / (requiredStations * taktTime)) * 100;
    
    // Throughput (considerando eficiência)
    const throughput = (effectiveTime / taktData.cycleTime) * (taktData.efficiency / 100);
    
    // Capacidade de produção
    const productionCapacity = Math.floor(throughput);
    
    // Análise de gargalo
    const utilizationRate = (taktData.cycleTime / taktTime) * 100;
    const isBottleneck = utilizationRate > 100;
    
    const recommendations: string[] = [];
    if (isBottleneck) {
      recommendations.push('Reduzir tempo de ciclo');
      recommendations.push('Adicionar estações de trabalho');
      recommendations.push('Melhorar eficiência do processo');
    } else if (utilizationRate < 80) {
      recommendations.push('Considerar redução de recursos');
      recommendations.push('Aumentar demanda ou reduzir takt time');
      recommendations.push('Implementar outras atividades na estação');
    } else {
      recommendations.push('Processo bem balanceado');
      recommendations.push('Manter monitoramento contínuo');
    }

    // Demanda vs Capacidade
    const difference = productionCapacity - taktData.customerDemand;
    const percentage = (difference / taktData.customerDemand) * 100;
    let status: 'over' | 'under' | 'balanced' = 'balanced';
    
    if (difference > taktData.customerDemand * 0.05) status = 'over';
    else if (difference < -taktData.customerDemand * 0.05) status = 'under';

    const calculatedResult: TaktTimeResult = {
      taktTime,
      cycleTimeEfficiency,
      requiredStations,
      lineBalance,
      throughput,
      bottleneckAnalysis: {
        isBottleneck,
        utilizationRate,
        recommendations
      },
      productionCapacity,
      demandVsCapacity: {
        status,
        difference,
        percentage
      }
    };

    setResult(calculatedResult);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'over': return { color: 'text-blue-600', bg: 'bg-blue-100', icon: TrendingUp };
      case 'under': return { color: 'text-red-600', bg: 'bg-red-100', icon: AlertTriangle };
      default: return { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle };
    }
  };

  const getEfficiencyStatus = (efficiency: number) => {
    if (efficiency >= 95) return { level: 'Excelente', color: 'text-green-600', bg: 'bg-green-100' };
    if (efficiency >= 85) return { level: 'Bom', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (efficiency >= 70) return { level: 'Regular', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Baixo', color: 'text-red-600', bg: 'bg-red-100' };
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-teal-600 to-green-700 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Calculadora de Takt Time
              </h2>
              <p className="text-green-100 text-sm">Ritmo de Produção e Balanceamento de Linha</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <h3 className="font-bold text-gray-800 mb-4">📊 Dados de Entrada</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tempo Disponível (min/turno)
            </label>
            <input
              type="number"
              value={taktData.availableTime}
              onChange={(e) => setTaktData({...taktData, availableTime: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Demanda do Cliente (unidades/turno)
            </label>
            <input
              type="number"
              value={taktData.customerDemand}
              onChange={(e) => setTaktData({...taktData, customerDemand: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tempo de Ciclo (min/unidade)
            </label>
            <input
              type="number"
              step="0.1"
              value={taktData.cycleTime}
              onChange={(e) => setTaktData({...taktData, cycleTime: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de Estações
            </label>
            <input
              type="number"
              value={taktData.numberOfStations}
              onChange={(e) => setTaktData({...taktData, numberOfStations: parseInt(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Eficiência (%)
            </label>
            <input
              type="number"
              value={taktData.efficiency}
              onChange={(e) => setTaktData({...taktData, efficiency: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tempo de Setup (min)
            </label>
            <input
              type="number"
              value={taktData.setupTime}
              onChange={(e) => setTaktData({...taktData, setupTime: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tempo de Pausa (min)
            </label>
            <input
              type="number"
              value={taktData.breakTime}
              onChange={(e) => setTaktData({...taktData, breakTime: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={calculateTaktTime}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              <Clock className="w-4 h-4 inline mr-2" />
              Calcular Takt Time
            </button>
          </div>
        </div>
      </div>

      {/* Resultados */}
      {result && (
        <div className="p-6">
          {/* Takt Time Principal */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-300 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-800 mb-2">⏱️ Takt Time</h3>
              <div className="flex items-center justify-center mb-4">
                <div className="text-6xl font-bold text-green-600">
                  {result.taktTime.toFixed(2)}
                </div>
                <div className="ml-4 text-left">
                  <div className="text-lg font-semibold text-green-700">minutos</div>
                  <div className="text-sm text-green-600">por unidade</div>
                </div>
              </div>
              <p className="text-green-700">
                Ritmo necessário para atender a demanda do cliente
              </p>
            </div>
          </div>

          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <h4 className="font-semibold text-blue-800 mb-2">Eficiência do Ciclo</h4>
              <p className="text-2xl font-bold text-blue-600">{result.cycleTimeEfficiency.toFixed(1)}%</p>
              <p className="text-sm text-blue-700">Ciclo vs Takt</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
              <h4 className="font-semibold text-purple-800 mb-2">Estações Necessárias</h4>
              <p className="text-2xl font-bold text-purple-600">{result.requiredStations}</p>
              <p className="text-sm text-purple-700">Para atender demanda</p>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
              <h4 className="font-semibold text-orange-800 mb-2">Balanceamento</h4>
              <p className="text-2xl font-bold text-orange-600">{result.lineBalance.toFixed(1)}%</p>
              <p className="text-sm text-orange-700">Eficiência da linha</p>
            </div>
            
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-center">
              <h4 className="font-semibold text-teal-800 mb-2">Throughput</h4>
              <p className="text-2xl font-bold text-teal-600">{result.throughput.toFixed(0)}</p>
              <p className="text-sm text-teal-700">Unidades/turno</p>
            </div>
          </div>

          {/* Análise Demanda vs Capacidade */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4">📊 Análise Demanda vs Capacidade</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-800 mb-2">Demanda</h4>
                <p className="text-3xl font-bold text-gray-600">{taktData.customerDemand}</p>
                <p className="text-sm text-gray-600">unidades/turno</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <h4 className="font-semibold text-gray-800 mb-2">Capacidade</h4>
                <p className="text-3xl font-bold text-gray-600">{result.productionCapacity}</p>
                <p className="text-sm text-gray-600">unidades/turno</p>
              </div>
              
              <div className={`border rounded-lg p-4 text-center ${getStatusColor(result.demandVsCapacity.status).bg}`}>
                <h4 className={`font-semibold mb-2 ${getStatusColor(result.demandVsCapacity.status).color}`}>
                  Status
                </h4>
                <p className={`text-3xl font-bold ${getStatusColor(result.demandVsCapacity.status).color}`}>
                  {result.demandVsCapacity.difference > 0 ? '+' : ''}{result.demandVsCapacity.difference}
                </p>
                <p className={`text-sm ${getStatusColor(result.demandVsCapacity.status).color}`}>
                  {result.demandVsCapacity.status === 'over' ? 'Sobrecapacidade' :
                   result.demandVsCapacity.status === 'under' ? 'Subcapacidade' : 'Balanceado'}
                </p>
              </div>
            </div>
          </div>

          {/* Análise de Gargalo */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4">🔍 Análise de Gargalo</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center mb-4">
                    {result.bottleneckAnalysis.isBottleneck ? (
                      <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                    )}
                    <h4 className={`font-semibold ${result.bottleneckAnalysis.isBottleneck ? 'text-red-800' : 'text-green-800'}`}>
                      {result.bottleneckAnalysis.isBottleneck ? 'Gargalo Detectado' : 'Sem Gargalo'}
                    </h4>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Taxa de Utilização:</p>
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              result.bottleneckAnalysis.utilizationRate > 100 ? 'bg-red-500' :
                              result.bottleneckAnalysis.utilizationRate > 90 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(result.bottleneckAnalysis.utilizationRate, 100)}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-gray-800">
                          {result.bottleneckAnalysis.utilizationRate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">💡 Recomendações:</h4>
                  <ul className="space-y-2">
                    {result.bottleneckAnalysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Comparação Visual */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-4">📈 Comparação Visual</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Takt Time</span>
                    <span className="text-sm font-bold text-green-600">{result.taktTime.toFixed(2)} min</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-green-500 h-4 rounded-full"
                      style={{ width: `${(result.taktTime / Math.max(result.taktTime, taktData.cycleTime)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Tempo de Ciclo</span>
                    <span className="text-sm font-bold text-blue-600">{taktData.cycleTime.toFixed(2)} min</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full ${taktData.cycleTime > result.taktTime ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ width: `${(taktData.cycleTime / Math.max(result.taktTime, taktData.cycleTime)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  {taktData.cycleTime <= result.taktTime ? 
                    '✅ Tempo de ciclo está dentro do takt time' : 
                    '⚠️ Tempo de ciclo excede o takt time - gargalo identificado'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Informações Técnicas */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-800 mb-4">📚 Informações Técnicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Fórmulas Utilizadas:</h4>
                <div className="space-y-2 text-sm text-blue-600">
                  <div>• <strong>Takt Time</strong> = Tempo Disponível / Demanda</div>
                  <div>• <strong>Estações Necessárias</strong> = Tempo Ciclo / Takt Time</div>
                  <div>• <strong>Balanceamento</strong> = Tempo Ciclo / (Estações × Takt Time)</div>
                  <div>• <strong>Throughput</strong> = Tempo Disponível / Tempo Ciclo × Eficiência</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Conceitos Importantes:</h4>
                <div className="space-y-2 text-sm text-blue-600">
                  <div>• <strong>Takt Time:</strong> Ritmo de produção necessário</div>
                  <div>• <strong>Cycle Time:</strong> Tempo real para produzir uma unidade</div>
                  <div>• <strong>Lead Time:</strong> Tempo total do processo</div>
                  <div>• <strong>Balanceamento:</strong> Distribuição equilibrada do trabalho</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}