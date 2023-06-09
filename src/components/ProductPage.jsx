import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";
//import Dropdown from "rsuite/Dropdown";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductPage({
  product,
  kategorier,
  onAdd,
  onRemove,
  cartItems,
  onAddWishlist,
  onRemoveWishlist,
  wishlistItems,
}) {
  //console.log(product);
  const location = useLocation();
  const { searchResult } = location.state;

  const [value, setValue] = useState(location?.state?.kategori); //Söksträngen
  /*const onChange = (event) => {
    setValue(event);
  };*/

  useEffect(() => {
    setValue(location?.state?.kategori);
  }, [location.state?.kategori]);

  //console.log(location?.state?.kategori);
  //console.log(value);
  return (
    <>
      {/*<div className=" m-5">
        <Dropdown size="lg" title={value} onSelect={onChange} activeKey={value}>
          <Dropdown.Item key="all" eventKey={"Se Alla"}>
            Se alla
          </Dropdown.Item>
          {kategorier.map((item) => (
            <Dropdown.Item key={item} eventKey={item}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown>
          </div>*/}
      <div className="katknapp">
        <Link to="../productpage" state={{ kategori: "Se alla" }}>
          <button
            type="button"
            className="btn btn-outline-secondary katknapp"
            key={"all"}
          >
            {"Se alla"}
          </button>
        </Link>
        {kategorier.map((item) => (
          <Link to="../productpage" key={item} state={{ kategori: item }}>
            <button
              type="button"
              className="btn btn-outline-secondary katknapp"
            >
              {item}
            </button>
          </Link>
        ))}
      </div>
      <div className="d-flex justify-content-center h3 mt-5 mb-3">
        {value !== "Se alla" ? value?.toUpperCase() : "ALLA PRODUKTER"}
      </div>
      <div className="display-products">
        {searchResult
          ? searchResult.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={onAdd}
                  onAddWishlist={onAddWishlist}
                />
              );
            })
          : product.map((product) => {
              if (value === "Se alla" || product.kategori.includes(value)) {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    item={cartItems.find(
                      (x) => x.articlenumber === product.articlenumber
                    )}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    itemWishlist={wishlistItems.find(
                      (x) => x.articlenumber === product.articlenumber
                    )}
                    onAddWishlist={onAddWishlist}
                    onRemoveWishlist={onRemoveWishlist}
                  />
                );
              }
            })}
      </div>
    </>
  );
}

export default ProductPage;
