
module.exports = function urlMatcher(url) {
    const regexPrefix = '^https?://github\\.com/([^\/]+)/([^\/]+)';
    const path = '(.+?(?:\\.([^#.]+))?)';
    const lines = '(?:[#]L(\\d+)(?:-L(\\d+))?)?$';
    const regex = middle => {
        const r = `${regexPrefix}${middle || ''}${path}${lines}`;
        return new RegExp(r, 'i');
    }

    const types = [
        {   // =>                             /blob/... /
            // https://github.com/:owner/:repo/blob/:ref/:path
            // https://github.com/:owner/:repo/blob/:ref/:path#L12
            // https://github.com/:owner/:repo/blob/:ref/:path#L12-14
            regex: regex('/blob/([^\/]+)/'),
            transform: function(match) {
                return {
                    request: {
                        owner: match[1],
                        repo: match[2],
                        ref: match[3],
                        path: match[4]
                    },
                    extension: match[5] || '',
                    lines: [match[6], match[7]]
                }
            }
        }
    ]

    for (var i = 0; i < types.length; i++) {
        const type = types[i];
        const match = url.match(type.regex)
        if (match) {
            return type.transform(match)
        }
    }

    throw Error('Invalid url match for github_embed: ' + url)
}

