import { createClient } from "@supabase/supabase-js";

// Public client (browser) — read only
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Admin client (server only) — full access for uploads/deletes
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BUCKET = "product-images";

export async function uploadProductImage(
  file: File,
  slug: string
): Promise<string> {
  const ext      = file.name.split(".").pop();
  const fileName = `${slug}-${Date.now()}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(fileName, file, { upsert: true });

  if (error) throw new Error(error.message);

  const { data } = supabaseAdmin.storage
    .from(BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

export async function deleteProductImage(imageUrl: string) {
  const fileName = imageUrl.split("/").pop();
  if (!fileName) return;
  await supabaseAdmin.storage.from(BUCKET).remove([fileName]);
}
