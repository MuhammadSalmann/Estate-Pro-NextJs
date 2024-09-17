import connectDB from '@/config/db';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/properties
export const GET = async (request) => {
    try {
        await connectDB();
        const properties = await Property.find({});
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
        console.log(first)
        return new Response('An error occurred', { status: 500 });
    }
}

export const POST = async (request) => {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }

        const { userId } = sessionUser;

        const formData = await request.formData();
        // console.log(formData)
        // console.log(formData.get('name'));

        // Access all values from amenities and images
        const amenities = formData.getAll('amenities');
        const images = formData.getAll('images')
        .filter(image => image.name !== ''); // Filter out empty images

        // Create a new property object for the database
        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId,
            // images
        }
        console.log(propertyData)

        const newProperty = await Property.create(propertyData);
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
    } catch (error) {
        console.log(error);
        return new Response('Failed to Add Property', { status: 500 });
    }
}