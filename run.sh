#! /bin/sh
./node_modules/.bin/parcel build index.html
cp test.php ./dist/test.php
cd dist
php -S localhost:8000