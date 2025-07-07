import OrderHistory from '../../components/Admin Components/OrderHistory';
import Header from '../../components/Admin Components/AdminHeader/Header';
import Footer from '../../components/Common Components/Footer';
import FooterEnd from '../../components/Common Components/FooterEnd';

export default function OrderHistorys() {
  return (
    <div>
      <Header />
      <OrderHistory />
      <Footer />
      <FooterEnd />
    </div>
  );
}
