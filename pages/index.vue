<template>
  <div class="content">
    <client-only>
      <!-- this component will only be rendered on client-side -->
      <tree
        class="tree"
        :data="tree"
        node-text="name"
        type="cluster"
        layout-type="circular"
        link-layout="bezier"
        :leaf-text-margin="8"
        :node-text-margin="8"
        :radius="3"
        :duration="0"
      ></tree>

      <!-- loading indicator, rendered on server-side -->
      <v-progress-circular
        slot="placeholder"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </client-only>
  </div>
</template>

<script>
import ClientOnly from 'vue-client-only'
import treeData from '../static/knowledge-tree.json'

let startClientOnly = null

export default {
  components: {
    ClientOnly,
    // to prevent SSR code execution of 'vued3tree' (what causes window = undefined),
    // we start loading it after comp loaded on client
    Tree: () =>
      new Promise((resolve) => {
        startClientOnly = resolve
      })
        .then(() => import('vued3tree'))
        .then((m) => m.tree)
  },
  data: () => ({
    tree: treeData
  }),
  mounted() {
    // to prevent SSR code execution of 'vued3tree' (what causes window = undefined),
    // we start loading it after comp loaded on client
    if (startClientOnly) {
      startClientOnly()
    }
  },
  methods: {
    getI18n(i18nObj, lang) {
      if (i18nObj && typeof i18nObj[lang] === 'string') {
        return i18nObj[lang]
      }
      return ''
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  overflow: hidden;
  height: 100vh;
  // .tree {
  //   // ...
  // }
}
</style>

<i18n>
{
  "en": {
  },
  "de": {
  }
}
</i18n>
