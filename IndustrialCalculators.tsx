import React, { useState } from 'react';
import { Calculator, Zap, Gauge, TrendingUp, BarChart3, Clock, Target, Activity } from 'lucide-react';

interface CalculatorResult {
  value: number;
  unit: string;
  interpretation: string;
  recommendation: string;
}

export default function IndustrialCalculators() {
  const [activeCalculator, setActiveCalculator] = useState('productivity');
  const [results, setResults] = useState<Record<string, CalculatorResult>>({});

  // Calculadora de Produtividade
  const [productivityInputs, setProductivityInputs] = useState({
    unitsProduced: 1000,
    timeHours: 8,
    operators: 5,
    machineHours: 8
  });

  // Calculadora de Eficiência
  const [efficiencyInputs, setEfficiencyInputs] = useState({
    actualOutput: 850,
    standardOutput: 1000,
    actualTime: 480,
    standardTime: 400
  });

  // Calculadora de Capacidade
  const [capacityInputs, setCapacityInputs] = useState({
    cycleTime: 2.5,
    availableTime: 480,
    efficiency: 85,
    utilization: 90
  });

  // Calculadora de Qualidade
  const [qualityInputs, setQualityInputs] = useState({
    totalProduced: 1000,
    defective: 25,
    rework: 15,
    scrap: 10
  });

  // Calculadora de Setup
  const [setupInputs, setSetupInputs] = useState({
    setupTime: 45,
    batchSize: 500,
    cycleTime: 2.0,
    setupCost: 150
  });

  // Calculadora de Desperdícios
  const [wasteInputs, setWasteInputs] = useState({
    materialUsed: 1000,
    materialRequired: 950,
    energyConsumed: 500,
    energyStandard: 450,
    timeSpent: 480,
    timeStandard: 420
  });

  const calculateProductivity = () => {
    const unitsPerHour = productivityInputs.unitsProduced / productivityInputs.timeHours;
    const unitsPerOperator = productivityInputs.unitsProduced / productivityInputs.operators;
    const unitsPerMachineHour = productivityInputs.unitsProduced / productivityInputs.machineHours;
    
    const avgProductivity = (unitsPerHour + unitsPerOperator + unitsPerMachineHour) / 3;
    
    let interpretation = '';
    let recommendation = '';
    
    if (avgProductivity > 100) {
      interpretation = 'Produtividade excelente';
      recommendation = 'Manter padrão e replicar boas práticas';
    } else if (avgProductivity > 75) {
      interpretation = 'Produtividade boa';
      recommendation = 'Buscar oportunidades de otimização';
    } else {
      interpretation = 'Produtividade baixa';
      recommendation = 'Investigar gargalos e implementar melhorias';
    }

    const result: CalculatorResult = {
      value: avgProductivity,
      unit: 'unidades/recurso',
      interpretation,
      recommendation
    };

    setResults({ ...results, productivity: result });
  };

  const calculateEfficiency = () => {
    const outputEfficiency = (efficiencyInputs.actualOutput / efficiencyInputs.standardOutput) * 100;
    const timeEfficiency = (efficiencyInputs.standardTime / efficiencyInputs.actualTime) * 100;
    const overallEfficiency = (outputEfficiency + timeEfficiency) / 2;
    
    let interpretation = '';
    let recommendation = '';
    
    if (overallEfficiency >= 95) {
      interpretation = 'Eficiência excelente';
      recommendation = 'Manter padrão atual';
    } else if (overallEfficiency >= 85) {
      interpretation = 'Eficiência boa';
      recommendation = 'Pequenos ajustes podem melhorar';
    } else if (overallEfficiency >= 70) {
      interpretation = 'Eficiência regular';
      recommendation = 'Revisar métodos de trabalho';
    } else {
      interpretation = 'Eficiência baixa';
      recommendation = 'Ação imediata necessária';
    }

    const result: CalculatorResult = {
      value: overallEfficiency,
      unit: '%',
      interpretation,
      recommendation
    };

    setResults({ ...results, efficiency: result });
  };

  const calculateCapacity = () => {
    const theoreticalCapacity = capacityInputs.availableTime / capacityInputs.cycleTime;
    const effectiveCapacity = theoreticalCapacity * (capacityInputs.efficiency / 100) * (capacityInputs.utilization / 100);
    
    let interpretation = '';
    let recommendation = '';
    
    const utilizationRate = (effectiveCapacity / theoreticalCapacity) * 100;
    
    if (utilizationRate >= 85) {
      interpretation = 'Capacidade bem utilizada';
      recommendation = 'Considerar expansão se demanda aumentar';
    } else if (utilizationRate >= 70) {
      interpretation = 'Capacidade moderadamente utilizada';
      recommendation = 'Melhorar eficiência e utilização';
    } else {
      interpretation = 'Capacidade subutilizada';
      recommendation = 'Investigar causas de baixa utilização';
    }

    const result: CalculatorResult = {
      value: effectiveCapacity,
      unit: 'unidades/período',
      interpretation,
      recommendation
    };

    setResults({ ...results, capacity: result });
  };

  const calculateQuality = () => {
    const defectRate = (qualityInputs.defective / qualityInputs.totalProduced) * 100;
    const reworkRate = (qualityInputs.rework / qualityInputs.totalProduced) * 100;
    const scrapRate = (qualityInputs.scrap / qualityInputs.totalProduced) * 100;
    const qualityRate = 100 - defectRate - reworkRate - scrapRate;
    
    let interpretation = '';
    let recommendation = '';
    
    if (qualityRate >= 99) {
      interpretation = 'Qualidade excelente';
      recommendation = 'Manter controles atuais';
    } else if (qualityRate >= 95) {
      interpretation = 'Qualidade boa';
      recommendation = 'Focar na redução de defeitos';
    } else if (qualityRate >= 90) {
      interpretation = 'Qualidade regular';
      recommendation = 'Implementar controle estatístico';
    } else {
      interpretation = 'Qualidade baixa';
      recommendation = 'Ação corretiva urgente';
    }

    const result: CalculatorResult = {
      value: qualityRate,
      unit: '%',
      interpretation,
      recommendation
    };

    setResults({ ...results, quality: result });
  };

  const calculateSetup = () => {
    const setupRatio = (setupInputs.setupTime / (setupInputs.batchSize * setupInputs.cycleTime)) * 100;
    const setupCostPerUnit = setupInputs.setupCost / setupInputs.batchSize;
    
    let interpretation = '';
    let recommendation = '';
    
    if (setupRatio <= 5) {
      interpretation = 'Setup otimizado';
      recommendation = 'Manter práticas atuais';
    } else if (setupRatio <= 10) {
      interpretation = 'Setup aceitável';
      recommendation = 'Buscar melhorias incrementais';
    } else if (setupRatio <= 20) {
      interpretation = 'Setup alto';
      recommendation = 'Implementar SMED (Single Minute Exchange)';
    } else {
      interpretation = 'Setup excessivo';
      recommendation = 'Revisão completa do processo';
    }

    const result: CalculatorResult = {
      value: setupRatio,
      unit: '%',
      interpretation,
      recommendation
    };

    setResults({ ...results, setup: result });
  };

  const calculateWaste = () => {
    const materialWaste = ((wasteInputs.materialUsed - wasteInputs.materialRequired) / wasteInputs.materialRequired) * 100;
    const energyWaste = ((wasteInputs.energyConsumed - wasteInputs.energyStandard) / wasteInputs.energyStandard) * 100;
    const timeWaste = ((wasteInputs.timeSpent - wasteInputs.timeStandard) / wasteInputs.timeStandard) * 100;
    const overallWaste = (materialWaste + energyWaste + timeWaste) / 3;
    
    let interpretation = '';
    let recommendation = '';
    
    if (overallWaste <= 5) {
      interpretation = 'Desperdício baixo';
      recommendation = 'Manter controles atuais';
    } else if (overallWaste <= 15) {
      interpretation = 'Desperdício moderado';
      recommendation = 'Implementar práticas lean';
    } else if (overallWaste <= 25) {
      interpretation = 'Desperdício alto';
      recommendation = 'Mapear fluxo de valor';
    } else {
      interpretation = 'Desperdício crítico';
      recommendation = 'Ação imediata necessária';
    }

    const result: CalculatorResult = {
      value: overallWaste,
      unit: '%',
      interpretation,
      recommendation
    };

    setResults({ ...results, waste: result });
  };

  const calculators = [
    {
      id: 'productivity',
      name: 'Produtividade',
      icon: TrendingUp,
      description: 'Unidades produzidas por recurso',
      calculate: calculateProductivity
    },
    {
      id: 'efficiency',
      name: 'Eficiência',
      icon: Gauge,
      description: 'Comparação com padrão',
      calculate: calculateEfficiency
    },
    {
      id: 'capacity',
      name: 'Capacidade',
      icon: BarChart3,
      description: 'Capacidade efetiva de produção',
      calculate: calculateCapacity
    },
    {
      id: 'quality',
      name: 'Qualidade',
      icon: Target,
      description: 'Taxa de qualidade e defeitos',
      calculate: calculateQuality
    },
    {
      id: 'setup',
      name: 'Setup',
      icon: Clock,
      description: 'Análise de tempo de setup',
      calculate: calculateSetup
    },
    {
      id: 'waste',
      name: 'Desperdícios',
      icon: Activity,
      description: 'Identificação de desperdícios',
      calculate: calculateWaste
    }
  ];

  const renderCalculatorInputs = () => {
    switch (activeCalculator) {
      case 'productivity':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unidades Produzidas</label>
              <input
                type="number"
                value={productivityInputs.unitsProduced}
                onChange={(e) => setProductivityInputs({...productivityInputs, unitsProduced: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tempo (horas)</label>
              <input
                type="number"
                value={productivityInputs.timeHours}
                onChange={(e) => setProductivityInputs({...productivityInputs, timeHours: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Número de Operadores</label>
              <input
                type="number"
                value={productivityInputs.operators}
                onChange={(e) => setProductivityInputs({...productivityInputs, operators: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Horas de Máquina</label>
              <input
                type="number"
                value={productivityInputs.machineHours}
                onChange={(e) => setProductivityInputs({...productivityInputs, machineHours: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'efficiency':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Output Real</label>
              <input
                type="number"
                value={efficiencyInputs.actualOutput}
                onChange={(e) => setEfficiencyInputs({...efficiencyInputs, actualOutput: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Output Padrão</label>
              <input
                type="number"
                value={efficiencyInputs.standardOutput}
                onChange={(e) => setEfficiencyInputs({...efficiencyInputs, standardOutput: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tempo Real (min)</label>
              <input
                type="number"
                value={efficiencyInputs.actualTime}
                onChange={(e) => setEfficiencyInputs({...efficiencyInputs, actualTime: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tempo Padrão (min)</label>
              <input
                type="number"
                value={efficiencyInputs.standardTime}
                onChange={(e) => setEfficiencyInputs({...efficiencyInputs, standardTime: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'capacity':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tempo de Ciclo (min)</label>
              <input
                type="number"
                step="0.1"
                value={capacityInputs.cycleTime}
                onChange={(e) => setCapacityInputs({...capacityInputs, cycleTime: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tempo Disponível (min)</label>
              <input
                type="number"
                value={capacityInputs.availableTime}
                onChange={(e) => setCapacityInputs({...capacityInputs, availableTime: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Eficiência (%)</label>
              <input
                type="number"
                value={capacityInputs.efficiency}
                onChange={(e) => setCapacityInputs({...capacityInputs, efficiency: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Utilização (%)</label>
              <input
                type="number"
                value={capacityInputs.utilization}
                onChange={(e) => setCapacityInputs({...capacityInputs, utilization: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'quality':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Produzido</label>
              <input
                type="number"
                value={qualityInputs.totalProduced}
                onChange={(e) => setQualityInputs({...qualityInputs, totalProduced: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Defeituosos</label>
              <input
                type="number"
                value={qualityInputs.defective}
                onChange={(e) => setQualityInputs({...qualityInputs, defective: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Retrabalho</label>
              <input
                type="number"
                value={qualityInputs.rework}
                onChange={(e) => setQualityInputs({...qualityInputs, rework: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sucata</label>
              <input
                type="number"
                value={qualityInputs.scrap}
                onChange={(e) => setQualityInputs({...qualityInputs, scrap: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'setup':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tempo de Setup (min)</label>
              <input
                type="number"
                value={setupInputs.setupTime}
                onChange={(e) => setSetupInputs({...setupInputs, setupTime: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tamanho do Lote</label>
              <input
                type="number"
                value={setupInputs.batchSize}
                onChange={(e) => setSetupInputs({...setupInputs, batchSize: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tempo de Ciclo (min)</label>
              <input
                type="number"
                step="0.1"
                value={setupInputs.cycleTime}
                onChange={(e) => setSetupInputs({...setupInputs, cycleTime: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Custo de Setup (R$)</label>
              <input
                type="number"
                value={setupInputs.setupCost}
                onChange={(e) => setSetupInputs({...setupInputs, setupCost: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'waste':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material Usado (kg)</label>
              <input
                type="number"
                value={wasteInputs.materialUsed}
                onChange={(e) => setWasteInputs({...wasteInputs, materialUsed: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material Necessário (kg)</label>
              <input
                type="number"
                value={wasteInputs.materialRequired}
                onChange={(e) => setWasteInputs({...wasteInputs, materialRequired: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Energia Consumida (kWh)</label>
              <input
                type="number"
                value={wasteInputs.energyConsumed}
                onChange={(e) => setWasteInputs({...wasteInputs, energyConsumed: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Energia Padrão (kWh)</label>
              <input
                type="number"
                value={wasteInputs.energyStandard}
                onChange={(e) => setWasteInputs({...wasteInputs, energyStandard: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tempo Gasto (min)</label>
              <input
                type="number"
                value={wasteInputs.timeSpent}
                onChange={(e) => setWasteInputs({...wasteInputs, timeSpent: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tempo Padrão (min)</label>
              <input
                type="number"
                value={wasteInputs.timeStandard}
                onChange={(e) => setWasteInputs({...wasteInputs, timeStandard: parseFloat(e.target.value) || 0})}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentCalculator = calculators.find(calc => calc.id === activeCalculator);
  const currentResult = results[activeCalculator];

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white/20 p-2 rounded-lg mr-3">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Calculadoras Industriais
              </h2>
              <p className="text-blue-100 text-sm">Cálculos Essenciais para Melhoria Contínua</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seletor de Calculadoras */}
      <div className="p-6 bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`p-3 rounded-lg text-center transition-all duration-200 ${
                  activeCalculator === calc.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium">{calc.name}</div>
                <div className="text-xs opacity-75">{calc.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculadora Ativa */}
      <div className="p-6">
        {currentCalculator && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Calculadora de {currentCalculator.name}
              </h3>
              <p className="text-gray-600">{currentCalculator.description}</p>
            </div>

            {/* Inputs */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-4">📊 Dados de Entrada</h4>
              {renderCalculatorInputs()}
              
              <div className="mt-6 text-center">
                <button
                  onClick={currentCalculator.calculate}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  <Calculator className="w-4 h-4 inline mr-2" />
                  Calcular {currentCalculator.name}
                </button>
              </div>
            </div>

            {/* Resultado */}
            {currentResult && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-800 mb-4">📈 Resultado da Análise</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-sm text-green-600">Valor Calculado</p>
                    <p className="text-3xl font-bold text-green-800">
                      {currentResult.value.toFixed(2)} {currentResult.unit}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-green-600">Interpretação</p>
                    <p className="text-lg font-semibold text-green-700">
                      {currentResult.interpretation}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-green-600">Status</p>
                    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                      currentResult.interpretation.includes('excelente') ? 'bg-green-100 text-green-800' :
                      currentResult.interpretation.includes('boa') || currentResult.interpretation.includes('bem') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentResult.interpretation.includes('excelente') ? '✅ Excelente' :
                       currentResult.interpretation.includes('boa') || currentResult.interpretation.includes('bem') ? '⚠️ Atenção' :
                       '🚨 Crítico'}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <h5 className="font-semibold text-green-800 mb-2">💡 Recomendação</h5>
                  <p className="text-green-700">{currentResult.recommendation}</p>
                </div>
              </div>
            )}

            {/* Dicas e Fórmulas */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-bold text-blue-800 mb-4">📚 Informações Técnicas</h4>
              
              {activeCalculator === 'productivity' && (
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-blue-700">Fórmulas:</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Produtividade = Unidades Produzidas / Recurso Utilizado</li>
                      <li>• Produtividade por Hora = Unidades / Tempo</li>
                      <li>• Produtividade por Operador = Unidades / Número de Operadores</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-700">Benchmarks:</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Excelente: &gt; 100 unidades/recurso</li>
                      <li>• Boa: 75-100 unidades/recurso</li>
                      <li>• Regular: &lt; 75 unidades/recurso</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeCalculator === 'efficiency' && (
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-blue-700">Fórmulas:</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Eficiência de Output = (Output Real / Output Padrão) × 100</li>
                      <li>• Eficiência de Tempo = (Tempo Padrão / Tempo Real) × 100</li>
                      <li>• Eficiência Geral = (Eficiência Output + Eficiência Tempo) / 2</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-700">Benchmarks:</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Excelente: &ge; 95%</li>
                      <li>• Boa: 85-94%</li>
                      <li>• Regular: 70-84%</li>
                      <li>• Baixa: &lt; 70%</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeCalculator === 'capacity' && (
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-blue-700">Fórmulas:</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Capacidade Teórica = Tempo Disponível / Tempo de Ciclo</li>
                      <li>• Capacidade Efetiva = Capacidade Teórica × Eficiência × Utilização</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-700">Fatores de Perda:</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Eficiência: Velocidade reduzida, pequenas paradas</li>
                      <li>• Utilização: Paradas planejadas, setup, manutenção</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeCalculator === 'quality' && (
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-blue-700">Fórmulas:</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Taxa de Defeitos = (Defeituosos / Total) × 100</li>
                      <li>• Taxa de Retrabalho = (Retrabalho / Total) × 100</li>
                      <li>• Taxa de Qualidade = 100% - Taxa Defeitos - Taxa Retrabalho - Taxa Sucata</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-700">Metas Industriais:</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Classe Mundial: &gt; 99%</li>
                      <li>• Boa: 95-99%</li>
                      <li>• Regular: 90-95%</li>
                      <li>• Crítica: &lt; 90%</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeCalculator === 'setup' && (
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-blue-700">Fórmulas:</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Ratio de Setup = (Tempo Setup / Tempo Produção) × 100</li>
                      <li>• Tempo Produção = Tamanho Lote × Tempo Ciclo</li>
                      <li>• Custo Setup por Unidade = Custo Setup / Tamanho Lote</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-700">Metas SMED:</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Excelente: &le; 5% (Single Minute Exchange)</li>
                      <li>• Bom: 5-10%</li>
                      <li>• Alto: 10-20%</li>
                      <li>• Crítico: &gt; 20%</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeCalculator === 'waste' && (
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-blue-700">Fórmulas:</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Desperdício Material = ((Usado - Necessário) / Necessário) × 100</li>
                      <li>• Desperdício Energia = ((Consumido - Padrão) / Padrão) × 100</li>
                      <li>• Desperdício Tempo = ((Gasto - Padrão) / Padrão) × 100</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-700">8 Desperdícios Lean:</h5>
                    <ul className="text-sm text-blue-600 space-y-1">
                      <li>• Superprodução, Espera, Transporte, Processamento</li>
                      <li>• Estoque, Movimentação, Defeitos, Talento</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}