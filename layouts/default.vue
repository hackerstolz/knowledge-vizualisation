<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" class="px-6" fixed app>
      <v-container>
        <v-layout justify-center align-center>
          <span class="ml-2">{{ $t('title') }}</span>
          <v-spacer />
          <v-btn
            v-if="!isMobile"
            class="mx-4 text--secondary"
            href="https://github.com/hackerstolz/knowledge-vizualisation"
            target="_blank"
            depressed
          >
            <img src="~/static/github.svg" class="mr-3" />
            {{ $t('viewOnGH') }}
          </v-btn>
          <v-menu transition="scale-transition" origin="top center">
            <template v-slot:activator="{ on }">
              <v-btn small fab depressed v-on="on">
                <img src="~/static/more.svg" />
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                @click="onSetNewLocale($i18n.locale === 'de' ? 'en' : 'de')"
              >
                <v-list-item-title>
                  {{ $t($i18n.locale === 'de' ? 'switch2en' : 'switch2de') }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="isMobile"
                href="https://github.com/hackerstolz/knowledge-vizualisation"
                target="_blank"
              >
                <v-list-item-title>
                  {{ $t('viewOnGH') }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-layout>
      </v-container>
    </v-app-bar>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer app>
      <v-container>
        <v-layout justify-start align-center>
          <span>&copy; 2019</span>
          <v-spacer></v-spacer>
          <span>{{ $t('sloganBeforeHeart') }}</span>
          <v-img
            class="mx-1 flex-grow-0 heartbeat"
            :src="require('~/static/icon-heart.svg')"
            height="24"
            width="24"
            contain
          >
          </v-img>
          <span>{{ $t('sloganAfterHeart') }}</span>
          <v-spacer v-if="!isMobile"></v-spacer>
        </v-layout>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
      clipped: false
    }
  },
  mounted() {
    // set initial locale
    this.setHTMLLocale(this.$i18n.locale)

    // reigster resize handler
    this.onResize()
    window.addEventListener('resize', this.onResize, { passive: true })
  },
  methods: {
    onSetNewLocale(lang) {
      // switch Vue locale
      this.$parent.$i18n.locale = lang

      // switch HTML doc locale
      this.setHTMLLocale(lang)

      // switch vuetify locale
      this.$vuetify.lang.current = lang
    },
    onResize() {
      this.isMobile = window.innerWidth <= 600
    },
    setHTMLLocale(lang) {
      document.querySelector('html').setAttribute('lang', lang)
    }
  }
}
</script>

<style scoped lang="scss">
// FOOTER
footer.v-footer {
  .heartbeat {
    animation: heartbeat 2s infinite ease-in-out;
  }
}
@keyframes heartbeat {
  0% {
    transform: scale(0.8);
  }
  10% {
    transform: scale(0.8);
  }
  20% {
    transform: scale(1);
  }
  40% {
    transform: scale(0.8);
  }
  60% {
    transform: scale(1);
  }
  80% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(0.8);
  }
}
</style>

<i18n>
{
  "en": {
    "title": "Knowledge Vizualisation",
    "switch2en": "Switch to EN",
    "switch2de": "Switch to DE",
    "viewOnGH": "View on GitHub",
    "sloganBeforeHeart": "Made with",
    "sloganAfterHeart": "by Hackerstolz e.V."
  },
  "de": {
    "title": "Knowledge Vizualisation",
    "switch2en": "Umschalten auf EN",
    "switch2de": "Umschalten auf DE",
    "viewOnGH": "Auf GitHub ansehen",
    "sloganBeforeHeart": "Gemacht mit Liebe",
    "sloganAfterHeart": "von Hackerstolz e.V."
  }
}
</i18n>
