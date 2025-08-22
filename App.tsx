import React, { useState } from 'react';
import ProblemInput from './components/ProblemInput';
import Dashboard from './components/Dashboard';
import { AnalysisResult } from './types';
import { generateAnalysis } from './utils/aiAssistant';

function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartAnalysis = () => {
    // Scroll para o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setIsLoading(true);
    
    // Gerar análise com problema padrão editável
    setTimeout(() => {
      const analysis = generateAnalysis("Problema a ser definido pelo usuário");
      setResult(analysis);
      setIsLoading(false);
    }, 1500);
  };

  const handleBack = () => {
    // Scroll para o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {result ? (
        <Dashboard result={result} onBack={handleBack} />
      ) : (
        <ProblemInput onStartAnalysis={handleStartAnalysis} isLoading={isLoading} />
      )}
    </div>
  );
}

export default App;