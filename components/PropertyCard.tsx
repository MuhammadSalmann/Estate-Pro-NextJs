const PropertyCard = () => {
  return (
    <div className="relative rounded-xl bg-white shadow-md">
      <img
        src="images/properties/a1.jpg"
        alt=""
        className="h-auto w-full rounded-t-xl"
      />
      <div className="p-4">
        <div className="mb-6 text-left md:text-center lg:text-left">
          <div className="text-gray-600">Apartment</div>
          <h3 className="text-xl font-bold">Boston Commons Retreat</h3>
        </div>
        <h3 className="absolute right-[10px] top-[10px] rounded-lg bg-white px-4 py-2 text-right font-bold text-blue-500 md:text-center lg:text-right">
          $4,200/mo
        </h3>

        <div className="mb-4 flex justify-center gap-4 text-gray-500">
          <p>
            <i className="fa-solid fa-bed"></i> 3
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <i className="fa-solid fa-bath"></i> 2
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <i className="fa-solid fa-ruler-combined"></i>
            1,500 <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div className="mb-4 flex justify-center gap-4 text-sm text-green-900">
          <p>
            <i className="fa-solid fa-money-bill"></i> Weekly
          </p>
          <p>
            <i className="fa-solid fa-money-bill"></i> Monthly
          </p>
        </div>

        <div className="mb-5 border border-gray-100"></div>

        <div className="mb-4 flex flex-col justify-between lg:flex-row">
          <div className="mb-4 flex gap-2 align-middle lg:mb-0">
            <i className="fa-solid fa-location-dot text-lg text-orange-700"></i>
            <span className="text-orange-700"> Boston MA </span>
          </div>
          <a
            href="property.html"
            className="h-[36px] rounded-lg bg-blue-500 px-4 py-2 text-center text-sm text-white hover:bg-blue-600"
          >
            Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
