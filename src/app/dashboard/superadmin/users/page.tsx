'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { UserRole, UserProfile } from '@/types';
import { saveStoredUsers, getStoredUsers } from '@/lib/db';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Users, Shield, Award, CheckCircle2, UserCheck, Search, Sparkles } from 'lucide-react';

export default function SuperAdminUsersPage() {
  const { users, refreshState } = useAuth();
  const [search, setSearch] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    const all = getStoredUsers();
    const updated = all.map(u => u.uid === userId ? { ...u, role: newRole } : u);
    saveStoredUsers(updated);
    refreshState();
    setToastMsg(`Updated role for user to ${newRole}!`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const filteredUsers = users.filter(u =>
    u.displayName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {toastMsg && (
          <div className="p-4 bg-purple-900 text-purple-100 rounded-2xl border border-purple-400/30 flex items-center justify-between shadow-xl animate-in fade-in">
            <span className="text-xs font-bold">{toastMsg}</span>
            <button onClick={() => setToastMsg('')} className="text-purple-300 text-xs">Dismiss</button>
          </div>
        )}

        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-purple-50 text-purple-700 font-bold text-xs px-2.5 py-1 rounded-md border border-purple-200 uppercase tracking-wider">
                RBAC Access Control
              </span>
              <span className="text-xs text-slate-500 font-semibold">{users.length} Total Users</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-2">
              User Roles & Permissions Manager
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Dynamically promote, reassign, or configure any user&apos;s role across the 4 access tiers: <code>Trainee</code>, <code>Trainer</code>, <code>OfficeAdmin</code>, and <code>SuperAdmin</code>.
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user accounts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase text-slate-500">
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Current Role</th>
                  <th className="py-3.5 px-4">Active Levels</th>
                  <th className="py-3.5 px-4">Cohort</th>
                  <th className="py-3.5 px-4 text-right">Change Role (RBAC)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u.uid} className="hover:bg-slate-50">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs">
                          {u.displayName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{u.displayName}</p>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                        u.role === 'SuperAdmin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        u.role === 'OfficeAdmin' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        u.role === 'Trainer' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-700">
                      Level {u.activeLevels?.join(', ') || '1'}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-500 font-medium">
                      {u.cohort}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.uid, e.target.value as UserRole)}
                        className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:ring-1 focus:ring-purple-600 cursor-pointer"
                      >
                        <option value="Trainee">Trainee</option>
                        <option value="Trainer">Trainer</option>
                        <option value="OfficeAdmin">OfficeAdmin</option>
                        <option value="SuperAdmin">SuperAdmin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}