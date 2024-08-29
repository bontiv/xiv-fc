'use client'

import { init, push } from "@socialgouv/matomo-next";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Analytics({analytics_url, analytics_id}) {
    useEffect(() => {
    init({ url: analytics_url, siteId: analytics_id, excludeUrlsPatterns:[/.*/] });
    }, [analytics_id, analytics_url]);

    const urlPath = usePathname()
    useEffect(() => {
        console.log(`Route ${urlPath}`);
        push(["setCustomUrl", urlPath]);
        push(["setDocumentTitle", document.title]);
        push(["trackPageView"]);
    }, [urlPath])
    return <></>
}
