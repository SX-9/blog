import type { PageServerLoad } from './$types';
import pb from '$lib';

export const load = (async () => {
    const blogs = await pb.collection('blogs').getFullList({fields:'id,title,created',created:'-created'});
    return { blogs };
}) satisfies PageServerLoad;