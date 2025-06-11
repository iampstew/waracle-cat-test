

import type { CatItemDto } from '../../types/cat';
import ListItemFavourite from './ListItemFavourite';
import ListItemVoting from './ListItemVoting';
export default function ListItem(item: CatItemDto) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <img src={item.url} alt={`Cat ${item.id}`} className="w-full h-auto rounded-lg mb-2" />
      <div className="flex items-center justify-between">
        <ListItemFavourite {...item} />
        <ListItemVoting {...item} />
      </div>
    </div>
  )
}