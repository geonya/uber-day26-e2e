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
const testPodcast = {
  title: 'test podcast',
  category: 'test',
};
const testEpisode = {
  title: 'test episode',
  category: 'test',
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
    let podcastId: number;
    let episodeId: number;
    describe('createPodcast', () => {
      it('should create podcast', () => {
        return privateReq(`mutation {
          createPodcast(input:{
            title:"${testPodcast.title}"
            category:"${testPodcast.category}"
          }) {
            ok
            error
            id
          }
        }`)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  createPodcast: { ok, error, id },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
            expect(id).toEqual(expect.any(Number));
          });
      });
    });
    describe('createEpisode', () => {
      it('should create episode', async () => {
        const [podcast] = await podcastRepository.find();
        podcastId = podcast.id;
        return privateReq(`mutation {
          createEpisode(input:{
            title:"${testEpisode.title}"
            category:"${testEpisode.category}"
            podcastId:${podcastId}
          }) {
            ok
            error
            id
          }
        }`)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  createEpisode: { ok, error, id },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
            expect(id).toEqual(expect.any(Number));
            episodeId = id;
          });
      });
    });
    describe('getAllPodcasts', () => {
      it('should get all podcasts', () => {
        return privateReq(`{
          getAllPodcasts{
            ok
            error
            podcasts {
              id
            }
          }
        }`)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  getAllPodcasts: { ok, error, podcasts },
                },
              },
            } = res;
            const [podcast] = podcasts;
            expect(ok).toBe(true);
            expect(error).toBe(null);
            expect(podcast.id).toBe(podcastId);
          });
      });
    });
    describe('getPodcast', () => {
      it('should get podcast', () => {
        return privateReq(`{
          getPodcast(input:{
            id:${podcastId}
          }) {
            ok
            error
            podcast {
              title
            }
          }
        }`)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  getPodcast: { ok, error, podcast },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
            expect(podcast.title).toBe(testPodcast.title);
          });
      });
    });
    describe('getEpisodes', () => {
      it('should get episodes', () => {
        return privateReq(`{
          getEpisodes(input:{
            id:${podcastId}
          }) {
            ok
            error
            episodes {
              id
            }
          }
        }`)
          .expect(200)
          .expect(res => {
            const {
              body: {
                data: {
                  getEpisodes: { ok, error, episodes },
                },
              },
            } = res;
            const [episode] = episodes;
            expect(ok).toBe(true);
            expect(error).toBe(null);
            expect(episode.id).toBe(episodeId);
          });
      });
    });
    describe('updatePodcast', () => {
      const NEW_TITLE = 'test2 title';
      const NEW_CATEGORY = 'test2';
      const NEW_RATING = 5;
      it('should update podcast', () => {
        return privateReq(`mutation {
          updatePodcast(input:{
            id:${podcastId}
            payload:{
              title:"${NEW_TITLE}"
              category:"${NEW_CATEGORY}"
              rating:${NEW_RATING}
            }
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
                  updatePodcast: { ok, error },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
          });
      });
    });
    describe('updateEpisode', () => {
      const NEW_TITLE = 'test2 title';
      const NEW_CATEGORY = 'test2';
      it('should update episode', () => {
        return privateReq(`mutation {
          updateEpisode(input:{
            podcastId:${podcastId}
            episodeId:${episodeId}
            title:"${NEW_TITLE}"
            category:"${NEW_CATEGORY}"
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
                  updateEpisode: { ok, error },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
          });
      });
    });
    describe('deleteEpisode', () => {
      it('should delete episode', () => {
        return privateReq(`mutation {
          deleteEpisode(input:{
            podcastId:${podcastId}
            episodeId:${episodeId}
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
                  deleteEpisode: { ok, error },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
          });
      });
    });
    describe('deletePodcast', () => {
      it('should delete podcast', () => {
        return privateReq(`mutation {
          deletePodcast(input:{
            id:${podcastId}
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
                  deletePodcast: { ok, error },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
          });
      });
    });
  });
});
