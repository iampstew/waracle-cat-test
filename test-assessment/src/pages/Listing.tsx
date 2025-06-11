import { useEffect, useState } from "react";
import apiRepository from "@/api/repository";
import ListingItem from "@/components/listing/ListingItem";
import type { CatItemDto } from "@/types/cat";

export default function Listing() {
  const [catImages, setCatImages] = useState<CatItemDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAllCats = async () => {
    try {
      setLoading(true);
      setError(null); // Reset previous error
      const res = await apiRepository.listing.getAllCats();
      if (res.data.length === 0) {
        setError("No cats have been uploaded yet.");
      }
      setCatImages(res.data);
    } catch (error) {
      console.error("Failed to fetch cats:", error);
      setError("No cats have been uploaded yet.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCats();
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold">Cat listing</h1>
      {loading ? (
        <div className="text-gray-400 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mt-4"></div>
          <p className="mt-2">Loading...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 mt-4 rounded-md">
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {catImages.map((cat: CatItemDto) => (
            <ListingItem key={cat.id} {...cat} />
          ))}
        </div>
      )}
    </div>
  );
}
