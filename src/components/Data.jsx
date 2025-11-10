import { useState, useEffect } from "react";

const spotifyClientId = "redacted";
const spotifyClientSecret = "redacted";

const useNewReleases = (endpoint, limit) => {
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
    fetch(`https://api.spotify.com/v1/${endpoint}?limit=${limit}`, {
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
        let products;
        if (endpoint.includes("new-releases")) {
          products = data.albums.items.map((album) => {
            return {
              id: album.id,
              image: album.images[0].url,
              album: album.name,
              artist: album.artists[0].name,
            };
          });
        } else if (endpoint.includes("playlists")) {
          products = data.tracks.items.slice(0, limit).map((item) => {
            return {
              id: item.track.album.id,
              image: item.track.album.images[0].url,
              album: item.track.album.name,
              artist: item.track.album.artists[0].name,
            };
          });
        } else {
          throw new Error("An error occurred");
        }
        setProducts(products);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [spotifyAccessToken, endpoint, limit]);

  return { products, error, loading };
};

export { useNewReleases };
