'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, ArrowLeft, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

interface ProjectFormData {
  title: string;
  description: string;
  imageUrl: string;
  imagePath: string | null;
  liveUrl: string;
  githubUrl: string;
  tagsString: string;
  category: string;
}

interface ProjectFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    image_path?: string | null;
    live_url?: string | null;
    github_url?: string | null;
    tags?: string[];
    category?: string;
  };
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<ProjectFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    imageUrl: initialData?.image_url || '',
    imagePath: initialData?.image_path || null,
    liveUrl: initialData?.live_url || '',
    githubUrl: initialData?.github_url || '',
    tagsString: initialData?.tags?.join(', ') || 'React, Next.js, Tailwind CSS',
    category: initialData?.category || 'frontend',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!allowed.includes(file.type)) {
      setErrorMessage('Invalid image format. Allowed formats: PNG, JPEG, WEBP, GIF, SVG.');
      return;
    }

    // Validate size (5 MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5 MB.');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      let finalImageUrl = formData.imageUrl;
      let finalImagePath = formData.imagePath;

      // 1. If user selected a new file, upload it first to /api/admin/upload
      if (imageFile) {
        setIsUploadingImage(true);
        const uploadBody = new FormData();
        uploadBody.append('file', imageFile);

        const uploadRes = await fetch('/api/admin/upload', {
          method: 'POST',
          body: uploadBody,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          throw new Error(uploadData.error || 'Failed to upload image to Supabase Storage.');
        }

        finalImageUrl = uploadData.imageUrl;
        finalImagePath = uploadData.imagePath;
        setIsUploadingImage(false);
      }

      if (!finalImageUrl) {
        throw new Error('Please upload an image or provide an image URL.');
      }

      // Parse tags
      const tags = formData.tagsString
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        description: formData.description,
        imageUrl: finalImageUrl,
        imagePath: finalImagePath,
        liveUrl: formData.liveUrl || null,
        githubUrl: formData.githubUrl || null,
        tags,
        category: formData.category,
      };

      const endpoint = isEdit && initialData?.id
        ? `/api/admin/projects/${initialData.id}`
        : '/api/admin/projects';

      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save project.');
      }

      setSuccessMessage(isEdit ? 'Project updated successfully!' : 'Project created successfully!');
      setTimeout(() => {
        router.push('/admin/projects');
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred while saving.');
    } finally {
      setIsSaving(false);
      setIsUploadingImage(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects List</span>
        </Link>
      </div>

      <div className="bg-white border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(236,72,153,1)] p-6 sm:p-10">
        <div className="pb-6 mb-8 border-b-4 border-slate-900">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-slate-900">
            {isEdit ? `Edit Project: ${initialData?.title}` : 'Add New Portfolio Project'}
          </h1>
          <p className="text-xs font-bold text-slate-500 mt-1">
            Fill in the details below. Images will be securely uploaded to the &apos;project-images&apos; bucket.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-rose-100 border-3 border-slate-900 flex items-start gap-3 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-rose-900 text-xs font-bold">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-100 border-3 border-slate-900 flex items-start gap-3 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] text-emerald-900 text-xs font-bold">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Title */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-900 block">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. NextGen E-Commerce Suite"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border-3 border-slate-900 font-bold text-slate-900 focus:bg-white focus:outline-none shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-sm"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-900 block">
              Short Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="A brief overview of the project, architecture and value delivered..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border-3 border-slate-900 font-bold text-slate-900 focus:bg-white focus:outline-none shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-sm resize-none"
            />
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border-3 border-slate-900 font-bold text-slate-900 focus:bg-white focus:outline-none shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-sm cursor-pointer"
              >
                <option value="frontend">Frontend & Web</option>
                <option value="ecommerce">Shopify / E-Commerce</option>
                <option value="interactive">Interactive & GSAP</option>
                <option value="fullstack">Full Stack & APIs</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                Technologies (comma separated)
              </label>
              <input
                type="text"
                placeholder="React, Next.js, TypeScript, Tailwind CSS"
                value={formData.tagsString}
                onChange={(e) => setFormData({ ...formData, tagsString: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border-3 border-slate-900 font-bold text-slate-900 focus:bg-white focus:outline-none shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-sm"
              />
            </div>
          </div>

          {/* Live URL & GitHub URL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                Live Website URL
              </label>
              <input
                type="url"
                placeholder="https://example.com"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border-3 border-slate-900 font-bold text-slate-900 focus:bg-white focus:outline-none shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-900 block">
                GitHub Repository URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/mohammedhaneenpm/repo"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border-3 border-slate-900 font-bold text-slate-900 focus:bg-white focus:outline-none shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] text-sm"
              />
            </div>
          </div>

          {/* Image Upload Area with Preview */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-900 block">
              Project Image (Supabase Storage) *
            </label>

            <div className="border-3 border-dashed border-slate-900 p-6 bg-slate-50 text-center relative hover:bg-slate-100 transition-colors">
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center justify-center pointer-events-none">
                <Upload className="w-8 h-8 text-pink-500 mb-2" />
                <p className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Click or drag image file here
                </p>
                <p className="text-[11px] font-bold text-slate-500 mt-1">
                  Supported formats: PNG, JPG, WEBP, GIF, SVG (Max 5 MB)
                </p>
              </div>
            </div>

            {/* Preview Box */}
            {imagePreview && (
              <div className="mt-4 p-4 border-2 border-slate-900 bg-white flex items-center gap-4">
                <img
                  src={imagePreview}
                  alt="Upload Preview"
                  className="w-24 h-24 object-cover border-2 border-slate-900 shrink-0"
                />
                <div className="text-xs font-bold text-slate-700 min-w-0">
                  <p className="font-black text-slate-900 uppercase">Image Preview Ready</p>
                  <p className="truncate text-slate-500 mt-1">
                    {imageFile ? `${imageFile.name} (${Math.round(imageFile.size / 1024)} KB)` : 'Current image from database/CDN'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Actions */}
          <div className="pt-6 border-t-2 border-slate-200 flex items-center justify-end gap-4">
            <Link
              href="/admin/projects"
              className="px-6 py-3 bg-white border-2 border-slate-900 text-xs font-black uppercase tracking-wider hover:bg-slate-100"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSaving || isUploadingImage}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest border-3 border-slate-900 shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              {isUploadingImage ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Uploading to Storage...</span>
                </>
              ) : isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving Project...</span>
                </>
              ) : (
                <span>{isEdit ? 'Update Project' : 'Create Project'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
