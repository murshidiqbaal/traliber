'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Edit2,
  Eye,
  EyeOff,
  GalleryHorizontal,
  Loader2,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { convertToWebP, ImageConvertError } from '@/lib/image-converter';
import type { ShowcaseGalleryItem } from '@/lib/showcase';

// ─── Constants ─────────────────────────────────────────────────────────────────

const PREDEFINED_CATEGORIES = [
  'Travel',
  'Travel Essentials',
  'Product Showcase',
  'Lifestyle',
  'Adventures',
  'Behind the Scenes',
];

const AUTH_HEADER = { Authorization: 'Bearer traliber_admin_auth' };

// ─── Types ────────────────────────────────────────────────────────────────────

interface UploadFile {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'converting' | 'uploading' | 'done' | 'error';
  progress: number;
  error?: string;
  result?: { image_url: string; storage_path: string };
}

interface EditForm {
  title: string;
  description: string;
  alt_text: string;
  category: string;
  display_order: number;
  is_published: boolean;
}

// ─── API helpers ──────────────────────────────────────────────────────────────

async function apiGet(): Promise<ShowcaseGalleryItem[]> {
  const res = await fetch('/api/showcase', { headers: AUTH_HEADER });
  if (!res.ok) throw new Error((await res.json()).error ?? 'Failed to fetch');
  const json = await res.json();
  return json.items as ShowcaseGalleryItem[];
}

