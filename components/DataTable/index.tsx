'use client'
import { Content } from "antd/lib/layout/layout";
import { Table, TableProps, theme } from "antd";
import { type QueryParams, useMany } from "@src/lib/data";
import { MutableRefObject, useEffect, useRef, useState } from "react";

const { useToken } = theme

type DataControlType = {
    reload: () => void,
}

export type DataControlParam = DataControlType & MutableRefObject<DataControlType>

export function useDatacontrol(): DataControlParam {
    const data = useRef<DataControlType>({
        reload: () => null,
    })

    return {
        ...data,
        ...data.current
    }
}

export type DataTableProps = {
    collection: string,
    query: QueryParams | undefined,
    dataControl?: DataControlParam
} & TableProps

export const DataTable: React.FC<DataTableProps> = ({
    dataControl,
    collection,
    query,
    children,
    ...tableProps }) => {
    const { token } = useToken()
    const [pagination, setPagination] = useState({
        pageSize: 10,
        current: 1,
        total: 0,
    })
    const { data, isLoading, mutate } = useMany(collection, {
        ...query,
        pagination: {
            pageSize: pagination.pageSize,
            page: pagination.current,
        }
    })

    if (dataControl) {
        dataControl.current.reload = () => {
            mutate()
        }
    }

    useEffect(() => {
        if (data?.meta?.pagination) {
            setPagination({
                current: data?.meta?.pagination.page,
                pageSize: data?.meta?.pagination.pageSize,
                total: data?.meta?.pagination.total
            })
        }

    }, [data?.meta?.pagination])

    return <Content
        style={{
            padding: 24,
            minHeight: 280,
            background: token.colorBgContainer,
            borderRadius: token.borderRadiusLG,
        }}
    >
        <Table dataSource={data?.data}
            rowKey={'id'}
            pagination={{ ...pagination, onChange: (page, size) => setPagination({ ...pagination, pageSize: size, current: page }) }}
            {...tableProps}
            loading={isLoading}
        >
            {children}
        </Table>
    </Content>
}