<template>
  <v-card :to="'/users/' + user.id">
    <v-layout justify-center>
      <v-flex xs5>
        <v-layout row align-center>
          <v-avatar color="grey lighten-4" size="95px">
            <img :src="user.avatar" alt="avatar" />
          </v-avatar>
        </v-layout>
      </v-flex>
      <v-flex xs7>
        <v-card-title primary-title>
          <div>
            <h3 class="headline" :class="showEmail ? 'mb-1': ''">{{ user.name }}</h3>
            <span v-if="showEmail" class="grey--text">{{ user.email }}</span>
          </div>
        </v-card-title>
      </v-flex>
    </v-layout>
    <div v-if="user.skills && user.skills.length > 0">
      <v-divider light />
      <v-card-actions>
        <div>
          <v-chip
            v-for="skill in user.skills"
            :key="skill.id"
            :color="retrieveSkillColor()(skill.name)"
            :text-color="retrieveSkillTextColor()(skill.name)"
            small
          >
            {{ skill.name }}
          </v-chip>
        </div>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true
    },
    showEmail: {
      type: Boolean,
      required: false,
      default: false
    },
  },
  methods: {
    ...mapGetters('skill', {
      retrieveSkillColor: 'retrieveSkillColor',
      retrieveSkillTextColor: 'retrieveSkillTextColor'
    })
  }
};
</script>

<style lang="stylus" scoped>
>>> .v-avatar {
  margin-top: 7px;
  margin-left: 18px;
}
.v-card {
  margin-bottom: 8px;
}
</style>


