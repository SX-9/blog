import type { PageServerLoad } from './$types';
import pb from '$lib';

export const csr = false;
export const ssr = true;

export const load = (async ({params}) => {
    const { blogId } = params;
    const blog = await pb.collection('blogs').getOne(blogId).catch(
        (error) => ({
            error,
        })
    );
    return { blog };
}) satisfies PageServerLoad;