export interface CatAddFavouriteViewModel {
    image_id : string
    sub_id: string
}

export interface CatFavouritesDto {
    id : number,
    image_id : string
    sub_id: string
    created_at: string
    image:{
        id: string,
        url:string
    }
}

export interface CatFavouriteButtonState {
    icon: string,
    title: string
}

export interface CatFavouriteId {
    id: number
}
