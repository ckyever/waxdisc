import { useState, useEffect } from "react";

const spotifyClientId = "70a9a1201abc47e286e590a11eb013d9";
const spotifyClientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

const useProducts = (endpoint, limit = 1, offset = 0) => {
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(null);

  console.log(spotifyClientSecret);

  // First get access token
  useEffect(() => {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${spotifyClientId}&client_secret=${spotifyClientSecret}`,
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        setSpotifyAccessToken(data.access_token);
      })
      .catch((error) => setError(error));
  }, []);

  // Then fetch our products (albums)
  useEffect(() => {
    if (!spotifyAccessToken) return;

    let url;
    if (endpoint.includes("new-releases") || endpoint.includes("playlists")) {
      url = `https://api.spotify.com/v1/${endpoint}?limit=${limit}&offset=${offset}`;
    } else if (endpoint.includes("albums")) {
      url = `https://api.spotify.com/v1/${endpoint}`;
    } else {
      throw new Error("An error occurred");
    }

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((data) => {
        let totalResults;
        let products;
        if (endpoint.includes("new-releases")) {
          totalResults = data.albums.total;
          products = data.albums.items.map((album) => {
            return {
              id: album.id,
              image: album.images[0].url,
              album: album.name,
              artist: album.artists[0].name,
            };
          });
        } else if (endpoint.includes("playlists")) {
          totalResults = data.total;
          products = data.items.map((item) => {
            return {
              id: item.track.album.id,
              image: item.track.album.images[1].url,
              album: item.track.album.name,
              artist: item.track.album.artists[0].name,
            };
          });
        } else if (endpoint.includes("albums")) {
          totalResults = 1;
          products = [
            {
              id: data.id,
              image: data.images[0].url,
              album: data.name,
              artist: data.artists[0].name,
              label: data.label,
              releaseDate: data.release_date,
              tracks: data.tracks.items.map((track) => {
                return {
                  trackNumber: track.track_number,
                  trackName: track.name,
                };
              }),
            },
          ];
        } else {
          throw new Error("An error occurred");
        }
        setTotalResults(totalResults);
        setProducts(products);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [spotifyAccessToken, endpoint, limit, offset]);

  return { totalResults, products, error, loading };
};

export { useProducts };