async function apiCreate(data: Omit<ShowcaseGalleryItem, 'id' | 'created_at' | 'updated_at'>): Promise<ShowcaseGalleryItem> {
  const res = await fetch('/api/showcase', {
    method: 'POST',
    headers: { ...AUTH_HEADER, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error ?? 'Failed to create');
  return (await res.json()).item;
}

async function apiUpdate(id: string, data: Partial<ShowcaseGalleryItem>): Promise<ShowcaseGalleryItem> {
  const res = await fetch(`/api/showcase/${id}`, {
    method: 'PATCH',
    headers: { ...AUTH_HEADER, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error((await res.json()).error ?? 'Failed to update');
  return (await res.json()).item;
}

async function apiDelete(id: string, storage_path: string): Promise<void> {
  const res = await fetch(`/api/showcase/${id}`, {
    method: 'DELETE',
    headers: { ...AUTH_HEADER, 'Content-Type': 'application/json' },
    body: JSON.stringify({ storage_path }),
  });
  if (!res.ok) throw new Error((await res.json()).error ?? 'Failed to delete');
}

async function apiUpload(blob: Blob, filename: string): Promise<{ image_url: string; storage_path: string }> {
  const formData = new FormData();
  formData.append('file', blob, filename.split('/').pop() ?? 'image.webp');
  formData.append('filename', filename);
  const res = await fetch('/api/showcase/upload', {
    method: 'POST',
    headers: AUTH_HEADER,
    body: formData,
  });
  if (!res.ok) throw new Error((await res.json()).error ?? 'Upload failed');
  return res.json();
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
}

function UploadZone({ onFilesSelected }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    onFilesSelected(Array.from(files));
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
        isDragging
          ? 'border-[#8657F6] bg-[#8657F6]/5'
          : 'border-[#8657F6]/30 hover:border-[#8657F6]/60 hover:bg-[#8657F6]/3'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Upload className="w-8 h-8 mx-auto mb-3 text-[#8657F6]/60" />
      <p className="text-sm font-bold text-[#22213A]">
        {isDragging ? 'Drop images here' : 'Drag & drop images or click to browse'}
      </p>
      <p className="text-xs text-[#22213A]/50 mt-1">
        JPEG, PNG, WebP, GIF · Max 10 MB each · Auto-converted to WebP
      </p>
    </div>
  );
}

// ─── Upload Item Row ──────────────────────────────────────────────────────────

function UploadItem({ item, onRemove }: { item: UploadFile; onRemove: () => void }) {
  const statusColors: Record<UploadFile['status'], string> = {
    pending: 'text-gray-400',
    converting: 'text-amber-500',
    uploading: 'text-[#4F75FF]',
    done: 'text-emerald-600',
    error: 'text-rose-500',
  };
  const statusLabels: Record<UploadFile['status'], string> = {
    pending: 'Pending',
    converting: 'Converting to WebP...',
    uploading: 'Uploading...',
    done: 'Uploaded',
    error: 'Error',
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F7FC] border border-[#8657F6]/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.preview} alt={item.file.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-[#22213A] truncate">{item.file.name}</p>
        <p className={`text-3xs font-bold mt-0.5 ${statusColors[item.status]}`}>
          {item.status === 'error' ? item.error : statusLabels[item.status]}
        </p>
        {(item.status === 'converting' || item.status === 'uploading') && (
          <div className="mt-1 h-1 bg-[#8657F6]/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8657F6] rounded-full transition-all duration-300"
              style={{ width: `${item.progress}%` }}
            />
          </div>
        )}
      </div>
      {item.status === 'done' ? (
        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
      ) : item.status === 'error' ? (
        <button onClick={onRemove} className="text-rose-400 hover:text-rose-600 flex-shrink-0">
          <X className="w-4 h-4" />
        </button>
      ) : item.status === 'pending' ? (
        <button onClick={onRemove} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
          <X className="w-4 h-4" />
        </button>
      ) : (
        <Loader2 className="w-4 h-4 animate-spin text-[#8657F6] flex-shrink-0" />
      )}
    </div>
  );
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────

interface EditModalProps {
  item: ShowcaseGalleryItem | null;
  isNew?: boolean;
  newImageData?: { image_url: string; storage_path: string };
  onSave: (data: EditForm) => Promise<void>;
  onClose: () => void;
}

function EditModal({ item, isNew, newImageData, onSave, onClose }: EditModalProps) {
  const [form, setForm] = useState<EditForm>({
    title: item?.title ?? '',
    description: item?.description ?? '',
    alt_text: item?.alt_text ?? '',
    category: item?.category ?? 'Travel',
    display_order: item?.display_order ?? 0,
    is_published: item?.is_published ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof EditForm>(key: K, value: EditForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Title is required.'); return; }
    setSaving(true);
    setError(null);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#22213A]">
            {isNew ? 'Add Gallery Image' : 'Edit Gallery Image'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image preview */}
        {(item?.image_url || newImageData?.image_url) && (
          <div className="px-6 pt-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item?.image_url ?? newImageData?.image_url}
              alt="Preview"
              className="w-full h-40 object-cover rounded-2xl"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="text-3xs font-bold uppercase tracking-wider text-[#22213A]/60 mb-1 block">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="e.g. Exploring the Himalayas"
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-3xs font-bold uppercase tracking-wider text-[#22213A]/60 mb-1 block">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              rows={2}
              placeholder="Short caption or description"
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6] resize-none"
            />
          </div>

          {/* Alt text */}
          <div>
            <label className="text-3xs font-bold uppercase tracking-wider text-[#22213A]/60 mb-1 block">
              Alt Text (for accessibility & SEO)
            </label>
            <input
              value={form.alt_text}
              onChange={(e) => set('alt_text', e.target.value)}
              placeholder="Describe the image for screen readers"
              className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
            />
          </div>

          {/* Category + Display Order (row) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-3xs font-bold uppercase tracking-wider text-[#22213A]/60 mb-1 block">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
              >
                {PREDEFINED_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-3xs font-bold uppercase tracking-wider text-[#22213A]/60 mb-1 block">
                Display Order
              </label>
              <input
                type="number"
                value={form.display_order}
                onChange={(e) => set('display_order', Number(e.target.value))}
                min={0}
                className="w-full px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
              />
            </div>
          </div>

          {/* Published toggle */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div
              onClick={() => set('is_published', !form.is_published)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                form.is_published ? 'bg-emerald-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                  form.is_published ? 'translate-x-5' : ''
                }`}
              />
            </div>
            <span className="text-xs font-bold text-[#22213A]">
              {form.is_published ? 'Published (visible on website)' : 'Draft (hidden from website)'}
            </span>
          </label>

          {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 text-xs font-bold bg-[#8657F6] text-white rounded-xl hover:bg-[#6d3fd4] transition-all disabled:opacity-60 flex items-center gap-2"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Gallery Item Card ────────────────────────────────────────────────────────

interface ItemCardProps {
  item: ShowcaseGalleryItem;
  onEdit: () => void;
  onTogglePublish: () => void;
  onDelete: () => void;
}

function ItemCard({ item, onEdit, onTogglePublish, onDelete }: ItemCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#8657F6]/15 shadow-sm overflow-hidden group">
      <div className="relative aspect-[4/3] bg-[#F8F7FC]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image_url}
          alt={item.alt_text || item.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Status badge */}
        <div className={`absolute top-2 right-2 text-3xs font-bold px-2 py-0.5 rounded-full ${
          item.is_published ? 'bg-emerald-500 text-white' : 'bg-gray-700/80 text-white'
        }`}>
          {item.is_published ? 'Published' : 'Draft'}
        </div>
        {/* Order badge */}
        <div className="absolute top-2 left-2 text-3xs font-bold px-2 py-0.5 rounded-full bg-black/50 text-white">
          #{item.display_order}
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div>
          <p className="text-xs font-bold text-[#22213A] truncate">{item.title}</p>
          <p className="text-3xs text-[#8657F6] font-medium mt-0.5">{item.category}</p>
          {item.description && (
            <p className="text-3xs text-[#22213A]/50 mt-1 line-clamp-2">{item.description}</p>
          )}
        </div>

        <div className="flex items-center gap-1.5 pt-1">
          <button
            onClick={onEdit}
            title="Edit"
            className="flex-1 py-1.5 rounded-lg bg-[#8657F6]/10 hover:bg-[#8657F6]/20 text-[#8657F6] text-3xs font-bold flex items-center justify-center gap-1 transition-all"
          >
            <Edit2 className="w-3 h-3" /> Edit
          </button>
          <button
            onClick={onTogglePublish}
            title={item.is_published ? 'Unpublish' : 'Publish'}
            className={`flex-1 py-1.5 rounded-lg text-3xs font-bold flex items-center justify-center gap-1 transition-all ${
              item.is_published
                ? 'bg-amber-50 hover:bg-amber-100 text-amber-600'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600'
            }`}
          >
            {item.is_published ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            {item.is_published ? 'Unpublish' : 'Publish'}
          </button>
          <button
            onClick={onDelete}
            title="Delete"
            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-500 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Component ─────────────────────────────────────────────────────

export default function ShowcaseAdmin() {
  const [items, setItems] = useState<ShowcaseGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Upload state
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [pendingNewItems, setPendingNewItems] = useState<{ image_url: string; storage_path: string }[]>([]);

  // Edit state
  const [editingItem, setEditingItem] = useState<ShowcaseGalleryItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // New item after upload
  const [newItemImageData, setNewItemImageData] = useState<{ image_url: string; storage_path: string } | null>(null);
  const [isNewItemModalOpen, setIsNewItemModalOpen] = useState(false);

  // Notification
  const [notification, setNotification] = useState<string | null>(null);
  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGet();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load gallery');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      void loadItems();
    });
  }, [loadItems]);

  // Filtered view
  const filtered = items.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'published' && item.is_published) ||
      (filterStatus === 'draft' && !item.is_published);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const allCategories = Array.from(new Set(items.map((i) => i.category)));
  const publishedCount = items.filter((i) => i.is_published).length;
  const draftCount = items.filter((i) => !i.is_published).length;

  // ── Upload flow ──

  const handleFilesSelected = (files: File[]) => {
    const newFiles: UploadFile[] = files.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      preview: URL.createObjectURL(f),
      status: 'pending',
      progress: 0,
    }));
    setUploadFiles((prev) => [...prev, ...newFiles]);
  };

  const removeUploadFile = (id: string) => {
    setUploadFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const updateFileState = (id: string, updates: Partial<UploadFile>) => {
    setUploadFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const handleUploadAll = async () => {
    const pending = uploadFiles.filter((f) => f.status === 'pending');
    if (pending.length === 0) return;

    setIsUploading(true);
    const successItems: { image_url: string; storage_path: string }[] = [];

    for (const uploadFile of pending) {
      // Step 1: Convert
      updateFileState(uploadFile.id, { status: 'converting', progress: 20 });
      let blob: Blob;
      let filename: string;
      try {
        const result = await convertToWebP(uploadFile.file);
        blob = result.blob;
        filename = result.filename;
        updateFileState(uploadFile.id, { progress: 50 });
      } catch (err) {
        const msg = err instanceof ImageConvertError ? err.message : 'Conversion failed';
        updateFileState(uploadFile.id, { status: 'error', error: msg });
        continue;
      }

      // Step 2: Upload
      updateFileState(uploadFile.id, { status: 'uploading', progress: 70 });
      try {
        const uploaded = await apiUpload(blob, filename);
        updateFileState(uploadFile.id, { status: 'done', progress: 100, result: uploaded });
        successItems.push(uploaded);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Upload failed';
        updateFileState(uploadFile.id, { status: 'error', error: msg });
      }
    }

    setIsUploading(false);

    // Open edit modal for each successful upload (one at a time)
    if (successItems.length > 0) {
      setPendingNewItems(successItems.slice(1));
      setNewItemImageData(successItems[0]);
      setIsNewItemModalOpen(true);
    }
  };

  const openNextNewItemModal = () => {
    const remaining = [...pendingNewItems];
    const next = remaining.shift();
    setPendingNewItems(remaining);
    if (next) {
      setNewItemImageData(next);
      setIsNewItemModalOpen(true);
    } else {
      setNewItemImageData(null);
    }
  };

  // ── CRUD handlers ──

  const handleCreateItem = async (form: EditForm) => {
    if (!newItemImageData) throw new Error('No image data');
    await apiCreate({
      ...form,
      image_url: newItemImageData.image_url,
      storage_path: newItemImageData.storage_path,
    });
    notify('Gallery image added successfully');
    await loadItems();
    // Clean up uploaded files that are done
    setUploadFiles((prev) => {
      const toClean = prev.filter((f) => f.status === 'done');
      toClean.forEach((f) => URL.revokeObjectURL(f.preview));
      return prev.filter((f) => f.status !== 'done');
    });
  };

  const handleUpdateItem = async (form: EditForm) => {
    if (!editingItem) throw new Error('No item selected');
    await apiUpdate(editingItem.id, form);
    notify('Gallery image updated');
    await loadItems();
  };

  const handleTogglePublish = async (item: ShowcaseGalleryItem) => {
    try {
      await apiUpdate(item.id, { is_published: !item.is_published });
      notify(item.is_published ? 'Image unpublished' : 'Image published');
      await loadItems();
    } catch (err) {
      notify(`Error: ${err instanceof Error ? err.message : 'Failed'}`);
    }
  };

  const handleDelete = async (item: ShowcaseGalleryItem) => {
    if (!confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    try {
      await apiDelete(item.id, item.storage_path);
      notify('Gallery image deleted');
      await loadItems();
    } catch (err) {
      notify(`Error: ${err instanceof Error ? err.message : 'Failed'}`);
    }
  };

  // ── Render ──

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#8657F6]/15 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8657F6]">
          <GalleryHorizontal className="w-4 h-4" />
          Showcase Gallery Manager
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">Showcase Gallery</h2>
        <p className="text-xs sm:text-sm text-[#22213A]/70">
          Upload, manage, and publish gallery images that appear in the{' '}
          <em>&quot;Explore the World with Traliber&quot;</em> section on the website.
        </p>

        {/* Stats */}
        {!loading && (
          <div className="flex items-center gap-4 pt-2">
            <div className="text-center">
              <p className="text-xl font-extrabold text-[#22213A]">{items.length}</p>
              <p className="text-3xs text-[#22213A]/50 font-bold">Total</p>
            </div>
            <div className="w-px h-8 bg-[#8657F6]/15" />
            <div className="text-center">
              <p className="text-xl font-extrabold text-emerald-600">{publishedCount}</p>
              <p className="text-3xs text-[#22213A]/50 font-bold">Published</p>
            </div>
            <div className="w-px h-8 bg-[#8657F6]/15" />
            <div className="text-center">
              <p className="text-xl font-extrabold text-gray-400">{draftCount}</p>
              <p className="text-3xs text-[#22213A]/50 font-bold">Draft</p>
            </div>
            <div className="w-px h-8 bg-[#8657F6]/15" />
            <div className="text-center">
              <p className="text-xl font-extrabold text-[#8657F6]">{allCategories.length}</p>
              <p className="text-3xs text-[#22213A]/50 font-bold">Categories</p>
            </div>
          </div>
        )}
      </div>

      {/* Upload section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#8657F6]/15 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#22213A] flex items-center gap-2">
          <Upload className="w-4 h-4 text-[#8657F6]" />
          Upload Images
        </h3>

        <UploadZone onFilesSelected={handleFilesSelected} />

        {uploadFiles.length > 0 && (
          <div className="space-y-2">
            {uploadFiles.map((f) => (
              <UploadItem key={f.id} item={f} onRemove={() => removeUploadFile(f.id)} />
            ))}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleUploadAll}
                disabled={isUploading || uploadFiles.every((f) => f.status !== 'pending')}
                className="px-6 py-2 text-xs font-bold bg-[#8657F6] text-white rounded-xl hover:bg-[#6d3fd4] transition-all disabled:opacity-60 flex items-center gap-2"
              >
                {isUploading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {isUploading
                  ? 'Uploading...'
                  : `Convert & Upload ${uploadFiles.filter((f) => f.status === 'pending').length} Image${uploadFiles.filter((f) => f.status === 'pending').length !== 1 ? 's' : ''}`}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Gallery management */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#8657F6]/15 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-sm font-bold text-[#22213A]">
            Gallery Images ({filtered.length})
          </h3>
          <button
            onClick={loadItems}
            className="text-xs font-bold text-[#8657F6] hover:underline flex items-center gap-1"
          >
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#22213A]/40" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or category..."
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
            />
          </div>
          {/* Category filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
          >
            <option value="All">All Categories</option>
            {allCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | 'published' | 'draft')}
            className="px-3 py-2 text-xs rounded-xl bg-[#F8F7FC] border border-[#8657F6]/15 focus:outline-none focus:ring-1 focus:ring-[#8657F6]"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-600 font-medium">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-[#8657F6]" />
          </div>
        )}

        {/* Empty state */}
        {!loading && items.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <GalleryHorizontal className="w-10 h-10 mx-auto text-[#8657F6]/30" />
            <p className="text-sm font-bold text-[#22213A]/60">No gallery images yet</p>
            <p className="text-xs text-[#22213A]/40">Upload images above to get started.</p>
          </div>
        )}

        {/* Items grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={() => { setEditingItem(item); setIsEditModalOpen(true); }}
                onTogglePublish={() => handleTogglePublish(item)}
                onDelete={() => handleDelete(item)}
              />
            ))}
          </div>
        )}

        {/* No results after filter */}
        {!loading && items.length > 0 && filtered.length === 0 && (
          <div className="text-center py-10 text-xs text-[#22213A]/40">
            No images match your filters.
          </div>
        )}
      </div>

      {/* Floating notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#22213A] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#8657F6]/30 flex items-center gap-3">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Edit modal for existing item */}
      {isEditModalOpen && editingItem && (
        <EditModal
          item={editingItem}
          onSave={handleUpdateItem}
          onClose={() => { setIsEditModalOpen(false); setEditingItem(null); }}
        />
      )}

      {/* Edit modal for newly uploaded item */}
      {isNewItemModalOpen && newItemImageData && (
        <EditModal
          item={null}
          isNew
          newImageData={newItemImageData}
          onSave={handleCreateItem}
          onClose={() => {
            setIsNewItemModalOpen(false);
            openNextNewItemModal();
          }}
        />
      )}
    </div>
  );
}

