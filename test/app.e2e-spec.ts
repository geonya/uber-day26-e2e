import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { Podcast } from 'src/podcast/entities/podcast.entity';
import { User, UserRole } from 'src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const GRAPHQL_ENDPOINT = '/graphql';
const X_JWT = 'X-JWT';
const testUser = {
  email: 'geony@geony.com',
  password: '1234',
  role: UserRole.Host,
};

describe('App (e2e)', () => {
  let app: INestApplication;
  let podcastRepository: Repository<Podcast>;
  let usersRespository: Repository<User>;
  let jwtToken: string;
  let server: any;

  const baseReq = () => request(server).post(GRAPHQL_ENDPOINT);
  const publicReq = (query: string) => baseReq().send({ query });
  const privateReq = (query: string) =>
    baseReq().set(X_JWT, jwtToken).send({ query });

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    podcastRepository = module.get<Repository<Podcast>>(
      getRepositoryToken(Podcast),
    );
    usersRespository = module.get<Repository<User>>(getRepositoryToken(User));
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    app.close();
  });

  describe('Users Resolver', () => {
    describe('createAccount', () => {
      it('should create account', () => {
        return publicReq(`
        mutation {
          createAccount(input:{
            email:"${testUser.email}",
            password:"${testUser.password}",
            role:${testUser.role}
          }) {
            ok
            error
          }
        }`)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  createAccount: { ok, error },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
          });
      });
      it('should fail create account because user already exists', () => {
        return publicReq(`
        mutation {
          createAccount(input:{
            email:"${testUser.email}",
            password:"${testUser.password}",
            role:${testUser.role}
          }) {
            ok
            error
          }
        }`)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  createAccount: { ok, error },
                },
              },
            } = res;
            expect(ok).toBe(false);
            expect(error).toEqual(expect.any(String));
          });
      });
    });
    describe('login', () => {
      it('should login with correct credential', () => {
        return publicReq(`mutation {
          login(input:{
            email:"${testUser.email}"
            password:"${testUser.password}"
          }) {
            ok
            error
            token
          }
        }`)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  login: { ok, error, token },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
            expect(token).toEqual(expect.any(String));
            jwtToken = token;
          });
      });
      it('should not login with wrong credential', () => {
        return publicReq(`mutation {
          login(input:{
            email:"${testUser.email}"
            password:"4321"
          }) {
            ok
            error
            token
          }
        }`)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  login: { ok, error, token },
                },
              },
            } = res;
            expect(ok).toBe(false);
            expect(error).toEqual(expect.any(String));
            expect(token).toBe(null);
          });
      });
    });
    describe('me', () => {
      it('should find me', () => {
        return privateReq(`{
          me {
            email
          }
        }`)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  me: { email },
                },
              },
            } = res;
            expect(email).toBe(testUser.email);
          });
      });
      it('should not be able to find me', () => {
        return publicReq(`{
          me {
            email
          }
        }`)
          .expect(200)
          .expect(res => {
            const {
              body: { errors, data },
            } = res;
            const [error] = errors;
            expect(error.message).toBe('Forbidden resource');
            expect(data).toBe(null);
          });
      });
    });
    describe('seeProfile', () => {
      let userId: number;
      beforeAll(async () => {
        const [user] = await usersRespository.find();
        userId = user.id;
      });
      it('should found user by id', () => {
        return privateReq(`{
          seeProfile(userId:${userId}) {
            ok
            error
            user {
              id
            }
          }
        }`)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  seeProfile: {
                    ok,
                    error,
                    user: { id },
                  },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
            expect(id).toBe(userId);
          });
      });
      it('should not found user', () => {
        return privateReq(`{
          seeProfile(userId:2) {
            ok
            error
            user {
              id
            }
          }
        }`)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  seeProfile: { ok, error, user },
                },
              },
            } = res;
            expect(ok).toBe(false);
            expect(error).toEqual(expect.any(String));
            expect(user).toBe(null);
          });
      });
    });
    describe('editProfile', () => {
      it('should success change email', () => {
        const NEW_EMAIL = 'geony2@geony.com';
        return privateReq(`
        mutation {
          editProfile(input:{
            email:"${NEW_EMAIL}",
          }) {
            ok
            error
          }
        }
        `)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  editProfile: { ok, error },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
          });
      });
      it('should change password', () => {
        const NEW_PASSWORD = '4321';
        return privateReq(`
        mutation {
          editProfile(input:{
            password:"${NEW_PASSWORD}",
          }) {
            ok
            error
          }
        }
        `)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  editProfile: { ok, error },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
          });
      });
    });
  });

  describe('Podcasts Resolver', () => {
    describe('createPodcast', () => {
      it.todo('should create podcast');
      it.todo('should not found episodes');
    });
    describe('createEpisode', () => {
      it.todo('should create episode');
      it.todo('should not create episode');
    });
    describe('getAllPodcasts', () => {
      it('should get all podcasts', () => {
        return request(server)
          .post(GRAPHQL_ENDPOINT)
          .send({
            query: `
            {
              getAllPodcasts{
                ok
                error
                podcasts {
                  id
                }
              }
            }
          `,
          })
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  getAllPodcasts: { ok, error, podcasts },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
          });
      });
      it.todo('should not found podcasts');
    });
    describe('getPodcast', () => {
      it.todo('should get podcast');
      it.todo('should not found podcast');
    });
    describe('getEpisodes', () => {
      it.todo('should get episodes');
      it.todo('should not found episodes');
    });
    describe('updatePodcast', () => {
      it.todo('should update podcast');
      it.todo('should not update podcast');
    });
    describe('updateEpisode', () => {
      it.todo('should update episode');
      it.todo('should not update episode');
    });
    describe('deleteEpisode', () => {
      it.todo('should delete episode');
      it.todo('should not able to delete episode');
    });
    describe('deletePodcast', () => {
      it.todo('should delete podcast');
      it.todo('should not able to delete podcast');
    });
  });
});
