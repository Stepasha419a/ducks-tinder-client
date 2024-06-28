# Ducks Tinder

Ducks Tinder is a Tinder clone project

## Available Scripts

- `npm run dev` - runs the app in the development mode (default port is 3000);
- `npm run demo` - runs the app in the development mode with mocks (default port is 3000);
- `npm run build` - builds the app;
- `npm run preview` - previews the builded app before (default port is 3000);
- `npm run prettier` - runs prettier check;
- `npm run prettier:fix` - runs prettier check with fix;
- `npm run lint` - runs eslint;
- `npm run lint:fix` - runs eslint with fix;
- `npm run storybook` - runs storybook in the development mode (default port is 6006);
- `npm run storybook:test` - runs storybook tests (run `npm run storybook` in the background for testing);

## Demo

You can check online demo on [vercel deployment](https://ducks-tinder-client.vercel.app/) or run it by yourself using npm run demo

- `npm i` to install dependencies
- `npm run demo` to run the app in the development mode with mocks (default port is 3000);

## Development

- `npm i` to install dependencies<br/>

  in progress...

## Feature-Sliced Design

Frontend implements [Feature-Sliced Design](https://feature-sliced.design/) architectural methodology with some differences:

- `app` layer has more explicit slices like `store`, `styles` etc;
- `pages` layer is collection of standalone pages (f.e. page could have its own lib);
- `widgets` layer is collection of standalone widgets (f.e. widget could have its own lib);
- `features` layer also implement this division;
- `entities` layer is divided by 'main domain' folders;
- `shared` layer has more explicit slices like , `assets`, `api` etc;
