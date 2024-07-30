# Query Server

# Environment Variables

```python
PORT = <numeric string> (default: "8000")
DATA_URL = <string> (default: "https://microsoftedge.github.io/Demos/json-dummy-data/256KB.json")

```

# Running locally

```sh
# make .env file
cp .env.example .env

# install the dependencies
yarn

# run dev server with ts-node
yarn dev

```

# Building for production

```sh
# make a build output to ./dist
yarn build

# start the production build server
yarn start
```

# Endpoints

`GET /data`

```ts
# Query Parameters

sortBy - string
order - "asc" | "desc"
limit - integer
offset - integer
case_insensitive - boolean
<any_field> - string // match any field with a value
```
