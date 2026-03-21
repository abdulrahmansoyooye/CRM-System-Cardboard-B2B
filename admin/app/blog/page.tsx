import { Plus, Search, Edit2, Trash2, Eye, FileText } from "lucide-react";
import Link from "next/link";

const POSTS = [
  { id: 1, title: "Understanding ECT vs. Burst Strength",       category: "Technical",    status: "Published", date: "Mar 5, 2026",  views: 1240 },
  { id: 2, title: "5-Ply vs 7-Ply: Which Board Is Right?",      category: "Insights",     status: "Published", date: "Feb 20, 2026", views: 843  },
  { id: 3, title: "Export Packaging Compliance Guide",           category: "Compliance",   status: "Published", date: "Feb 8, 2026",  views: 612  },
  { id: 4, title: "The Rise of Recycled Kraft Liner",            category: "Sustainability",status: "Draft",    date: "Jan 25, 2026", views: 0    },
  { id: 5, title: "Die-Cutting Technology for Custom Packaging", category: "Technical",    status: "Published", date: "Jan 10, 2026", views: 444  },
  { id: 6, title: "Pharma Cold-Chain Export Requirements",       category: "Industry",     status: "Draft",     date: "Dec 28, 2025", views: 0    },
];

const CATEGORY_BADGE: Record<string, string> = {
  Technical: "badge badge-blue",
  Insights: "badge badge-purple" ,
  Compliance: "badge badge-yellow",
  Sustainability: "badge badge-green",
  Industry: "badge badge-orange",
};

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Blog Management</h1>
          <p className="text-gray-500 text-sm mt-1">Create, edit, and publish blog articles</p>
        </div>
        <Link href="/dashboard/blog/new" className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="admin-card p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search posts..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>
        <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400">
          <option>All Categories</option>
          <option>Technical</option>
          <option>Insights</option>
          <option>Compliance</option>
          <option>Sustainability</option>
        </select>
        <select className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
      </div>

      <div className="admin-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Views</th>
              <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {POSTS.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="font-semibold text-gray-800">{post.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4"><span className={CATEGORY_BADGE[post.category] || "badge badge-gray"}>{post.category}</span></td>
                <td className="px-6 py-4"><span className={post.status === "Published" ? "badge badge-green" : "badge badge-gray"}>{post.status}</span></td>
                <td className="px-6 py-4 text-gray-400 text-xs">{post.date}</td>
                <td className="px-6 py-4 text-gray-600 font-mono text-xs">{post.views > 0 ? post.views.toLocaleString() : "—"}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-400 hover:text-blue-600 transition-colors"><Eye className="w-4 h-4" /></button>
                    <Link href={`/dashboard/blog/${post.id}`} className="p-1.5 rounded-lg hover:bg-orange-50 text-orange-400 hover:text-orange-600 transition-colors"><Edit2 className="w-4 h-4" /></Link>
                    <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">Showing 6 of 18 posts</span>
          <div className="flex gap-1">
            {[1,2,3].map((n) => (
              <button key={n} className={`w-8 h-8 text-xs font-bold rounded-lg ${n === 1 ? "bg-orange-500 text-white" : "text-gray-500 hover:bg-gray-100"} transition-colors`}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
