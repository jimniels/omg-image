export default function getDomainFromUrl(url) {
  const parsedUrl = new URL(url);
  return parsedUrl.hostname;
}
