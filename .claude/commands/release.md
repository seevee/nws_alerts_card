Perform a release for this project. Follow every step in order.

## 1. Preflight

- Confirm you are on `main` and it is clean (`git status` shows no changes).
- Run `npm run lint` and `npm run test` — abort if either fails.

## 2. Determine version bump

Examine commits since the last git tag using conventional commit prefixes:
- Any `feat:` → **minor**
- Only `fix:`, `docs:`, `chore:`, etc. → **patch**
- Any commit containing `BREAKING CHANGE` or `!:` → **major**

If an argument is provided (e.g. `/release patch`), use that as the bump type instead of inferring.

Argument: $ARGUMENTS

## 3. Create release branch

Create and check out `release/vX.Y.Z` from `main`.

## 4. Update CHANGELOG.md

- Read the current CHANGELOG.md.
- Add a new section at the top (below the `# Changelog` heading) for the new version and today's date.
- Categorize changes using: **Added**, **Changed**, **Fixed**, **Removed** (omit empty categories).
- Write concise, user-facing descriptions (not raw commit messages).
- Add a reference link at the bottom of the file matching the existing format.

## 5. Update README.md

Read README.md and update any option descriptions, defaults, or behavior notes that are affected by the changes in this release. Only edit what is factually out of date — do not rewrite unrelated sections.

## 6. Bump version

Run `npm version <major|minor|patch> --no-git-tag-version` to update package.json.

## 7. Build

Run `npm run build` and verify it succeeds.

## 8. Commit and push

- Stage all changed files (CHANGELOG.md, README.md, package.json, package-lock.json, dist/).
- Create a single commit: `chore: release vX.Y.Z`
- Push the release branch to origin.

## 9. Open PR

Create a PR from `release/vX.Y.Z` → `main` with:
- Title: `chore: release vX.Y.Z`
- Body: the changelog entry for this version

Then **stop and ask the user to review and merge the PR**.

## 10. Tag and create GitHub release

Only proceed after the user confirms the PR is merged.

- Pull `main` to get the squash-merged commit.
- Create git tag `vX.Y.Z` on `main`.
- Push the tag to origin.
- Run `gh release create vX.Y.Z --title "vX.Y.Z" --notes "<changelog entry>"`.

The release workflow will automatically build and attach the JS artifact.
