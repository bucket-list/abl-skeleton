function feathers ($feathersProvider, config) {
    $feathersProvider.setEndpoint(config.FEATHERS);
    // You can optionally provide additional opts for socket.io-client
    $feathersProvider.useSocket(true);
}
