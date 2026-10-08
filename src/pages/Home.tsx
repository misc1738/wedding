import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Invitation from '../components/Invitation';
import Schedule from '../components/Schedule';
import Story from '../components/Story';
import Gallery from '../components/Gallery';
import Palette from '../components/Palette';
import Travel from '../components/Travel';
import Gifts from '../components/Gifts';
import Faq from '../components/Faq';
import RsvpForm from '../components/RsvpForm';
import Footer from '../components/Footer';
import QuickActions from '../components/QuickActions';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Invitation />
        <Schedule />
        <Story />
        <Gallery />
        <Palette />
        <Travel />
        <Gifts />
        <Faq />
        <RsvpForm />
      </main>
      <QuickActions />
      <Footer />
    </>
  );
}
