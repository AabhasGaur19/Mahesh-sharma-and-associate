const cheerio = require('cheerio');

function parseCauselist(htmlContent) {
  const $ = cheerio.load(htmlContent);
  const extractedData = [];

  // Find all court sections by looking for "Court No : X" patterns
  const courtSections = [];
  
  // Get all elements that contain court information
  $('*').each((i, element) => {
    const text = $(element).text();
    const courtMatch = text.match(/Court\s+No\s*:\s*(\d+)/i);
    if (courtMatch) {
      courtSections.push({
        courtNo: courtMatch[1],
        element: element,
        startIndex: i
      });
    }
  });


  // Process each court section
  courtSections.forEach((courtSection, courtIndex) => {
    const currentCourtNo = courtSection.courtNo;

    // Find the next court section to determine the boundary
    const nextCourtIndex = courtIndex + 1 < courtSections.length ? 
      courtSections[courtIndex + 1].startIndex : Infinity;

    // Find all elements between current court and next court
    let courtElements = [];
    $('*').each((i, element) => {
      if (i >= courtSection.startIndex && i < nextCourtIndex) {
        courtElements.push(element);
      }
    });

    // Look for stage information within this court section
    let currentStage = 'Unknown';
    courtElements.forEach(element => {
      const text = $(element).text();
      
      // Look for various stage patterns
      const stagePatterns = [
        /FOR\s+FRESH\s+ADMISSION\s+WITH\s+STAY\/BAIL/i,
        /FOR\s+ORDERS\s+ON\s+INTERIM\s+APPLICATIONS/i,
        /FOR\s+HEARING/i,
        /FOR\s+ORDERS\s*(?:\s*-\s*439\s*\(\s*CR\.P\.C\.\s*\))?/i,
        /FOR\s+ADMISSION\s+WITH\s+NOTICE\s+SERVED\s*-\s*REPLY\s+FILED/i,
        /PIL\s+MATTERS[^<]*?MATTERS/i,
        /CRIMINAL\s+MISC[^<]*?MENTIONING/i,
        /CIVIL\s+WRIT\s+PETITIONS[^<]*?MATTERS/i,
        /REGULAR\s+BAIL\s+MATTERS[^<]*?MATTERS/i
      ];

      for (let pattern of stagePatterns) {
        const match = text.match(pattern);
        if (match) {
          currentStage = match[0].trim();
          break;
        }
      }
    });

    // Find tables within this court section
    courtElements.forEach(element => {
      const $element = $(element);
      if (element.tagName === 'table') {
        const rows = $element.find('tr');
        
        rows.each((i, row) => {
          const $row = $(row);
          const cells = $row.find('td');
          
          if (cells.length >= 3) {
            const firstCell = $(cells[0]).text().trim();
            const secondCell = $(cells[1]).text().trim();
            const thirdCell = $(cells[2]).text().trim();
            
            // Check if this is a case row (starts with number or "With" + number)
            let itemNo = '';
            let isValidRow = false;

            // Pattern 1: Simple number
            if (/^\d+$/.test(firstCell)) {
              itemNo = firstCell;
              isValidRow = true;
            }
            // Pattern 2: "With" followed by number (connected cases)
            else if (/^With\s*\d+$/i.test(firstCell.replace(/\s+/g, ' '))) {
              const match = firstCell.match(/(\d+)/);
              if (match) {
                itemNo = `With ${match[1]}`;
                isValidRow = true;
              }
            }

            if (isValidRow && secondCell && thirdCell) {
              // Extract case number
              let caseNo = '';
              const caseLink = $(cells[1]).find('a');
              if (caseLink.length > 0) {
                caseNo = caseLink.text().trim();
              } else {
                // Look for case number patterns
                const casePatterns = [
                  /CRL\.M\.PET\.\s*\d+\/\d+/i,
                  /CRL\.M\.\(BAIL\)\s*\d+\/\d+/i,
                  /C\.W\.\s*\d+\/\d+/i,
                  /C\.Ist\.Appl\s*\d+\/\d+/i,
                  /C\.R\.\s*\d+\/\d+/i,
                  /FIR\s*\d+\/\d+/i
                ];
                
                for (let pattern of casePatterns) {
                  const match = secondCell.match(pattern);
                  if (match) {
                    caseNo = match[0];
                    break;
                  }
                }
                
                if (!caseNo) {
                  caseNo = secondCell.replace(/\s+/g, ' ').trim();
                }
              }

              // Extract case title
              let caseTitle = thirdCell.replace(/\s+/g, ' ').trim();
              
              // Clean up case title - remove extra line breaks and spaces
              caseTitle = caseTitle.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();

              // Validate that we have meaningful data
              if (itemNo && caseNo && caseTitle.length > 3) {
                // Skip header rows and stage description rows
                if (!caseTitle.match(/^(FOR\s+|Name\s+of\s+Advocate|Title\s+of)/i)) {
                  extractedData.push({
                    courtNo: currentCourtNo,
                    itemNo: itemNo,
                    caseNo: caseNo,
                    caseTitle: caseTitle,
                    stage: currentStage
                  });
                }
              }
            }
          }
        });
      }
    });
  });

  // Fallback: If no court sections found, try global parsing
  if (courtSections.length === 0) {
    
    const rows = $('tr');
    let currentCourtNo = 'Unknown';
    let currentStage = 'Unknown';

    rows.each((i, row) => {
      const $row = $(row);
      const rowText = $row.text();
      
      // Check for court number in this row
      const courtMatch = rowText.match(/Court\s+No\s*:\s*(\d+)/i);
      if (courtMatch) {
        currentCourtNo = courtMatch[1];
      }
      
      // Check for stage in this row
      const stageMatch = rowText.match(/FOR\s+[A-Z\s]+(?:WITH\s+[A-Z\/]+)?/i);
      if (stageMatch) {
        currentStage = stageMatch[0].trim();
      }
      
      // Process case rows
      const cells = $row.find('td');
      if (cells.length >= 3) {
        const firstCell = $(cells[0]).text().trim();
        const secondCell = $(cells[1]).text().trim();
        const thirdCell = $(cells[2]).text().trim();
        
        if (/^\d+$/.test(firstCell) && secondCell && thirdCell) {
          extractedData.push({
            courtNo: currentCourtNo,
            itemNo: firstCell,
            caseNo: secondCell,
            caseTitle: thirdCell.replace(/\s+/g, ' ').trim(),
            stage: currentStage
          });
        }
      }
    });
  }

  console.log(`Total extracted cases: ${extractedData.length}`);
  
  // Log summary by court
  const courtSummary = {};
  extractedData.forEach(item => {
    if (!courtSummary[item.courtNo]) {
      courtSummary[item.courtNo] = { count: 0, stages: new Set() };
    }
    courtSummary[item.courtNo].count++;
    courtSummary[item.courtNo].stages.add(item.stage);
  });

  // console.log('Summary by court:');
  // Object.keys(courtSummary).forEach(courtNo => {
  //   console.log(`Court ${courtNo}: ${courtSummary[courtNo].count} cases, Stages: ${Array.from(courtSummary[courtNo].stages).join(', ')}`);
  // });

  return extractedData;
}

module.exports = parseCauselist;