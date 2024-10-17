import WithAuth from '@/hoc/withAuth';
import WithMobileMockUp from '@/hoc/withMobileMockUp';
import WithNav from '@/hoc/withNav';
import ProfileForm from '@/modules/Editor/ProfileForm';

export default WithAuth(WithNav(WithMobileMockUp(ProfileForm)));
