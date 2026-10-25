import type {Metadata} from "next";
import "./globals.css";
export const metadata: Metadata = {title:"LoopLeague — verified school challenge ops",description:"Demo season desk for sponsor-backed inter-school challenges"};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en"><body>{children}</body></html>}
