const VTV_GIAI_TRI_URL = "https://www.vtvgiaitri.vn";
const VTV_GIAI_TRI_API_PATH = "/api/v1";
const TITLE_URL_PATTERN = /https?:\/\/www.vtvgiaitri.vn\/title\/[\d\w-]+/;
const TITLE_ID_PATTERN = /"title-info-wrap"\sid="(?<id>\d+)"/;
const ENCRYPTION_KEY_PATTERN = /sleng_(?<encryptionKey>.+)\.m3u8/;

exports.constants = {
  VTV_GIAI_TRI_URL,
  VTV_GIAI_TRI_API_PATH,
  TITLE_URL_PATTERN,
  TITLE_ID_PATTERN,
  ENCRYPTION_KEY_PATTERN
};
