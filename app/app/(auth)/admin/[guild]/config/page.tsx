
export default function AdmGuildPage({ params }: { params: Promise<{ guild: string }> }) {
    return <p>Hello</p>
}

export async function generateStaticParams() {

    return [
        { guild: '2' },
        { guild: '3' },
    ]
}