import { MetaFunction } from 'remix'
import { siteTitle } from '~/lib/constants'

export {ErrorBoundary, CatchBoundary} from '~/components/ErrorAndCatchBoundry'

export let meta: MetaFunction = () => {
	return {
		title: `About - ${siteTitle}`,
	}
}

export default function About() {
  return (
    <section>
      <h1 className="animate-fade-and-slide-in-from-bottom">About me</h1>
      <p>Im a shit show to the core of my existence</p>
    </section>
  )
}