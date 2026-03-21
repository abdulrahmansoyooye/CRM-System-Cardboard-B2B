import { Plus, Search, Edit2, Trash2, Eye, Star, Filter } from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
  { id: 1, name: "Heavy Duty Master Cartons", category: "Heavy", ply: "7-Ply", moq: "5,000", status: "Active",   featured: true  },
  { id: 2, name: "Custom Printed Boxes",       category: "Printed", ply: "5-Ply", moq: "2,000", status: "Active",   featured: false },
  { id: 3, name: "Die-Cut Corrugated",         category: "Custom",  ply: "5-Ply", moq: "1,500", status: "Active",   featured: false },
  { id: 4, name: "Export Packaging",           category: "Export",  ply: "7-Ply", moq: "10,000", status: "Active",  featured: true  },
  { id: 5, name: "Bulk Pallet Boxes",          category: "Heavy",   ply: "7-Ply", moq: "3,000", status: "Draft",    featured: false },
  { id: 6, name: "Corrugated Master Cartons",  category: "Heavy",   ply: "3-Ply", moq: "5,000", status: "Active",   featured: false },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your product catalog and specifications</p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="admin-card p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search products..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400">
          <option>All Categories</option>
          <option>Heavy</option>
          <option>Printed</option>
          <option>Custom</option>
          <option>Export</option>
        </select>
        <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400">
          <option>All Status</option>
          <option>Active</option>
          <option>Draft</option>
        </select>
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Ply</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">MOQ</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Featured</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {PRODUCTS.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-gray-800">{p.name}</td>
                <td className="px-6 py-4"><span className="badge badge-blue">{p.category}</span></td>
                <td className="px-6 py-4 text-gray-600 font-medium">{p.ply}</td>
                <td className="px-6 py-4 text-gray-600 font-mono text-xs">{p.moq}</td>
                <td className="px-6 py-4">
                  <span className={p.status === "Active" ? "badge badge-green" : "badge badge-gray"}>{p.status}</span>
                </td>
                <td className="px-6 py-4">
                  {p.featured ? <Star className="w-4 h-4 text-orange-400 fill-orange-400" /> : <Star className="w-4 h-4 text-gray-300" />}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-400 hover:text-blue-600 transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                    <Link href={`/dashboard/products/${p.id}`} className="p-1.5 rounded-lg hover:bg-orange-50 text-orange-400 hover:text-orange-600 transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></Link>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">Showing 6 of 24 products</span>
          <div className="flex gap-1">
            {[1,2,3,4].map((n) => (
              <button key={n} className={`w-8 h-8 text-xs font-bold rounded-lg ${n === 1 ? "bg-orange-500 text-white" : "text-gray-500 hover:bg-gray-100"} transition-colors`}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
