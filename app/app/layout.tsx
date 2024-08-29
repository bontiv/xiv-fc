import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Metadata } from "next";
import { SWRConfig } from "./swrconfig";

export const metadata: Metadata = {
    title: 'AlphaBot App'
}

export default function appLayout({ children }: React.PropsWithChildren) {
    return <SWRConfig><AntdRegistry>{children}</AntdRegistry></SWRConfig>
}
