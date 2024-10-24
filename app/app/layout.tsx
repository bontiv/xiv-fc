import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Metadata } from "next";
import { SWRConfig } from "./swrconfig";
import { App, ConfigProvider } from "antd";

import francais from 'antd/locale/fr_FR';
import daysjs from 'dayjs';

import 'dayjs/locale/fr';
import dayjs from "dayjs";
dayjs.locale('fr');


export const metadata: Metadata = {
    title: 'AlphaBot App'
}

export default function appLayout({ children }: React.PropsWithChildren) {
    return <SWRConfig>
        <AntdRegistry>
            <ConfigProvider locale={francais}>
                <App>
                    {children}
                </App>
            </ConfigProvider>
        </AntdRegistry>
    </SWRConfig>
}
