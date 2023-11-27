#!/bin/sh

static_files_dir="/static-files"

rm -rf $static_files_dir/* &&
	cp -pr /app/public/* $static_files_dir &&
	chmod 755 $static_files_dir -R &&
	cd /app/server &&
	node ./index.mjs
