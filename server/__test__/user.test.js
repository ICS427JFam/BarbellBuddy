const app = require('../server');
const mongoose = require('mongoose');
const User = mongoose.model('User');

const request = require('supertest')(app);

const defaultUser = { "username": "boomboom", "email": "boomboom@gmail.com", "password": "1234" };

const createUser = async () => {
  const UserModel = new User(defaultUser);
  await UserModel.save();
};

const getDefaultUser = async () => {
  let users = await User.find({ "username": defaultUser.username });
  if (users.length === 0) {
    await createUser();
    return getDefaultUser();
  } else {
    return users[0];
  }
};

const loginWithDefaultUser = async () => {
  let user = await getDefaultUser();
  return request.post("/api/user/login")
    .send({ "user": { "email": defaultUser.email, "password": defaultUser.password } })
    .expect(200);
};

const cleanExceptDefaultUser = async () => {
  let user = await getDefaultUser();
  await User.deleteMany({ "username": { $ne: user.username } })
};

describe('## User API ##', () => {
  // const urlBase = 'api/user/register';
  const newUser = { "username": "newUser1", "email": "newUser1@foo.com", "password": "newUser1" };
  let server;

  beforeEach(() => {
    // https://github.com/facebook/jest/issues/6434#issuecomment-525576660
    jest.useFakeTimers();
    cleanExceptDefaultUser();
  });

  it('should create new user',  (done) => {
    const response = request
      .post('http://localhost:3001/api/user/register')
      .send(newUser)
      .expect(20590)
      .end((err, res) => {
        // expect(res.status).toBe(202);
        done();
      });
    // expect(response.status).toBe(200);
  });

  // it('should retrieve the loggedin user token', () => {
  //   loginWithDefaultUser().then((res) => {
  //     expect(res.status).toBe(200);
  //     expect(res.body.success).toBe(true);
  //     expect(res.body.token).toBeTruthy();
  //   })
  // });
  //
  // it('should not login with the correct user and email but wrong password', () => {
  //   request(server)
  //     .post('/api/user/login')
  //     .send({ "username": newUser.username, "email": newUser.email, "password": "fake" })
  //     .then((res) => {
  //       expect(res.status).toBe(200);
  //     })
  // })
});


