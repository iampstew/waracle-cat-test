import type { CatVoteDto } from "@/types/vote";
import type { CatFavouritesDto } from "./favourite";

export interface CatItemDto {
    id: string; 
    url: string;
    width: number;
    height: number;
}

export interface FavoriteWidgetProps {
    imageId: string
    subId?: string
}

export interface CatProps {
  cat: CatItemDto;
  vote?: CatVoteDto;
  favourite?: CatFavouritesDto;
  onUpdate: Function;
}