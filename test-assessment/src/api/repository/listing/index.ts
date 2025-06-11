import { useGlobal } from "@/composables/useGlobal";
import { baseApi } from "@/api/base";
import type { AddFavouriteViewModel, FavouriteViewModel } from "@/types/favourites";

class ListingApi {
    // This method is used to get a list of cat images.
    getAllCats(): Promise<any> {
        return baseApi.get(`/images?limit=20&api_key=${useGlobal().apiKey}&sub_id=${useGlobal().subId}`);
    }

    // This method is used to get a specific cat image by its ID.
    addToFavourites(imageId: string): Promise<any> {
        return baseApi.post<AddFavouriteViewModel>(`/favourites`, {
            image_id: imageId,
            sub_id: useGlobal().subId
        });
    }

    // This method is used to remove a favourite image from the user's favourites list.
    removeFromFavourites(favourite: FavouriteViewModel): Promise<any> {
        return baseApi.delete(`/favourites/${favourite.id}`);
    }

    // This method is used to get the user's favourite images.
    getVotesForImage(): Promise<any> {
        return baseApi.get(`/votes?&sub_id=${useGlobal().subId}`);
    }

    // This method is used to get the user's favourite images.
    upVoteImage(imageId: string): Promise<any> {
        return baseApi.post(`/votes`, {
            image_id: imageId,
            value: 1
        });
    }      
    
    // This method is used to get the user's favourite images.
    downVoteImage(imageId: string): Promise<any> {
        return baseApi.post(`/votes`, {
            image_id: imageId,
            value: -1
        });
    }   
}


export default new ListingApi();