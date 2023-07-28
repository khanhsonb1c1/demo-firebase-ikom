<template>
  <section class="section blog-single">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12 policy">
          <div class="section-title d-flex align-items-baseline justify-content-center">
            <h2 class="d-inline">{{ $t("Terms of use") }}</h2>
          </div>

          <PolicyVietnamese v-if="local === 'vi'" />
          <PolicyJapanese v-if="local === 'ja'" />
          <PolicyEnglish v-if="local === 'en'" />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PolicyVietnamese from "./PolicyVietnamese.vue";
import PolicyEnglish from "./PolicyEnglish.vue";
import PolicyJapanese from "./PolicyJapanese.vue";
import { getActiveLocale } from "@/i18n/translation";

export default defineComponent({
  components: { PolicyVietnamese, PolicyEnglish, PolicyJapanese },

  computed: {
    local() {
      return getActiveLocale();
    },
  },
});
</script>
