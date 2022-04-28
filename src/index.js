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
        const pubID = core.getInput('med_pub_id', {required: true});
        const orgID = core.getInput('dev_org_id', {required: true});

        const github = git.getOctokit(ghToken);
        
        const mdFiles = await loadFiles(github);
        
        if(mdFiles.length === 0){
            console.log('no files to process');
            return 0;
        }

        for(let i = 0; i < mdFiles.length; i++){
            fs.access(`./${mdFiles[i].filename}`, (err) => {
                if(err){
                    console.log('File does not exist');
                }
                else{
                    let file = await fs.readFile(`./${mdFiles[i].filename}`, 'utf8');           
                    let article = matter(file);
                    let secretMed = `${(article.data.authors).toUpperCase().split('-').join('_')}_MED`;
                    let secretDev = `${(article.data.authors).toUpperCase().split('-').join('_')}_DEV`;
                    let title = article.data.title;
                    let slug = article.data.slug;
                    let tags = article.data.tags;
                    let content = article.content;
                    let medToken = process.env[secretMed];
                    let devToken = process.env[secretDev];
        
                    mediumPost(medToken, pubID, content, title, slug, tags);
                    devPost(devToken, orgID, content, title, slug, tags);
                }
            })
        }
    }
    catch(error){
        core.setFailed(error.message);
    }
}
main();
