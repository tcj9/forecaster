import { fonts } from './fonts'
import { Providers } from './providers'

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={fonts.openSans.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
