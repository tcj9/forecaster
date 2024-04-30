import { fonts } from './fonts'
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fonts.openSans.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
