"use client";

import React from "react";
import { useDashboardQuery, useDashboardMutation } from "@/lib/hooks/useDashboardQuery";
import { getUsers, createUser, updateUser, deleteUser } from "@/services/user.service";
import { DataTable } from "@/components/dashboard/shared/DataTable";
import { ConfirmDialog } from "@/components/dashboard/shared/ConfirmDialog";
import { useModal } from "@/lib/store/useModalStore";
import { Plus, User, Mail, Edit2, Trash2, ShieldCheck, UserMinus, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormLayout, FormSection, FormInput, FormSelect } from "@/components/dashboard/shared/FormLayout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const userSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.enum(['super_admin', 'admin', 'content_manager', 'hr_manager', 'sales_manager']),
  password: z.string().min(6, "Password must be at least 6 chars").optional().or(z.literal("")),
  isActive: z.boolean(),
});

interface UserFormValues {
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'content_manager' | 'hr_manager' | 'sales_manager';
  password?: string;
  isActive: boolean;
}

export function TeamSettings() {
  const { openModal, closeModal } = useModal();
  const query = useDashboardQuery(["users"], getUsers);
  const users = React.useMemo(() => (Array.isArray(query.data?.data) ? query.data.data : []), [query.data]);

  const createMutation = useDashboardMutation(createUser, "Operator provisioned successfully", [["users"]]);
  const updateMutation = useDashboardMutation(({ id, data }: any) => updateUser(id, data), "Clearance updated", [["users"]]);
  const deleteMutation = useDashboardMutation(deleteUser, "Access revoked", [["users"]]);

  const openFormModal = (user?: any) => {
    openModal({
      title: user ? "Refine Clearance" : "Provision Operator",
      subtitle: user ? `Recalibrating permissions for ${user.name}` : "Grant system access to a new mission member",
      size: "md",
      view: (
        <UserForm 
            initialData={user} 
            isSubmitting={createMutation.isPending || updateMutation.isPending}
            onSubmit={(data) => {
                if (user) {
                    updateMutation.mutate({ id: user._id, data });
                } else {
                    createMutation.mutate(data);
                }
                closeModal();
            }}
        />
      ),
    });
  };

  const openDeleteModal = (user: any) => {
    openModal({
        title: "Revoke System Access",
        size: "sm",
        view: (
            <ConfirmDialog 
                title="Terminate Session?"
                message={`Are you sure you want to permanently decommission access for ${user.name}? This will sever all active API links.`}
                confirmText="Revoke Access"
                onConfirm={() => {
                    deleteMutation.mutate(user._id);
                    closeModal();
                }}
                onCancel={closeModal}
                isLoading={deleteMutation.isPending}
            />
        )
    })
  };

  const columns = [
    {
      header: "Operator Identification",
      accessorKey: "name",
      cell: (u: any) => (
        <div className="flex items-center gap-4 py-1">
          <div className="w-10 h-10 bg-brand-950 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-all shadow-lg font-black text-sm">
            {u.name[0]}
          </div>
          <div>
            <h4 className="font-black text-brand-950 leading-tight">{u.name}</h4>
            <span className="text-[10px] font-bold text-brand-500 truncate block max-w-40 uppercase tracking-widest">{u.email}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Clearance",
      accessorKey: "role",
      cell: (u: any) => (
        <span className={cn("status-badge uppercase tracking-widest text-[9px] font-black", u.role === 'super_admin' ? "badge-success" : "badge-neutral")}>
          {u.role.replace('_', ' ')}
        </span>
      ),
    },
    {
        header: "Telemetry",
        accessorKey: "isActive",
        cell: (u: any) => (
            <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", u.isActive ? "bg-emerald-500 animate-pulse" : "bg-brand-300")} />
                <span className={cn("text-[10px] font-black uppercase tracking-widest", u.isActive ? "text-emerald-600" : "text-brand-500")}>
                    {u.isActive ? "Connected" : "Offline"}
                </span>
            </div>
        )
    },
    {
      header: "Actions",
      accessorKey: "actions",
      className: "text-right",
      cell: (u: any) => (
        <div className="flex items-center justify-end gap-1">
          <button onClick={() => openFormModal(u)} className="p-2 rounded-lg hover:bg-brand-100 text-brand-500 hover:text-brand-900 transition-all"><Edit2 className="w-4 h-4" /></button>
          <button onClick={() => openDeleteModal(u)} className="p-2 rounded-lg hover:bg-rose-50 text-brand-500 hover:text-rose-500 transition-all"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="premium-card p-8 space-y-8 min-h-[500px]">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-950 rounded-2xl flex items-center justify-center text-white">
                <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
                <h2 className="text-xl font-display font-black text-brand-950 tracking-tight">Security Personnel</h2>
                <p className="text-xs text-brand-500 font-bold uppercase tracking-widest mt-0.5">Manage administrative hierarchy and system access</p>
            </div>
        </div>
        <button onClick={() => openFormModal()} className="btn-primary py-3 px-6 shadow-xl shadow-brand-950/20 bg-brand-950 hover:bg-brand-900">
          <Plus className="w-4 h-4" /> Provision Operator
        </button>
      </div>

      <DataTable 
        data={users}
        columns={columns}
        isLoading={query.isLoading}
        searchKey="name"
        searchPlaceholder="Identify operator by name or alias..."
        emptyTitle="No Personnel Detected"
      />
    </div>
  );
}

function UserForm({ initialData, onSubmit, isSubmitting }: { initialData?: any, onSubmit: (data: any) => void, isSubmitting: boolean }) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: initialData?.name || "",
            email: initialData?.email || "",
            role: initialData?.role || "admin",
            isActive: initialData?.isActive ?? true,
        }
    });

    return (
        <FormLayout onSubmit={handleSubmit(onSubmit)} isSubmitting={isSubmitting} submitLabel={initialData ? "Update Clearance" : "Provision Operator"}>
            <FormSection title="Operator Identity">
                <FormInput label="Full Name" placeholder="e.g. John Doe" error={errors.name?.message} {...register("name")} />
                <FormInput label="Communication Channel (Email)" type="email" placeholder="john@cardbox.demo" error={errors.email?.message} {...register("email")} />
            </FormSection>

            <FormSection title="Access Protocol">
                <FormSelect label="Clearance Level" error={errors.role?.message} {...register("role")}>
                    <option value="super_admin">Super Admin (L1)</option>
                    <option value="admin">Admin (L2)</option>
                    <option value="content_manager">Content Manager</option>
                    <option value="hr_manager">HR Manager</option>
                    <option value="sales_manager">Sales Manager</option>
                </FormSelect>
                {!initialData && (
                    <FormInput label="Access Key (Password)" type="password" placeholder="••••••••" error={errors.password?.message} {...register("password")} />
                )}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-500 px-1">Operational State</label>
                    <select {...register("isActive", { setValueAs: (v) => v === "true" })} className="glass-input">
                        <option value="true">Authorized (Active)</option>
                        <option value="false">Decommissioned (Inactive)</option>
                    </select>
                </div>
            </FormSection>
        </FormLayout>
    )
}
