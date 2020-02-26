function fnAsyncTest (callback) {

  shopifysync(
    'upload',
    {
      target: 'development',
      files: [ 'assets/bundle.js' ]
    },
    function () {

      console.log('saved dev files to host')

    }
  )

  cb()

}

function fnSyncTest () {

  for (var i = 0; i < 10; i++) {}

}

function killProcess () {

  if (process.exitTimeoutId) {

    return

  }

  process.exitTimeoutId = setTimeout(() => process.exit, 5000)
  console.log('process will exit in 5 seconds')

  fnAsyncTest(function () {

    console.log('async op. done', arguments)

  })

  if (!fnSyncTest()) {

    console.log('sync op. done')

  }

}

// https://nodejs.org/api/process.html#process_signal_events
process.on('SIGTERM', killProcess)
process.on('SIGINT', killProcess)

process.on('uncaughtException', function (e) {

  console.log('[uncaughtException] app will be terminated: ', e.stack)

  killProcess()
  /**
   * @https://nodejs.org/api/process.html#process_event_uncaughtexception
   *
   * 'uncaughtException' should be used to perform synchronous cleanup before shutting down the process.
   * It is not safe to resume normal operation after 'uncaughtException'.
   * If you do use it, restart your application after every unhandled exception!
   *
   * You have been warned.
   */

})

console.log('App is running...')
console.log('Try to press CTRL+C or SIGNAL the process with PID: ', process.pid)

process.stdin.resume()
// just for testing
