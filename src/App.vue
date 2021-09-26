<template>
  <div class="layout gutter--xl">
    <div class="row">

      <div class="flex xs6">
        <va-card>
          <va-card-title>Game Play</va-card-title>
          <va-card-content style="text-align: center">
            <div class="row" v-if="state.created">
              <div class="flex md12">
                <p>Your name is used. Pls roll with another name</p>
              </div>
            </div>
            <div class="row">
              <div class="flex md12">
                <div class="item" style="font-size: 40px">{{state.score}}</div>
              </div>
            </div>
            <span>{{state.createdAt}}</span>
            <va-input
              class="mb-4"
              placeholder="Enter Your Name"
              v-model="this.state.model.user.name"
            />

            <va-button @click="play" :loading="isSubmitting" size="medium">
              Roll
            </va-button>
          </va-card-content>
        </va-card>

      </div>
      <div class="flex xs6">
        <va-card>
          <va-card-title>Leader Board Top 30</va-card-title>
          <va-card-content>
            <LeaderBoard ref="leaderBoard" />
          </va-card-content>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>

import {useStore} from "vuex";
import { reactive, ref} from "vue";
import {appService} from "@/appService";
import LeaderBoard from "@/LeaderBoard";

export const handleSubmit = () => {
  const isSubmitting = ref(false)
  const onSubmit = () => {
    isSubmitting.value = true
  }
  const onResponse = () => {
    isSubmitting.value = false
  }
  return {
    isSubmitting,
    onSubmit,
    onResponse
  }
}
export default {
  name: 'App',
  components: {LeaderBoard},
  setup() {
    const store = useStore()
    const state = reactive({
      model: {
        user: {
          name :''
        }
      },
      score: '',
      createdAt : '',
      created: false
    })
    return {
      state,
      ...handleSubmit(),
      store,
    }
  },
  methods: {
    play() {
      if (this.state.model.user.name === '') {
        this.$vaToast.init({message: 'Name is empty', color: 'warning'})
      }else {
        this.onSubmit()
        appService.play(this.state.model).then(res => {
          console.log(res)
          if (res.status == 200) {
            this.state.created = true
          } else {
            this.state.created = false
          }
          this.state.score = res.data.data.score
          this.state.createdAt = res.data.data.created_at
          this.$refs.leaderBoard.paginationLoad()
        }).catch(error=>{
          this.$vaToast.init({message: error.response.data.errors.name[0], color: 'warning'})
          return Promise.reject(error.response)
        }).finally(()=>{
          this.onResponse()
        })
      }
    }
  }
}
</script>

