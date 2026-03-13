import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, LogOut, AlertCircle } from "lucide-react";
import PhotoUpload from "@/components/PhotoUpload";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

interface BlogPostData {
  id: number;
  title: string;
  category: string;
  date: string;
  author: string;
  content: string;
  excerpt: string;
  coverImage?: string;
}

export default function BlogEditor() {
  const [, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    author: "All Things Automated",
    content: "",
    excerpt: "",
    coverImage: "",
  });

  const handleNavigation = (path: string) => {
    scrollToTop();
    navigate(path);
  };

  // Check authentication on mount
  useEffect(() => {
    const session = localStorage.getItem("adminSession");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed.loggedIn) {
          setIsAuthenticated(true);
          loadPosts();
        }
      } catch {
        handleNavigation("/admin/login");
      }
    } else {
      handleNavigation("/admin/login");
    }
  }, []);

  const loadPosts = () => {
    const saved = localStorage.getItem("blogPosts");
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch {
        setPosts([]);
      }
    }
  };

  const savePosts = (updatedPosts: BlogPostData[]) => {
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.content) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingId !== null) {
      // Update existing post
      const updated = posts.map((p) =>
        p.id === editingId ? { ...formData, id: editingId } : p
      );
      savePosts(updated);
    } else {
      // Create new post
      const newPost: BlogPostData = {
        ...formData,
        id: Math.max(...posts.map((p) => p.id), 0) + 1,
      };
      savePosts([newPost, ...posts]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      author: "All Things Automated",
      content: "",
      excerpt: "",
      coverImage: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (post: BlogPostData) => {
    setFormData(post);
    setEditingId(post.id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const updated = posts.filter((p) => p.id !== id);
      savePosts(updated);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminSession");
    handleNavigation("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/logo.png"
                alt="All Things Automated Logo"
                className="h-10 w-auto"
              />
              <span className="text-sm font-semibold text-primary">Admin</span>
            </button>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Blog Editor</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">
                {isEditing ? "Edit Post" : "New Post"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Post title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  >
                    <option value="">Select category</option>
                    <option value="Smart Lighting">Smart Lighting</option>
                    <option value="Home Automation">Home Automation</option>
                    <option value="Security">Security</option>
                    <option value="Energy Management">Energy Management</option>
                    <option value="Voice Control">Voice Control</option>
                    <option value="Tips & Tricks">Tips & Tricks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    placeholder="Short summary of the post"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Image
                  </label>
                  <PhotoUpload
                    currentUrl={formData.coverImage}
                    onUpload={(url) =>
                      setFormData({ ...formData, coverImage: url })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
                    placeholder="Post content (supports markdown)"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {isEditing ? "Update Post" : "Create Post"}
                  </Button>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetForm}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700">
                  💡 Posts are saved locally in your browser. They will appear on the blog page immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Posts List */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Posts</h2>
                <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {posts.length} posts
                </span>
              </div>

              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No posts yet. Create your first post!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                    >
                      {post.coverImage && (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                      )}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                              {post.category}
                            </span>
                            <span>{post.date}</span>
                            <span>by {post.author}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(post)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {post.excerpt || post.content.substring(0, 100)}...
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
