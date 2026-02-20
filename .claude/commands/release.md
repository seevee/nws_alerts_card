Perform a release for this project. Follow every step in order.

## 1. Determine version bump

Examine commits since the last git tag using conventional commit prefixes:
- Any `feat:` → **minor**
- Only `fix:`, `docs:`, `chore:`, etc. → **patch**
- Any commit containing `BREAKING CHANGE` or `!:` → **major**

If an argument is provided (e.g. `/release patch`), use that as the bump type instead of inferring.

Argument: $ARGUMENTS

## 2. Update CHANGELOG.md

- Read the current CHANGELOG.md.
- Add a new section at the top (below the `# Changelog` heading) for the new version and today's date.
- Categorize changes using: **Added**, **Changed**, **Fixed**, **Removed** (omit empty categories).
- Write concise, user-facing descriptions (not raw commit messages).
- Add a reference link at the bottom of the file matching the existing format.

## 3. Update README.md

Read README.md and update any option descriptions, defaults, or behavior notes that are affected by the changes in this release. Only edit what is factually out of date — do not rewrite unrelated sections.

## 4. Bump version

Run `npm version <major|minor|patch> --no-git-tag-version` to update package.json.

## 5. Build

Run `npm run build` and verify it succeeds.

## 6. Commit, tag, and push

- Stage all changed files (CHANGELOG.md, README.md, package.json, package-lock.json, dist/).
- Create a single commit: `chore: release vX.Y.Z`
- Create git tag `vX.Y.Z`.
- Push commits and tag to origin.

## 7. Create GitHub release

Use `gh release create` with:
- Title: `vX.Y.Z`
- Notes: the changelog entry for this version (the content under the new `## [vX.Y.Z]` heading).

The release workflow will automatically build and attach the JS artifact.
