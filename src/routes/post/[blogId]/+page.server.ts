import type { PageServerLoad } from './$types';
import { POCKETBASE_URL } from '$env/static/private';
import Pocketbase from "pocketbase";

const pb = new Pocketbase(POCKETBASE_URL);
// export const csr = false;
export const ssr = true;

export const load = (async ({params}) => {
    const { blogId } = params;
    const blog = await pb.collection('blogs').getOne(blogId).catch(
        (error) => ({
            error: error?.toString() || error?.message || "An error occurred",
        })
    );
    return { blog };
}) satisfies PageServerLoad;