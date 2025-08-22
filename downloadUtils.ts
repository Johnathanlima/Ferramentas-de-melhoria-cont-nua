// Função para limpar texto para PDF
const cleanTextForPDF = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[🎯🐟🔄❓⚠️📊⚙️💡🚀📋⏰🧮🔐📝✨🔍⚡]/g, '')
    .replace(/ê/g, 'e')
    .replace(/â/g, 'a')
    .replace(/ã/g, 'a')
    .replace(/ç/g, 'c')
    .replace(/õ/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/í/g, 'i')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/ô/g, 'o')
    .replace(/ò/g, 'o')
    .replace(/ó/g, 'o')
    .replace(/Análise/g, 'Analise')
    .replace(/análise/g, 'analise')
    .replace(/Crítico/g, 'Critico')
    .replace(/crítico/g, 'critico')
    .replace(/Priorização/g, 'Priorizacao')
    .replace(/priorização/g, 'priorizacao')
    .replace(/Implementação/g, 'Implementacao')
    .replace(/implementação/g, 'implementacao')
    .replace(/Prevenção/g, 'Prevencao')
    .replace(/prevenção/g, 'prevencao')
    .replace(/Detecção/g, 'Deteccao')
    .replace(/detecção/g, 'deteccao')
    .replace(/Ocorrência/g, 'Ocorrencia')
    .replace(/ocorrência/g, 'ocorrencia')
    .replace(/Ação/g, 'Acao')
    .replace(/ação/g, 'acao')
    .replace(/Ações/g, 'Acoes')
    .replace(/ações/g, 'acoes')
    .replace(/Revisão/g, 'Revisao')
    .replace(/revisão/g, 'revisao')
    .replace(/Avaliação/g, 'Avaliacao')
    .replace(/avaliação/g, 'avaliacao')
    .replace(/Investigação/g, 'Investigacao')
    .replace(/investigação/g, 'investigacao')
    .replace(/Verificação/g, 'Verificacao')
    .replace(/verificação/g, 'verificacao')
    .replace(/Validação/g, 'Validacao')
    .replace(/validação/g, 'validacao')
    .replace(/Monitoração/g, 'Monitoracao')
    .replace(/monitoração/g, 'monitoracao')
    .replace(/[^\w\s\-.,!?()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

// Função para renderizar todos os diagramas em segundo plano
const renderAllDiagramsInBackground = async (analysisResult: any) => {
  console.log('🔄 Renderizando todos os diagramas em segundo plano...');
  
  // Criar container temporário invisível
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.top = '0px';
  tempContainer.style.left = '0px';
  tempContainer.style.width = '1200px';
  tempContainer.style.height = 'auto';
  tempContainer.style.overflow = 'hidden';
  tempContainer.style.backgroundColor = 'white';
  tempContainer.style.zIndex = '-1';
  tempContainer.style.opacity = '0';
  tempContainer.style.pointerEvents = 'none';
  document.body.appendChild(tempContainer);

  const diagrams = [];

  try {
    // Importar componentes dinamicamente
    const { default: EditableIshikawaDiagram } = await import('../components/EditableIshikawaDiagram');
    const { default: EditablePDCADiagram } = await import('../components/EditablePDCADiagram');
    const { default: FiveWhysDiagram } = await import('../components/FiveWhysDiagram');
    const { default: FiveW2HDiagram } = await import('../components/FiveW2HDiagram');
    const { default: FailureAnalysisDiagram } = await import('../components/FailureAnalysisDiagram');
    const React = await import('react');
    const ReactDOM = await import('react-dom/client');

    // Lista de diagramas para renderizar
    const diagramsToRender = [
      {
        id: 'temp-ishikawa',
        component: React.createElement(EditableIshikawaDiagram, {
          data: analysisResult.ishikawa,
          onDataChange: () => {}
        }),
        title: 'Diagrama de Ishikawa'
      },
      {
        id: 'temp-pdca',
        component: React.createElement(EditablePDCADiagram, {
          data: analysisResult.pdca,
          onDataChange: () => {}
        }),
        title: 'Ciclo PDCA'
      },
      {
        id: 'temp-fivewhys',
        component: React.createElement(FiveWhysDiagram, {
          data: analysisResult.fiveWhys,
          onDataChange: () => {}
        }),
        title: 'Análise dos 5 Porquês'
      },
      {
        id: 'temp-fmea',
        component: React.createElement(FMEADiagram, {
          data: analysisResult.fmea,
          onDataChange: () => {}
        }),
        title: 'Análise FMEA'
      },
      {
        id: 'temp-failure-analysis',
        component: React.createElement(FailureAnalysisDiagram, {
          data: analysisResult.failureAnalysis,
          onDataChange: () => {}
        }),
        title: 'Análise de Quebra/Falha'
      }
    ]
    // Renderizar cada diagrama sequencialmente (mais estável)
    for (const diagram of diagramsToRender) {
    }

    // Renderizar cada diagrama sequencialmente (mais estável)
    for (const diagram of diagramsToRender) {
      console.log(`📊 Renderizando: ${diagram.title}`);
      
      const diagramDiv = document.createElement('div');
      diagramDiv.id = diagram.id;
      diagramDiv.style.width = '100%';
      diagramDiv.style.marginBottom = '20px';
      tempContainer.appendChild(diagramDiv);

      const root = ReactDOM.createRoot(diagramDiv);
      root.render(diagram.component);

      // Aguardar renderização (aumentado para 800ms para estabilidade)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      diagrams.push({
        id: diagram.id,
        title: diagram.title,
        element: diagramDiv
      });
    }
  } catch (error) {
    console.error('❌ Erro ao renderizar diagramas:', error);
    if (tempContainer && tempContainer.parentNode) {
      document.body.removeChild(tempContainer);
    }
    throw error;
  }
};

