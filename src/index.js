import matter from 'gray-matter';
import fetch from 'node-fetch';
import core from '@actions/core';
import * as git from '@actions/github';
import {promises as fs} from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

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

    if(tags.length > 4){
        tags.length = 4;
    }

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
        
        const vault = require("node-vault")({
            apiVersion: "v1",
            endpoint: endpoint,
            namespace: 'admin'
        });

        const login = await vault.approleLogin({
            role_id: roleID,
            secret_id: secretID
        });

        vault.token = login.auth.client_token;

        let aerospike = await vault.read("blog-publish/data/aerospike");
        let pubID = aerospike.data.data.pub_id;
        let orgID = aerospike.data.data.org_id;

        const exists = async (path) => {
            try {
                await fs.access(path);
                let file = await fs.readFile(path, 'utf8');           
                let article = matter(file);

                let author = await vault.read(`blog-publish/data/${article.data.authors}`);
                let medToken = author.data.data.medium_key;
                let devToken = author.data.data.devto_key;

                let title = article.data.title;
                let slug = article.data.slug;
                let tags = article.data.tags;
                let content = article.content;

                mediumPost(medToken, pubID, content, title, slug, tags);
                devPost(devToken, orgID, content, title, slug, tags);
            }
            catch{
                console.log('File does not exist');
            }
        }
        for(let i = 0; i < mdFiles.length; i++){
            exists(`./${mdFiles[i].filename}`);   
        }
    }
    catch(error){
        core.setFailed(error.message);
    }
}
main();
