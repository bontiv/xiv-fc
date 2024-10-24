import { GetCompanyMembers } from '@lib/parser';
import CustomSWRConfig from '@lib/SWRConfig';

export default async function PublicLayout({ children }) {
    const fallback = {}
    try {
        fallback[`${process.env.NEXT_PUBLIC_URL}/api/freecompany/9231253336202720275/members.json`] = await GetCompanyMembers()
    } catch (e) {

    }

    return <CustomSWRConfig fallback={fallback}>{children}</CustomSWRConfig>
}