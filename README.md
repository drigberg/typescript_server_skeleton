# typescript_server_skeleton

## Usage

### Starting the app

```bash
docker-compose up
```

### Creating testdata

While the app is running:

```bash
docker-compose exec app_meet npm run bootstrap-db
```

## Testing

The command below will spin up the containers, run tests, and shut down.

```bash
docker-compose -f docker-compose.yml -f docker-compose.override-test.yml up --abort-on-container-exit
```
