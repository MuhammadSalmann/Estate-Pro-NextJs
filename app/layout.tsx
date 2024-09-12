import '@/assets/styles/globals.css'
import { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'

// For SEO and this will be used in by default every page if you dont specify this in every page
export const metadata = {
  title: 'Estate Pro | Find The Perfect Rental',
  description: 'Find the perfect rental property for you. Estate Pro is a platform that connects renters with landlords.',
  keywords: 'rental, property, estate, landlord, rent, lease, find properties, find rentals, estate pro',
}

type MainLayoutProps = {
  children: ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  )
}

export default MainLayout