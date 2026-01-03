import CrownOutlined from "@ant-design/icons/lib/icons/CrownOutlined";
import PlusCircleFilled from "@ant-design/icons/lib/icons/PlusCircleFilled";
import { XivAsset } from "@src/components/xivAPI";
import { Button, Table, TableProps, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";

const { Text } = Typography

const cur_format = Intl.NumberFormat("fr", {
    currencySign: "accounting",
})

const columns: ColumnsType = [
    {
        dataIndex: 'i',
        title: "",
        render: (value, item) => <XivAsset alt={item.t} path={value} />
    },
    {
        dataIndex: 'n',
        title: 'Object'
    },
    {
        dataIndex: 't',
        title: 'Type',
        filters: [
            {
                text: 'Montures',
                value: 'Monture'
            },
            {
                text: 'Mascotes',
                value: 'Mascote'
            },
        ],
        onFilter: (value, item) => item.t === value,
    },
    {
        dataIndex: 'p',
        title: 'Valeur',
        sorter: (a, b) => a.p - b.p,
        render: (value) => <Text>{cur_format.format(value)} <CrownOutlined /></Text>,
        align: "end"
    },
    {
        title: 'Panier',
        render: () => <Button><PlusCircleFilled /> Ajouter</Button>
    }
]

const data = [
    {
        r: 43600,
        i: 'ui/icon/026000/026038_hr1.tex',
        n: 'Qeziigural',
        t: 'Monture',
        p: 60000
    },
    {
        r: 26782,
        i: 'ui/icon/052000/052463_hr1.tex',
        n: 'Lit magique',
        t: 'Monture',
        p: 14000
    },
    {
        r: 39491,
        i: 'ui/icon/026000/026014_hr1.tex',
        n: 'Clef d\'activation de Pinky',
        t: 'Monture',
        p: 130000
    },
    {
        r: 39480,
        i: 'ui/icon/059000/059873_hr1.tex',
        n: 'Soldate pachypodium',
        t: 'Mascote',
        p: 100
    },
]

const ListShop: React.FC = () => {
    return <Table columns={columns} dataSource={data} rowKey={'r'} pagination={{
        pageSize: 10
    }} />
}

export default ListShop;