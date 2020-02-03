// all this config is required
const config_node = {

    // x_token header authentication for node API
    x_token: '87654321',

    // set node prefix name for this node server
    nodePrefixName: '/ns1', // without trailing slash but leading slash is required

    // set node port for this node server
    nodePort: 3001,
    
    // set directory path location for static file 
    staticDirPath: 'public', // without leading and trailing slash

    // Use Worker / CPU Cluster
    useWorker: true,

    // Print the log
    logger: true,
    
    // Below here is config for Header file
    // See this documentation >> https://www.npmjs.com/package/send#acceptranges
    acceptRanges:true,
    cacheControl:true,
    dotfiles:'ignore',
    etag:true,
    extensions:false,
    immutable: true,
    lastModified:true,
    maxAge: (3600*24*365*1000), // 1 year in miliseconds
    
    // Config for permission upload file
    limitSize: (50 * 1024 * 1024), // 50Mb
    allowMime: [ // to allow all use wildcard (*)
        'image/bmp',
        'image/gif',
        'image/png',
        'image/jpeg',
        'image/x-icon',
        'image/svg+xml',
        'image/tiff',
        'image/webp',
        'image/vnd.microsoft.icon',
        'text/plain',
        'text/css',
        'text/csv',
        'text/javascript',
        'text/xml',
        'application/x-abiword',
        'application/x-bzip',
        'application/x-bzip2',
        'application/x-freearc',
        'application/json',
        'application/ld+json',
        'application/epub+zip',
        'application/gzip',
        'application/msword',
        'application/pdf',
        'application/rtf',
        'application/vnd.ms-fontobject',
        'application/vnd.ms-excel',
        'application/vnd.ms-powerpoint',
        'application/vnd.oasis.opendocument.presentation',
        'application/vnd.oasis.opendocument.spreadsheet',
        'application/vnd.oasis.opendocument.text',
        'application/vnd.visio',
        'application/zip',
        'application/xml',
        'application/x-rar-compressed',
        'font/otf',
        'font/ttf',
        'font/woff',
        'font/woff2'
    ]
}

module.exports = config_node;