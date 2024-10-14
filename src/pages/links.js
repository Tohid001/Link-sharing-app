import withAuth from '@/hoc/withAuth';
import withNav from '@/hoc/withNav';
import LinkForm from '@/modules/Editor';
import withMobileMockUp from '@/hoc/withMobileMockUp';

export default withAuth(withNav(withMobileMockUp(LinkForm)));
