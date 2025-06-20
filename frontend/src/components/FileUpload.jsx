// // src/components/FileUpload.jsx
// import { useState } from 'react';
// import { uploadFile } from '../api/uploadApi';
// import CaseTable from './CaseTable';

// function FileUpload() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [caseData, setCaseData] = useState([]);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setMessage('');
//     setCaseData([]);

//     if (selectedFile) {
//       console.log('File selected:', {
//         name: selectedFile.name,
//         type: selectedFile.type,
//         size: selectedFile.size,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       setMessage('Please select a file');
//       return;
//     }

//     if (file.type !== 'text/html') {
//       setMessage('Please upload a valid HTML file');
//       return;
//     }

//     setIsLoading(true);
//     setMessage('Uploading file...');

//     try {
//       const response = await uploadFile(file);
//       setMessage(response.message);
//       setCaseData(response.data || []);

//       if (response.data?.length === 0) {
//         setMessage(
//           'File processed but no case data found. Please check HTML structure.'
//         );
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       setMessage(typeof error === 'string' ? error : 'Upload failed. Please try again.');
//       setCaseData([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl w-full mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-blue-800">📂 Upload Causelist</h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">Select HTML File</label>
//           <input
//             type="file"
//             accept=".html"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition duration-150"
//           />
//           {file && (
//             <p className="mt-2 text-sm text-gray-500 italic">
//               Selected: <span className="font-medium">{file.name}</span> ({(file.size / 1024).toFixed(2)} KB)
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={isLoading || !file}
//           className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
//         >
//           {isLoading ? '⏳ Processing...' : '📤 Upload and Process'}
//         </button>
//       </form>

//       {message && (
//         <div
//           className={`mt-6 p-4 rounded-lg text-center border ${
//             message.includes('successfully') || message.includes('processed')
//               ? 'bg-green-50 text-green-700 border-green-300'
//               : 'bg-red-50 text-red-700 border-red-300'
//           }`}
//         >
//           {message}
//         </div>
//       )}

//       {caseData.length > 0 && <CaseTable data={caseData} />}
//     </div>
//   );
// }

// export default FileUpload;




//v2
import { useState } from 'react';
import { uploadFile } from '../api/uploadApi';
import CaseTable from './CaseTable';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [caseData, setCaseData] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
    setMessage('');
    setCaseData([]);

    if (selectedFile) {
      console.log('File selected:', {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file');
      return;
    }

    if (file.type !== 'text/html') {
      setMessage('Please upload a valid HTML file');
      return;
    }

    setIsLoading(true);
    setMessage('Processing your file...');

    try {
      const response = await uploadFile(file);
      setMessage(response.message);
      setCaseData(response.data || []);

      if (response.data?.length === 0) {
        setMessage('File processed but no case data found. Please check HTML structure.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage(typeof error === 'string' ? error : 'Upload failed. Please try again.');
      setCaseData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <span className="text-white text-3xl">📤</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Causelist Processor</h1>
          <p className="text-gray-600 text-lg">Upload your HTML causelist to extract and organize case details</p>
        </div>

        {/* Upload Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="p-8">
            <div className="space-y-6">
              {/* Drag & Drop Area */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
                  isDragOver
                    ? 'border-blue-400 bg-blue-50'
                    : file
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
              >
                <input
                  type="file"
                  accept=".html"
                  onChange={(e) => handleFileChange(e.target.files[0])}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="space-y-4">
                  {file ? (
                    <div className="text-6xl">✅</div>
                  ) : (
                    <div className="text-6xl">📤</div>
                  )}
                  
                  {file ? (
                    <div>
                      <p className="text-lg font-medium text-green-700">File Selected</p>
                      <p className="text-green-600 font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {(file.size / 1024).toFixed(2)} KB • {file.type}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        Drop your HTML file here or click to browse
                      </p>
                      <p className="text-gray-500">Supports HTML files only</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading || !file}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                  isLoading || !file
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Document...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-lg">📤</span>
                    <span>Process Causelist</span>
                  </div>
                )}
              </button>
            </div>

            {/* Status Message */}
            {message && (
              <div className={`mt-6 p-4 rounded-xl border flex items-start space-x-3 ${
                message.includes('successfully') || message.includes('processed')
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <span className="text-xl mt-0.5 flex-shrink-0">
                  {message.includes('successfully') || message.includes('processed') ? '✅' : '❌'}
                </span>
                <p className="font-medium">{message}</p>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {caseData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <CaseTable data={caseData} />
          </div>
        )}
      </div>
    </div>
  );
}


export default FileUpload;
