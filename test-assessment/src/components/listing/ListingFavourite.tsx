

import type { CatItemDto } from '../../types/cat';
export default function ListingItem(item: CatItemDto) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <img src={item.url} alt={`Cat ${item.id}`} className="w-full h-auto rounded-lg mb-2" />
      <h2 className="text-lg font-semibold">{`Cat ID: ${item.id}`}</h2>
    </div>
  )
}