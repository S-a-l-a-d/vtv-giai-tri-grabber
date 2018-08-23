const API_PATH = process.env.API_PATH;
const VTV_GIAI_TRI_URL = "https://www.vtvgiaitri.vn";
const VTV_GIAI_TRI_API_PATH = "/api/v1";
const TITLE_URL_PATTERN = /https?:\/\/www.vtvgiaitri.vn\/title\/[\d\w-]+/;
const TITLE_ID_PATTERN = /"title-info-wrap"\sid="(?<id>\d+)"/;
const ENCRYPTION_KEY_PATTERN = /sleng_(?<encryptionKey>.+)\.m3u8/;
const GENRE = {
  PHIM: "phim",
  TV_SHOW: "tv-show"
};
const DATA_UPDATE_ALLOWED_IPS = process.env.DATA_UPDATE_ALLOWED_IPS.split(",");
const HTTP_STATUS_CODE = {
  OK: 200,
  NO_CONTENT: 204,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500
};

exports.constants = {
  API_PATH,
  VTV_GIAI_TRI_URL,
  VTV_GIAI_TRI_API_PATH,
  TITLE_URL_PATTERN,
  TITLE_ID_PATTERN,
  ENCRYPTION_KEY_PATTERN,
  GENRE,
  DATA_UPDATE_ALLOWED_IPS,
  HTTP_STATUS_CODE
};
