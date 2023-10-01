export function getYoutubeId(url: string) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=))([a-zA-Z0-9_-]+)/
  );

  if (match && match[1]) {
    return match[1];
  } else {
    return "";
  }
}

/*
This regular expression will match URLs in the following formats:
https://youtu.be/hJ7Rg1821Q0
https://www.youtube.com/watch?v=hJ7Rg1821Q0
https://www.youtube.com/embed/hJ7Rg1821Q0
https://www.youtube.com/v/hJ7Rg1821Q0
https://www.youtube.com/watch?feature=player_embedded&v=hJ7Rg1821Q0
It should cover most common YouTube URL formats.
*/
