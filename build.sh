yarn
cd netlify-cms
git pull
git checkout master
# Applie patches
git am ../patches/cms/0001-add-custom-client.patch
git am ../patches/cms/0002-remove-auto-init.patch
git am ../patches/cms/0003-remove-not-needed-backends-locales.patch
git am ../patches/cms/0004-remove-not-needed-Widgets.patch
git am ../patches/cms/0005-remove-not-needed-backends.patch
# Install deps
yarn
# yarn bootsrap #?
# Build
yarn build:esm
cd packages/netlify-cms
yarn build
cd ../../..
yarn rollup -c
