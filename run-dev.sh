#!/bin/bash

. ./.env

npx nuxt dev --host=localhost --port=$SERVER_PORT
