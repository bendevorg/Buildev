<template>
  <v-container
    fluid
    grid-list-md
  >
    <v-layout row 
      align-center
      wrap
    >
      <v-flex sm12 md4>
        <v-layout column align-center>
          <v-flex xs8>
            <v-avatar
              color="grey lighten-4"
              size="250px"
            >
              <img src="https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg" alt="avatar">
            </v-avatar>
          </v-flex>
          <v-flex xs4>
            <div class="headline">{{ project.title }}</div>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex sm12 md8>
        <!--<app-user-skills-list :skills="project.skills"/>!-->
      </v-flex>
    </v-layout>
    <!--<app-user-projects-list/>!-->
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UserPage',
  components: {
    //appProjectSkillsList: ProjectSkillsList,
    //appProjectUsersList: ProjectUsersList
  },
  methods: {
    ...mapActions('project', [
      'projectInfo'
    ]),
  },
  computed: {
    ...mapState('project', {
      project: state => state.currentProject
    })
  },
  created() {
    //this.projectInfo('test');
  }
}
</script>