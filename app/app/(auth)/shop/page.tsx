'use client'

import CrownOutlined from "@ant-design/icons/lib/icons/CrownOutlined"
import ShoppingCartOutlined from "@ant-design/icons/lib/icons/ShoppingCartOutlined"
import { Badge, Button, Flex, Typography } from "antd"
import ListShop from "./listShop";

const { Title } = Typography;

const cur_format = Intl.NumberFormat("fr", {
    currencySign: "accounting",
})

export default function ShopPage() {
    return <>
        <Flex justify="flex-end" align="center" gap="middle">
            <div>Vos médailles: {cur_format.format(20000)} <CrownOutlined /></div>
            <div>
                <Badge count={0}>
                    <Button type="text">
                        <ShoppingCartOutlined />
                    </Button>
                </Badge>
            </div>
        </Flex>
        <Title level={2}>Magasin des récompenses</Title>
        <p>Work in progress</p>
        <ListShop />
    </>
}