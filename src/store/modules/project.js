import API from '../../utils/API';

const state = {
  projects: {
    all: [],
    filtered: []
  }
};

const getters = {
};

const actions = {
  listProjects({ commit }) {
    API
      .get('/projects')
      .then(response => {
        commit('setProjects', response.data.msg);
      })
      .catch(error => {
        //  TODO: Handle the error
      });
  }
};

const mutations = {
  setProjects(state, projects) {
    state.projects.all = projects;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
