#!/bin/bash

bundle exec jekyll serve --trace

if [[ "$?" != "0" ]]; then
  echo "Please run"
  echo "gem install bundler jekyll"
  echo "bundle install"
fi
