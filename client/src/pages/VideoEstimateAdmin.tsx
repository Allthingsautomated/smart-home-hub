import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LogOut, Eye, FileText, Send, Trash2, Lock } from "lucide-react";

interface Submission {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  videoFile: string | null;
  submittedAt: string;
  status: "pending" | "reviewed" | "estimate_sent";
  estimate?: {
    description: string;
    amount: number;
    details: string;
  };
}

export default function VideoEstimateAdmin() {
  const [, navigate] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showEstimateForm, setShowEstimateForm] = useState(false);
  const [estimateForm, setEstimateForm] = useState({
    description: "",
    amount: "",
    details: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("videoSubmissions");
    if (stored) {
      setSubmissions(JSON.parse(stored));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedSubmission(null);
    navigate("/");
  };

  const handleViewSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowEstimateForm(false);
  };

  const handleGenerateEstimate = () => {
    setShowEstimateForm(true);
  };

  const handleSendEstimate = () => {
    if (!selectedSubmission || !estimateForm.description || !estimateForm.amount) {
      alert("Please fill in all estimate fields");
      return;
    }

    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === selectedSubmission.id) {
        return {
          ...sub,
          status: "estimate_sent" as const,
          estimate: {
            description: estimateForm.description,
            amount: parseFloat(estimateForm.amount),
            details: estimateForm.details,
          },
        };
      }
      return sub;
    });

    setSubmissions(updatedSubmissions);
    localStorage.setItem("videoSubmissions", JSON.stringify(updatedSubmissions));

    // Simulate sending email
    alert(`Estimate sent to ${selectedSubmission.email}`);

    setEstimateForm({ description: "", amount: "", details: "" });
    setShowEstimateForm(false);
    setSelectedSubmission(null);
  };

  const handleDeleteSubmission = (id: number) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      const updated = submissions.filter(sub => sub.id !== id);
      setSubmissions(updated);
      localStorage.setItem("videoSubmissions", JSON.stringify(updated));
      setSelectedSubmission(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <Lock className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-center text-gray-600 mb-6">Video Estimate Management</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Login to Dashboard
            </Button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-4">Demo password: admin123</p>
        </div>
      </div>
    );
  }

  const pendingCount = submissions.filter(s => s.status === "pending").length;
  const estimateSentCount = submissions.filter(s => s.status === "estimate_sent").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Video Estimate Admin</h1>
          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submissions List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Submissions</h2>
                <p className="text-sm text-gray-600 mt-1">{submissions.length} total</p>
              </div>

              {/* Stats */}
              <div className="p-4 space-y-3 border-b border-gray-200">
                <div className="bg-yellow-50 p-3 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>{pendingCount}</strong> Pending Review
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-green-800">
                    <strong>{estimateSentCount}</strong> Estimates Sent
                  </p>
                </div>
              </div>

              {/* Submissions List */}
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {submissions.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <p>No submissions yet</p>
                  </div>
                ) : (
                  submissions.map((submission) => (
                    <button
                      key={submission.id}
                      onClick={() => handleViewSubmission(submission)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition ${
                        selectedSubmission?.id === submission.id ? "bg-blue-50" : ""
                      }`}
                    >
                      <p className="font-semibold text-gray-900 text-sm">{submission.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{submission.serviceType}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          submission.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : submission.status === "reviewed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                          {submission.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-2">
            {selectedSubmission ? (
              <div className="bg-white rounded-lg shadow">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedSubmission.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Submitted {new Date(selectedSubmission.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => handleDeleteSubmission(selectedSubmission.id)}
                      className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                  </div>
                </div>

                {/* Client Info */}
                <div className="p-6 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Client Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{selectedSubmission.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{selectedSubmission.email}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium text-gray-900">{selectedSubmission.address}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600">Service Type</p>
                      <p className="font-medium text-gray-900 capitalize">{selectedSubmission.serviceType}</p>
                    </div>
                  </div>
                </div>

                {/* Video Section */}
                {selectedSubmission.videoFile && (
                  <div className="p-6 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Submitted Video</h4>
                    <div className="bg-gray-100 rounded-lg p-8 text-center">
                      <Eye className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Video: {selectedSubmission.videoFile}</p>
                      <p className="text-xs text-gray-500 mt-2">[Video playback would appear here]</p>
                    </div>
                  </div>
                )}

                {/* Estimate Section */}
                {selectedSubmission.estimate ? (
                  <div className="p-6 border-b border-gray-200 bg-green-50">
                    <h4 className="font-semibold text-gray-900 mb-4">Estimate Sent</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Description</p>
                        <p className="font-medium text-gray-900">{selectedSubmission.estimate.description}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Estimated Amount</p>
                        <p className="text-2xl font-bold text-green-600">${selectedSubmission.estimate.amount.toFixed(2)}</p>
                      </div>
                      {selectedSubmission.estimate.details && (
                        <div>
                          <p className="text-sm text-gray-600">Details</p>
                          <p className="text-gray-900">{selectedSubmission.estimate.details}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    {!showEstimateForm ? (
                      <div className="p-6">
                        <Button
                          onClick={handleGenerateEstimate}
                          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                          <FileText className="w-4 h-4" /> Generate Estimate
                        </Button>
                      </div>
                    ) : (
                      <div className="p-6 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimate Description
                          </label>
                          <input
                            type="text"
                            value={estimateForm.description}
                            onChange={(e) =>
                              setEstimateForm({ ...estimateForm, description: e.target.value })
                            }
                            placeholder="e.g., Smart Home Automation Package"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Estimated Amount ($)
                          </label>
                          <input
                            type="number"
                            value={estimateForm.amount}
                            onChange={(e) =>
                              setEstimateForm({ ...estimateForm, amount: e.target.value })
                            }
                            placeholder="5000"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Details
                          </label>
                          <textarea
                            value={estimateForm.details}
                            onChange={(e) =>
                              setEstimateForm({ ...estimateForm, details: e.target.value })
                            }
                            placeholder="Include project scope, timeline, materials, etc."
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex gap-3">
                          <Button
                            onClick={handleSendEstimate}
                            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                          >
                            <Send className="w-4 h-4" /> Send Estimate
                          </Button>
                          <Button
                            onClick={() => setShowEstimateForm(false)}
                            className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 transition"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-500">Select a submission to view details and generate an estimate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
