import connectDB from '@/config/db';

export const GET = async (request) => {
    try {
        await connectDB();
        return new Response(JSON.stringify({msg: 'Hello World'}), { status: 200 });
    } catch (error) {
        console.log(first)
        return new Response('An error occurred', { status: 500 });
    }
}