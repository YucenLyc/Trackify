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

const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const accessToken = urlParams.get('access_token');
  const refreshToken = urlParams.get('refresh_token');

  return accessToken;

}

export const accessToken = getAccessToken();