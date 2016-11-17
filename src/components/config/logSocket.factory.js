function logSocket (socketFactory, config) {
  const myIoSocket = io.connect(config.LOG_URL);

  const logSocket = socketFactory({
    ioSocket: myIoSocket
  });

  return logSocket;
}
