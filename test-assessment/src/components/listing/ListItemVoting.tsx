import { useEffect, useState } from 'react';
import type { CatItemDto } from '@/types/cat';
import apiRepository from '@/api/repository';

interface Props extends CatItemDto {}

export default function ListItemVoting(item: Props) {
  const [score, setScore] = useState<number>(0);
  const [loading, setLoading] = useState(false);


  const fetchVotes = async () => {
    try {
      const res = await apiRepository.listing.getVotesForImage();
      const votesForImage = res.data.filter((vote: any) => vote.image_id === item.id);
      setScore(votesForImage.reduce((acc: number, vote: any) => acc + vote.value, 0));
    } catch (err) {
      console.error('Failed to fetch votes', err);
    }
  };

  const upVoteImage = async () => {
    setLoading(true);
    try {
      await apiRepository.listing.upVoteImage(item.id);
      setScore((prev) => prev + 1);
    } catch (err) {
      console.error('Failed to upvote', err);
    } finally {
      setLoading(false);
    }
  }

   const downVoteImage = async () => {
    setLoading(true);
    try {
      await apiRepository.listing.downVoteImage(item.id);
      setScore((prev) => prev - 1);
    } catch (err) {
      console.error('Failed to upvote', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVotes();
  }, [item.id]);

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-600">Score: {score}</span>
      <button
        onClick={() => upVoteImage()}
        disabled={loading}
        className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 text-white text-sm"
      >
        👍
      </button>
      <button
        onClick={() => downVoteImage()}
        disabled={loading}
        className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
      >
        👎
      </button>
    </div>
  );
}
