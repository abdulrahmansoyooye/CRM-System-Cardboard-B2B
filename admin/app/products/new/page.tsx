import { ArrowLeft, Save, Upload, Star } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/products" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Add New Product</h1>
          <p className="text-gray-500 text-sm mt-0.5">Fill in product details and specifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="admin-card p-6 space-y-5">
            <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-3">Basic Information</h2>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Product Name *</label>
              <input type="text" placeholder="e.g. Heavy Duty Master Cartons" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Category *</label>
                <select className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400">
                  <option>Heavy</option>
                  <option>Printed</option>
                  <option>Custom</option>
                  <option>Export</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Ply Count *</label>
                <select className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400">
                  <option>3-Ply</option>
                  <option>5-Ply</option>
                  <option>7-Ply</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Short Description</label>
              <textarea rows={3} placeholder="Brief product description shown on product listings..." className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Full Description</label>
              <textarea rows={6} placeholder="Detailed product description..." className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
            </div>
          </div>

          <div className="admin-card p-6 space-y-5">
            <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-3">Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "ECT Rating", placeholder: "e.g. 32 ECT" },
                { label: "Burst Strength (kg/cm²)", placeholder: "e.g. 20 - 45" },
                { label: "GSM Range", placeholder: "e.g. 150 - 300 GSM" },
                { label: "Flute Type", placeholder: "e.g. A, B/C, E-Flute" },
                { label: "MOQ", placeholder: "e.g. 5,000 units" },
                { label: "Lead Time", placeholder: "e.g. 10-15 Business Days" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{f.label}</label>
                  <input type="text" placeholder={f.placeholder} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              ))}
            </div>
          </div>

          <div className="admin-card p-6 space-y-5">
            <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-3">SEO Settings</h2>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Meta Title</label>
              <input type="text" placeholder="SEO Title..." className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Meta Description</label>
              <textarea rows={2} placeholder="SEO Description..." className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">URL Slug</label>
              <div className="flex">
                <span className="px-3 py-2.5 text-sm bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-gray-500 font-mono">/products/</span>
                <input type="text" placeholder="product-slug" className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-r-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 font-mono" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="admin-card p-6 space-y-4">
            <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-3">Publish</h2>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Status</label>
              <select className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option>Draft</option>
                <option>Active</option>
              </select>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input type="checkbox" className="sr-only" />
                <div className="w-10 h-5 bg-gray-200 rounded-full"></div>
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"></div>
              </div>
              <span className="text-sm font-semibold text-gray-600 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-orange-400" /> Featured Product
              </span>
            </label>
            <div className="flex gap-3 pt-2">
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Save
              </button>
              <Link href="/dashboard/products" className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold py-2.5 rounded-xl transition-colors text-center flex items-center justify-center">
                Cancel
              </Link>
            </div>
          </div>

          <div className="admin-card p-6 space-y-4">
            <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-3">Product Images</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-orange-300 transition-colors cursor-pointer group">
              <Upload className="w-8 h-8 text-gray-300 group-hover:text-orange-400 mx-auto mb-2 transition-colors" />
              <p className="text-sm font-semibold text-gray-500">Drop images or click to upload</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB each</p>
            </div>
          </div>

          <div className="admin-card p-6 space-y-4">
            <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-3">Customization</h2>
            {[
              { label: "Custom Dimensions", val: true },
              { label: "Flexo Printing", val: true },
              { label: "Water-Resistant Coat", val: false },
              { label: "Wax Inside Liner", val: false },
            ].map((opt) => (
              <label key={opt.label} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-gray-600">{opt.label}</span>
                <input type="checkbox" defaultChecked={opt.val} className="accent-orange-500 w-4 h-4" />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
