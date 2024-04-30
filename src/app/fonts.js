// app/fonts.ts
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans',
})

export const fonts = {
    openSans,
}