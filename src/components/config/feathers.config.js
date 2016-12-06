function feathers ($feathersProvider, config, dropzoneOpsProvider) {
    $feathersProvider.setEndpoint(config.FEATHERS);
    // You can optionally provide additional opts for socket.io-client
    $feathersProvider.useSocket(true);

    dropzoneOpsProvider.setOptions({
        url : config.FEATHERS + '/uploads',
        maxFilesize : '10'
    });
}
