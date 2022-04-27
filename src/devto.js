import fetch from "node-fetch";

export const devPost = async (authToken, orgID, content, title, slug) => {
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
    const data = await response.json();

    console.log(data);
}