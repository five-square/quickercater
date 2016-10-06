const cookieAPI = {};

/**
 * Gets a particular cookie value from client's cookie string
 *  example cookie string: 'key1=value&key2=otherValue'
 *   getCookie('key1') // => 'value'
 *   getCookie('key2') // => 'otherValue'
 *
 * @param  {string} [key] - get value of this cookie key
 * @param  {string} [cookies] - document.cookie
 * @return {string} [cookieVal] - value of cookie at key
 */
cookieAPI.getCookie = (key, cookies = document.cookie) => {
  if (cookies === '') return '';
  const startIndex = cookies.indexOf(key) + key.length + 1;
  const correctStart = cookies.substring(startIndex);
  const endIndex = correctStart.indexOf('&') === -1
    ? cookies.length
    : correctStart.indexOf('&');
  return cookies.substring(startIndex, endIndex);
};

export default cookieAPI;
