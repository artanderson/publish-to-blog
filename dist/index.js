import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ({

/***/ 300:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("buffer");

/***/ }),

/***/ 254:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:buffer");

/***/ }),

/***/ 561:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs");

/***/ }),

/***/ 849:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:http");

/***/ }),

/***/ 286:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:https");

/***/ }),

/***/ 503:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:net");

/***/ }),

/***/ 411:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:path");

/***/ }),

/***/ 742:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:process");

/***/ }),

/***/ 492:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:stream");

/***/ }),

/***/ 477:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:stream/web");

/***/ }),

/***/ 41:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:url");

/***/ }),

/***/ 261:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:util");

/***/ }),

/***/ 628:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:zlib");

/***/ }),

/***/ 267:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("worker_threads");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/******/ // expose the modules object (__webpack_modules__)
/******/ __nccwpck_require__.m = __webpack_modules__;
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__nccwpck_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/ensure chunk */
/******/ (() => {
/******/ 	__nccwpck_require__.f = {};
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__nccwpck_require__.e = (chunkId) => {
/******/ 		return Promise.all(Object.keys(__nccwpck_require__.f).reduce((promises, key) => {
/******/ 			__nccwpck_require__.f[key](chunkId, promises);
/******/ 			return promises;
/******/ 		}, []));
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/get javascript chunk filename */
/******/ (() => {
/******/ 	// This function allow to reference async chunks
/******/ 	__nccwpck_require__.u = (chunkId) => {
/******/ 		// return url for filenames based on template
/******/ 		return "" + chunkId + ".index.js";
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__nccwpck_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/******/ /* webpack/runtime/import chunk loading */
/******/ (() => {
/******/ 	// no baseURI
/******/ 	
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		179: 0
/******/ 	};
/******/ 	
/******/ 	var installChunk = (data) => {
/******/ 		var {ids, modules, runtime} = data;
/******/ 		// add "modules" to the modules object,
/******/ 		// then flag all "ids" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0;
/******/ 		for(moduleId in modules) {
/******/ 			if(__nccwpck_require__.o(modules, moduleId)) {
/******/ 				__nccwpck_require__.m[moduleId] = modules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(runtime) runtime(__nccwpck_require__);
/******/ 		for(;i < ids.length; i++) {
/******/ 			chunkId = ids[i];
/******/ 			if(__nccwpck_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				installedChunks[chunkId][0]();
/******/ 			}
/******/ 			installedChunks[ids[i]] = 0;
/******/ 		}
/******/ 	
/******/ 	}
/******/ 	
/******/ 	__nccwpck_require__.f.j = (chunkId, promises) => {
/******/ 			// import() chunk loading for javascript
/******/ 			var installedChunkData = __nccwpck_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 			if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 	
/******/ 				// a Promise means "currently loading".
/******/ 				if(installedChunkData) {
/******/ 					promises.push(installedChunkData[1]);
/******/ 				} else {
/******/ 					if(true) { // all chunks have JS
/******/ 						// setup Promise in chunk cache
/******/ 						var promise = import("./" + __nccwpck_require__.u(chunkId)).then(installChunk, (e) => {
/******/ 							if(installedChunks[chunkId] !== 0) installedChunks[chunkId] = undefined;
/******/ 							throw e;
/******/ 						});
/******/ 						var promise = Promise.race([promise, new Promise((resolve) => (installedChunkData = installedChunks[chunkId] = [resolve]))])
/******/ 						promises.push(installedChunkData[1] = promise);
/******/ 					} else installedChunks[chunkId] = 0;
/******/ 				}
/******/ 			}
/******/ 	};
/******/ 	
/******/ 	// no external install chunk
/******/ 	
/******/ 	// no on chunks loaded
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

;// CONCATENATED MODULE: external "module"
const external_module_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("module");
;// CONCATENATED MODULE: ./src/index.js

const src_require = (0,external_module_namespaceObject.createRequire)("file:///Users/arthuranderson/Documents/workflows/publish-to-blog/src/index.js");

const matter = src_require('gray-matter');
const fetch = __nccwpck_require__.e(/* import() */ 589).then(__nccwpck_require__.bind(__nccwpck_require__, 589));
const core = src_require('@actions/core');
const git = src_require('@actions/github');
const fs = src_require('fs');
const vault = src_require('node-vault')({
    apiVersion: "v1",
    endpoint: endpoint,
});

const mediumPost = async (authToken, pubID, content, title, slug, tags) => {
    const article = {
        "title": title,
        "contentFormat": "markdown",
        "content": content,
        "canonicalUrl": `https://developer.aerospike.com/blog/${slug}`,
        "publishStatus": "draft",
        "tags": tags
    }
    const myInit = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        body: JSON.stringify(article)
    }

    const response = await fetch(`https://api.medium.com/v1/publications/${pubID}/posts`, myInit);
    const data = await response.json();
    console.log(data);
}

const devPost = async (authToken, orgID, content, title, slug, tags) => {
    
    const published = await fetch('https://dev.to/api/articles/me/all?per_page=1000', {method: 'GET', headers: {'api-key': authToken}});
    const articles = await published.json();

    let idx = articles.findIndex(article => article.title === title);
    let artID = idx === -1 ? idx : articles[idx].id;

    tags = tags.map(tag => (tag.split(' ').join('')));

    const article = {
        "title": title,
        "body_markdown": content,
        "canonical_url": `https://developer.aerospike.com/blog/${slug}`,
        "tags": tags,
        "published": false,
        "organization_id": orgID
    }
    const myInit = {
        method: artID === -1 ? 'POST' : 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'api-key': authToken,
        },
        body: JSON.stringify({article: article})
    }

    const response = await fetch(`https://dev.to/api/articles${artID === -1 ? '' : `/${artID}`}`, myInit);
    const data = await response.json();
    console.log(data);
}
    
const loadFiles = async (github) => {
    const { owner, repo } = git.context.repo;
    const commit = (
        await github.request('GET /repos/{owner}/{repo}/commits/{ref}', {
            owner,
            repo,
            ref: git.context.sha,
        })
    ).data;
    const mdRegex = new RegExp(`blog\/.*\.md`);
    const mdFiles = commit.files.filter((f) => mdRegex.test(f.filename));
    return mdFiles;
}

const main = async () => {
    try{
        const ghToken = core.getInput('gh_token', {required: true});
        const roleID = core.getInput('role_id', {required: true});
        const secretID = core.getInput('secret_id', {required: true});
        const endpoint = core.getInput('endpoint', {required: true});

        const github = git.getOctokit(ghToken);
        
        const mdFiles = await loadFiles(github);
        
        if(mdFiles.length === 0){
            console.log('no files to process');
            return 0;
        }

        const login = await vault.approleLogin({
            role_id: roleID,
            secret_id: secretID
        });

        vault.token = login.auth.client_token;

        let { aerospike } = await vault.read("blog-publish/data/aerospike");
                    let pubID = aerospike.pub-id;
                    let orgID = aerospike.org-id;

        for(let i = 0; i < mdFiles.length; i++){
            let fileExists = true;
            await fs.promises.access(`./${mdFiles[i].filename}`, (err) => {
                if(err){
                    console.log('File does not exist');
                    fileExists = false;
                }
            });
            if(fileExists){
                let file = await fs.promises.readFile(`./${mdFiles[i].filename}`, 'utf8');           
                let article = matter(file);

                let { author } = await vault.read(`blog-publish/data/${article.data.authors}`);
                let medToken = author.medium-key;
                let devToken = author.devto.key;

                let title = article.data.title;
                let slug = article.data.slug;
                let tags = article.data.tags;
                let content = article.content;

                mediumPost(medToken, pubID, content, title, slug, tags);
                devPost(devToken, orgID, content, title, slug, tags);
            }
        }
    }
    catch(error){
        core.setFailed(error.message);
    }
}
main();
})();

