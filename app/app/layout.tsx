import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function appLayout({ children }: React.PropsWithChildren) {
    return <AntdRegistry>{children}</AntdRegistry>
}
