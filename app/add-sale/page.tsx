"use client";

import { useActionState, useRef } from "react";
import { addSale, SaleFormState } from "@/app/actions";
import { CheckCircle2, AlertCircle, PlusCircle } from "lucide-react";

const CATEGORIES = ["Clothing", "Electronics", "Food & Beverage", "Home & Garden", "Services"];
const STATUSES = ["Completed", "Processing", "Shipped", "Returned"];
const PAYMENT_METHODS = ["Cash", "Credit Card", "Bank Transfer"];

const initialState: SaleFormState = { success: false };

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-400 tracking-wide">
        {label}
        {required && <span className="ml-1 text-indigo-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg bg-white/[0.05] border border-white/[0.08] px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20";

const selectClass =
  "w-full rounded-lg bg-[#0d1117] border border-white/[0.08] px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 appearance-none";

export default function AddSalePage() {
  const [state, formAction, pending] = useActionState(addSale, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form on success
  if (state.success && formRef.current) {
    formRef.current.reset();
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight">Add New Sale</h1>
        <p className="mt-1 text-sm text-slate-500">Record a new business transaction in the database.</p>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-[#0d1117] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.6)] p-6">
        {state.success && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
            <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-400" />
            <p className="text-sm text-emerald-300 font-medium">Sale recorded successfully!</p>
          </div>
        )}

        {state.error && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
            <AlertCircle size={17} className="mt-0.5 shrink-0 text-red-400" />
            <p className="text-sm text-red-300">{state.error}</p>
          </div>
        )}

        <form ref={formRef} action={formAction} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Date */}
          <Field label="Date" required>
            <input
              type="date"
              name="date"
              required
              defaultValue={new Date().toISOString().slice(0, 10)}
              className={inputClass + " [color-scheme:dark]"}
            />
          </Field>

          {/* Amount */}
          <Field label="Amount (SAR)" required>
            <input
              type="number"
              name="amount_sar"
              required
              min="0.01"
              step="0.01"
              placeholder="0.00"
              className={inputClass}
            />
          </Field>

          {/* Product */}
          <Field label="Product" required>
            <input
              type="text"
              name="product"
              required
              placeholder="e.g. Wireless Headphones"
              className={inputClass}
            />
          </Field>

          {/* Category */}
          <Field label="Category" required>
            <div className="relative">
              <select name="category" required defaultValue="" className={selectClass}>
                <option value="" disabled>Select category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">▾</span>
            </div>
          </Field>

          {/* Status */}
          <Field label="Status" required>
            <div className="relative">
              <select name="status" required defaultValue="" className={selectClass}>
                <option value="" disabled>Select status</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">▾</span>
            </div>
          </Field>

          {/* Payment Method */}
          <Field label="Payment Method">
            <div className="relative">
              <select name="payment_method" defaultValue="" className={selectClass}>
                <option value="">None</option>
                {PAYMENT_METHODS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">▾</span>
            </div>
          </Field>

          {/* Customer Name */}
          <Field label="Customer Name">
            <input
              type="text"
              name="customer_name"
              placeholder="Optional"
              className={inputClass}
            />
          </Field>

          {/* Notes */}
          <Field label="Notes">
            <input
              type="text"
              name="notes"
              placeholder="Optional"
              className={inputClass}
            />
          </Field>

          {/* Submit */}
          <div className="sm:col-span-2 pt-1">
            <button
              type="submit"
              disabled={pending}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5 text-sm font-semibold text-white transition-colors shadow-[0_4px_16px_-4px_rgba(99,102,241,0.5)]"
            >
              <PlusCircle size={16} />
              {pending ? "Saving…" : "Save Sale"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
