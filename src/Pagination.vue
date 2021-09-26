<template>
  <div class="d-flex justify-content-between align-items-center flex-wrap">
    <div class="d-flex flex-wrap py-2 mr-3">

      <a href="javascript:void (0)" class="btn btn-icon btn-sm btn-light mr-2 my-1" v-show="page !== 1" @click="onPrev"><i class="ki ki-bold-arrow-back icon-xs"></i></a>


      <a href="javascript:void(0);" v-for="i in ranges" :key="i" @click="onClick(i)" class="btn btn-icon btn-sm border-0 btn-light mr-2 my-1" v-bind:class="{'btn-hover-primary active': i ===page}">{{i}}</a>


      <a href="javascript:void(0);" class="btn btn-icon btn-sm btn-light mr-2 my-1"  v-if="page !== ranges[ranges.length - 1] && total !== 0" @click="onNext"><i class="ki ki-bold-arrow-next icon-xs"></i></a>

    </div>
    <div class="d-flex align-items-center py-3">

      <span class="text-muted">Total: {{total}} records</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MNEPagination",
    props: {
      total: {
        type: Number,
        default: 40
      },
      paginationSize: {
        type: Number,
        default: 10,
      },
      paginationPage: {
        type: Number,
        default: 1
      }
    },
    beforeUpdate() {
      this.update();
    },
    beforeMount() {
      this.update()
    },
    data() {
      return {
        dropdown: false,
        page: 0,
        ranges: [],
        item: 10,
      }
    },
    methods: {
      showSelectItem() {
        this.dropdown = !this.dropdown
      },
      changePageItem(event) {
        this.$emit('changeSize', event.target.value)
      },

      onNext() {
        if (this.page < this.ranges[this.ranges.length - 1]) {
          this.page += 1;
          this.$emit('changePage', this.page)
        }
      },

      onPrev() {
        if (this.page > 1) {
          this.page -= 1;
          this.$emit('changePage', this.page)
          // this.changePage.emit(this.page);
        }
      },

      onClick(i) {
        if (i === '...') {
          return;
        }
        if (this.page !== i) {
          this.page = i;
          this.$emit('changePage', this.page)
        }
      },
      update() {
        this.page = this.paginationPage;
        const max = Math.ceil(this.total / this.paginationSize);
        if (this.paginationSize) {
          if (max < 8) {
            this.ranges = Array(max).fill(0).map((x, i) => i + 1);
          } else {
            this.ranges = [];
            this.ranges.push(1);
            if (this.page === 5) {
              this.ranges.push(2);
            } else if (this.page > 5) {
              this.ranges.push('..');
            }
            if (this.page - 2 > 1) {
              this.ranges.push(this.page - 2);
            }
            if (this.page - 1 > 1) {
              this.ranges.push(this.page - 1);
            }
            if (this.page > 1 && this.page !== max) {
              this.ranges.push(this.page);
            }
            if (this.page + 1 < max) {
              this.ranges.push(this.page + 1);
            }
            if (this.page + 2 < max) {
              this.ranges.push(this.page + 2);
            }
            if (this.page + 3 === max - 1) {
              this.ranges.push(max - 1);
            } else if (this.page + 3 < max - 1) {
              this.ranges.push('...');
            }
            if (max > 0) {
              this.ranges.push(max);
            }
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
