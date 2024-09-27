import type { RequestHandler } from './$types';
import pb from '$lib';

export const GET: RequestHandler = async (req) => {
    const blogs = await pb.collection('blogs').getFullList({fields:'id',sort:'-created'});
    const rootURL = req.url.href.replace(/\/sitemap\.txt$/, '');
    return new Response(blogs.map((post)=>`${rootURL}/post/${post.id}`).join('\n'),
        {
            headers: {
                'Content-Type': 'text/plain'
            }
        }
    );
};