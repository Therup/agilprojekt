import React, { useRef, useState, useEffect } from "react";
import { firestore } from "../firebase";
import { addDoc, collection, getDocs } from "@firebase/firestore";
import ProductCard from "../components/ProductCard";
import "../css/adminupload.css";

function AdminUpload({ product }) {
  const kategori = useRef();
  const pname = useRef();
  const info = useRef();
  const pic = useRef();
  const ref = collection(firestore, "products");

  const handleSave = async (e) => {
    e.preventDefault();

    let data = {
      kategori: kategori.current.value,
      produktnamn: pname.current.value,
      info: info.current.value,
      bild: pic.current.value,
    };

    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }
  };

  /* 
  // State is passed as a prop to be able to share the same state between different components
  const [product, setProduct] = useState([]);
  
  const fetchPost = async () => {
    await getDocs(collection(firestore, "products")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProduct(newData);
      console.log(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);
 */

  return (
    <div className="body">
      <form className="form" onSubmit={handleSave}>
        <fieldset className="border p-4">
          <legend className="float-none w-auto">Lägg till produkt</legend>
          <label className="form-label" htmlFor="">
            Kategori
          </label>
          <input className="form-control" type="text" ref={kategori} />
          <label className="form-label" htmlFor="">
            Produktnamn
          </label>
          <input className="form-control" type="text" ref={pname} />
          <label className="form-label" htmlFor="">
            Info
          </label>
          <textarea className="form-control" type="text" ref={info} />
          <label className="form-label" htmlFor="">
            Bildlänk
          </label>
          <input className="form-control" type="text" ref={pic} />
          <button className="btn btn-dark submit" type="submit">
            Submit
          </button>
        </fieldset>
      </form>

      <hr />
      <div className="d-flex justify-content-center h5">
        Tillagda produkter:
      </div>
      <div className="display-products">
        {product?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default AdminUpload;
