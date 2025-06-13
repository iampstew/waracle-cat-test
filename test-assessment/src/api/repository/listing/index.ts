import { useGlobal } from "@/composables/useGlobal";
import { baseApi } from "@/api/base";
import type { AxiosResponse } from "axios";
import type { CatItemDto } from "@/types/cat";
import type { CatVoteDto } from "@/types/vote";
import type { CatFavouriteId, CatFavouritesDto } from "@/types/favourite";
const { subId } = useGlobal();

class ListingApi {

    getAllCats(): Promise<AxiosResponse<CatItemDto[]>> {
        return baseApi.get(`/images?limit=20&sub_id=${subId}`);
    }

    addToFavourites(imageId: string): Promise<AxiosResponse<CatFavouriteId>> {
        return baseApi.post<CatFavouriteId>(`/favourites`, {
            image_id: imageId,
            sub_id: subId,
        });
    }

    removeFromFavourites(favouriteId: number): Promise<any> {
        return baseApi.delete(`/favourites/${favouriteId}`);
    }

    getFavourites(): Promise<AxiosResponse<CatFavouritesDto[]>> {
        return baseApi.get(`/favourites?sub_id=${subId}`);
    }

    getVotes(): Promise<AxiosResponse<CatVoteDto[]>> {
        return baseApi.get<CatVoteDto[]>(`/votes?sub_id=${subId}`);
    }

    voteImage(imageId: string, value: number): Promise<AxiosResponse<CatVoteDto>> {
        return baseApi.post<CatVoteDto>('/votes', {
            image_id: imageId,
            sub_id: subId,
            value: value,
        })
    }
}

export default new ListingApi();
