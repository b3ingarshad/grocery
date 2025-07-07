import Profile from '../../components/Admin Components/Profile';
import Header from '../../components/Vendor Components/VendorHeader/Header';
import Footer from '../../components/Common Components/Footer';
import FooterEnd from '../../components/Common Components/FooterEnd';

export default function VendorProfiles() {
  return (
    <div style={{ paddingTop: '5%' }}>
      <Header />
      <Profile />
      <Footer />
      <FooterEnd />
    </div>
  );
}
