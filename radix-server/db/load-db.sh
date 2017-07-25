#!/bin/bash

mongoimport --db test --collection users --drop --jsonArray --file users.json
mongoimport --db test --collection user_applications --drop --jsonArray --file user-applications.json