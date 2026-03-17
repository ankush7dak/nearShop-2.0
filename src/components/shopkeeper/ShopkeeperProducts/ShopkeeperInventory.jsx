import { useEffect, useMemo, useState } from "react";
import "./ShopkeeperInventory.css";
import {
  FaSearch,
  FaDownload,
  FaTrash,
  FaEyeSlash,
  FaEye,
  FaBoxes,
} from "react-icons/fa";
import ShopkeeperTopNav from "../ShopkeeperTopNav/ShopkeeperTopNav";
import axios from "axios";
import { LINKS } from "../../../constants/LinksUtility";
import Loading from "../../Loading/Loading";

export default function ShopkeeperInventoryPro() {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [stockFilter, setStockFilter] = useState("ALL");
  const [sort, setSort] = useState("added");
  const [selected, setSelected] = useState([]);
  const [loading,setLoading] = useState(false);
  

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const categories = ["ALL", ...new Set(items.map(i => i.subcategoryName).filter(name => name != null)),...new Set(items.map(i => i.shopSubcategoryName).filter(name => name!=null))];

  // fetching inventory data here
  const fetchAllInventoryData = async ()=>{
    try{
      setLoading(true);
      const res = await axios.get(`${LINKS.API_BASE_URL}/api/shop/getAllInvertoryData`,
        {withCredentials:true,
          headers: {
      "Content-Type": "application/json"
    }
        });
      console.log(res.data);
      setItems(res.data.productDTOList);
    }catch(e){
      console.log(e);
    }
    setLoading(false);
  }
  useEffect(()=>{
    fetchAllInventoryData();
  },[]);
  

  const filtered = useMemo(() => {
    let data = [...items];

    if (search)
      data = data.filter(
        i =>
          i.name.toLowerCase().includes(search.toLowerCase())
      );

    
    if (category !== "ALL"){
      data = data.filter(i => i.subcategoryName == category ||
    i.shopSubcategoryName == category);
      }

    if (stockFilter === "LOW")
      data = data.filter(i => i.stock > 0 && i.stock <= 5);

    if (stockFilter === "OUT")
      data = data.filter(i => i.stock === 0);

    if (sort === "price") data.sort((a, b) => b.price - a.price);
    if (sort === "stock") data.sort((a, b) => b.stock - a.stock);
    if (sort === "added")
      data.sort((a, b) => new Date(b.added) - new Date(a.added));

    return data;
  }, [items, search, category, stockFilter, sort]);

  const toggleActive = productId => {
    setItems(prev =>
      prev.map(i => (i.productId === productId ? { ...i, isAvailable: !i.isAvailable } : i))
    );
  };

  const bulkDelete = () => {
    if (!window.confirm("Delete selected products?")) return;
    setItems(prev => prev.filter(i => !selected.includes(i.productId)));
    setSelected([]);
  };

  const handleEdit = item => {
    setEditId(item.productId);
    setEditData({ ...item });
  };

  const handleChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdate = async () => {

    try {
      setLoading(true);
      const payload = {
        productId: editData.productId,
        name: editData.name,
        price: Number(editData.price),
        cost:  Number(editData.cost),
        description: editData.description,
        stock : Number(editData.stock),
        weight: editData.weight,
        isAvailable: editData.isAvailable
      };

      /* Backend API call */
      console.log("Edit Data " + editData);
      for (let key in editData) {
  console.log(key, editData[key]);
}
      const res = await axios.post(`${LINKS.API_BASE_URL}/api/shop/updateProduct`, payload,
        {
          withCredentials: true,
          headers: {
    "Content-Type": "application/json"          }
        },
      );
      

      setItems(prev =>
        prev.map(i => (i.productId === editId ? editData : i))
      );

      setEditId(null);

    } catch (e) {
      console.log("Update failed");
    }
    setLoading(false);

  };

  return (
    <>
      <ShopkeeperTopNav />

      <div className="inventory-pro">
      {loading && (
            <Loading></Loading>
          )}
        <header className="inventory-header">
          <h2>📊 Inventory Control Center</h2>

          {selected.length > 0 && (
            <div className="bulk-actions">
              <span>{selected.length} selected</span>
              <button onClick={bulkDelete}>
                <FaTrash /> Delete
              </button>
            </div>
          )}
        </header>

        <div className="inventory-toolbar">

          <div className="search">
            <FaSearch />
            <input
              placeholder="Search name or SKU..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={e => setStockFilter(e.target.value)}
          >
            <option value="ALL">All Stock</option>
            <option value="LOW">Low Stock</option>
            <option value="OUT">Out of Stock</option>
          </select>

          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="added">Newest</option>
            <option value="price">Highest Price</option>
            <option value="stock">Highest Stock</option>
          </select>

          <button className="export">
            <FaDownload /> Export
          </button>

        </div>

        <div className="table-wrap">

          <table>

            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={e =>
                      setSelected(
                        e.target.checked ? filtered.map(i => i.productId) : []
                      )
                    }
                    checked={
                      filtered.length > 0 &&
                      selected.length === filtered.length
                    }
                  />
                </th>

                <th>Product</th>
                <th>Category</th>
                <th>Selling Price</th>
                <th>Cost Price</th>
                <th>Margin</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filtered.map(i => {

                const margin = (((i.price - i.cost) / i.price) * 100).toFixed(0);

                return (
                  <tr key={i.productId} className={i.stock === 0 ? "out-row" : ""}>

                    <td>
                      <input
                        type="checkbox"
                        checked={selected.includes(i.productId)}
                        onChange={() =>
                          setSelected(prev =>
                            prev.includes(i.productId)
                              ? prev.filter(x => x !== i.productId)
                              : [...prev, i.productId]
                          )
                        }
                      />
                    </td>

                    <td className="prod">
                      <FaBoxes />
                      <span>{i.name}</span>
                    </td>

                    <td>{(i.subcategoryName!=null)?i.subcategoryName:i.shopSubcategoryName}</td>

                    <td>
                      {editId === i.productId ? (
                        <input
                          type="number"
                          value={editData.price}
                          onChange={e => handleChange("price", e.target.value)}
                        />
                      ) : (
                        `₹${i.price}`
                      )}
                    </td>

                    <td>
                      {editId === i.productId ? (
                        <input
                          type="number"
                          value={editData.cost}
                          onChange={e => handleChange("cost", e.target.value)}
                        />
                      ) : (
                        `₹${i.cost}`
                      )}
                    </td>

                    <td>{margin}%</td>

                    <td>
                      <span
                        className={
                          i.stock === 0
                            ? "out"
                            : i.stock <= 5
                            ? "low"
                            : "ok"
                        }
                      >
                        {editId === i.productId ? (
                        <input
                          type="number"
                          value={editData.stock}
                          onChange={e => handleChange("stock", e.target.value)}
                        />
                      ) : (
                        `₹${i.stock}`
                      )}
                      </span>
                    </td>

                    <td>
                      <button
                        className={`toggle ${i.isAvailable ? "on" : "off"}`}
                        onClick={() => {toggleActive(i.productId);
                          i.isAvailable = !i.isAvailable;
                          editData.isAvailable = i.isAvailable;
                        }}
                      >
                        {i.isAvailable ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </td>

                    <td>{editId === i.productId ? (
                        <input
                          type="text"
                          value={editData.description}
                          onChange={e => handleChange("description", e.target.value)}
                        />
                      ) : (
                        `${i.description}`
                      )}</td>

                    <td className="actions">

                      {editId === i.productId ? (
                        <>
                          <button onClick={handleUpdate}>Update</button>
                          <button onClick={() => setEditId(null)}>Cancel</button>
                        </>
                      ) : (
                        <button onClick={() => handleEdit(i)}>Edit</button>
                      )}

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}