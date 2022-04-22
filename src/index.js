import { mediumPost } from './medium.js';
import core from '@actions/core';
import * as git from '@actions/github';
import matter from 'gray-matter';
import { promises as fs } from fs;

const loadFiles = async (github) => {
    const { owner, repo } = git.context.repo;
    const commit = await github.request('GET /repos/{owner}/{repo}/commits/{ref}', {
        owner,
        repo,
        ref: git.context.sha,
    }).data;
    const mdRegex = new RegExp(`blog\/.*\.md`);
    const mdFiles = commit.files.filter((f) => mdRegex.test(f.filename));
    if(mdFiles.length === 0){
        core.setFailed('No files found');
    }
    return mdFiles;
}

const main = async () => {
    try{
        const ghToken = core.getInput('gh_token', {required: true});
        const pubID = core.getInput('med_pub_id', {required: true});

        const github = new git.getOctokit(ghToken);
        const context = git.context;
        const { owner, repo } = context.repo;
        let secret;

        const medToken = await github.rest.actions.getRepoSecret({
            owner,
            repo,
            secret,
        });
        const mdFiles = await loadFiles();
        for(let i = 0; i < mdFiles.length; i++){
            let file = await fs.readFileSync(`./${mdFiles[i].filename}`, 'utf8');
            
            let article = matter(file);
            let title = article.data.title;
            let slug = article.data.slug;
            let tags = article.data.tags;
            let content = article.content;

            mediumPost(medToken, pubID, content, title, slug, tags);
        }
    }
    catch(error){
        core.setFailed(error.message);
    }
}
main();