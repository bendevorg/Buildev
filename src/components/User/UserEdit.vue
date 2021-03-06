<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex sm12 md6>
        <v-card>
          <v-form>
            <v-container fluid>
              <v-layout row align-start wrap>
                <v-flex xs12 class="text-xs-center">
                  <v-avatar :tile="false" size="200" color="grey lighten-4">
                    <v-img :src="user.avatar">
                      <v-layout pa-2 column fill-height>
                        <v-spacer />
                        <v-flex shrink>
                          <v-btn fab dark small color="white" @click="pickFile">
                            <v-icon color="black">edit</v-icon>
                          </v-btn>
                        </v-flex>
                      </v-layout>
                    </v-img>
                  </v-avatar>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="user.name" label="Name" required />
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="user.email" label="E-mail" required />
                </v-flex>
                <v-flex xs12>
                  <v-checkbox
                    v-model="user.lookingForProject"
                    label="Are you open to join new projects?"
                    required
                  />
                </v-flex>
                <v-flex xs12>
                  <v-combobox
                    v-model="user.skills"
                    :items="skills"
                    item-text="name"
                    label="Select your skills"
                    multiple
                    chips
                  />
                </v-flex>
                <v-flex xs12>
                  <v-btn large block :loading=loading @click="sendUser()">
                    Update my info
                  </v-btn>
                </v-flex>
                <input
                  ref="image"
                  type="file"
                  style="display: none"
                  accept="image/*"
                  @change="onFilePicked"
                />
              </v-layout>
              <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-text class="headline">
                    Update complete!
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn flat="flat" @click="dialog = false">
                      Done
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-container>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      dialog: false,
      loading: false
    };
  },
  computed: {
    ...mapState('skill', {
      skills: state => state.skills
    }),
    ...mapState('user', {
      user: state => state.loggedUser
    })
  },
  created() {
    this.loggedInfo()
      .then(() => null)
      .catch(err => {
        this.$ga.event('Error', err);
      });
    this.listSkills()
      .then(() => null)
      .catch(err => {
        this.$ga.event('Error', err);
      });
  },
  methods: {
    ...mapActions('user', ['loggedInfo', 'editUser']),
    ...mapActions('skill', ['listSkills']),
    pickFile() {
      this.$refs.image.click();
    },
    onFilePicked(e) {
      const { files } = e.target;
      if (files[0] !== undefined) {
        this.imageName = files[0].name;
        if (this.imageName.lastIndexOf('.') <= 0) {
          return;
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.addEventListener('load', () => {
          this.user.avatar = fileReader.result;
          [this.user.avatarFile] = files;
        });
      } else {
        this.imageName = '';
        this.imageFile = '';
        this.imageUrl = '';
      }
    },
    sendUser() {
      this.$ga.event('User', 'Edit');
      this.loading = true;
      const { user } = this;
      user.formData = new FormData();
      user.formData.append('name', this.user.name);
      user.formData.append('lookingForProject', this.user.lookingForProject);
      if (this.user.skills.length === 0) {
        user.formData.append('skills[]', []);
      }
      this.user.skills.forEach((skill, index) =>
        user.formData.append(`skills[${index}]`, skill.id)
      );
      user.formData.append('avatar', this.user.avatarFile);
      this.editUser(user)
        .then(user => {
          this.loading = false;
          this.$router.push({ path: `/users/${user.id}` });
        })
        .catch(err => {
          this.$ga.event('Error', err);
          this.loading = false;
          // TODO: Handle error
        });
    }
  }
};
</script>

<style>
</style>
