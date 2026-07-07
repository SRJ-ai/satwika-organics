"use client";

import { MapPin, Plus, MoreVertical } from "lucide-react";

export default function AddressPage() {
  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "Satwika Member",
      address: "123 Organic Lane, Green City, 500081",
      phone: "+91 98765 43210",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      name: "Satwika Member",
      address: "456 Tech Park, Cyber City, 500082",
      phone: "+91 98765 43210",
      isDefault: false,
    }
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-serif text-primary font-bold mb-2">My Addresses</h2>
          <p className="text-base-content/60">Manage your shipping and billing addresses.</p>
        </div>
        <button className="btn btn-primary gap-2 self-start sm:self-auto">
          <Plus size={18} />
          Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className={`bg-base-100 rounded-2xl border p-6 relative ${addr.isDefault ? 'border-primary shadow-sm' : 'border-base-300'}`}>
            {addr.isDefault && (
              <span className="absolute top-4 right-14 badge badge-primary badge-sm text-xs">Default</span>
            )}
            <div className="dropdown dropdown-end absolute top-4 right-4">
              <label tabIndex={0} className="btn btn-ghost btn-xs btn-square">
                <MoreVertical size={16} />
              </label>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 border border-base-200">
                <li><a>Edit</a></li>
                {!addr.isDefault && <li><a>Set Default</a></li>}
                <li><a className="text-error">Delete</a></li>
              </ul>
            </div>
            
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-base-200 rounded-full text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{addr.type}</h3>
                <p className="font-medium text-base-content/80 mt-1">{addr.name}</p>
                <p className="text-sm text-base-content/60 mt-1 leading-relaxed max-w-[200px]">{addr.address}</p>
                <p className="text-sm text-base-content/60 mt-1">{addr.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
