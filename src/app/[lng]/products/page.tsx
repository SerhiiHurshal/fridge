import { auth } from "@/auth";

const Products = async () => {
  const session = await auth();

  return <div>{session?.user?.email}</div>;
};

export default Products;
