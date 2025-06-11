import { useGlobal } from "@/composables/useGlobal";
import { baseApi } from "@/api/base";

class UploadApi {
    uploadImage = (file: File) : Promise<File> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('sub_id', useGlobal().subId); 

        return baseApi.post('/images/upload', formData,  {
            headers: {
            'x-api-key': useGlobal().apiKey,
            'Content-Type': 'multipart/form-data',
            },
        })
    }; 
}


export default new UploadApi();