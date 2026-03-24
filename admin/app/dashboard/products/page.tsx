"use client";

import { Plus, Search, Edit2, Trash2, Eye, Star, Filter, Package, ArrowUpDown, Download } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product.service";

type ProductStatus = "Active" | "Draft" | "Discontinued";
type ProductCategory = "Heavy" | "Printed" | "Custom" | "Export" | "Pharma" | "Retail";

interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  ply: string;
  moq: string;
  status: ProductStatus;
  featured: boolean;
  price: string;
  description?: string;
  materials?: string;
}

let INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: "Heavy Duty Master Cartons", category: "Heavy", ply: "7-Ply", moq: "5,000", status: "Active", featured: true, price: "$12.50", description: "Industrial-grade master carton for heavy goods.", materials: "Virgin Kraft board" },
  { id: 2, name: "Custom Printed Boxes", category: "Printed", ply: "5-Ply", moq: "2,000", status: "Active", featured: false, price: "$8.40", description: "Full-color flexographic printing." },
  { id: 3, name: "Die-Cut Corrugated", category: "Custom", ply: "5-Ply", moq: "1,500", status: "Active", featured: false, price: "$15.00" },
  { id: 4, name: "Export Packaging Grade A", category: "Export", ply: "7-Ply", moq: "10,000", status: "Active", featured: true, price: "$11.20", description: "ISPM-15 compliant export-grade packaging." },
  { id: 5, name: "Bulk Pallet Boxes", category: "Heavy", ply: "7-Ply", moq: "3,000", status: "Draft", featured: false, price: "$28.00" },
  { id: 6, name: "Corrugated Master Cartons", category: "Heavy", ply: "3-Ply", moq: "5,000", status: "Active", featured: false, price: "$5.90" },
  { id: 7, name: "Pharma-Grade White Box", category: "Pharma", ply: "5-Ply", moq: "1,000", status: "Active", featured: false, price: "$18.00" },
];

const CATEGORIES: ProductCategory[] = ["Heavy", "Printed", "Custom", "Export", "Pharma", "Retail"];
const PLY_OPTIONS = ["3-Ply", "5-Ply", "7-Ply", "9-Ply"];
const statusBadge: Record<ProductStatus, string> = { Active: "badge-success", Draft: "badge-neutral", Discontinued: "badge-error" };

const emptyForm = { name: "", category: "Heavy" as ProductCategory, ply: "5-Ply", moq: "", price: "", status: "Active" as ProductStatus, featured: false, description: "", materials: "" };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortField, setSortField] = useState<"name" | "price" | "moq">("name");
  const [sortAsc, setSortAsc] = useState(true);

  const [addOpen, setAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);

  const sorted = [...products]
    .filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCat === "All" || p.category === filterCat;
      const matchStatus = filterStatus === "All" || p.status === filterStatus;
      return matchSearch && matchCat && matchStatus;
    })
    .sort((a, b) => {
      if (sortField === "price") return sortAsc ? parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", "")) : parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", ""));
      return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });

  const cycleSort = (field: typeof sortField) => {
    if (sortField === field) setSortAsc((x) => !x);
    else { setSortField(field); setSortAsc(true); }
  };

  const openAdd = () => { setForm(emptyForm); setAddOpen(true); };
  const openEdit = (p: Product) => { setEditProduct(p); setForm({ name: p.name, category: p.category, ply: p.ply, moq: p.moq, price: p.price, status: p.status, featured: p.featured, description: p.description ?? "", materials: p.materials ?? "" }); };

  const handleSave = () => {
    if (editProduct) {
      setProducts((prev) => prev.map((p) => p.id === editProduct.id ? { ...p, ...form } : p));
      setEditProduct(null);
    } else {
      const newId = Math.max(...products.map((p) => p.id)) + 1;
      setProducts((prev) => [...prev, { id: newId, ...form }]);
      setAddOpen(false);
    }
  };

  const handleDelete = (id: number) => { setProducts((prev) => prev.filter((p) => p.id !== id)); setViewProduct(null); };
  const toggleFeatured = (id: number) => setProducts((prev) => prev.map((p) => p.id === id ? { ...p, featured: !p.featured } : p));

