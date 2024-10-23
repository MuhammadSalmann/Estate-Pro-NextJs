import PropertyCard from "@/components/PropertyCard";
import { fetchProperties } from "@/utils/requests";
import PropertySearchForm from "@/components/PropertySearchForm";

const PropertiesPage = async () => {
  const properties = await fetchProperties();

  // sort properties by date
  properties.sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-start px-4 sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
        <section className="px-4 py-6">
          <div className="container-xl m-auto lg:container">
            {properties.length === 0 ? (
              <p>No Properties</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {properties.map((property: any) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
    </>
  );
};

export default PropertiesPage;
