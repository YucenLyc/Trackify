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
  if ( !accessToken || !timestamp ) {
    return false; 
  }
  const millisecondsElapsed = Date.now() - Number(timestamp); 
  return (millisecondsElapsed / 1000) > Number(expiredTime);
}

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