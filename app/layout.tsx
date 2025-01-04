
import { Provider } from "../components/ui/provider"


export default function RootLayout(props: { children: React.ReactNode }) {

  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider themes={["SaydleTheme"]}>{children}</Provider>
      </body>
    </html>
  )
}