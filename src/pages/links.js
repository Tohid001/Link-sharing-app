import WithAuth from '@/hoc/withAuth';
import WithNav from '@/hoc/withNav';
import LinkForm from '@/modules/Editor/LinkForm.js/index.js';
import WithMobileMockUp from '@/hoc/withMobileMockUp';

export default WithAuth(WithNav(WithMobileMockUp(LinkForm)));
