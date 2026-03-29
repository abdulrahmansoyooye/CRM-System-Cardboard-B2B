'use client'
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import ConfirmModal from "@/components/ConfirmModal";
import Skeleton from "@/components/Skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/services/product.service";
import { Download, Package, Plus, Star, Edit2, Search, ArrowUpDown, Eye, Trash2 } from "lucide-react";

type ProductStatus = "Active" | "Draft" | "Discontinued";
type ProductCategory = "Heavy" | "Printed" | "Custom" | "Export" | "Pharma" | "Retail";

interface Product {
  _id: string;
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

const CATEGORIES: ProductCategory[] = ["Heavy", "Printed", "Custom", "Export", "Pharma", "Retail"];
const PLY_OPTIONS = ["3-Ply", "5-Ply", "7-Ply", "9-Ply"];
const statusBadge: Record<ProductStatus, string> = { Active: "badge-success", Draft: "badge-neutral", Discontinued: "badge-error" };

const emptyForm = { 
  name: "", 
  category: "Heavy" as ProductCategory, 
  ply: "5-Ply", 
  moq: "", 
  price: "", 
  status: "Active" as ProductStatus, 
  featured: false, 
  description: "", 
  materials: "" 
};

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const { data: apiData, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortField, setSortField] = useState<"name" | "price" | "moq">("name");
  const [sortAsc, setSortAsc] = useState(true);

  const [addOpen, setAddOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);

  // Sync state with fetched data
  useEffect(() => {
    if (apiData?.success && Array.isArray(apiData.data)) {
        setProducts(apiData.data);
    }
  }, [apiData]);

