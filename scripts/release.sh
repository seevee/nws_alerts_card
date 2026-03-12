#!/usr/bin/env bash
set -euo pipefail

DRY_RUN=false
PRERELEASE=""
BUMP=""

# -------------------------
# Parse args
# -------------------------

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --alpha | --beta | --rc)
      PRERELEASE="${1#--}"
      shift
      ;;
    major | minor | patch)
      BUMP="$1"
      shift
      ;;
    *)
      echo "Unknown argument: $1"
      exit 1
      ;;
  esac
done

echo "Release pipeline starting"
echo "Dry run: $DRY_RUN"
echo "Prerelease: ${PRERELEASE:-none}"

# -------------------------
# Preflight
# -------------------------

if [ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]; then
  echo "Must run from main"
  exit 1
fi

git fetch origin

if ! git diff --quiet; then
  echo "Working tree not clean"
  exit 1
fi

if ! git diff --quiet main origin/main; then
  echo "Local main not synced with origin/main"
  exit 1
fi

npm run lint
npm run test

# -------------------------
# Determine bump
# -------------------------

if [ -z "$BUMP" ]; then
  BUMP=$(npx conventional-recommended-bump -p angular | jq -r '.releaseType')
fi

CURRENT=$(node -p "require('./package.json').version")

# -------------------------
# Compute version
# -------------------------

if [ -n "$PRERELEASE" ]; then

  BASE=$(npx semver "$CURRENT" -i "$BUMP")

  EXISTING=$(git tag -l "v$BASE-$PRERELEASE.*" | wc -l | tr -d ' ')

  NEXT=$((EXISTING + 1))

  VERSION="$BASE-$PRERELEASE.$NEXT"

else

  VERSION=$(npx semver "$CURRENT" -i "$BUMP")

fi

echo "Current version: $CURRENT"
echo "Next version: $VERSION"

BRANCH="release/v$VERSION"

# -------------------------
# Dry-run preview
# -------------------------

if [ "$DRY_RUN" = true ]; then

  echo ""
  echo "---- CHANGELOG PREVIEW ----"

  git cliff \
    --config .cliff.toml \
    --tag "v$VERSION" \
    --unreleased \
    --strip header

  echo "---------------------------"
  echo "Dry run complete"
  exit 0

fi

# -------------------------
# Create branch
# -------------------------

git checkout -b "$BRANCH"

# -------------------------
# Update version
# -------------------------

npm version "$VERSION" --no-git-tag-version

# -------------------------
# Generate changelog
# -------------------------

git cliff --config .cliff.toml --tag "v$VERSION" --output CHANGELOG.md

git add CHANGELOG.md package.json package-lock.json

# -------------------------
# Build
# -------------------------

npm run build

git add dist

git commit -m "chore: release v$VERSION"

git push -u origin "$BRANCH"

# -------------------------
# Create PR
# -------------------------

NOTES=$(git cliff \
  --config .cliff.toml \
  --tag "v$VERSION" \
  --unreleased \
  --strip header)

gh pr create \
  --title "chore: release v$VERSION" \
  --body "$NOTES" \
  --base main \
  --head "$BRANCH"

echo ""
echo "PR created for v$VERSION"
echo ""
echo "After merge run:"
echo "scripts/publish.sh $VERSION"
