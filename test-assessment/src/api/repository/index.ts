// This file serves as a central point to export all API repositories.

import UploadApi from '@/api/repository/upload';
import ListingApi from '@/api/repository/listing';

const apiRepository = {
    upload: UploadApi, // UploadApi handles file uploads and related operations
    listing: ListingApi, // ListingApi manages the listing of uploaded files and their details
}

export default apiRepository;

