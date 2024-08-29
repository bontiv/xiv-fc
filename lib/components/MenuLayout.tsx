import { Layout, Menu } from "antd";
import React from "react";
const { Sider, Content } = Layout

export default function MenuLayout({ children }: React.PropsWithChildren) {
    return <Layout>
        <Sider>
            <Menu>

            </Menu>
        </Sider>
        <Content>{children}</Content>
    </Layout>
}