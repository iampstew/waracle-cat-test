export interface VoteDto {
  id: number;             // Unique vote ID
  image_id: string;       // ID of the image that was voted on
  sub_id?: string;        // Optional sub ID (user/session)
  created_at: string;     // ISO timestamp
  value: number;          // 1 for upvote, 0 for downvote
  country_code?: string;  // Optional country info
}
