import withAuth from '@/hoc/withAuth';
import LinksPage from '../modules/Editor/LinksPage';
import withNav from '@/hoc/withNav';

export default withAuth(withNav(LinksPage));
