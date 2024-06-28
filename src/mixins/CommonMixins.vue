<!-- <script lang="ts">
import { AccountStatusModule } from '@/store/modules/AccountStatusModule';
import { Component, Vue } from 'vue-property-decorator';

export const Constants = {
  AUTHORITY: Object.freeze(
    [
      { label: 'Super', value: 0 },
      { label: 'All', value: 1 },
      { label: 'Buddy', value: 2 },
      { label: 'Biz', value: 3 },
      { label: 'Viewer', value: 4 }
    ]
  ),
  STATUS: Object.freeze({
    0: 'active',
    1: 'locked',
    2: 'deleted'
  })
}

export const Modules = {
}

@Component({
  name: 'CommonMixins',
  components: {}
})
export default class CommonMixins extends Vue {
  public get hasloggedin(): boolean { return AccountStatusModule.accountInfo.accountId !== "" }

}
</script> -->
