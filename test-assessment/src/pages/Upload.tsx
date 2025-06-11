import { useRef, useState } from 'react';
import apiRepository from '@/api/repository';
import { useGlobal } from '@/composables/useGlobal';

export default function Upload() {
  // State to manage file selection, preview, and messages
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  // Use a ref to access the file input element
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file selection and preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) return;
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('sub_id', useGlobal().subId); // Use subId from global state

    try {
        // Reset previous messages and set uploading state
        setUploading(true);
        setMessage(null);

        // Make the API call to upload the image
        await apiRepository.upload.uploadImage(selectedFile);

        // If the upload is successful, reset the state
        setMessage('Cat uploaded successfully!');
        setSelectedFile(null);
        setPreviewUrl(null);
        
        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; 
        }
    } catch (err) {
        console.error(err);
        // If there's an error, set the message accordingly
        setMessage('Upload failed. Try again.');
    } finally {
        // Reset the uploading state
        setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Upload a Cat</h2>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          ref={fileInputRef}
          className="mb-4 w-full text-gray-200 p-3 border-1 border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className={`w-full px-4 py-2 font-semibold rounded ${
            uploading
              ? 'bg-gray-700 cursor-not-allowed'
              : 'bg-orange-600 hover:bg-orange-700'
          } text-white`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>

        {message === 'Cat uploaded successfully!' ? (
            <a href="/listing"
                className="mt-4 block text-center text-orange-500 hover:underline"
                onClick={() => setMessage(null)} // Clear message on click
            >
            View Uploaded Cats
            </a>
        ) : ( null )}

        {message && <p className="mt-4 text-center text-gray-300">{message}</p>}
      </div>
    </div>
  );
}
