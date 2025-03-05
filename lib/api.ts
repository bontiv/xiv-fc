async function apiGet(path: string) {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    if (process.env.API_TOKEN) {
        headers.set('Authorization', 'Bearer ' + process.env.API_TOKEN);
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API + path, {
        headers,
    });
    return await response.json();
}

export async function getGuildList() {
    const { data } = await apiGet('/api/discord-servers?fields[0]=id');
    return data
}