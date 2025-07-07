import Profile from '../../components/Admin Components/Profile';
import Header from '../../components/Common Components/Header';
import Footer from '../../components/Common Components/Footer';
import FooterEnd from '../../components/Common Components/FooterEnd';

export default function UserProfiles() {
  return (
    <div style={{ paddingTop: '5%' }}>
      <Header />
      <Profile />
      <Footer />
      <FooterEnd />
    </div>
  );
}
