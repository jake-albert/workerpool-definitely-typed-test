# workerpool-definitely-typed-test

For now, we are just focused on the `maxQueueSize` option, which is not supported in 
`@types/workerpool@6.4.1`.

## Usage

```bash
$ yarn install
$ yarn start -t <totalJobs> -w <maxWorkers> -q <maxQueueSize>
```

> NOTE: You can invoke a queue overflow when `totalJobs` > `maxWorkers` + `maxQueueSize`
