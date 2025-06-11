import { useEffect, useState } from 'react';
import type { CatItemDto } from '../../types/cat';
import apiRepository from '@/api/repository';

interface Props extends CatItemDto {}

export default function ListItemFavourite(item: Props) {
  const [favouriteId, setFavouriteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkFavourite = async () => {
    try {
      const res = await apiRepository.listing.addToFavourites(item.id);
      const match = res.data.find((fav: any) => fav.image_id === item.id);
      if (match) {
        setFavouriteId(match.id);
      }
    } catch (err) {
      console.error('Failed to check favourites', err);
    }
  };

  useEffect(() => {
    checkFavourite();
  }, [item.id]);

  const toggleFavourite = async () => {
    setLoading(true);
    try {
      if (favouriteId) {
        await apiRepository.listing.removeFromFavourites({ id: favouriteId });
        setFavouriteId(null);
      } else {
        const res = await apiRepository.listing.addToFavourites(item.id);
        setFavouriteId(res.data.id);
      }
    } catch (err) {
      console.error('Failed to toggle favourite', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavourite}
      disabled={loading}
      className={`px-4 py-1 text-sm rounded ${
        favouriteId
          ? 'bg-red-600 text-white hover:bg-red-700'
          : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
      }`}
    >
      {favouriteId ? '★ Remove from Favourites' : '☆ Add to Favourites'}
    </button>
  );
}
