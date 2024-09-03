import Link from 'next/link'
import {
  useRouter,
  useParams,
} from 'next/navigation'

const PropertyPage = () => {
  return (
    <>
    <div>PropertyPage</div>
    <Link href={'/'} className="bg-red-400">Click me</Link>
    </>
  )
}

export default PropertyPage