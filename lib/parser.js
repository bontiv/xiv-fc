import { FreeCompany, FCMembers } from "@xivapi/nodestone";
import { PageParser } from "@xivapi/nodestone/lib/core/page-parser";

import axios from 'axios';
import { parseHTML } from 'linkedom';

export class CharacterMount extends PageParser {
    getURL(req) {
        return (
            "https://na.finalfantasyxiv.com/lodestone/character/" +
            req.params.characterId +
            '/mount/'
        );
    }

    async parse(req, columnsPrefix = '') {
        const { data } = await axios.get(this.getURL(req), { headers: { 'User-Agent': 'MMozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36' } }).catch((err) => {
            throw new Error(err.response.status);
        });
        const dom = parseHTML(data);
        let { document } = dom.window;
        const columnsQuery = req.query && req.query['columns'];
        const selectors = this.getCSSSelectors();
        let columns;
        if (columnsQuery && !Array.isArray(columnsQuery)) {
            columns = columnsQuery.toString()
                .split(',')
                .filter(column => {
                    return column.startsWith(columnsPrefix)
                })
                .map(column => column.replace(columnsPrefix, ''));
        } else if (columnsQuery && Array.isArray(columnsQuery)) {
            columns = columnsQuery.map(c => c.toString())
                .filter(column => {
                    return column.startsWith(columnsPrefix)
                })
                .map(column => column.replace(columnsPrefix, ''));
        } else {
            columns = Object.keys(selectors).map(key => {
                return this.definitionNameToColumnName(key);
            }).filter(column => column !== 'default');
        }
        return columns.reduce((acc, column) => {
            const definition = this.getDefinition(selectors, column);
            if (column === 'Root') {
                const context = this.handleColumn(definition, document)?.data;
                const contextDOM = parseHTML(context);
                document = contextDOM.window.document;
                return {
                    ...acc
                }
            }
            const parsed = this.handleColumn(definition, document);
            if (parsed.isPatch || column === 'Entry') {
                return {
                    ...acc,
                    ...(parsed.data || {})
                }
            }
            return {
                ...acc,
                [column]: parsed.data
            }
        }, {});
    }

    getCSSSelectors() {
        return {
            "MOUNTS": {
                "ROOT": {
                    "selector": ".mount__list__item",
                    "multiple": true
                },
                "NAME": {
                    "selector": ".mount__name"
                },
                "ICON": {
                    "selector": ".mount__list__icon__image",
                    "attribute": "src"
                }
            },
            "TOTAL": {
                "selector": ".minion__sort__total > span:nth-child(1)"
            }
        }
    }
}


export async function GetCompanyMembers() {
    const fc = new FreeCompany()
    const fcm = new FCMembers()
    const myfc = await fc.parse({ params: { fcId: process.env.NEXT_PUBLIC_FCID } })
    let myfcm = await fcm.parse({ params: { fcId: process.env.NEXT_PUBLIC_FCID } })

    let FCmembers = []
    function addMembers(list) {
        myfcm.List.forEach(elem => FCmembers.push({ ...elem, Rank: elem.FcRank, RankIcon: elem.FcRankIcon }))
    }

    addMembers()
    while (myfcm.Pagination.Page < myfcm.Pagination.PageTotal) {
        myfcm = await fcm.parse({ params: { fcId: process.env.NEXT_PUBLIC_FCID }, query: { page: myfcm.Pagination.Page + 1 } })
        addMembers()
    }

    return {
        FreeCompany: { ...myfc, Server: myfc.World },
        FreeCompanyMembers: FCmembers
    }
}