  const createMutation = useMutation({
    mutationFn: (data: any) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setAddOpen(false);
      resetForm();
      setIsSaving(false);
    },
    onError: () => setIsSaving(false),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditProduct(null);
      resetForm();
      setIsSaving(false);
    },
    onError: () => setIsSaving(false),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setDeleteTarget(null);
    },
  });

  const resetForm = () => {
    setForm(emptyForm);
  };

  const handleSave = () => {
    setIsSaving(true);
    if (editProduct) {
      updateMutation.mutate({ id: editProduct._id, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const sorted = [...products]
    .filter((p) => {
      const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase()) || p.category?.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCat === "All" || p.category === filterCat;
      const matchStatus = filterStatus === "All" || p.status === filterStatus;
      return matchSearch && matchCat && matchStatus;
    })
    .sort((a, b) => {
      if (sortField === "price") {
          const valA = parseFloat(a.price?.toString().replace("$", "") || "0");
          const valB = parseFloat(b.price?.toString().replace("$", "") || "0");
          return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc ? a.name?.localeCompare(b.name) : b.name?.localeCompare(a.name);
    });

  const cycleSort = (field: typeof sortField) => {
    if (sortField === field) setSortAsc((x) => !x);
    else { setSortField(field); setSortAsc(true); }
  };

  const openAdd = () => { resetForm(); setAddOpen(true); };
  const openEdit = (p: Product) => { setEditProduct(p); setForm({ name: p.name, category: p.category, ply: p.ply, moq: p.moq, price: p.price, status: p.status, featured: p.featured, description: p.description ?? "", materials: p.materials ?? "" }); };

  const toggleFeatured = (p: Product) => {
    updateMutation.mutate({ id: p._id, data: { featured: !p.featured } });
  };

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
              <button key={s} type="button" onClick={() => setForm({ ...form, status: s })} className={`px-4 py-2 rounded-xl text-xs font-black border transition-all ${form.status === s ? "bg-slate-950 text-white border-slate-950" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>{s}</button>
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

  if (error) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <div className="bg-rose-50 text-rose-500 p-6 rounded-3xl border border-rose-100 text-center max-w-md">
                <h2 className="text-xl font-black mb-2">Sync Error</h2>
                <p className="text-sm font-medium opacity-80">Failed to fetch the product catalog. Please ensure the backend server is running.</p>
                <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-widest">Retry Connection</button>
            </div>
        </div>
    );
  }

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
        {isLoading ? (
            Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-32" />)
        ) : (
          [
            { label: "Active SKUs", value: products.filter(p => p.status === "Active").length, icon: Package, color: "text-brand-600", bg: "bg-brand-50" },
            { label: "Featured", value: products.filter(p => p.featured).length, icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Drafts", value: products.filter(p => p.status === "Draft").length, icon: Edit2, color: "text-slate-400", bg: "bg-slate-50" },
            { label: "Last Created", value: products.length > 0 ? products[0].name.split(' ')[0] : "--", icon: ArrowUpDown, color: "text-emerald-600", bg: "bg-emerald-50" },
          ].map((s) => (
            <div key={s.label} className="premium-card p-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                <h3 className="text-3xl font-display font-black text-slate-900">{s.value}</h3>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${s.bg} ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Filters */}
      <div className="premium-card p-5 flex flex-col lg:flex-row gap-4 items-center bg-slate-50/40">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by name, category..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full glass-input pl-12 py-3" />
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {(["All", "Heavy", "Printed", "Custom", "Export", "Pharma", "Retail"] as const).map((c) => (
             <button
                key={c}
                onClick={() => setFilterCat(c)}
                className={clsx(
                  "px-5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap",
                  filterCat === c ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"
                )}
             >
                {c}
             </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <button onClick={() => cycleSort("name")} className="flex items-center gap-2 hover:text-slate-700 transition-colors">Product <ArrowUpDown className="w-3" /></button>
                </th>
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category / Ply</th>
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <button onClick={() => cycleSort("price")} className="flex items-center gap-2 hover:text-slate-700 transition-colors">Price <ArrowUpDown className="w-3" /></button>
                </th>
                <th className="px-7 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i}>
                        <td colSpan={5} className="px-7 py-5"><Skeleton className="h-12 w-full" /></td>
                    </tr>
                  ))
              ) : (
                sorted.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer" onClick={() => setViewProduct(p)}>
                    <td className="px-7 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-accent-50 group-hover:text-accent-500 transition-colors shrink-0 shadow-sm shadow-slate-900/5">
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 group-hover:text-accent-500 transition-colors">{p.name}</span>
                            {p.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                          </div>
                          <div className="text-[10px] font-mono font-black text-slate-300 uppercase tracking-widest mt-0.5 truncate max-w-37.5">{p.moq} MOQ • {p._id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-7 py-5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg border border-blue-100/50 uppercase tracking-tighter">{p.category}</span>
                        <span className="text-xs font-bold text-slate-400 font-mono italic">{p.ply}</span>
                      </div>
                    </td>
                    <td className="px-7 py-5">
                      <span className={`status-badge ${statusBadge[p.status] || 'badge-neutral'}`}>{p.status}</span>
                    </td>
                    <td className="px-7 py-5">
                      <span className="text-sm font-black text-slate-900 font-mono">{typeof p.price === 'string' && !p.price.startsWith('$') ? `$${p.price}` : p.price}</span>
                    </td>
                    <td className="px-7 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => { e.stopPropagation(); setViewProduct(p); }} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"><Eye className="w-4.5 h-4.5" /></button>
                        <button onClick={(e) => { e.stopPropagation(); openEdit(p); }} className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors"><Edit2 className="w-4.5 h-4.5" /></button>
                        <button onClick={(e) => { e.stopPropagation(); toggleFeatured(p); }} className="p-2.5 rounded-xl hover:bg-amber-50 text-slate-400 hover:text-amber-400 transition-colors"><Star className={`w-4.5 h-4.5 ${p.featured ? "fill-amber-400 text-amber-400" : ""}`} /></button>
                        <button onClick={(e) => { e.stopPropagation(); setDeleteTarget(p._id); }} className="p-2.5 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-colors"><Trash2 className="w-4.5 h-4.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={addOpen || !!editProduct} onClose={() => { setAddOpen(false); setEditProduct(null); resetForm(); }} title={addOpen ? "New Product" : "Edit SKU"} subtitle={editProduct?.name} size="lg">
        <div className="space-y-6">
           <FormContent />
           <div className="pt-4">
              <button disabled={isSaving} onClick={handleSave} className="w-full btn-primary justify-center shadow-accent-500/20 py-4 font-black">
                {isSaving ? "Syncing Logic..." : editProduct ? "Save Changes" : "Provision SKU"}
              </button>
           </div>
        </div>
      </Modal>

      <Modal isOpen={!!viewProduct} onClose={() => setViewProduct(null)} title={viewProduct?.name ?? ""} subtitle={`ID: ${viewProduct?._id} • ${viewProduct?.category} • ${viewProduct?.ply}`} size="lg">
        {viewProduct && (
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[{ label: "Category", value: viewProduct.category }, { label: "Ply", value: viewProduct.ply }, { label: "Base Price", value: typeof viewProduct.price === 'string' && !viewProduct.price.startsWith('$') ? `$${viewProduct.price}` : viewProduct.price }, { label: "Min Order Qty", value: viewProduct.moq }, { label: "Status", value: viewProduct.status }, { label: "Featured", value: viewProduct.featured ? "✅ Enabled" : "Disabled" }].map((f) => (
                <div key={f.label} className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{f.label}</p>
                  <p className="text-sm font-bold text-slate-900">{f.value}</p>
                </div>
              ))}
            </div>
            {viewProduct.description && (
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-3 ml-2">Product Mission</label>
                <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 text-slate-700 font-medium leading-relaxed italic">
                  "{viewProduct.description}"
                </div>
              </div>
            )}
            {viewProduct.materials && (
              <div className="bg-slate-50 p-6 rounded-3xl border border-dashed border-slate-200">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Material Pipeline</p>
                <p className="text-sm font-bold text-slate-700">{viewProduct.materials}</p>
              </div>
            )}
            <div className="pt-6 flex gap-4 border-t border-slate-50">
              <button onClick={() => { setDeleteTarget(viewProduct._id); setViewProduct(null); }} className="px-6 py-4 text-xs font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 rounded-2xl transition-all">Archieve SKU</button>
              <button onClick={() => { openEdit(viewProduct); setViewProduct(null); }} className="flex-1 btn-primary justify-center">Edit Specification</button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={() => deleteMutation.mutate(deleteTarget!)} title="Delete Product" message="This will permanently remove the product from the catalog. Are you sure?" confirmLabel="Delete Product" danger />
    </div>
  );
}

// Helper clsx like function
function clsx(...args: any[]) {
    return args.filter(Boolean).join(' ');
}
