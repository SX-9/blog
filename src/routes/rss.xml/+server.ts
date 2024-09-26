import type { RequestHandler } from './$types';
import pb from '$lib';

export const GET: RequestHandler = async (req) => {
    const blogs = await pb.collection('blogs').getFullList({fields:'id,title,created',created:'-created',perPage:10});
    const rootURL = req.url.href.replace(/\/rss\.xml$/, '');
    return new Response(`\
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>My Blog</title>
        <link>${rootURL}</link>
        <description>My Blog</description>
        ${blogs.map(blog => `
            <item>
                <title>${blog.title}</title>
                <link>${rootURL}/post/${blog.id}</link>
                <pubDate>${blog.created}</pubDate>
            </item>
        `).join('')}
    </channel>
</rss>`,
        {
            headers: {
                'Content-Type': 'application/xml'
            }
        }
    );
};