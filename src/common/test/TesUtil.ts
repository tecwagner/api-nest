// import { UpdateUserInput } from './../../user/dto/update-user.input';
// import { CreateUserInput } from './../../user/dto/create-user.input';
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

// export const mockAddAccountParams: CreateUserInput = {
//   name: 'Teste User',
//   email: 'test_user@hotmail.com',
//   password: '123456',
// };

// export const mockUpdateParams: UpdateUserInput = {
//   id: '1',
//   email: 'test_user-update@hotmail.com',
// };

// export const mockUserModel: User = {
//   id: '1',
//   ...mockAddAccountParams,
// };

// export const mockUpdatedUserModel: User[] = {
//   ...mockUserModel,
//   email: 'updated_email@hotmail.com',
// };

// export const mockUserArrayModel: User[] = [
//   mockUserModel,
//   {
//     id: '2',
//     name: 'Test User 2',
//     email: 'user2@gmail.com',
//     password: '123456',
//   },
//   {
//     id: '3',
//     name: 'Test User 3',
//     email: 'user3@gmail.com',
//     password: '123456',
//   },
// ];
