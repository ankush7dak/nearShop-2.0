import { useState } from "react";
import "./ShopkeeperAddProduct.css";
import { FaUpload, FaSave, FaTimes } from "react-icons/fa";
import ShopkeeperTopNav from "../ShopkeeperTopNav/ShopkeeperTopNav";

export default function ShopkeeperAddProduct() {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    supplier: "",
    price: "",
    cost: "",
    stock: "",
    threshold: "",
    description: "",
    active: true,
    tags: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      image,
      createdAt: new Date().toISOString(),
    };

    console.log("NEW PRODUCT =>", payload);
    alert("Product Added Successfully (mock)");

    setForm({
      name: "",
      sku: "",
      category: "",
      supplier: "",
      price: "",
      cost: "",
      stock: "",
      threshold: "",
      description: "",
      active: true,
      tags: "",
    });
    setImage(null);
    setPreview(null);
  };

  return (
    <>    <ShopkeeperTopNav></ShopkeeperTopNav>

    <div className="add-product-page">
      <header className="page-header">
        <h2>➕ Add New Product</h2>
        <p>Create a new product listing for your store</p>
      </header>

      <form className="product-form" onSubmit={handleSubmit}>

        {/* Image Upload */}
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

        {/* Info */}
        <div className="form-grid">

          <div>
            <label>Product Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div>
            <label>SKU / Code *</label>
            <input name="sku" value={form.sku} onChange={handleChange} required />
          </div>

          <div>
            <label>Category *</label>
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="">Select</option>
              <option>Grocery</option>
              <option>Medical</option>
              <option>Cosmetics</option>
              <option>Electronics</option>
            </select>
          </div>

          <div>
            <label>Supplier</label>
            <input name="supplier" value={form.supplier} onChange={handleChange} />
          </div>

          <div>
            <label>Selling Price (₹)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} />
          </div>

          <div>
            <label>Cost Price (₹)</label>
            <input type="number" name="cost" value={form.cost} onChange={handleChange} />
          </div>

          <div>
            <label>Opening Stock</label>
            <input type="number" name="stock" value={form.stock} onChange={handleChange} />
          </div>

          <div>
            <label>Low Stock Alert At</label>
            <input type="number" name="threshold" value={form.threshold} onChange={handleChange} />
          </div>

          <div className="full">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} />
          </div>

          <div className="full">
            <label>Tags (comma separated)</label>
            <input name="tags" value={form.tags} onChange={handleChange} />
          </div>

        </div>

        {/* Footer */}
        <div className="form-footer">

          <label className="toggle">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
            />
            Active for Sale
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
    </>
  );
}
