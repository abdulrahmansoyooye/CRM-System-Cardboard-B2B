import { ArrowLeft, Save, Upload } from "lucide-react";
import Link from "next/link";

export default function NewBlogPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/blog" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">New Blog Post</h1>
          <p className="text-gray-500 text-sm mt-0.5">Write and publish a new article</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="admin-card p-6 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Post Title *</label>
              <input type="text" placeholder="Enter article title..." className="w-full px-4 py-3 text-base font-semibold border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Excerpt / Summary</label>
              <textarea rows={2} placeholder="Short description shown in blog listings..." className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Article Content *</label>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex gap-2 text-xs text-gray-500 font-semibold">
                  <button className="px-2 py-1 rounded hover:bg-white font-bold">B</button>
                  <button className="px-2 py-1 rounded hover:bg-white italic">I</button>
                  <button className="px-2 py-1 rounded hover:bg-white underline">U</button>
                  <span className="mx-1 border-r border-gray-300" />
                  <button className="px-2 py-1 rounded hover:bg-white">H1</button>
                  <button className="px-2 py-1 rounded hover:bg-white">H2</button>
                  <button className="px-2 py-1 rounded hover:bg-white">H3</button>
                  <span className="mx-1 border-r border-gray-300" />
                  <button className="px-2 py-1 rounded hover:bg-white">Link</button>
                  <button className="px-2 py-1 rounded hover:bg-white">Image</button>
                </div>
                <textarea rows={16} placeholder="Write your article content here..." className="w-full px-4 py-3 text-sm border-0 bg-white focus:outline-none resize-none" />
              </div>
            </div>
          </div>

          <div className="admin-card p-6 space-y-5">
            <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-3">SEO Settings</h2>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Meta Title</label>
              <input type="text" placeholder="SEO optimized title..." className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Meta Description</label>
              <textarea rows={2} placeholder="SEO meta description (max 160 chars)..." className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">URL Slug (auto-generated)</label>
              <div className="flex">
                <span className="px-3 py-2.5 text-sm bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg text-gray-500 font-mono">/blog/</span>
                <input type="text" placeholder="article-slug" className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-r-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 font-mono" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="admin-card p-6 space-y-4">
            <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-3">Publish</h2>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Status</label>
              <select className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option>Draft</option>
                <option>Published</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Category</label>
              <select className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400">
                <option>Technical Guide</option>
                <option>Packaging Insights</option>
                <option>Export & Compliance</option>
                <option>Sustainability</option>
                <option>Industry Focus</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Save className="w-4 h-4" /> Publish
              </button>
              <Link href="/dashboard/blog" className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold py-2.5 rounded-xl text-center flex items-center justify-center">
                Cancel
              </Link>
            </div>
          </div>

          <div className="admin-card p-6 space-y-4">
            <h2 className="font-bold text-gray-800 border-b border-gray-100 pb-3">Feature Image</h2>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-orange-300 transition-colors cursor-pointer group">
              <Upload className="w-8 h-8 text-gray-300 group-hover:text-orange-400 mx-auto mb-2 transition-colors" />
              <p className="text-sm font-semibold text-gray-500">Upload cover image</p>
              <p className="text-xs text-gray-400 mt-1">Recommended: 1200×630px</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
