import { mediumPost } from './medium.js';
import { devPost } from './devto.js';
import core from '@actions/core';
import * as git from '@actions/github';
import matter from 'gray-matter';
import { promises as fs } from 'fs';
import fetch from "node-fetch";

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
    
    return(response);
}

const devPost = async (authToken, orgID, content, title, slug) => {
    const article = {
        "title": title,
        "body_markdown": content,
        "canonical_url": `https://developer.aerospike.com/blog/${slug}`,
        "publishStatus": false,
        "organization_id": orgID
    }
    const myInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': authToken,
        },
        body: JSON.stringify(article)
    }

    const response = await fetch('https://dev.to/api/articles', myInit);

    return(response);
}
    
const loadFiles = async (github) => {
    const { owner, repo } = git.context.repo;
    const commit = await github.request('GET /repos/{owner}/{repo}/commits/{ref}', {
        owner,
        repo,
        ref: git.context.sha,
    }).data;
    const mdRegex = new RegExp(`blog\/.*\.md`);
    const mdFiles = commit.files.filter((f) => mdRegex.test(f.filename));
    return mdFiles;
}

const main = async () => {
    try{
        const ghToken = core.getInput('gh_token', {required: true});
        const pubID = core.getInput('med_pub_id', {required: true});
        const orgID = core.getInput('dev_org_id', {required: true});

        const github = new git.getOctokit(ghToken);
        const context = git.context;
        const { owner, repo } = context.repo;
        
        const mdFiles = await loadFiles();
        
        if(mdFiles.length === 0){
            console.log('no files to process');
            return 0;
        }

        for(let i = 0; i < mdFiles.length; i++){
            let file = await fs.readFileSync(`./${mdFiles[i].filename}`, 'utf8');
            
            let article = matter(file);
            let secretMed = `${(article.data.authors).toUpperCase().split('-').join('_')}_MED`;
            let secretDev = `${(article.data.authors).toUpperCase().split('-').join('_')}_DEV`;
            let title = article.data.title;
            let slug = article.data.slug;
            let tags = article.data.tags;
            let content = article.content;

            const medToken = await github.rest.actions.getRepoSecret({
                owner,
                repo,
                secretMed,
            });

            const devToken = await github.rest.actions.getRepoSecret({
                owner,
                repo,
                secretDev,
            });

            mediumPost(medToken, pubID, content, title, slug, tags);
            devPost(devToken, orgID, content, title, slug);
        }
    }
    catch(error){
        core.setFailed(error.message);
    }
}
main();
