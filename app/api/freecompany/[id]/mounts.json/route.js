import { GetCompanyMembers, CharacterMount } from "@/lib/parser"

export const dynamic = 'force-static'
export const revalidate = 86400

export async function GET(request) {
    let charMounts = (await GetCompanyMembers()).FreeCompanyMembers;
    const cm = new CharacterMount();

    for (var i = 0; i < charMounts.length; i++) {
        charMounts[i].mounts = await cm.parse({ params: { characterId: charMounts[i].ID } })
        //await new Promise(r => setTimeout(r, 500));
        //console.log(charMounts[i].mounts);
        //return <MountRow key={charMounts[i].ID} character={charMounts[i].ID} avatar={charMounts[i].Avatar} data={charMounts[i].mounts} isLoading={false} charName={charMounts[i].Name} />
    }
    return Response.json(charMounts)
}

export function generateStaticParams() {
    return [{ id: '9231253336202720275' }]
}