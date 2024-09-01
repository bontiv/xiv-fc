import { FreeCompany, FCMembers } from "@xivapi/nodestone";
import { GetCompanyMembers } from '@lib/parser';
import CustomSWRConfig from '@lib/SWRConfig';

export default async function PublicLayout({ children }) {
    const fc = new FreeCompany()
    const fcm = new FCMembers()
    const myfc = await fc.parse({ params: { fcId: process.env.NEXT_PUBLIC_FCID } })
    const myfcm = await fcm.parse({ params: { fcId: process.env.NEXT_PUBLIC_FCID } })
    const fallback = {
        'https://xivapi.com/freecompany/9231253336202720275?data=FCM': {
            FreeCompany: { ...myfc, Server: myfc.World },
            FreeCompanyMembers: myfcm.List.map(elem => ({ ...elem, Rank: elem.FcRank, RankIcon: elem.FcRankIcon }))
        }
    }
    fallback[`${process.env.NEXT_PUBLIC_URL}/api/freecompany/9231253336202720275/members.json`] = await GetCompanyMembers()

    return <CustomSWRConfig fallback={fallback}>{children}</CustomSWRConfig>
}