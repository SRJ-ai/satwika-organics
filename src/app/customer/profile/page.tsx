"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-primary font-bold mb-2">Profile & Security</h2>
        <p className="text-base-content/60">Manage your personal information and password.</p>
      </div>

      <div className="bg-base-100 rounded-2xl border border-base-300 p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          <h3 className="font-semibold text-lg border-b border-base-200 pb-2 mb-4">Personal Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">First Name</span>
              </label>
              <input type="text" defaultValue="Satwika" className="input input-bordered focus:input-primary bg-base-200/50" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">Last Name</span>
              </label>
              <input type="text" defaultValue="Member" className="input input-bordered focus:input-primary bg-base-200/50" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">Email Address</span>
              </label>
              <input type="email" defaultValue="member@satwika.in" className="input input-bordered focus:input-primary bg-base-200/50" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">Phone Number</span>
              </label>
              <input type="tel" defaultValue="+91 98765 43210" className="input input-bordered focus:input-primary bg-base-200/50" />
            </div>
          </div>

          <h3 className="font-semibold text-lg border-b border-base-200 pb-2 mb-4 mt-8">Change Password</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">Current Password</span>
              </label>
              <input type="password" placeholder="••••••••" className="input input-bordered focus:input-primary bg-base-200/50" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">New Password</span>
              </label>
              <input type="password" placeholder="••••••••" className="input input-bordered focus:input-primary bg-base-200/50" />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8 pt-4">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
            </button>
            {saved && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="text-success text-sm font-medium"
              >
                Changes saved successfully!
              </motion.span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
