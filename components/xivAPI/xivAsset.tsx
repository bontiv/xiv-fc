import Image from "next/image";

export type XivAssetProps = {
    path: string,
    format?: "png" | "webp" | "jpg",
    alt: string,
    width?: number,
    heigth?: number,
}
/**
 * Get an image from XIV assets
 * @param param0 XivAssetProps
 * @returns 
 */
export const XivAsset: React.FC<XivAssetProps> = ({ path, format = "png", alt, width = 80, heigth = 80 }) => <Image
    src={`https://v2.xivapi.com/api/asset?path=${encodeURIComponent(path)}&format=${format}`}
    width={width}
    height={heigth}
    alt={alt}
/>
