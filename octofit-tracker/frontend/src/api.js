const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const host = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const API_BASE_URL = `${host}/api`;

export const buildApiUrl = (resource) => `${API_BASE_URL}/${resource}/`;

export const fetchResource = async (resource) => {
  const url = buildApiUrl(resource);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}: ${response.status}`);
  }
  const data = await response.json();
  return data?.data || data || [];
};
