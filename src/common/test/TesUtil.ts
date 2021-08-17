import { User } from '../../user/user.entity';

export default class TestUtil {
  static giveAmeAvalidUser(): User {
    const user = new User();
    (user.email = 'wagneroliveira@gmail.com'),
      (user.name = 'wagner oliveira'),
      (user.id = '1');

    return user;
  }
}
