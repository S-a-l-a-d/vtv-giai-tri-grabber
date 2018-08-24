const nodeFetch = require("node-fetch");
const fetch = require("fetch-cookie/node-fetch")(nodeFetch);

/**
 *
 * Remove Vietnamese diacritics from a string.
 *
 * @param {string} str A string whose diacritics will be removed.
 *
 * @returns {string} A string with diacritics removed.
 */

const transliterate = str => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");

  return str;
};

/**
 *
 * Gets the titles from VTV Giai Tri from `page` to the end.
 *
 * @param {string} genre A title genre.
 * @param {number} page A start page number.
 *
 * @returns {[]} An array of titles.
 */

const fetchTitles = async (genre, page) => {
  const responseBodies = [];
  const firstResponseBody = await (await fetch(
    `https://www.vtvgiaitri.vn/api/v1/title/genre/${genre}?page=${page}`
  )).json();
  let currentPage = firstResponseBody.data.pagination.currentPage + 1;

  // Need to send requests one by one as sending multiple requests at once will
  // trigger the anti-DDoS system of the API server.
  while (currentPage <= firstResponseBody.data.pagination.totalPages) {
    responseBodies.push(
      await (await fetch(
        `https://www.vtvgiaitri.vn/api/v1/title/genre/${genre}?page=${currentPage}`
      )).json()
    );

    currentPage++;
  }

  return firstResponseBody.data.titles.concat(
    ...responseBodies.map(responseBody => responseBody.data.titles)
  );
};

/**
 *
 * Gets the titles from VTV Giai Tri from `page` to the end
 * sorted alphabetically by name.
 *
 * @param {string} genre A title genre.
 * @param {number} page A start page number.
 *
 * @returns {[]} An array of titles sorted by name.
 */

const getSortedTitles = async (genre, page) => {
  const titles = await fetchTitles(genre, page);

  return titles.sort((currentTitle, nextTitle) => {
    const currentTitleName = transliterate(currentTitle.title);
    const nextTitleName = transliterate(nextTitle.title);

    if (currentTitleName < nextTitleName) return -1;
    if (currentTitleName > nextTitleName) return 1;

    return 0;
  });
};

exports.helpers = {
  transliterate,
  fetchTitles,
  getSortedTitles
};
