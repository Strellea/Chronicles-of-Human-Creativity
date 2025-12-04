// simple helper for Met Museum API
import axios from 'axios';

const BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';

export async function searchObjects(query, departmentIds = []) {
  // returns array of objectIDs
  const url = `${BASE}/search`;
  const params = { q: query || 'painting', hasImages: true };
  if (departmentIds.length) params.departmentId = departmentIds.join(',');
  const { data } = await axios.get(url, { params });
  return data; // { total, objectIDs }
}

export async function getObject(objectID) {
  const { data } = await axios.get(`${BASE}/objects/${objectID}`);
  return data;
}
