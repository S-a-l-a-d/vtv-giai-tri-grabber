// @flow

export const grabTitleData = async (titleUrl: string) => {
  return await (await fetch("/api/grabber", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titleUrl })
  })).json();
};
