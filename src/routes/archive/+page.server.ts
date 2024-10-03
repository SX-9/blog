import type { PageServerLoad } from './$types';
import pb from '$lib';

export const csr = false;
export const ssr = true;

export const load = (async () => {
    const blogs = await pb.collection('blogs').getFullList({fields:'id,title,created',created:'-created'});
    return { blogs };
}) satisfies PageServerLoad;