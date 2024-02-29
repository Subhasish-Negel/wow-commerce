export const TokenValidator = () => {
  const tokenCookie = (
    document.cookie.split("; ").find((row) => row.startsWith("jwtoken")) || ""
  ).split("=")[1];
  const token = decodeURIComponent(tokenCookie);
  return token;
};
