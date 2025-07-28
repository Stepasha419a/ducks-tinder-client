const DOCKERHUB_USERNAME = process.env.DOCKERHUB_USERNAME;
const DOCKERHUB_REPO = process.env.DOCKERHUB_REPO;
const DOCKERHUB_TOKEN = process.env.DOCKERHUB_TOKEN;

const TAG_PREFIX = 'unstable-dev-';
const KEEP_LAST = 10;

const headers = {
  Authorization: `Basic ${Buffer.from(
    `${DOCKERHUB_USERNAME}:${DOCKERHUB_TOKEN}`
  ).toString('base64')}`,
  Accept: 'application/json',
};

async function listTags(page = 1) {
  const url = `https://hub.docker.com/v2/repositories/${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}/tags?page=${page}&page_size=100`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`Failed to list tags: ${res.statusText}`);
  }

  const json = await res.json();

  return json;
}
