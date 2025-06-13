import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRepository from '@/api/repository';
import { useGlobal } from '@/composables/useGlobal';
import Button from '@/components/buttons/Button';

export default function Upload() {
  
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('sub_id', useGlobal().subId);

    try {
        setUploading(true);
        setMessage(null);
        await apiRepository.upload.uploadImage(selectedFile);
        navigate('/');
    } catch (err) {
        console.error(err);
        setMessage('Upload failed. Try again.');
    } finally {
        setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-3">Upload a Cat</h2>

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <div className="flex flex-row">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          ref={fileInputRef}
          className="me-4 w-full text-gray-700 p-2 border-1 border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />

        <Button 
          title={uploading ? 'Uploading...' : 'Upload'}
          disabled={!selectedFile || uploading}
          onClick={handleUpload}
        />
      </div>

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
  );
}
