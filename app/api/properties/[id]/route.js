import connectDB from '@/config/db';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

// GET /api/properties/:id
export const GET = async (request, { params }) => {
    try {
        await connectDB();
        const property = await Property.findById(params.id);
        if(!property) {
            return new Response('Property not found', { status: 404 });
        }
        return new Response(JSON.stringify(property), { status: 200 });
    } catch (error) {
        return new Response('An error occurred', { status: 500 });
    }
}

// DELETE /api/properties/:id
export const DELETE = async (request, { params }) => {
    try {
        const propertyId = params.id;
        const sessionUser = await getSessionUser();

        // Check for session
        if(!sessionUser || !sessionUser.userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        const { userId } = sessionUser;

        await connectDB();
        const property = await Property.findById(propertyId);
        if(!property) {
            return new Response('Property not found', { status: 404 });
        }

        // Check if user is the owner of the property
        if(property.owner.toString() !== userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        await property.deleteOne();

        return new Response('Property Deleted', { status: 200 });
    } catch (error) {
        return new Response('An error occurred', { status: 500 });
    }
}

// PUT /api/properties/:id
export const PUT = async (request, { params }) => {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }

        const { id } = params;
        const { userId } = sessionUser;

        const formData = await request.formData();
        // console.log(formData)
        // console.log(formData.get('name'));

        // Access all values from amenities and images
        const amenities = formData.getAll('amenities');

        // Get property to update
        const existingProperty = await Property.findById(id);
        if (!existingProperty) {
            return new Response('Property not found', { status: 404 });
        }

        // Check if user is the owner of the property
        if(existingProperty.owner.toString() !== userId) {
            return new Response('Unauthorized', { status: 401 });
        }

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
        }

        // Update proqerty in the database
        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);
        // return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`);
        return new Response(JSON.stringify(updatedProperty), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Failed to Add Property', { status: 500 });
    }
}