import CustomSWRConfig from '@lib/SWRConfig';

export default async function PublicLayout({ children }) {
    const fallback = {}

    return <CustomSWRConfig fallback={fallback}>{children}</CustomSWRConfig>
}