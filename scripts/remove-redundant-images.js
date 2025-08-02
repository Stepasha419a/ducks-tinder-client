const DOCKERHUB_USERNAME = process.env.DOCKERHUB_USERNAME;
const DOCKERHUB_PASSWORD = process.env.DOCKERHUB_PASSWORD;
const DOCKERHUB_REPO = process.env.DOCKERHUB_REPO;

const TAG_PREFIX = 'unstable-dev-';
const KEEP_LAST = 10;
const REPO_SCOPE = `repository:${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:pull,push,delete`;

const BASIC_AUTH_HEADER =
  'Basic ' +
  Buffer.from(`${DOCKERHUB_USERNAME}:${DOCKERHUB_PASSWORD}`).toString('base64');

const getHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/json',
});

async function listTags(page = 1) {
  const url = `https://hub.docker.com/v2/repositories/${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}/tags?page=${page}&page_size=100`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`Failed to list tags: ${res.statusText}`);
  }

  const json = await res.json();

  return json;
}

async function deleteTag(tag) {
  const url = `https://hub.docker.com/v2/repositories/${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}/tags/${tag}/`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers,
  });

  if (res.status === 204) {
    console.log(`Deleted tag: ${tag}`);
  } else {
    throw new Error(`Failed to delete tag ${tag}: ${res.statusText}`);
  }
}

async function main() {
  let allTags = [];
  let page = 1;
  let hasNext = true;

  console.log('Fetching tags from DockerHub...');

  while (hasNext) {
    const result = await listTags(page);
    allTags = allTags.concat(result.results);
    hasNext = !!result.next;
    page += 1;
  }

  const unstableTags = allTags
    .filter((tag) => tag.name.startsWith(TAG_PREFIX))
    .sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated));

  const toDelete = unstableTags.slice(KEEP_LAST);

  if (toDelete.length === 0) {
    console.log(`Nothing to delete. ${unstableTags.length} tags found`);
    return;
  }

  console.log(`Deleting ${toDelete.length} old unstable tags...`);

  for (const tag of toDelete) {
    await deleteTag(tag.name);
  }

  console.log('Done');
}

main();
