import { type FC, useEffect, useState } from "react";
import apiRepository from "@/api/repository";
import ListItem from "@/components/listing/ListItem";
import type { CatItemDto } from "@/types/cat";
import type { CatFavouritesDto } from "@/types/favourite";
import type { CatVoteDto } from "@/types/vote";

const Listing: FC = () => {
  const [cats, setCats] = useState<CatItemDto[]>([]);
  const [votes, setVotes] = useState<CatVoteDto[]>([]);
  const [favourites, setFavourites] = useState<CatFavouritesDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const init = async () => {
    setLoading(true);
    setError(null);
    await loadData();
  };

  const loadData = async () => {
     try {
      const [catsRes, votesRes, favsRes] = await Promise.all([
        apiRepository.listing.getAllCats(),
        apiRepository.listing.getVotes(),
        apiRepository.listing.getFavourites(),
      ]);

      setCats(catsRes.data);
      setVotes(votesRes.data);
      setFavourites(favsRes.data);
    } catch (e: any) {
      console.error("Error loading data", e);
      setError("Failed to load cat data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  const checkVotesById = (imageId: string) =>
    votes.find((vote) => vote.image_id === imageId);

  const checkFavouriteById = (imageId: string) =>
    favourites.find((fav) => fav.image_id === imageId);

  useEffect(() => {
    init();
  }, []);

  if (loading) {
    return <div>Loading cats...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-4">Cat Listing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cats.map((cat) => {
          const vote = checkVotesById(cat.id);
          const favourite = checkFavouriteById(cat.id);

          return (
            <ListItem
              key={cat.id}
              cat={cat}
              vote={vote}
              favourite={favourite}
              onUpdate={loadData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Listing;
