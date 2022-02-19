import { MetaFunction } from 'remix';
import { siteTitle } from '~/lib/constants';

export {ErrorBoundary, CatchBoundary} from '~/components/ErrorAndCatchBoundry'

export let meta: MetaFunction = () => {
	return {
		title: siteTitle,
	}
}

export default function Index() {
  return (
    <section>
      <h1 className="animate-fade-and-slide-in-from-bottom">Hi, I am Sreekar Nimbalkar</h1>
      <p>I think, code and occasionally suffer a lot</p>
    </section>
  );
}
