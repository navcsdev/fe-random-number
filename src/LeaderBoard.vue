<template>
  <va-list-item
    v-for="{score, index} in leaderBoards?.data"
    :key="score.id">
    <va-list-item-section>
      <va-list-item-label>
        {{ index }}
      </va-list-item-label>
      <va-list-item-label>
        {{ score.name }}
      </va-list-item-label>
      <va-list-item-label caption>
        {{ score.created_at }}
      </va-list-item-label>
    </va-list-item-section>

    <va-list-item-section icon>
      {{score.score}}
    </va-list-item-section>
  </va-list-item>

</template>

<script>
import {useStore} from "vuex";
import {paginationEvent} from "@/function";
import {computed} from "vue";

export default {
  name: "LeaderBoard",
  setup() {
    const store = useStore();
    const leaderBoards = computed(()=>store.state.game.leaderBoards);
    return {
      ...paginationEvent('getLeaderBoard'),
      leaderBoards,
    }
  }
}
</script>

<style scoped>

</style>