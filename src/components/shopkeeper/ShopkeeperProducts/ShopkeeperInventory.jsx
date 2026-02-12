import { useMemo, useState } from "react";
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

const INVENTORY = [
  {
    id: 1,
    name: "Basmati Rice",
    sku: "GR-201",
    category: "Grocery",
    price: 80,
    cost: 60,
    stock: 4,
    supplier: "Sharma Foods",
    added: "2026-02-01",
    updated: "2026-02-09",
    active: true,
  },
  {
    id: 2,
    name: "Paracetamol",
    sku: "MD-110",
    category: "Medical",
    price: 25,
    cost: 18,
    stock: 0,
    supplier: "HealthCorp",
    added: "2026-02-04",
    updated: "2026-02-10",
    active: true,
  },
  {
    id: 3,
    name: "Shampoo",
    sku: "CS-450",
    category: "Cosmetics",
    price: 199,
    cost: 145,
    stock: 18,
    supplier: "Glow Ltd",
    added: "2026-02-05",
    updated: "2026-02-09",
    active: false,
  },
];

export default function ShopkeeperInventoryPro() {
  const [items, setItems] = useState(INVENTORY);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [stockFilter, setStockFilter] = useState("ALL");
  const [sort, setSort] = useState("added");
  const [selected, setSelected] = useState([]);

  const categories = ["ALL", ...new Set(INVENTORY.map(i => i.category))];

  const filtered = useMemo(() => {
    let data = [...items];

    if (search)
      data = data.filter(
        i =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.sku.toLowerCase().includes(search.toLowerCase())
      );

    if (category !== "ALL")
      data = data.filter(i => i.category === category);

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

  const toggleActive = id => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, active: !i.active } : i))
    );
  };

  const bulkDelete = () => {
    if (!window.confirm("Delete selected products?")) return;
    setItems(prev => prev.filter(i => !selected.includes(i.id)));
    setSelected([]);
  };

  return (
    <>
    <ShopkeeperTopNav></ShopkeeperTopNav>
    <div className="inventory-pro">

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

      {/* Filters */}
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

      {/* Desktop Table */}
      <div className="table-wrap">

        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={e =>
                    setSelected(
                      e.target.checked ? filtered.map(i => i.id) : []
                    )
                  }
                  checked={
                    filtered.length > 0 &&
                    selected.length === filtered.length
                  }
                />
              </th>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Supplier</th>
              <th>Price</th>
              <th>Margin</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(i => {
              const margin = (((i.price - i.cost) / i.price) * 100).toFixed(0);

              return (
                <tr key={i.id} className={i.stock === 0 ? "out-row" : ""}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(i.id)}
                      onChange={() =>
                        setSelected(prev =>
                          prev.includes(i.id)
                            ? prev.filter(x => x !== i.id)
                            : [...prev, i.id]
                        )
                      }
                    />
                  </td>

                  <td className="prod">
                    <FaBoxes />
                    <span>{i.name}</span>
                  </td>

                  <td>{i.sku}</td>
                  <td>{i.category}</td>
                  <td>{i.supplier}</td>

                  <td>₹{i.price}</td>
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
                      {i.stock}
                    </span>
                  </td>

                  <td>
                    <button
                      className={`toggle ${i.active ? "on" : "off"}`}
                      onClick={() => toggleActive(i.id)}
                    >
                      {i.active ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </td>

                  <td>{i.updated}</td>

                  <td className="actions">
                    <button>Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>

      {/* Mobile Cards */}
      <div className="mobile-grid">
        {filtered.map(i => (
          <div className="mobile-card" key={i.id}>
            <h4>{i.name}</h4>
            <p>{i.category} • {i.sku}</p>
            <p>₹{i.price}</p>

            <p>
              Stock:
              <span className={i.stock === 0 ? "out" : i.stock <= 5 ? "low" : "ok"}>
                {i.stock}
              </span>
            </p>

            <div className="mobile-actions">
              <button onClick={() => toggleActive(i.id)}>
                {i.active ? "Hide" : "Show"}
              </button>
              <button>Edit</button>
            </div>
          </div>
        ))}
      </div>

    </div>
    </>
  );
}
