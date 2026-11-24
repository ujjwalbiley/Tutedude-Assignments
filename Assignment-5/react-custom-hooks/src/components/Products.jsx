
import useFetch from "../hooks/useFetch";

function Products() {
  const {
    data,
    loading,
    error
  } = useFetch("https://dummyjson.com/products");

  if (loading) {
    return <h2 className="message">Loading Products...</h2>;
  }

  if (error) {
    return <h2 className="message">Error: {error}</h2>;
  }

  return (
    <div className="products-container">
      {data?.products?.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.thumbnail} alt={product.title} />

          <h3>{product.title}</h3>

          <p>{product.description}</p>

          <h4>${product.price}</h4>
        </div>
      ))}
    </div>
  );
}

export default Products;
