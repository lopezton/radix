#!/bin/bash

mongoimport --db test --collection users --drop --jsonArray --file ./db/users.json
mongoimport --db test --collection user-applications --drop --jsonArray --file ./db/user-applications.json