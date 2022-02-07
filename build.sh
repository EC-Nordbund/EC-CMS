yarn
cd netlify-cms
git pull
git checkout master
# Applie patches

git config --global user.email "app@ec-nordbund.de"
git config --global user.name "Developer"
git config pull.rebase true

git am ../patches/cms/0001-add-custom-client.patch
git am ../patches/cms/0002-remove-auto-init.patch
git am ../patches/cms/0003-remove-not-needed-backends-locales.patch
git am ../patches/cms/0005-remove-not-needed-backends.patch
git am ../patches/cms/0006-remove-create-react-class.patch
git am ../patches/cms/0007-remove-not-needed-Widgets.patch
# Install deps
yarn
# yarn bootsrap #?
# Build
cd packages
cd netlify-cms-app
yarn build:esm
cd ../netlify-cms-core
yarn build:esm
cd ../netlify-cms-locales
yarn build:esm
cd ../netlify-cms-backend-git-gateway
yarn build:esm
cd ../netlify-cms-lib-widgets
yarn build:esm
cd ../netlify-cms-lib-util
yarn build:esm
cd ../netlify-cms-ui-default
yarn build:esm
cd ../netlify-cms-backend-github
yarn build:esm
cd ../netlify-cms-lib-auth
yarn build:esm
cd ../netlify-cms-widget-string
yarn build:esm
cd ../netlify-cms-widget-number
yarn build:esm
cd ../netlify-cms-widget-text
yarn build:esm
cd ../netlify-cms-widget-image
yarn build:esm
cd ../netlify-cms-widget-file
yarn build:esm
cd ../netlify-cms-widget-select
yarn build:esm
cd ../netlify-cms-widget-markdown
yarn build:esm
cd ../netlify-cms-widget-list
yarn build:esm
cd ../netlify-cms-widget-object
yarn build:esm
cd ../netlify-cms-widget-relation
yarn build:esm
cd ../netlify-cms-widget-boolean
yarn build:esm
cd ../netlify-cms-widget-map
yarn build:esm
cd ../netlify-cms-widget-datetime
yarn build:esm
cd ../netlify-cms-editor-component-image
yarn build:esm
cd ../netlify-cms
yarn build
cd ../../..
yarn rollup -c
ls dist
