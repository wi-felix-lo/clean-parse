#!/bin/bash

rm -rf public/lib
bower install
grunt build
