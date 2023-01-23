import axios from 'axios';
//MAP FOR LOCAL STORAGE KEYS:
const LOCALSTORAGE_KEYS = {
  accessToken: 'spotify_acess_token',
  refreshToken: 'spotify_refresh_token',
  expiredTime: 'spotify_token_expire_time',
  timestamp: 'spotify_token_timestamp'
}

//MAP TO RETRIEVE LOCALSTORAGE VALUES:
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expiredTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expiredTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp)
}
/**
 * Checks if the amount of time that has elapsed between the timestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
  const { accessToken, timestamp, expiredTime } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp) {
    return false;
  }
  const millisecondsElapsed = Date.now() - Number(timestamp);
  return (millisecondsElapsed / 1000) > Number(expiredTime);
};

/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
export const logout = () => {
  // Clear all localStorage items
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  // Navigate to homepage
  window.location = window.location.origin;
};

const refreshToken = async () => {
  try {
    //logout if there is no refresh token stored or somehow we ended up with an infinte reloading loop
    if (!LOCALSTORAGE_VALUES.refreshToken || LOCALSTORAGE_VALUES.refreshToken === 'undefined' || (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000) {
      console.error('no refresh token available');
      logout();
    }

    //use /refresh_token endpoint from Node app: 
    const { data } = await axios.get(`/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`)

    //update localstorage values: 
    window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

    //Reload the page so localstorage update will be reflected 
    window.location.reload();
  } catch (event) {
    console.error(event);
  }
};

/**
 * Handles logic for retrieving the Spotify access token from localStorage
 * or URL query params
 * @returns {string} A Spotify access token
 */
const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
    [LOCALSTORAGE_KEYS.expiredTime]: urlParams.get('expires_in'),
  }
  const hasError = urlParams.get('error');

  if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
    refreshToken();
  }
  // If there is a valid access token in localStorage, use that
  if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.access !== 'undefined') {
    return LOCALSTORAGE_VALUES.accessToken;
  }
  // If there is a token in the URL query params, user is logging in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    //store the query params in localstorage 
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property])
    }
    //set timestamp 
    window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
    //return access_token from query params 
    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }
  return false

}

export const accessToken = getAccessToken();

//specify config defaults that will be applied to every request.
axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

export const getCurrentUserProfile = () => axios.get('/me');

export const getCurrentUserPlaylists = (limit = 15) => {
  return axios.get(`/me/playlists?/limit=${limit}`);
};

export const getTopArtists = (time_range = 'short_term') => {
  return axios.get(`/me/top/artists?time_range=${time_range}`);
};

export const getTopTracks = (time_range = 'short_term') => {
  return axios.get(`/me/top/tracks?time_range=${time_range}`);
}

export const getPlaylistById = playlist_id => {
  return axios.get(`/playlists/${playlist_id}`);
}