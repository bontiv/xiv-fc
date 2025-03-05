import { useApi, useMany, useOne } from "@src/lib/data";
import { AutoComplete, AutoCompleteProps, Button, DatePicker, Drawer, Form, Input, InputNumber, Select, Skeleton, Switch, TimePicker, TreeSelect } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { useEffect, useMemo, useState } from "react";
import ReactQuill, { Quill } from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';

import { unified } from 'unified';
import remarkParse from 'remark-parse'
import rehypeParse from 'rehype-parse'
import remarkRehype from 'remark-rehype'
import rehypeRemark from 'rehype-remark'
import rehypeStringify from 'rehype-stringify'
import remarkStringify from 'remark-stringify'

dayjs.extend(utc)

export type EventType = {
    id: number,
    title: string
}

export type EventDrawerProps = {
    edit?: EventType | null,
    onClose: () => void,
    title?: string,
    onFinish: (values: any) => void,
    discord: string
}

function markdownToHtml(markdownText: string) {
    const file = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .processSync(markdownText);
    return String(file);
}

function htmlToMarkdown(htmlText: string) {
    const file = unified()
        .use(rehypeParse)
        .use(rehypeRemark)
        .use(remarkStringify)
        .processSync(htmlText);
    return String(file);
}

export default function EventDrawer({ edit, onClose, onFinish, discord }: EventDrawerProps): React.ReactElement {
    const [form] = Form.useForm()
    const { isLoading, data } = useOne('events', edit?.id, { populate: '*' })
    const [searchLeader, setSearchLeader] = useState<string | undefined>()
    const { data: searchLeaderApi, isLoading: searchLoading } = useMany(searchLeader && 'discord-users', {
        filters: {
            '$and': [
                { discord_server: discord },
                {
                    '$or': [
                        {
                            discord_nickname: { '$containsi': searchLeader }
                        },
                        {
                            discord_username: { '$containsi': searchLeader }
                        }
                    ]
                }
            ]
        }
    })
    const searchLeaderOptions = useMemo<AutoCompleteProps['options']>(
        () => searchLeaderApi?.data?.map((i: any) => ({ label: i.discord_nickname, value: i.id })),
        [searchLeaderApi]
    )

    const { data: channels } = useApi('/alphaplug/discord-channels/' + discord)

    useEffect(() => {
        form.resetFields()
        setSearchLeader(undefined)
    },
        [edit, data, form]
    )

    return <Drawer
        title={edit?.title ? edit?.title : (edit === null ? 'Nouveau événement' : '')}
        open={edit !== undefined}
        onClose={onClose}
    >
        <Skeleton loading={isLoading}>
            <Form
                layout="vertical"
                form={form}
                initialValues={data}
                onFinish={onFinish}
            >
                <Form.Item name='id' hidden></Form.Item>
                <Form.Item label="Titre" name={'title'} required>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Date"
                    name='next_start'
                    getValueProps={(val) => ({ value: val && dayjs(val) })}
                    normalize={(val) => val && `${dayjs(val).toISOString()}`}
                    required
                >
                    <DatePicker showTime={{ format: 'HH:mm', minuteStep: 15 }} />
                </Form.Item>
                <Form.Item
                    label="Durée"
                    name={'duration'}
                    getValueProps={(val) => ({ value: val && dayjs.utc(val * 60000) })}
                    normalize={(val) => val && (dayjs.utc(val).hour() * 60 + dayjs.utc(val).minute())}
                    required
                >
                    <TimePicker format={'HH:mm'} minuteStep={15} placeholder="Durée" showNow={false} />
                </Form.Item>

                <Form.Item name={'leader'} label='Organisateur' required
                    normalize={(i) => ({ id: i.value, discord_nickname: i.label })}
                    getValueProps={(val: any) => ({ value: val && { value: val.id, label: val.discord_nickname } })}
                >
                    <Select
                        options={searchLeaderOptions}
                        onSearch={(s) => setSearchLeader(s)}
                        loading={searchLoading}
                        showSearch
                        labelInValue
                        filterOption={false}
                    />
                </Form.Item>

                <Form.Item
                    label="Utiliser le groupage par réactions discord"
                    name={'party_config'}
                    normalize={(val) => val ? { useRoles: true, tanks: 2, heals: 2, dps: 4, groups: 1 } : null}
                    getValueProps={(val: any) => ({ value: val != null })}
                >
                    <Switch />
                </Form.Item>

                <Form.Item
                    label="Salon où annoncer l'évent"
                    name={'channel'}
                    required
                >
                    <TreeSelect
                        treeData={channels}
                    />
                </Form.Item>

                <Form.Item
                    name='description'
                    label='Description de l&apos;événement'
                    getValueProps={(val) => ({ value: val && markdownToHtml(val) })}
                    normalize={(val) => val && htmlToMarkdown(val)}
                >
                    <ReactQuill
                        theme="snow"
                        modules={{
                            toolbar: [
                                [{ 'header': [1, 2, 3, false] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ 'list': 'ordered' }],
                                ['link'],
                                ['clean']
                            ],
                        }}
                        formats={['header', 'bold', 'italic', 'underline', 'strike', 'list', 'blockquote', 'indent', 'link']}
                    />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Enregistrer
                    </Button>
                </Form.Item>
            </Form>
        </Skeleton>
    </Drawer>
}