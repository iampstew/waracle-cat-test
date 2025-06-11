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