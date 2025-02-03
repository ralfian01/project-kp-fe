export const urlAsset = (
    slug: string
) => {

    const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_URL || "";

    // Jika slug sudah berupa URL lengkap, langsung kembalikan tanpa modifikasi
    if (slug.startsWith("https://") || slug.startsWith("http://")) {
        return slug;
    }

    // Pastikan base URL tidak memiliki trailing slash dan slug tidak memiliki leading slash ganda
    return `${assetBaseUrl.replace(/\/$/, "")}/${slug.replace(/^\//, "")}`;
};