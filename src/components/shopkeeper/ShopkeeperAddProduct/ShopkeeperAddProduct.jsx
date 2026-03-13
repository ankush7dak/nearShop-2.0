import { useState, useEffect } from "react";
import "./ShopkeeperAddProduct.css";
import { FaUpload, FaSave, FaTimes, FaPlus } from "react-icons/fa";
import ShopkeeperTopNav from "../ShopkeeperTopNav/ShopkeeperTopNav";
import axios from "axios";
import { LINKS } from "../../../constants/LinksUtility";
import AddSubCategoryModal from "./AddSubCategoryModal/AddSubCategoryModal";


export default function ShopkeeperAddProduct() {

  const [form, setForm] = useState({
    name: "",
    shopSubcategoryId: "",
    price: "",
    stock: "",
    isAvailable: true,
  });

  const [subcategories, setSubcategories] = useState([]);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          `${LINKS.API_BASE_URL}/api/shop/getShopSubCategories`,
          { withCredentials: true }
        );

        console.log("categories", response.data);
        setSubcategories(response.data);
      } catch (e) {
        console.log("error", e);
      }
    };
  // Fetch shop subcategories (based on logged in shopkeeper)
  useEffect(() => {

    fetchSubCategories();

  }, []);

  // const handleGetSubCategories = async () =>{
  //   try{
  //     const response = await axios.get(
  //         `${LINKS.API_BASE_URL}/api/shop/getShopSubCategories`,{
  //   withCredentials: true
  // }
  //       );
  //       console.log("categories" + response.data);
  //       setSubcategories(response.data);
  //   }
  //   catch(e){
  //     console.log('error');
  //   }
  // }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      shopSubcategoryId: form.shopSubcategoryId,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      isAvailable: form.isAvailable,
    };

    try {
      await axios.post("/api/products", payload);
      alert("Product Added Successfully ✅");

      setForm({
        name: "",
        shopSubcategoryId: "",
        price: "",
        stock: "",
        isAvailable: true,
      });

      setImage(null);
      setPreview(null);

    } catch (error) {
      console.error(error);
      alert("Error adding product ❌");
    }
  };

  return (
    <>
    {showModal && (
        <AddSubCategoryModal setShowModal = {setShowModal} refreshSubCategories={fetchSubCategories}></AddSubCategoryModal>
      )}
    <div className={showModal ? "blurred" : "" }>
      <ShopkeeperTopNav />

      <div className="add-product-page">
        
        <header className="page-header">
          <h2>➕ Add New Product</h2>
          <p>Create a new product listing for your store</p>
        </header>

        <form className="product-form" onSubmit={handleSubmit}>

          {/* Image Upload (Optional Feature) */}
          <div className="image-section">
            <label className="upload-box">
              {preview ? (
                <img src={preview} alt="preview" />
              ) : (
                <>
                  <FaUpload />
                  <span>Upload Product Image</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
            </label>
          </div>

          <div className="form-grid">

            <div>
              <label>Product Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <div className="sub-category-1">
                <label>Subcategory *</label>
                <div className="sub-category-2"><button className="btn-add-category" onClick={() => setShowModal(true)} >Add New</button></div>
              </div>
              <select
                name="shopSubcategoryId"
                value={form.shopSubcategoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Selling Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-footer">

            <label className="toggle">
              <input
                type="checkbox"
                name="isAvailable"
                checked={form.isAvailable}
                onChange={handleChange}
              />
              Available for Sale
            </label>

            <div className="btn-group">
              <button type="reset" className="cancel">
                <FaTimes /> Reset
              </button>

              <button type="submit" className="save">
                <FaSave /> Save Product
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
      
    </>
  );
}
