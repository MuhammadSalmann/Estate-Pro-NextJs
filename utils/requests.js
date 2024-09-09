const apiDomain = process.env.NEXT_PUBLIC_DOMAIN_API || null; // for deployment issues

async function fetchProperties() {
  try {
    // Handle the case where the API domain is not available yet
    if (!apiDomain) {
        return [];
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_API}/properties`);
    if (!res.ok) {
      throw new Error("An error occurred while fetching the data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export { fetchProperties };
