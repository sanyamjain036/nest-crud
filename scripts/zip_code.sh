#!/bin/bash 

cd ..

zip -r next-crud.zip . -x "node_modules/*" -x "dist/*" -x ".env"