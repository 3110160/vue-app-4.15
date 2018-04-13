<template>
  <div>
    <scroller
    :on-infinite="infinite"
    :on-refresh="refresh"
    ref="my_scroller">
      <div v-for="(item, index) in items"
      :key="index"
          class="row" :class="{'grey-bg': index % 2 == 0}">
        {{ item }}
      </div>
    </scroller>
  </div>
</template>
<script>
  
  export default {
    components: {
      
    },
    data () {
      return {
        items: []
      }
    },
    mounted() {
      for (let i = 1; i <= 30; i++) {
        this.items.push(i + ' - keep walking, be 2 with you.')
      }
      this.top = 1
      this.bottom = 20
    },
    methods: {
      infinite(done) {
        if (this.bottom >= 20) {
          setTimeout(() => {
            done(true)
          }, 1500)
          return;
        }
        setTimeout(() => {
          let start = this.bottom + 1
          for (let i = start; i < start + 10; i++) {
            this.items.push(i + ' - keep walking, be 2 with you.')
          }
          this.bottom = this.bottom + 10;
          setTimeout(() => {
            done()
          })
        }, 1500)
      },
      refresh(done) {
        setTimeout(() => {
          let start = this.top - 1
          for (let i = start; i > start - 10; i--) {
            this.items.splice(0, 0, i + ' - keep walking, be 2 with you.')
          }
          this.top = this.top - 10;
          done()
        }, 1500)
      },
    }
  }
</script>