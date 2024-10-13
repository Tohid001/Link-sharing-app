import withAuth from '@/hoc/withAuth';
import withMobileMockUp from '@/hoc/withMobileMockUp';
import withNav from '@/hoc/withNav';
import ProfileForm from '@/modules/Editor/components/ProfileForm';

export default withAuth(withNav(withMobileMockUp(ProfileForm)));
