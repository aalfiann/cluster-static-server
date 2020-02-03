// all this config is required
const config_master = {

    // x_token header authentication for master API
    x_token: '12345678',

    // x_token header authentication for node API
    node_x_token: '87654321',

    // set origin for master server
    // Origin is the full base url of master server.
    // You can change this origin with domain name like http://yourdomain.com
    origin: 'http://localhost:3000', // without trailing slash

    // set this master server port
    masterPort: 3000,

    // node server list
    nodeServer: [ // you can add more node server
        { upstream:'http://localhost:3001', prefix:'/ns1', http2: false }
    ],

    // Limit upload size
    limitSize: (50 * 1024 * 1024), // 50Mb

    // Block upload to spesific node destination. 
    blockNode: [], // Ex. ['/ns2','/ns3'] means the file will not upload to /n2 and /ns3.

    // Use Worker / CPU Cluster
    useWorker: true,

    // Print the log
    logger: true
    
}

module.exports = config_master;