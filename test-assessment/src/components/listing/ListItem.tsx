import { type FC, useState, useEffect } from "react";
import apiRepository from "@/api/repository";
import type { CatProps } from "@/types/cat";
import type { CatFavouriteButtonState } from "@/types/favourite";
import IconButton from "@/components/buttons/IconButton";

const ListItem: FC<CatProps> = ({ cat, vote, favourite, onUpdate }) => {
  // Local state initialized from props
  const [isFavourite, setIsFavourite] = useState<boolean>(!!favourite);
  const [favouriteId, setFavouriteId] = useState<number | null>(favourite?.id ?? null);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [isTogglingFav, setIsTogglingFav] = useState<boolean>(false);

  // Sync local favourite state if parent props change
  useEffect(() => {
    setIsFavourite(!!favourite);
    setFavouriteId(favourite?.id ?? null);
  }, [favourite]);

  // Define button states
  const favouriteButtonStates: Record<"add" | "remove", CatFavouriteButtonState> = {
    add: {
      icon: "far fa-heart",
      title: `Add ${cat.id} to favourites`,
    },
    remove: {
      icon: "fas fa-heart",
      title: `Remove ${cat.id} from favourites`,
    },
  };

  const currentFavState = isFavourite ? favouriteButtonStates.remove : favouriteButtonStates.add;

  // Handle voting
  const voteOnCat = async (delta: 1 | -1) => {
    setIsVoting(true);
    try {
      const current = vote?.value ?? 0;
      const newValue = current + delta;
      await apiRepository.listing.voteImage(cat.id, newValue);
      await onUpdate();
    } catch (err) {
      console.error("Error voting", err);
    } finally {
      setIsVoting(false);
    }
  };

  // Toggle favourite add/remove
  const toggleFavourite = async () => {
    setIsTogglingFav(true);
    try {
      if (isFavourite && favouriteId) {
        await apiRepository.listing.removeFromFavourites(favouriteId);
      } else {
        const res = await apiRepository.listing.addToFavourites(cat.id);
        setFavouriteId(res.data.id);
      }
      await onUpdate();
    } catch (err) {
      console.error("Error toggling favourite", err);
    } finally {
      setIsTogglingFav(false);
    }
  };

  return (
    <div className="rounded border relative overflow-hidden">
      {/* Cat Image */}
      <img
        src={cat.url}
        alt={`Cat ID ${cat.id}`}
        className="w-full h-auto object-cover"
      />

      {/* Favourite Button */}
      <div className="absolute left-2 top-2">
        <IconButton
          title={currentFavState.title}
          icon={currentFavState.icon}
          onClick={toggleFavourite}
          disabled={isTogglingFav}
        />
      </div>

      {/* Vote Buttons */}
      <div className="absolute right-2 top-2 flex flex-col space-y-2">
        <IconButton
          title={`Vote ${cat.id} up`}
          icon="fas fa-thumbs-up"
          onClick={() => voteOnCat(1)}
          disabled={isVoting}
        />
        <IconButton
          title={`Vote ${cat.id} down`}
          icon="fas fa-thumbs-down"
          onClick={() => voteOnCat(-1)}
          disabled={isVoting}
        />
      </div>

      {/* Vote Score */}
      <div className="p-4">
        <p>
          <strong>Score: </strong>
          {isVoting ? 'Loading...' : vote?.value ?? 0}
        </p>
      </div>
    </div>
  );
};

export default ListItem;
