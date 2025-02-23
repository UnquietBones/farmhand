[![Farmhand](public/farmhand-logo-kairi-large.png)](https://www.farmhand.life)

<sub>_Logo art by [Kairi](https://discord.com/channels/714539345050075176/714539345637408793/859622159176302625)_</sub>

[![Current Farmhand version](https://badgen.net/npm/v/@jeremyckahn/farmhand)](https://www.npmjs.com/package/@jeremyckahn/farmhand) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/jeremyckahn/farmhand)

### A farming game by [Jeremy Kahn](https://github.com/jeremyckahn)

**[Play Farmhand in your browser!](https://www.farmhand.life/)**

- `develop`: [![CI](https://github.com/jeremyckahn/farmhand/workflows/CI/badge.svg)](https://github.com/jeremyckahn/farmhand/actions?query=workflow%3ACI) [![Release New Version](https://github.com/jeremyckahn/farmhand/actions/workflows/run-release.yml/badge.svg)](https://github.com/jeremyckahn/farmhand/actions/workflows/run-release.yml)
- All versioned releases available at [unpkg](https://unpkg.com/browse/@jeremyckahn/farmhand/build/)
- [Wiki](https://github.com/jeremyckahn/farmhand/wiki)
- [Data model documentation](https://jeremyckahn.github.io/farmhand/docs/index.html)
- [API deployment logs](https://farmhand.vercel.app/_logs)

Community links:

- Discord link: [![Discord](https://img.shields.io/discord/714539345050075176?label=farmhand)](https://discord.gg/6cHEZ9H)
- Twitter link: [![@farmhandgame](https://badgen.net/twitter/follow/farmhandgame)](https://twitter.com/farmhandgame)
- Reddit link: [![r/FarmhandGame](https://img.shields.io/reddit/subreddit-subscribers/FarmhandGame?style=social)](https://www.reddit.com/r/FarmhandGame/)

Storefront links:

- https://jeremyckahn.itch.io/farmhand
- https://plaza.dsolver.ca/games/farmhand

Farmhand is a resource management game that puts a farm in your hand. It is designed to be both desktop and mobile-friendly and fun for 30 seconds or 30 minutes at a time. Can you build a thriving farming business? Give it a try and find out!

This is an open source project built with web technologies. It is implemented as a [Progressive Web App](https://web.dev/what-are-pwas/), which means it can be played in your web browser or installed onto your device for offline play.

I am working on this entirely solo in my free time and am building it strictly with open source development tools (aside from hardware and operating systems). Farmhand is designed such that it would be fun for anyone that is into resource management and farming games, but ultimately my goal to make the game that I wish existed, the way I wish it existed. And I want to have fun doing it! 🙂

## Current Progress

At this point, the game is completely playable and stable (and worth playing, I think!). However, I would not consider the game "finished," inasmuch as it will never be finished. I plan to work Farmhand as I can for many years to come. Being an open source project, I hope that it will grow and improve organically over time. All that said, it's my goal as a designer and developer to ensure that this game is always stable and playable. It'll only ever get better and have more content over time!

[This GitHub project](https://github.com/jeremyckahn/farmhand/projects/1) is used for tracking and organizing work. If you'd like to suggest a feature or ask a question, please [open a GitHub issue](https://github.com/jeremyckahn/farmhand/issues).

## Versioning system

Farmhand uses a [SemVer](https://semver.org/)-like versioning system. It differs from SemVer because Farmhand is a game and doesn't expose a public API. Rather than the game version being based on an API, it reflects the internal data structure, [`farmhand.state`](https://jeremyckahn.github.io/farmhand/docs/farmhand.html#.state).

- `major`: Is incremented when `farmhand.state` has been changed in a backwards-incompatible way.
  - When these releases are made, automatic migration functionality will keep this transparent to the player.
- `minor`: Is incremented when `farmhand.state` has been changed in a backwards-compatible way.
- `patch`: Is incremented when `farmhand.state` has been not been changed. This also includes gameplay features and bug fixes that do not result in changes to `farmhand.state`.
  - This implies that significant game changes may only result in `patch`-level releases.

## Branch structure

- Active development takes place in `develop`.
- `main` is updated when `develop` is stable.
- `gh-pages` contains the built assets and is updated automatically when `main` is updated.

## Project overview

- This project is built with [Create React App](https://create-react-app.dev/), so please refer to the documentation of that project to learn about the development toolchain.
- Farmhand uses [Piskel](https://www.piskelapp.com/) for the art assets.

## Running locally

Requires:

- Node/NPM
- Docker
- [nvm](https://github.com/nvm-sh/nvm) (or alternatively [asdf](https://asdf-vm.com))

In your shell, run this to ensure you're using the correct Node version and install all of the dependencies:

```sh
nvm i
npm ci
```

If `npm ci` errors out due to PhantomJS installation errors (this has been seen in some WSL/Linux environments), try `npm_config_tmp=/tmp npm ci` instead. [See this related comment](https://github.com/yarnpkg/yarn/issues/1016#issuecomment-283067214). Alternatively, try `npm ci --no-optional`.

To run the game locally with the API and Redis database, run:

```sh
npm run dev
```

Note that you will need a Vercel account and be logged into locally for this to work (at least until [Vercel fixes this](https://github.com/vercel/vercel/discussions/4925)). Alternatively, if you just want to run the front end with no API or backend, you can run:

```sh
npm start
```

In this case, the local app will be using the Production API and database. However you boot, Farmhand will be accessible from http://localhost:3000/.

### Multiplayer system architecture

The system design for Farmhand's multiplayer functionality has been [detailed in this blog post](https://dev.to/jeremyckahn/how-i-designed-an-abuse-resistant-fault-tolerant-zero-cost-multiplayer-online-game-140g).

### CI/CD

Automation is done with [GitHub Actions](.github/workflows). All changes are tested and built upon Git push. Merges to `main` automatically deploy to Production (the `gh-pages` branch) upon a successful test run and build.

### Releasing updates

Use this GitHub Action to deploy a new version of Farmhand: [![Release New Version](https://github.com/jeremyckahn/farmhand/actions/workflows/run-release.yml/badge.svg)](https://github.com/jeremyckahn/farmhand/actions/workflows/run-release.yml)

As an authenticated repo owner or collaborator, click "Run workflow" and enter the argument to be passed to [`npm version`](https://docs.npmjs.com/cli/v7/commands/npm-version) and press the green "Run workflow". For updates that do not change [`farmhand.state`](https://jeremyckahn.github.io/farmhand/docs/farmhand.html#.state) (which is most of them), use the default `patch` version. This workflow will deploy Farmhand to:

- https://www.farmhand.life/
- https://jeremyckahn.github.io/farmhand/
- https://jeremyckahn.itch.io/farmhand
- https://www.npmjs.com/package/@jeremyckahn/farmhand
  - Playable from https://unpkg.com/browse/@jeremyckahn/farmhand/build/

The process will take about 3-4 minutes to complete and it will notify the Discord server's `#updates` channel. It is customary to explain what you just shipped in the `#updates` channel as well.

## Feature flags

Farmhand supports feature flags for code that should only be enabled in specific environments. To create a feature flag, add a line that looks like this in the relevant `.env` file:

```
REACT_APP_ENABLE_[FEATURE_NAME]=true
```

Where `[FEATURE_NAME]` is replaced with the name of your feature. So, adding this to `.env.development.local`:

```
REACT_APP_ENABLE_MINING=true
```

Would enable the `MINING` feature only for the local development environment. You can access the enabled feature flags at runtime by `import`ing the `features` Object from [`config.js`](https://github.com/jeremyckahn/farmhand/blob/develop/src/config.js). See [Adding Custom Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) for more information on how to use environment variables.

In addition to enabling features via environment variables, players can manually enable them in the browser (such as for beta testing). This can be done by manually constructing a URL query parameter that looks like `?enable_[FEATURE_NAME]=true`. For example, to enable the `MINING` feature, players could use the URL https://www.farmhand.life?enable_MINING=true.

## License

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode).