const {data, isloading,error} =  useQuery({
    queryKey:["products"],
    queryFn: getProducts  ,
  })
   INITIAL_PRODUCTS = data

  const FormContent = () => (
    <div className="space-y-5">
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Product Name</label>
        <input className="glass-input w-full" placeholder="e.g. 7-Ply Triple Fluted Export Box" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Category</label>
          <select className="glass-input w-full" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Ply Composition</label>
          <select className="glass-input w-full" value={form.ply} onChange={(e) => setForm({ ...form, ply: e.target.value })}>
            {PLY_OPTIONS.map((p) => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Base Price (Unit)</label>
          <input className="glass-input w-full" placeholder="$0.00" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Min. Order Qty</label>
          <input className="glass-input w-full" placeholder="e.g. 5,000" value={form.moq} onChange={(e) => setForm({ ...form, moq: e.target.value })} />
        </div>
      </div>
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Description</label>
        <textarea rows={3} className="glass-input w-full resize-none" placeholder="Describe the product specifications..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </div>
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Materials</label>
        <input className="glass-input w-full" placeholder="e.g. Virgin Kraft, Recycled OCC" value={form.materials} onChange={(e) => setForm({ ...form, materials: e.target.value })} />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 px-1">Status</label>
          <div className="flex gap-2">
            {(["Active", "Draft", "Discontinued"] as ProductStatus[]).map((s) => (
              <button key={s} onClick={() => setForm({ ...form, status: s })} className={`px-4 py-2 rounded-xl text-xs font-black border transition-all ${form.status === s ? "bg-slate-950 text-white border-slate-950" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>{s}</button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => setForm({ ...form, featured: !form.featured })}
            className={`w-12 h-6 rounded-full transition-all ${form.featured ? "bg-accent-500" : "bg-slate-200"} relative`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${form.featured ? "left-7" : "left-1"}`} />
          </div>
          <span className="text-sm font-bold text-slate-700">Mark as Featured Product</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-enter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-500 mb-2">Product Catalog</p>
          <h1 className="text-4xl font-display font-black text-slate-900 tracking-tight">SKU Management</h1>
          <p className="text-sm text-slate-400 font-medium mt-1">Industrial-grade corrugated solutions and custom packaging SKUs</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary py-2.5 shadow-none"><Download className="w-4 h-4" /><span className="text-xs hidden sm:inline uppercase tracking-widest font-black">Export CSV</span></button>
          <button onClick={openAdd} className="btn-primary"><Plus className="w-4 h-4" /> New Product</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active SKUs", value: products.filter(p => p.status === "Active").length, icon: Package, color: "text-brand-600", bg: "bg-brand-50" },
          { label: "Featured", value: products.filter(p => p.featured).length, icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Drafts", value: products.filter(p => p.status === "Draft").length, icon: Edit2, color: "text-slate-400", bg: "bg-slate-50" },
          { label: "Average Price", value: "$12.40", icon: ArrowUpDown, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((s) => (
          <div key={s.label} className="premium-card p-6 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-display font-black text-slate-900">{s.value}</h3>
            </div>
            <div className={"w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm" + s.bg + s.color}>
              <s.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="premium-card p-5 flex flex-col lg:flex-row gap-4 items-center bg-slate-50/40">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by name, category..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full glass-input pl-12 py-3" />
        </div>
        <div className="flex gap-3 w-full lg:w-auto flex-wrap">
          <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="glass-input py-3 flex-1 lg:w-44">
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="glass-input py-3 flex-1 lg:w-40">
            <option value="All">All Status</option>
            <option>Active</option>
            <option>Draft</option>
            <option>Discontinued</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <button onClick={() => cycleSort("name")} className="flex items-center gap-2 hover:text-slate-700 transition-colors">Product <ArrowUpDown className="w-3 h-3" /></button>
                </th>
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category / Ply</th>
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <button onClick={() => cycleSort("price")} className="flex items-center gap-2 hover:text-slate-700 transition-colors">Price <ArrowUpDown className="w-3 h-3" /></button>
                </th>
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {sorted.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setViewProduct(p)}>
                  <td className="px-7 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-accent-50 group-hover:text-accent-500 transition-colors shrink-0">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 group-hover:text-accent-500 transition-colors">{p.name}</span>
                          {p.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                        </div>
                        <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-0.5">{p.moq} MOQ • SKU-00{p.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-7 py-5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg border border-blue-100/50">{p.category}</span>
                      <span className="text-xs font-bold text-slate-400 font-mono">{p.ply}</span>
                    </div>
                  </td>
                  <td className="px-7 py-5">
                    <span className={`status-badge ${statusBadge[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-7 py-5">
                    <span className="text-sm font-black text-slate-900">{p.price}</span>
                  </td>
                  <td className="px-7 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.stopPropagation(); setViewProduct(p); }} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"><Eye className="w-4 h-4" /></button>
                      <button onClick={(e) => { e.stopPropagation(); openEdit(p); }} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={(e) => { e.stopPropagation(); toggleFeatured(p.id); }} className="p-2.5 rounded-xl hover:bg-amber-50 text-slate-400 hover:text-amber-400 transition-colors"><Star className={`w-4 h-4 ${p.featured ? "fill-amber-400 text-amber-400" : ""}`} /></button>
                      <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(p.id); }} className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-7 py-5 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Showing {sorted.length} of {products.length} products</p>
          <div className="flex items-center gap-2">
            <button className="btn-secondary py-2 px-4 shadow-none text-[10px]">Previous</button>
            <button className="btn-secondary py-2 px-4 shadow-none text-[10px] bg-slate-900 text-white border-slate-900">1</button>
            <button className="btn-secondary py-2 px-4 shadow-none text-[10px]">Next</button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal isOpen={addOpen} onClose={() => setAddOpen(false)} title="New Product" subtitle="Add a new SKU to the catalog" size="lg"
        footer={<><button onClick={() => setAddOpen(false)} className="btn-secondary py-2.5">Cancel</button><button onClick={handleSave} className="btn-primary py-2.5"><Plus className="w-4 h-4" /> Provision SKU</button></>}
      ><FormContent /></Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editProduct} onClose={() => setEditProduct(null)} title="Edit Product" subtitle={editProduct?.name} size="lg"
        footer={<><button onClick={() => setEditProduct(null)} className="btn-secondary py-2.5">Cancel</button><button onClick={handleSave} className="btn-primary py-2.5">Save Changes</button></>}
      ><FormContent /></Modal>

      {/* View Modal */}
      <Modal isOpen={!!viewProduct} onClose={() => setViewProduct(null)} title={viewProduct?.name ?? ""} subtitle={`SKU-00${viewProduct?.id} • ${viewProduct?.category} • ${viewProduct?.ply}`} size="lg"
        footer={
          <>
            <button onClick={() => { setDeleteTarget(viewProduct!.id); setViewProduct(null); }} className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all mr-auto"><Trash2 className="w-4 h-4" /> Delete</button>
            <button onClick={() => setViewProduct(null)} className="btn-secondary py-2.5">Close</button>
            <button onClick={() => { openEdit(viewProduct!); setViewProduct(null); }} className="btn-primary py-2.5"><Edit2 className="w-4 h-4" /> Edit</button>
          </>
        }
      >
        {viewProduct && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[{ label: "Category", value: viewProduct.category }, { label: "Ply", value: viewProduct.ply }, { label: "Base Price", value: viewProduct.price }, { label: "Min Order Qty", value: viewProduct.moq }, { label: "Status", value: viewProduct.status }, { label: "Featured", value: viewProduct.featured ? "✅ Yes" : "No" }].map((f) => (
                <div key={f.label} className="bg-slate-50 rounded-2xl p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{f.label}</p>
                  <p className="text-sm font-bold text-slate-900">{f.value}</p>
                </div>
              ))}
            </div>
            {viewProduct.description && <div className="bg-slate-50 rounded-2xl p-4"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Description</p><p className="text-sm text-slate-700 leading-relaxed">{viewProduct.description}</p></div>}
            {viewProduct.materials && <div className="bg-slate-50 rounded-2xl p-4"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Materials</p><p className="text-sm text-slate-700">{viewProduct.materials}</p></div>}
          </div>
        )}
      </Modal>

      {/* Delete Confirm */}
      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => handleDelete(deleteTarget!)} title="Delete Product" message="This will permanently remove the product from the catalog. Are you sure?" confirmLabel="Delete Product" danger />
    </div>
  );
}
