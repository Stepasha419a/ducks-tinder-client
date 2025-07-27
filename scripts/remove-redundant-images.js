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
