#!/bin/bash

. ./.env

npx nuxt dev --host=$SERVER_HOST --port=$SERVER_PORT
