const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const codespaceBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : null;

export const API_BASE_URL = codespaceBase || '/api';
export const buildApiUrl = (resource) => `${API_BASE_URL}/${resource}/`;


const fetchJson = async (url) => {
  console.log('fetchResource: requesting url', url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  const data = await response.json();
  console.log('fetchResource: raw response', data);
  const result = data?.data || data || [];
  console.log('fetchResource: returned value', result);
  return result;
};

export const fetchResource = async (resource) => {
  const primaryUrl = buildApiUrl(resource);
  const fallbackUrl = `/api/${resource}/`;

  try {
    return await fetchJson(primaryUrl);
  } catch (primaryError) {
    if (primaryUrl !== fallbackUrl) {
      console.warn('fetchResource: primary URL failed, falling back to', fallbackUrl, primaryError);
      return await fetchJson(fallbackUrl);
    }
    throw primaryError;
  }
};
