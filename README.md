# typescript_server_skeleton

## Usage

### Starting the app

```bash
docker-compose up
```

### Creating testdata

While the app is running, from this directory:

```bash
docker-compose exec ts-server npm run bootstrap-db
```

## Testing

The command below will spin up the containers, run tests, and shut down.

```bash
docker-compose -f docker-compose.yml -f docker-compose.override-test.yml up --abort-on-container-exit
```

## Sample commands

The following commands will function on a bootstrapped db:

```bash
# Health
curl http://localhost:9001/api/ping

# Create thing
# NOTE: replace categoryId with an id from your bootstrapped db
curl -X 'POST' http://localhost:9001/api/things -H "Content-Type: application/json" -d '{"name":"horse", "categoryId":1}'
```
