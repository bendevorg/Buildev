<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <h1>Which skills do you want?</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center>
      <v-flex 
        v-for="skill in skills" :key="skill.id"
        v-bind="{[`xs${12 / skillsPerLine()}`]: true}"
        sm6
        md4>
        <v-checkbox
          v-model="selectedSkills"
          :label="skill.name"
          :value="skill"
          @click.native="saveInfo"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      selectedSkills: []
    };
  },
  computed: {
    ...mapState('skill', {
      skills: state => state.skills
    })
  },
  created() {
    this.listSkills()
      .then(() => null)
      .catch(err => {
        this.$ga.event('Error', err);
      });
  },
  methods: {
    ...mapActions('skill', ['listSkills']),
    saveInfo() {
      const creationInfo = {
        skills: this.selectedSkills
      };
      this.$emit('update-project-info', creationInfo);
    },
    skillsPerLine() {
      return window.innerWidth >= 360 ? 2 : 1;
    }
  }
};
</script>

