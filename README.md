# Ducks Tinder

Ducks Tinder is a Tinder clone project

## Available Scripts

- `nx:build:packages` - builds packages;
- `nx:build:apps` - builds apps;
- `nx:build` - builds apps and packages;
- `nx:lint` - lints all projects;
- `nx:prettier` - checks prettier for all projects;
- `publish-packages` - publish new versions of packages (ci-cd only);
- `remove-redundant-images` - removes old unstable-dev images (ci-cd only);
- `install:webpack` - installs dependencies for temporary unstable webpack behavior (unstable);

## Demo

Check online [demo stand](https://echo419a.ru/ducks-tinder/demo)

Also you can check legacy [vercel deployment](https://ducks-tinder-client.vercel.app/)

### Local demo stands

Install dependencies with:

- `pnpm install:webpack`

Then for each app run:

- `pnpm run demo`

Then check http://localhost:3001 for local root-app demo stand

## Development

Development is a mode to use an external api like [ducks-tinder-server](https://github.com/Stepasha419a/ducks-tinder-server)

Due to [ducks-tinder-server](https://github.com/Stepasha419a/ducks-tinder-server) is still in progress - I recommend using demo stands

Install dependencies with:

- `pnpm install:webpack` to install dependencies

Then for each app run:

- `pnpm run dev`

## Feature-Sliced Design

Frontend implements [Feature-Sliced Design](https://feature-sliced.design/) architectural methodology with some differences:

- `app` layer has more explicit slices like `store`, `styles` etc;
- `pages` layer is collection of standalone pages (f.e. page could have its own lib);
- `widgets` layer is collection of standalone widgets (f.e. widget could have its own lib);
- `features` layer also implement this division;
- `entities` layer is divided by 'main domain' folders;
- `shared` layer has more explicit slices like , `assets`, `api` etc;
