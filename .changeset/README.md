# Changesets

Every PR that changes the package needs a changeset - it becomes the CHANGELOG entry:

```sh
pnpm changeset        # pick bump type (patch/minor/major) and write a description
pnpm changeset --empty  # for PRs that don't need a release (docs, CI, devDependencies)
```

Releases are created by the `.github/workflows/release.yml` workflow (it runs CI first):

- automatically on the 1st and 15th of each month,
- manually via _Actions → Release → Run workflow_ (tick _Dry run_ to only preview the version and release notes).

Runtime `dependencies` bumps (e.g. from Renovate) get a changeset generated at release time
by `scripts/changeset-deps.mjs`; `devDependencies` bumps never trigger a release.
