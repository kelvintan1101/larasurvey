import { createStore } from "vuex";
import axiosClient from "../axios";

const tmpSurveys = [
  {
    id: 100,
    title: "TheCodeholic Youtube channel content",
    slug: "thecodeholic-youtube-channel-content",
    status: "draft",
    image:
      "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
    description:
      "My name is Zura.<br>I am Web Developer with 9+ years of experience.",
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-31 18:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea", text: "USA" },
            { uuid: "201c1ff5-23c9-42f9-bfb5-bbc850536440", text: "Georgia" },
            { uuid: "b5c09733-a4930460a-ba8a-526863010729", text: "Germany" },
            { uuid: "2abf1cee-f5fb-427c-a220-b5d159ad6513", text: "India" },
            {
              uuid: "8d14341b-ec2b-4924-9aea-bda6a53b51fc",
              text: "United Kingdom",
            },
          ],
        },
      },
      {
        id: 2,
        type: "checkbox",
        question: "Which language videos do you want to see on my channel?",
        description: "eqweqweqwesaf wqeqwe qdasdasdasd",
        data: {
          options: [
            {
              uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea",
              text: "Javascript",
            },
            { uuid: "201c1ff5-23c9-42f9-bfb5-bbc850536440", text: "PHP" },
            {
              uuid: "b5c09733-a4930460a-ba8a-526863010729",
              text: "HTML + CSS",
            },
            {
              uuid: "2abf1cee-f5fb-427c-a220-b5d159ad6513",
              text: "All of the above",
            },
            {
              uuid: "8d14341b-ec2b-4924-9aea-bda6a53b51fc",
              text: "Everything Zura thinks will be good",
            },
          ],
        },
      },
      {
        id: 3,
        type: "checkbox",
        question:
          "Which PHP framework videos do you want to see on my channel?",
        description: "eqweqweqwesaf wqeqwe qdasdasdasd",
        data: {
          options: [
            {
              uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea",
              text: "Laravel",
            },
            { uuid: "201c1ff5-23c9-42f9-bfb5-bbc850536440", text: "Yii2" },
            {
              uuid: "b5c09733-a4930460a-ba8a-526863010729",
              text: "Codeigniter",
            },
            {
              uuid: "2abf1cee-f5fb-427c-a220-b5d159ad6513",
              text: "Symfony",
            },
          ],
        },
      },
      {
        id: 4,
        type: "radio",
        question: "Which Laravel Framework do you love most?",
        description: "eqweqweqwesaf wqeqwe qdasdasdasd",
        data: {
          options: [
            {
              uuid: "f8af96f2-1d80-4632-9e9e-b560670e52ea",
              text: "Laravel 5",
            },
            { uuid: "201c1ff5-23c9-42f9-bfb5-bbc850536440", text: "Laravel 6" },
            {
              uuid: "b5c09733-a4930460a-ba8a-526863010729",
              text: "Laravel 7",
            },
            {
              uuid: "2abf1cee-f5fb-427c-a220-b5d159ad6513",
              text: "Laravel 8",
            },
          ],
        },
      },
      {
        id: 5,
        type: "text",
        question: "What do you want to learn from my channel?",
        description: null,
        data: {},
      },
      {
        id: 6,
        type: "textarea",
        question: "What do you want to say to me?",
        description: "wqeqweqwewqeqweqw",
        data: {},
      },
    ],
  },
  {
    id: 200,
    title: "Laravel 8",
    slug: "laravel-8",
    status: "active",
    image:
      "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
    description: `Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Laravel attempts to take the pain out of development by easing common tasks used in most web projects.`,
    created_at: "2021-12-20 18:00:00",
    updated_at: "2021-12-20 18:00:00",
    expire_date: "2021-12-31 18:00:00",
    questions: [],
  },
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    currentSurvey: {
      loading: false,
      data: {},
    },
    surveys: [...tmpSurveys],
    questionTypes: ["text", "select", "radio", "checkbox", "textare"],
  },
  getters: {},
  actions: {
    getSurvey({ commit }, id) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient
        .get(`/survey/${id}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },
    saveSurvey({ commit }, survey) {
      delete survey.image_url;
      let response;
      if (survey.id) {
        response = axiosClient
          .put(`/survey/${survey.id}`, survey)
          .then((res) => {
            commit("setCurrentSurvey", res.data);
            return res;
          });
      } else {
        response = axiosClient.post("/survey", survey).then((res) => {
          commit("setCurrentSurvey", res.data);
          return res;
        });
      }
      return response;
    },
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },
    logout({ commit }) {
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        return response;
      });
    },
  },
  mutations: {
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },

    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
  },
  modules: {},
});

export default store;
