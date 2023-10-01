export default async function getLikes(id: string) {
  const apiKey = process.env.YOTUBE_API_KEY;
  const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const likesCount: number = data.items[0].statistics.likeCount;
  return likesCount;
}
