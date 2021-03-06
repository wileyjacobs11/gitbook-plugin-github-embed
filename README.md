[![npm version](https://badge.fury.io/js/gitbook-plugin-github-embed.svg)](https://badge.fury.io/js/gitbook-plugin-github-embed)
[![Build Status](https://travis-ci.org/visallo/gitbook-plugin-github-embed.svg?branch=master)](https://travis-ci.org/visallo/gitbook-plugin-github-embed)

# Usage

```js
{
    plugins: ['github-embed'],
    pluginsConfig: {
        'github-embed': {
            showLink: true, // Optional, defaults to true
            reindent: true // Optional, defaults to true
        }
    }
}
```

# Embed Github Snippets into Gitbooks

Embed snippet text or whole files from Github repos into a GitBook.

    {% github_embed "[github url]", [options] %}{% endgithub_embed %}

Where `[github url]` is:

    https://github.com/[owner]/[repo]/blob/[ref]/[path]#[line numbers]

Will produce something like this given the URL: https://github.com/v5analytics/gitbook-plugin-github-embed/blob/1cd16ac/index.js#L3-L8

```js
website: {
    assets: "./book",
    css: [
        "github-embed.css"
    ]
},
```
[index.js (lines 3–8)](https://github.com/v5analytics/gitbook-plugin-github-embed/blob/master/index.js#L3-L8")


## Examples
    
    // Load latest version of file "tag.js"   
    {% github_embed "https://github.com/v5analytics/gitbook-plugin-github-embed/blob/master/src/tag.js" %}{% endgithub_embed %}

    // Load latest version of file "tag.js" and show line 3
    {% github_embed "https://github.com/v5analytics/gitbook-plugin-github-embed/blob/master/src/tag.js#L3" %}{% endgithub_embed %}

    // Load latest version of file "tag.js" and show lines 1-5   
    {% github_embed "https://github.com/v5analytics/gitbook-plugin-github-embed/blob/master/src/tag.js#L1-L5" %}{% endgithub_embed %}

    // Load specific version of file "tag.js" and show lines 1-5   
    // Press "Y" key in github to switch from master/latest to last commit
    {% github_embed "https://github.com/v5analytics/gitbook-plugin-github-embed/blob/9ef6e532/src/tag.js#L1-L5" %}{% endgithub_embed %}

    // Load full file, but hide interior lines
    {% github_embed "https://github.com/v5analytics/gitbook-plugin-github-embed/blob/9ef6e532/src/tag.js", hideLines=['15-87'] %}{% endgithub_embed %}


## Options

Keywords specified in embedded snippets will override plugin configuration specified in book.js*

* `showLink=true` Show a link below the embedded source back to the source file. Defaults to `true`
    
        {% github_embed "[url]", showLink=false %}{% endgithub_embed %}

* `reindent=true` Re-indent the lines given the line numbers. Defaults to `true`

        {% github_embed "[url]", reindent=false, showLink=false %}{% endgithub_embed %}
        
* `hideLines=[]` Hide interior lines in a snippet. Should be in ascending order, can contain a range as a string.        

        {% github_embed "[url]", hideLines=[2, '4', '7-10'] %}{% endgithub_embed %}

## Styling the Link

Use a gitbook style override to adjust the style of the link. The class is [`.github-embed-caption`](https://github.com/v5analytics/gitbook-plugin-github-embed/blob/master/book/github-embed.css).

## Avoiding Rate Limit Errors

Set an environment variable to avoid rate limits. [Create Token](https://github.com/settings/tokens)

    GITBOOK_EMBED_GITHUB_API_TOKEN=[API Token]
    # or
    GITHUB_API_TOKEN=[API Token]

