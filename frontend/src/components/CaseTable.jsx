// function CaseTable({ data }) {

//   const getStageColor = (stage) => {
//     const colors = {
//       'Hearing': 'bg-blue-100 text-blue-800 border-blue-200',
//       'Arguments': 'bg-orange-100 text-orange-800 border-orange-200',
//       'Final Order': 'bg-green-100 text-green-800 border-green-200',
//       'Pending': 'bg-gray-100 text-gray-800 border-gray-200',
//     };
//     return colors[stage] || 'bg-gray-100 text-gray-800 border-gray-200';
//   };

//   const getCaseTypeIcon = (caseNo) => {
//     if (caseNo.includes('CRL')) return '⚖️';
//     if (caseNo.includes('CIV')) return '💼';
//     if (caseNo.includes('FAM')) return '👨‍👩‍👧‍👦';
//     return '📄';
//   };

//   return (
//     <div className="mt-8 space-y-6">
//       <div className="flex items-center space-x-3">
//         <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
//           <span className="text-white text-xl">📋</span>
//         </div>
//         <div>
//           <h3 className="text-2xl font-bold text-gray-900">Case Details</h3>
//           <p className="text-gray-600">Found {data.length} cases in the uploaded document</p>
//         </div>
//       </div>

//       {/* Mobile Card View */}
//       <div className="grid gap-4 md:hidden">
//         {data.map((row, index) => (
//           <div key={index} className="bg-white border border-gray-500 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center space-x-2">
//                 <span className="text-lg">{getCaseTypeIcon(row.caseNo)}</span>
//                 <span className="font-semibold text-gray-900">{row.caseNo}</span>
//               </div>
//               <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStageColor(row.stage)}`}>
//                 {row.stage}
//               </span>
//             </div>
//             <h4 className="font-medium text-gray-900 mb-3 line-clamp-2">{row.caseTitle}</h4>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <span className="text-gray-500">Court No:</span>
//                 <p className="font-medium text-gray-900">{row.courtNo}</p>
//               </div>
//               <div>
//                 <span className="text-gray-500">Item No:</span>
//                 <p className="font-medium text-gray-900">{row.itemNo}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Desktop Table View */}
//       <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                   Court & Item
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                   Case Details
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                   Case Title
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                   Stage
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data.map((row, index) => (
//                 <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm">
//                       <div className="font-medium text-gray-900">{row.courtNo}</div>
//                       <div className="text-gray-500">Item #{row.itemNo}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span className="text-lg">{getCaseTypeIcon(row.caseNo)}</span>
//                       <span className="text-sm font-medium text-gray-900">{row.caseNo}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-900 max-w-xs truncate" title={row.caseTitle}>
//                       {row.caseTitle}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStageColor(row.stage)}`}>
//                       {row.stage}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CaseTable;




// function CaseTable({ data }) {

//   const getStageColor = (stage) => {
//     const colors = {
//       'Hearing': 'bg-blue-100 text-blue-800 border-blue-200',
//       'Arguments': 'bg-orange-100 text-orange-800 border-orange-200',
//       'Final Order': 'bg-green-100 text-green-800 border-green-200',
//       'Pending': 'bg-gray-100 text-gray-800 border-gray-200',
//     };
//     return colors[stage] || 'bg-gray-100 text-gray-800 border-gray-200';
//   };

//   const getCaseTypeIcon = (caseNo) => {
//     if (caseNo.includes('CRL')) return '⚖️';
//     if (caseNo.includes('CIV')) return '💼';
//     if (caseNo.includes('FAM')) return '👨‍👩‍👧‍👦';
//     return '📄';
//   };

//   return (
//     <div className="mt-8 space-y-6 w-full max-w-7xl mx-auto px-4">
//       <div className="flex items-center space-x-3">
//         <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
//           <span className="text-white text-xl">📋</span>
//         </div>
//         <div>
//           <h3 className="text-2xl font-bold text-gray-900">Case Details</h3>
//           <p className="text-gray-600">Found {data.length} cases in the uploaded document</p>
//         </div>
//       </div>

//       {/* Mobile Card View */}
//       <div className="grid gap-4 md:hidden">
//         {data.map((row, index) => (
//           <div key={index} className="bg-white border border-gray-500 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center space-x-2">
//                 <span className="text-lg">{getCaseTypeIcon(row.caseNo)}</span>
//                 <span className="font-semibold text-gray-900">{row.caseNo}</span>
//               </div>
//               <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStageColor(row.stage)}`}>
//                 {row.stage}
//               </span>
//             </div>
//             <h4 className="font-medium text-gray-900 mb-3 line-clamp-2">{row.caseTitle}</h4>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <span className="text-gray-500">Court No:</span>
//                 <p className="font-medium text-gray-900">{row.courtNo}</p>
//               </div>
//               <div>
//                 <span className="text-gray-500">Item No:</span>
//                 <p className="font-medium text-gray-900">{row.itemNo}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Desktop Table View */}
//       <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm w-full">
//         <div className="overflow-x-auto">
//           <table className="w-full divide-y divide-gray-200">
//             <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/5">
//                   Court & Item
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/5">
//                   Case Details
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-2/5">
//                   Case Title
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/5">
//                   Stage
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data.map((row, index) => (
//                 <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm">
//                       <div className="font-medium text-gray-900">{row.courtNo}</div>
//                       <div className="text-gray-500">Item #{row.itemNo}</div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="flex items-center space-x-2">
//                       <span className="text-lg">{getCaseTypeIcon(row.caseNo)}</span>
//                       <span className="text-sm font-medium text-gray-900">{row.caseNo}</span>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-900" title={row.caseTitle}>
//                       {row.caseTitle}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStageColor(row.stage)}`}>
//                       {row.stage}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CaseTable;

function CaseTable({ data }) {

  const getStageColor = (stage) => {
    const colors = {
      'Hearing': 'bg-blue-100 text-blue-800 border-blue-200',
      'Arguments': 'bg-orange-100 text-orange-800 border-orange-200',
      'Final Order': 'bg-green-100 text-green-800 border-green-200',
      'Pending': 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[stage] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCaseTypeIcon = (caseNo) => {
    if (caseNo.includes('CRL')) return '⚖️';
    if (caseNo.includes('CIV')) return '💼';
    if (caseNo.includes('FAM')) return '👨‍👩‍👧‍👦';
    return '📄';
  };

  const cleanItemNumber = (itemNo) => {
    if (!itemNo) return itemNo;
    // Remove "with" if it precedes the item number (case insensitive)
    return itemNo.toString().replace(/^with\s+/i, '').trim();
  };

  // Sample data for demo purposes
  const sampleData = data || [
    {
      caseNo: 'CRL/2024/001',
      caseTitle: 'State vs. John Doe - Criminal Appeal regarding theft charges and property damage',
      courtNo: 'Court-15',
      itemNo: '42',
      stage: 'Hearing'
    },
    {
      caseNo: 'CIV/2024/089',
      caseTitle: 'Smith vs. ABC Corporation - Contract dispute over service agreement breach',
      courtNo: 'Court-08',
      itemNo: '156',
      stage: 'Arguments'
    },
    {
      caseNo: 'FAM/2024/023',
      caseTitle: 'Johnson Family vs. State - Child custody and support modification case',
      courtNo: 'Court-03',
      itemNo: '78',
      stage: 'Final Order'
    }
  ];

  const displayData = data || sampleData;

  return (
    <div className="mt-8 space-y-6 w-full max-w-7xl mx-auto px-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
          <span className="text-white text-xl">📋</span>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Case Details</h3>
          <p className="text-gray-600">Found {displayData.length} cases in the uploaded document</p>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="grid gap-4 md:hidden">
        {displayData.map((row, index) => (
          <div key={index} className="bg-white border border-gray-500 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getCaseTypeIcon(row.caseNo)}</span>
                <span className="font-semibold text-gray-900">{row.caseNo}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStageColor(row.stage)}`}>
                {row.stage}
              </span>
            </div>
            <h4 className="font-medium text-gray-900 mb-3 line-clamp-2">{row.caseTitle}</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Court No:</span>
                <p className="font-medium text-gray-900">{row.courtNo}</p>
              </div>
              <div>
                <span className="text-gray-500">Item No:</span>
                <p className="font-medium text-gray-900">{cleanItemNumber(row.itemNo)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm w-full">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/6">
                  Court No
                </th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/6">
                  Item No
                </th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/6">
                  Case Details
                </th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-2/6">
                  Case Title
                </th>
                <th className="px-4 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/6">
                  Stage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{row.courtNo}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{cleanItemNumber(row.itemNo)}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCaseTypeIcon(row.caseNo)}</span>
                      <span className="text-sm font-medium text-gray-900">{row.caseNo}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900" title={row.caseTitle}>
                      {row.caseTitle}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStageColor(row.stage)}`}>
                      {row.stage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CaseTable;