export const downloadCompleteReport = async (problemDescription: string, analysisResult?: any) => {
  try {
    console.log('🚀 Iniciando geração do relatório...');
    
    // Se não tiver analysisResult, tentar pegar do contexto atual
    if (!analysisResult) {
      console.log('⚠️ Dados de análise não fornecidos. Tentando capturar diagramas existentes...');
      return await downloadCompleteReportFromDOM(problemDescription);
    }

    console.log('📚 Carregando bibliotecas...');

    // Importar bibliotecas
    const { jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;
    
    console.log('🎨 Renderizando diagramas...');

    // Renderizar todos os diagramas em segundo plano
    const { diagrams, tempContainer } = await renderAllDiagramsInBackground(analysisResult);
    
    console.log('📄 Criando PDF...');

    // Criar PDF
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - (margin * 2);
    
    // ===== PÁGINA 1 - CAPA =====
    pdf.setFillColor(79, 70, 229);
    pdf.rect(0, 0, pageWidth, 80, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ANALISE DE PROBLEMAS', pageWidth / 2, 35, { align: 'center' });
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Relatorio Completo de Metodologias', pageWidth / 2, 50, { align: 'center' });
    
    pdf.setFontSize(10);
    pdf.text('Ishikawa - PDCA - 5 Porques - FMEA - Pareto - Analise de Falhas', pageWidth / 2, 65, { align: 'center' });
    
    pdf.setTextColor(0, 0, 0);
    
    const currentDate = new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    pdf.setFontSize(10);
    pdf.text(`Gerado em: ${currentDate}`, pageWidth / 2, 100, { align: 'center' });
    
    pdf.setDrawColor(79, 70, 229);
    pdf.setLineWidth(1);
    pdf.line(margin, 110, pageWidth - margin, 110);
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(79, 70, 229);
    pdf.text('PROBLEMA ANALISADO', margin, 130);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    
    // Limpar texto de símbolos
    const cleanProblemText = problemDescription
      .replace(/[🎯🐟🔄❓⚠️📊⚙️💡🚀📋⏰🧮🔐📝✨🔍⚡]/g, '')
      .replace(/[^\w\s\-.,!?()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    const problemLines = pdf.splitTextToSize(cleanProblemText, contentWidth);
    let yPos = 145;
    problemLines.forEach((line: string) => {
      pdf.text(line, margin, yPos);
      yPos += 7;
    });

    console.log('📸 Capturando diagramas...');

    // Capturar cada diagrama renderizado
    for (let i = 0; i < diagrams.length; i++) {
      const diagram = diagrams[i];
      
      console.log(`📸 Capturando: ${diagram.title}`);
      
      pdf.addPage();
      
      // Cabeçalho da página
      pdf.setFillColor(248, 250, 252);
      pdf.rect(0, 0, pageWidth, 25, 'F');
      
      pdf.setTextColor(79, 70, 229);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      
      const cleanTitle = diagram.title
        .replace(/[🎯🐟🔄❓⚠️📊⚙️💡🚀📋⏰🧮🔐📝✨🔍⚡]/g, '')
        .replace(/[^\w\s\-.,!?()]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      pdf.text(cleanTitle, margin, 18);
      
      pdf.setTextColor(0, 0, 0);

      try {
        // Aguardar um pouco para garantir renderização
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Aumentar tamanho dos textos para FMEA e Análise de Falhas
        if (diagram.title.includes('5W2H') || diagram.title.includes('Falha') || diagram.title.includes('Quebra')) {
          const textElements = diagram.element.querySelectorAll('*');
          textElements.forEach(el => {
            const element = el as HTMLElement;
            const currentFontSize = window.getComputedStyle(element).fontSize;
            if (currentFontSize) {
              const sizeValue = parseFloat(currentFontSize);
              if (sizeValue > 0 && sizeValue < 24) {
                element.style.fontSize = `${Math.max(sizeValue * 1.3, 12)}px`;
              }
            }
          });
        }
        
        const canvas = await html2canvas(diagram.element, {
          scale: diagram.title.includes('Ishikawa') ? 10.0 : diagram.title.includes('5W2H') || diagram.title.includes('Falha') || diagram.title.includes('Quebra') ? 12.0 : 8.0,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          width: diagram.element.scrollWidth,
          height: diagram.element.scrollHeight,
          logging: false,
          removeContainer: false,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.getElementById(diagram.id);
            if (clonedElement) {
              // Aumentar fontes especificamente para Ishikawa no PDF
              if (diagram.title.includes('Ishikawa')) {
                // Título do problema
                const problemTitle = clonedElement.querySelector('h3');
                if (problemTitle) {
                  problemTitle.style.fontSize = '120px';
                  problemTitle.style.marginBottom = '80px';
                  problemTitle.style.fontWeight = 'bold';
                }
                
                // Texto do problema
                const problemText = clonedElement.querySelector('.text-red-800');
                if (problemText) {
                  problemText.style.fontSize = '90px';
                  problemText.style.lineHeight = '1.4';
                  problemText.style.padding = '60px';
                  problemText.style.fontWeight = 'bold';
                }
                
                // Container do problema
                const problemContainer = clonedElement.querySelector('.bg-gradient-to-r.from-red-50');
                if (problemContainer) {
                  (problemContainer as HTMLElement).style.padding = '80px';
                  (problemContainer as HTMLElement).style.borderWidth = '12px';
                }
                
                // Nomes das categorias
                const categoryNames = clonedElement.querySelectorAll('h4');
                categoryNames.forEach(name => {
                  (name as HTMLElement).style.fontSize = '70px';
                  (name as HTMLElement).style.padding = '50px 60px';
                  (name as HTMLElement).style.marginBottom = '60px';
                  (name as HTMLElement).style.fontWeight = 'bold';
                });
                
                // Quadrados das categorias
                const categoryBoxes = clonedElement.querySelectorAll('.bg-white.border-2');
                categoryBoxes.forEach(box => {
                  (box as HTMLElement).style.padding = '80px';
                  (box as HTMLElement).style.borderWidth = '10px';
                  (box as HTMLElement).style.minHeight = '1200px';
                });
                
                // Textos das causas
                const causeTexts = clonedElement.querySelectorAll('.text-sm.text-gray-800');
                causeTexts.forEach(text => {
                  (text as HTMLElement).style.fontSize = '50px';
                  (text as HTMLElement).style.lineHeight = '1.5';
                  (text as HTMLElement).style.padding = '30px 0';
                  (text as HTMLElement).style.fontWeight = '600';
                });
                
                // Containers das causas
                const causeContainers = clonedElement.querySelectorAll('.bg-gray-50.rounded-lg');
                causeContainers.forEach(container => {
                  (container as HTMLElement).style.padding = '40px';
                  (container as HTMLElement).style.marginBottom = '40px';
                  (container as HTMLElement).style.minHeight = '200px';
                });
                
                // Bolinhas das causas
                const causeDots = clonedElement.querySelectorAll('.w-2.h-2.rounded-full');
                causeDots.forEach(dot => {
                  (dot as HTMLElement).style.width = '30px';
                  (dot as HTMLElement).style.height = '30px';
                  (dot as HTMLElement).style.marginTop = '20px';
                  (dot as HTMLElement).style.marginRight = '40px';
                });
                
                // Título da legenda
                const legendTitle = clonedElement.querySelector('.text-xl.text-gray-800');
                if (legendTitle) {
                  (legendTitle as HTMLElement).style.fontSize = '80px';
                  (legendTitle as HTMLElement).style.marginBottom = '60px';
                  (legendTitle as HTMLElement).style.fontWeight = 'bold';
                }
                
                // Itens da legenda
                const legendItems = clonedElement.querySelectorAll('.text-sm.text-gray-700.font-semibold');
                legendItems.forEach(item => {
                  (item as HTMLElement).style.fontSize = '45px';
                  (item as HTMLElement).style.fontWeight = 'bold';
                });
                
                // Bolinhas da legenda
                const legendDots = clonedElement.querySelectorAll('.w-4.h-4.rounded-full');
                legendDots.forEach(dot => {
                  (dot as HTMLElement).style.width = '40px';
                  (dot as HTMLElement).style.height = '40px';
                  (dot as HTMLElement).style.marginRight = '30px';
                });
                
                // Descrição da legenda
                const legendDesc = clonedElement.querySelector('.text-sm.text-gray-600.leading-relaxed');
                if (legendDesc) {
                  (legendDesc as HTMLElement).style.fontSize = '40px';
                  (legendDesc as HTMLElement).style.lineHeight = '1.6';
                  (legendDesc as HTMLElement).style.fontWeight = '500';
                }
                
                // Container da legenda
                const legendContainer = clonedElement.querySelector('.bg-gradient-to-r.from-blue-50');
                if (legendContainer) {
                  (legendContainer as HTMLElement).style.padding = '80px';
                  (legendContainer as HTMLElement).style.marginTop = '80px';
                }
                
                // Grid das categorias - tornar mais espaçado
                const categoryGrid = clonedElement.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
                if (categoryGrid) {
                  (categoryGrid as HTMLElement).style.gap = '80px';
                  (categoryGrid as HTMLElement).style.marginBottom = '80px';
                }
                
                // Container principal - mais espaçamento
                const mainContainer = clonedElement.querySelector('#ishikawa-diagram .p-8');
                if (mainContainer) {
                  (mainContainer as HTMLElement).style.padding = '120px';
                }
              }
              
              // Aumentar fontes especificamente para PDCA no PDF
              if (diagram.title.includes('PDCA')) {
                // Título principal
                const mainTitle = clonedElement.querySelector('h2');
                if (mainTitle) {
                  mainTitle.style.fontSize = '80px';
                  mainTitle.style.fontWeight = 'bold';
                  mainTitle.style.marginBottom = '50px';
                }
                
                // Títulos dos passos (Plan, Do, Check, Act)
                const stepTitles = clonedElement.querySelectorAll('h3');
                stepTitles.forEach(title => {
                  (title as HTMLElement).style.fontSize = '60px';
                  (title as HTMLElement).style.fontWeight = 'bold';
                  (title as HTMLElement).style.marginBottom = '25px';
                });
                
                // Descrições dos passos
                const stepDescriptions = clonedElement.querySelectorAll('.text-sm.text-gray-600');
                stepDescriptions.forEach(desc => {
                  (desc as HTMLElement).style.fontSize = '40px';
                  (desc as HTMLElement).style.lineHeight = '1.5';
                  (desc as HTMLElement).style.fontWeight = '500';
                });
                
                // Caixas dos passos
                const stepBoxes = clonedElement.querySelectorAll('.relative.p-6.rounded-lg.border-2');
                stepBoxes.forEach(box => {
                  (box as HTMLElement).style.padding = '80px';
                  (box as HTMLElement).style.borderWidth = '8px';
                  (box as HTMLElement).style.minHeight = '800px';
                });
                
                // Números dos passos
                const stepNumbers = clonedElement.querySelectorAll('.absolute.-top-4.-left-4');
                stepNumbers.forEach(number => {
                  (number as HTMLElement).style.width = '100px';
                  (number as HTMLElement).style.height = '100px';
                  (number as HTMLElement).style.fontSize = '50px';
                  (number as HTMLElement).style.fontWeight = 'bold';
                });
                
                // Ícones dos passos
                const stepIcons = clonedElement.querySelectorAll('.p-3.rounded-full');
                stepIcons.forEach(icon => {
                  (icon as HTMLElement).style.padding = '40px';
                  const iconSvg = icon.querySelector('svg');
                  if (iconSvg) {
                    iconSvg.style.width = '80px';
                    iconSvg.style.height = '80px';
                  }
                });
                
                // Textos das ações
                const actionTexts = clonedElement.querySelectorAll('.text-sm.text-gray-700');
                actionTexts.forEach(text => {
                  (text as HTMLElement).style.fontSize = '35px';
                  (text as HTMLElement).style.lineHeight = '1.6';
                  (text as HTMLElement).style.fontWeight = '500';
                  (text as HTMLElement).style.padding = '25px';
                });
                
                // Containers das ações
                const actionContainers = clonedElement.querySelectorAll('.bg-gray-50.rounded-lg');
                actionContainers.forEach(container => {
                  (container as HTMLElement).style.padding = '40px';
                  (container as HTMLElement).style.marginBottom = '25px';
                  (container as HTMLElement).style.minHeight = '130px';
                });
                
                // Bolinhas das ações
                const actionDots = clonedElement.querySelectorAll('.w-2.h-2.rounded-full');
                actionDots.forEach(dot => {
                  (dot as HTMLElement).style.width = '20px';
                  (dot as HTMLElement).style.height = '20px';
                  (dot as HTMLElement).style.marginTop = '15px';
                  (dot as HTMLElement).style.marginRight = '25px';
                });
                
                // Grid dos passos
                const stepsGrid = clonedElement.querySelector('.grid.grid-cols-1.md\\:grid-cols-2');
                if (stepsGrid) {
                  (stepsGrid as HTMLElement).style.gap = '80px';
                }
                
                // Container principal
                const mainContainer = clonedElement.querySelector('#pdca-diagram .p-8');
                if (mainContainer) {
                  (mainContainer as HTMLElement).style.padding = '120px';
                }
                
                // Texto do ciclo contínuo
                const cycleText = clonedElement.querySelector('.text-sm.font-medium');
                if (cycleText) {
                  (cycleText as HTMLElement).style.fontSize = '40px';
                  (cycleText as HTMLElement).style.fontWeight = 'bold';
                }
                
                // Ícone do ciclo contínuo
                const cycleIcon = clonedElement.querySelector('.w-6.h-6');
                if (cycleIcon) {
                  (cycleIcon as HTMLElement).style.width = '50px';
                  (cycleIcon as HTMLElement).style.height = '50px';
                }
              }
              
              // Aumentar fontes especificamente para 5W2H no PDF
              // SOLUÇÃO DEFINITIVA PARA 5W2H - APLICAR EM TODOS OS DIAGRAMAS QUE CONTENHAM "5W2H" OU "W2H"
              const diagramTitle = diagram.title.toLowerCase();
              if (diagramTitle.includes('5w2h') || diagramTitle.includes('w2h') || diagramTitle.includes('plano') || diagramTitle.includes('acao')) {
                console.log('🚀 APLICANDO ESTILOS GIGANTES PARA 5W2H - VERSÃO DEFINITIVA');
                
                // ESTRATÉGIA 1: TRANSFORM SCALE NO ELEMENTO PRINCIPAL
                clonedElement.style.transform = 'scale(5)';
                clonedElement.style.transformOrigin = 'top left';
                clonedElement.style.width = '20%'; // Compensa o scale 5x
                clonedElement.style.height = 'auto';
                clonedElement.style.overflow = 'visible';
                
                // ESTRATÉGIA 2: FORÇAR TODOS OS ELEMENTOS COM TAMANHOS GIGANTES
                const allElements = clonedElement.querySelectorAll('*');
                console.log(`🔍 Encontrados ${allElements.length} elementos para modificar`);
                
                allElements.forEach((el, index) => {
                  const element = el as HTMLElement;
                  
                  // FORÇAR TAMANHOS GIGANTES EM TODOS OS ELEMENTOS DE TEXTO
                  const tagName = element.tagName.toLowerCase();
                  
                  if (tagName === 'h1' || tagName === 'h2') {
                    element.style.fontSize = '300px !important';
                    element.style.fontWeight = 'bold !important';
                    element.style.lineHeight = '1.2 !important';
                    element.style.margin = '60px 0 !important';
                  } else if (tagName === 'h3') {
                    element.style.fontSize = '250px !important';
                    element.style.fontWeight = 'bold !important';
                    element.style.lineHeight = '1.3 !important';
                    element.style.margin = '50px 0 !important';
                  } else if (tagName === 'h4' || tagName === 'h5' || tagName === 'h6') {
                    element.style.fontSize = '200px !important';
                    element.style.fontWeight = 'bold !important';
                    element.style.lineHeight = '1.3 !important';
                    element.style.margin = '40px 0 !important';
                  } else if (tagName === 'p' || tagName === 'span' || tagName === 'div' || tagName === 'label') {
                    element.style.fontSize = '150px !important';
                    element.style.lineHeight = '1.4 !important';
                    element.style.fontWeight = '600 !important';
                    element.style.margin = '20px 0 !important';
                  } else if (tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
                    element.style.fontSize = '130px !important';
                    element.style.padding = '40px !important';
                    element.style.lineHeight = '1.4 !important';
                  }
                  
                  // FORÇAR PADDING E MARGENS GIGANTES
                  if (element.classList.contains('p-6') || element.classList.contains('p-4') || element.classList.contains('p-8')) {
                    element.style.padding = '200px !important';
                  }
                  
                  if (element.classList.contains('p-3')) {
                    element.style.padding = '100px !important';
                  }
                  
                  if (element.classList.contains('p-2')) {
                    element.style.padding = '80px !important';
                  }
                  
                  // FORÇAR BORDAS GROSSAS
                  if (element.classList.contains('border') || element.classList.contains('border-2')) {
                    element.style.borderWidth = '20px !important';
                  }
                  
                  // FORÇAR ÍCONES GIGANTES
                  if (tagName === 'svg') {
                    element.style.width = '200px !important';
                    element.style.height = '200px !important';
                  }
                  
                  // FORÇAR GAPS E ESPAÇAMENTOS
                  if (element.classList.contains('gap-4') || element.classList.contains('gap-6')) {
                    element.style.gap = '150px !important';
                  }
                  
                  if (element.classList.contains('space-y-4') || element.classList.contains('space-y-6')) {
                    element.style.marginBottom = '150px !important';
                  }
                  
                  // FORÇAR ALTURA MÍNIMA EM CONTAINERS
                  if (element.classList.contains('rounded-lg') || element.classList.contains('rounded-xl')) {
                    element.style.minHeight = '400px !important';
                    element.style.padding = element.style.padding || '120px !important';
                  }
                });
                
                // ESTRATÉGIA 3: CONTAINER PRINCIPAL GIGANTE
                clonedElement.style.padding = '400px !important';
                clonedElement.style.minHeight = '8000px !important';
                clonedElement.style.fontSize = '150px !important';
                clonedElement.style.lineHeight = '1.4 !important';
                
                console.log('✅ ESTILOS GIGANTES APLICADOS COM SUCESSO NO 5W2H');
              }
              
              clonedElement.style.position = 'static';
              clonedElement.style.overflow = 'visible';
              clonedElement.style.height = 'auto';
              clonedElement.style.visibility = 'visible';
              clonedElement.style.opacity = '1';
              clonedElement.style.display = 'block';
            }
          }
        });
        
        if (canvas.width > 0 && canvas.height > 0) {
          const imgData = canvas.toDataURL('image/png', 0.9); // Qualidade boa
          
          // Calcular dimensões baseadas no tipo de diagrama
          let maxWidth = contentWidth * 18.0; // AUMENTAR LARGURA 10x (1.8 * 10)
          let maxHeight = (pageHeight - 60) * 18.0; // AUMENTAR ALTURA 10x (1.8 * 10)
          
          // Tamanho padrão para todos os diagramas
          
          const imgRatio = canvas.width / canvas.height;
          let finalWidth = maxWidth;
          let finalHeight = maxWidth / imgRatio;
          
          // Se a altura calculada exceder o espaço disponível, ajustar proporcionalmente
          if (finalHeight > maxHeight) {
            finalHeight = maxHeight;
            finalWidth = finalHeight * imgRatio;
          }
          
          // Centralizar a imagem na página
          const x = (pageWidth - finalWidth) / 2;
          const y = 30;
          
          pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
          
          console.log(`✅ ${cleanTitle} capturado com sucesso!`);
        } else {
          throw new Error('Canvas vazio');
        }
        
      } catch (error) {
        console.error(`❌ Erro ao capturar ${diagram.title}:`, error);
        pdf.setFontSize(12);
        pdf.setTextColor(200, 0, 0);
        pdf.text(`Erro ao capturar: ${cleanTitle}`, margin, 50);
      }
      
      // Rodapé
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(100, 100, 100);
      const cleanFooterTitle = cleanTextForPDF(diagram.title);
      pdf.text(`${cleanFooterTitle} - Pagina ${pdf.internal.getNumberOfPages() - 1}`, pageWidth / 2, pageHeight - 5, { align: 'center' });
    }

    console.log('✅ Finalizando PDF...');

    // Limpar container temporário
    if (tempContainer && tempContainer.parentNode) {
      document.body.removeChild(tempContainer);
    }

    // ===== PÁGINA FINAL - RESUMO =====
    pdf.addPage();
    
    pdf.setFillColor(34, 197, 94);
    pdf.rect(0, 0, pageWidth, 30, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RESUMO EXECUTIVO', margin, 20);
    
    pdf.setTextColor(0, 0, 0);
    
    let currentY = 45;
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(34, 197, 94);
    pdf.text('PROXIMOS PASSOS RECOMENDADOS', margin, currentY);
    
    currentY += 10;
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    const steps = [
      '1. Priorize as causas raizes mais críticas identificadas no Ishikawa',
      '2. Execute as acoes do PDCA sequencialmente',
      '3. Use os 5 Porques para investigacao profunda',
      '4. Implemente acoes preventivas do FMEA',
      '5. Execute análise de quebra/falha para incidentes específicos',
      '6. Monitore resultados continuamente'
    ];
    
    steps.forEach(step => {
      const lines = pdf.splitTextToSize(step, contentWidth - 5);
      lines.forEach((line: string) => {
        pdf.text(line, margin + 3, currentY);
        currentY += 5;
      });
      currentY += 2;
    });
    
    console.log('💾 Salvando arquivo...');

    // Salvar PDF
    const timestamp = new Date().toISOString().slice(0, 10);
    
    // Abrir PDF em nova guia ao invés de fazer download
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const newWindow = window.open(pdfUrl, '_blank');
    
    if (newWindow) {
      newWindow.document.title = `Analise-Problemas-Relatorio-${timestamp}.pdf`;
    } else {
      // Fallback se popup foi bloqueado
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `Analise-Problemas-Relatorio-${timestamp}.pdf`;
      link.click();
    }
    
    console.log('✅ PDF gerado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao gerar relatório:', error);
    
    // Fallback para método antigo
    console.log('🔄 Tentando método alternativo...');
    return await downloadCompleteReportFromDOM(problemDescription);
  }
};

// Função fallback que usa o método antigo
const downloadCompleteReportFromDOM = async (problemDescription: string) => {
  try {
    console.log('🔄 Usando método de captura do DOM...');
    
    const { jsPDF } = await import('jspdf');
    
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - (margin * 2);
    
    // Capa
    pdf.setFillColor(79, 70, 229);
    pdf.rect(0, 0, pageWidth, 80, 'F');
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.text('ANALISE DE PROBLEMAS', pageWidth / 2, 35, { align: 'center' });
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Relatorio Completo de Metodologias', pageWidth / 2, 50, { align: 'center' });
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    
    // Limpar texto do problema
    const cleanProblemText = problemDescription
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[🎯🐟🔄❓⚠️📊⚙️💡🚀📋⏰🧮🔐📝✨🔍⚡]/g, '')
      .replace(/ê/g, 'e')
      .replace(/ã/g, 'a')
      .replace(/ç/g, 'c')
      .replace(/õ/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/í/g, 'i')
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/ô/g, 'o')
      .trim();
    
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(79, 70, 229);
    pdf.text('PROBLEMA ANALISADO', margin, 100);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    
    const problemLines = pdf.splitTextToSize(cleanProblemText, contentWidth);
    let yPos = 115;
    problemLines.forEach((line: string) => {
      pdf.text(line, margin, yPos);
      yPos += 7;
    });
    
    // Instruções
    pdf.addPage();
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(79, 70, 229);
    pdf.text('INSTRUCOES PARA RELATORIO COMPLETO', margin, 30);
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    
    const instructions = [
      '1. Clique na aba "Ishikawa" e aguarde carregar',
      '2. Clique na aba "PDCA" e aguarde carregar',
      '3. Clique na aba "5 Porques" e aguarde carregar',
      '4. Clique na aba "FMEA" e aguarde carregar',
      '5. Clique na aba "RCA" e aguarde carregar',
      '6. Clique novamente em "Relatorio Completo"',
      '',
      'Isso garante que todos os diagramas sejam capturados corretamente.'
    ];
    
    yPos = 50;
    instructions.forEach(instruction => {
      if (instruction === '') {
        yPos += 8;
      } else {
        pdf.text(instruction, margin, yPos);
        yPos += 8;
      }
    });
    
    // Remover indicador
    
    const timestamp = new Date().toISOString().slice(0, 10);
    
    // Abrir PDF em nova guia
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const newWindow = window.open(pdfUrl, '_blank');
    
    if (newWindow) {
      newWindow.document.title = `Analise-Problemas-Instrucoes-${timestamp}.pdf`;
    } else {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `Analise-Problemas-Instrucoes-${timestamp}.pdf`;
      link.click();
    }
    
    console.log('✅ PDF de instruções gerado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro no método fallback:', error);
    
    alert('Erro ao gerar relatorio. Tente navegar por todas as 5 abas dos diagramas primeiro.');
  }
};

export const downloadDiagramAsPDF = async (elementId: string, filename: string) => {
  try {
    const { jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;
    
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento não encontrado');
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    
    // Abrir PDF em nova guia
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const newWindow = window.open(pdfUrl, '_blank');
    
    if (newWindow) {
      newWindow.document.title = `${filename}.pdf`;
    } else {
      // Fallback se popup foi bloqueado
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `${filename}.pdf`;
      link.click();
    }
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    alert('Erro ao gerar PDF. Tente novamente.');
  }
};

export const downloadDiagramAsImage = async (elementId: string, filename: string) => {
  try {
    const html2canvas = (await import('html2canvas')).default;
    
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Elemento não encontrado');
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      logging: false
    });

    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Erro ao gerar imagem:', error);
    alert('Erro ao gerar imagem. Tente novamente.');
  }
};