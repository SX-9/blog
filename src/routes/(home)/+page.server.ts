import type { PageServerLoad } from './$types';
import pb from '$lib';

export const load = (async () => {
    const blogs = await pb.collection('blogs').getFullList({
        sort: '-created',
        perPage: 8,
    });
    return {blogs};
}) satisfies PageServerLoad;