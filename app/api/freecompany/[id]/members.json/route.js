import { GetCompanyMembers } from "@lib/parser"

export const dynamic = 'force-static'
export const revalidate = 86400

export async function GET(request) {

    return Response.json(await GetCompanyMembers())
}

export function generateStaticParams() {
    return [{ id: '9231253336202720275' }]
}