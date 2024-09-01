import Authenticated from "@src/components/Authenticated";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
    return <Authenticated>{children}</Authenticated>
}