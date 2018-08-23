const nodeFetch = require("node-fetch");
const fetch = require("fetch-cookie/node-fetch")(nodeFetch);

/**
 *
 * Returns a new string with diacritics removed.
 *
 * @param {string} str
 *
 * @returns {string}
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
 * @param {string} genre
 * @param {[]} result
 * @param {number} page
 *
 * @returns {[]}
 */

const fetchTitles = async (genre, result, page) => {
  const responseData = await (await fetch(
    `https://www.vtvgiaitri.vn/api/v1/title/genre/${genre}?page=${page}`
  )).json();

  if (page < responseData.data.pagination.totalPages) {
    return [
      ...result,
      ...responseData.data.titles,
      ...(await fetchTitles(genre, result, page + 1))
    ];
  }

  return [...result, ...responseData.data.titles];
};

/**
 *
 * Gets the titles from VTV Giai Tri from `page` to the end sorted alphabetically by names.
 *
 * @param {string} genre
 * @param {number} page
 *
 * @returns {[]}
 */

const getSortedTitles = async (genre, page) => {
  const result = [];
  const titles = await fetchTitles(genre, result, page);

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
