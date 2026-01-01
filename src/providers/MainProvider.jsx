import { TanstackQueryProvider } from "./TanstackQueryProvider";

export function MainProvider ({children}) {
return (
    <TanstackQueryProvider>
        {children}
    </TanstackQueryProvider>
)
}